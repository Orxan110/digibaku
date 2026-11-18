const { Pool } = require("pg");

const pool =
  globalThis.digibakuPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
  });

globalThis.digibakuPool = pool;

const RESOURCES = new Set([
  "products",
  "categories",
  "orders",
  "customers",
  "banners",
  "reviews",
  "faq",
  "translations",
  "pages",
  "settings",
  "chats"
]);

function response(res, status, payload) {
  return res.status(status).json(payload);
}

function getBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function getToken(req) {
  const authorization = req.headers.authorization || "";

  if (authorization.startsWith("Bearer ")) {
    return authorization.slice(7).trim();
  }

  const cookies = (req.headers.cookie || "").split(";");

  for (const cookie of cookies) {
    const [name, ...value] = cookie.trim().split("=");

    if (name === "sb-access-token") {
      return decodeURIComponent(value.join("="));
    }
  }

  return null;
}

async function verifyAdmin(req) {
  const token = getToken(req);

  if (!token) {
    throw new Error("Giriş tələb olunur.");
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("Supabase giriş parametrləri təyin edilməyib.");
  }

  const authResponse = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`,
    {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!authResponse.ok) {
    throw new Error("İstifadəçi sessiyası etibarsızdır.");
  }

  const user = await authResponse.json();
  const allowedEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map(email => email.trim().toLowerCase())
    .filter(Boolean);

  if (
    !user.email ||
    !allowedEmails.includes(user.email.toLowerCase())
  ) {
    throw new Error("Bu əməliyyat üçün admin icazəsi yoxdur.");
  }

  return user;
}

function cleanData(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {};
  }

  const data = { ...input };

  delete data.created_at;
  delete data.updated_at;

  return data;
}

async function listRecords(resource) {
  const result = await pool.query(
    `SELECT id, data, created_at, updated_at
     FROM cms_records
     WHERE resource = $1
     ORDER BY updated_at DESC`,
    [resource]
  );

  return result.rows.map(row => ({
    ...row.data,
    id: row.id,
    created_at: row.created_at,
    updated_at: row.updated_at
  }));
}

async function getRecord(resource, identifier) {
  const result = await pool.query(
    `SELECT id, data, created_at, updated_at
     FROM cms_records
     WHERE resource = $1
       AND (id = $2 OR data->>'slug' = $2 OR data->>'key' = $2)
     LIMIT 1`,
    [resource, identifier]
  );

  if (!result.rows.length) return null;

  const row = result.rows[0];

  return {
    ...row.data,
    id: row.id,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

async function createRecord(resource, input) {
  const data = cleanData(input);

  const result = await pool.query(
    `INSERT INTO cms_records (resource, data)
     VALUES ($1, $2::jsonb)
     RETURNING id, data, created_at, updated_at`,
    [resource, JSON.stringify(data)]
  );

  const row = result.rows[0];

  return {
    ...row.data,
    id: row.id,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

async function updateRecord(resource, identifier, input) {
  const data = cleanData(input);

  const result = await pool.query(
    `UPDATE cms_records
     SET data = data || $3::jsonb,
         updated_at = NOW()
     WHERE resource = $1
       AND (id = $2 OR data->>'slug' = $2 OR data->>'key' = $2)
     RETURNING id, data, created_at, updated_at`,
    [resource, identifier, JSON.stringify(data)]
  );

  if (!result.rows.length) return null;

  const row = result.rows[0];

  return {
    ...row.data,
    id: row.id,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}

async function deleteRecord(resource, identifier) {
  const result = await pool.query(
    `DELETE FROM cms_records
     WHERE resource = $1
       AND (id = $2 OR data->>'slug' = $2 OR data->>'key' = $2)
     RETURNING id`,
    [resource, identifier]
  );

  return result.rowCount > 0;
}

async function exportBackup() {
  const result = await pool.query(
    `SELECT resource, id, data, created_at, updated_at
     FROM cms_records
     ORDER BY resource, created_at`
  );

  return {
    version: 1,
    exported_at: new Date().toISOString(),
    records: result.rows
  };
}

async function importBackup(input) {
  if (!Array.isArray(input.records)) {
    throw new Error("Backup faylının formatı düzgün deyil.");
  }

  if (input.records.length > 10000) {
    throw new Error("Backup çox böyükdür.");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const record of input.records) {
      if (
        !record ||
        !RESOURCES.has(record.resource) ||
        !record.id ||
        !record.data ||
        typeof record.data !== "object"
      ) {
        throw new Error("Backup daxilində etibarsız məlumat var.");
      }

      await client.query(
        `INSERT INTO cms_records (resource, id, data)
         VALUES ($1, $2, $3::jsonb)
         ON CONFLICT (resource, id)
         DO UPDATE SET
           data = EXCLUDED.data,
           updated_at = NOW()`,
        [
          record.resource,
          String(record.id),
          JSON.stringify(record.data)
        ]
      );
    }

    await client.query("COMMIT");

    return { imported: input.records.length };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    return res.status(204).end();
  }

  const path = (req.url || "")
    .split("?")[0]
    .replace(/^\/api\/admin\/?/, "")
    .split("/")
    .filter(Boolean)
    .map(decodeURIComponent);

  const method = req.method.toUpperCase();

  try {
    // API yoxlaması
    if (path[0] === "health") {
      await pool.query("SELECT 1");

      return response(res, 200, {
        ok: true,
        message: "DigiBaku API işləyir."
      });
    }

    // Admin icazəsi
    await verifyAdmin(req);

    // Backup ixracı
    if (
      path[0] === "backup" &&
      path[1] === "export" &&
      method === "GET"
    ) {
      const backup = await exportBackup();
      return response(res, 200, {
        ok: true,
        data: backup
      });
    }

    // Backup bərpası
    if (
      path[0] === "backup" &&
      path[1] === "import" &&
      method === "POST"
    ) {
      const result = await importBackup(getBody(req));

      return response(res, 200, {
        ok: true,
        data: result
      });
    }

    const resource = path[0];
    const identifier = path[1];

    if (!resource || !RESOURCES.has(resource)) {
      return response(res, 404, {
        ok: false,
        error: "API bölməsi tapılmadı."
      });
    }

    // Bütün məlumatları əldə et
    if (method === "GET" && !identifier) {
      const data = await listRecords(resource);

      return response(res, 200, {
        ok: true,
        data
      });
    }

    // Bir məlumatı əldə et
    if (method === "GET" && identifier) {
      const data = await getRecord(resource, identifier);

      if (!data) {
        return response(res, 404, {
          ok: false,
          error: "Məlumat tapılmadı."
        });
      }

      return response(res, 200, {
        ok: true,
        data
      });
    }

    // Yeni məlumat əlavə et
    if (method === "POST" && !identifier) {
      const body = getBody(req);
      const data = await createRecord(
        resource,
        body.data || body
      );

      return response(res, 201, {
        ok: true,
        data
      });
    }

    // Mövcud məlumatı yenilə
    if (
      ["PUT", "PATCH", "POST"].includes(method) &&
      identifier
    ) {
      const body = getBody(req);

      const data = await updateRecord(
        resource,
        identifier,
        body.data || body
      );

      if (!data) {
        return response(res, 404, {
          ok: false,
          error: "Yenilənəcək məlumat tapılmadı."
        });
      }

      return response(res, 200, {
        ok: true,
        data
      });
    }

    // Məlumatı sil
    if (method === "DELETE" && identifier) {
      const deleted = await deleteRecord(resource, identifier);

      if (!deleted) {
        return response(res, 404, {
          ok: false,
          error: "Silinəcək məlumat tapılmadı."
        });
      }

      return response(res, 200, {
        ok: true,
        message: "Məlumat silindi."
      });
    }

    return response(res, 405, {
      ok: false,
      error: "Bu əməliyyat dəstəklənmir."
    });

  } catch (error) {
    const message = error.message || "Server xətası.";

    const status =
      message.includes("Giriş tələb olunur") ||
      message.includes("sessiyası") ||
      message.includes("admin icazəsi") ||
      message.includes("Supabase giriş")
        ? 401
        : 500;

    console.error("DigiBaku API:", error);

    return response(res, status, {
      ok: false,
      error: message
    });
  }
};


