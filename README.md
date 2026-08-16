<!DOCTYPE html>
<html lang="az">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DigiBaku - Digital Marketplace</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      background: #f5f7fb;
      color: #151922;
    }

    header {
      background: #ffffff;
      border-bottom: 1px solid #e7e9ee;
      padding: 18px 6%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .logo {
      font-size: 25px;
      font-weight: 800;
      color: #2563eb;
    }

    nav {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    nav a {
      text-decoration: none;
      color: #444;
      font-size: 15px;
    }

    .login {
      background: #2563eb;
      color: white;
      padding: 10px 17px;
      border-radius: 9px;
    }

    .hero {
      padding: 75px 6%;
      text-align: center;
      background: linear-gradient(135deg, #eef4ff, #ffffff);
    }

    .hero h1 {
      font-size: 46px;
      margin-bottom: 15px;
    }

    .hero h1 span {
      color: #2563eb;
    }

    .hero p {
      color: #667085;
      font-size: 18px;
      margin-bottom: 30px;
    }

    .search {
      max-width: 650px;
      margin: auto;
      display: flex;
      background: white;
      padding: 7px;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,.08);
    }

    .search input {
      flex: 1;
      border: none;
      outline: none;
      padding: 15px;
      font-size: 16px;
    }

    .search button {
      border: none;
      background: #2563eb;
      color: white;
      padding: 0 25px;
      border-radius: 8px;
      cursor: pointer;
    }

    .container {
      padding: 50px 6%;
    }

    .section-title {
      margin-bottom: 25px;
      font-size: 27px;
    }

    .categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 15px;
      margin-bottom: 50px;
    }

    .category {
      background: white;
      padding: 25px;
      border-radius: 12px;
      text-align: center;
      border: 1px solid #e7e9ee;
      cursor: pointer;
      transition: .2s;
    }

    .category:hover {
      transform: translateY(-3px);
      border-color: #2563eb;
    }

    .products {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 22px;
    }

    .product {
      background: white;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid #e7e9ee;
      transition: .2s;
    }

    .product:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0,0,0,.08);
    }

    .product-img {
      height: 150px;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 38px;
    }

    .product-info {
      padding: 18px;
    }

    .product-info h3 {
      margin-bottom: 8px;
    }

    .seller {
      color: #777;
      font-size: 13px;
      margin-bottom: 15px;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .price {
      font-size: 20px;
      font-weight: bold;
    }

    .buy {
      background: #2563eb;
      color: white;
      border: none;
      padding: 9px 15px;
      border-radius: 8px;
      cursor: pointer;
    }

    footer {
      margin-top: 50px;
      background: #111827;
      color: #9ca3af;
      padding: 30px 6%;
      text-align: center;
    }

    @media(max-width: 700px) {
      header {
        flex-direction: column;
      }

      nav {
        flex-wrap: wrap;
        justify-content: center;
      }

      .hero h1 {
        font-size: 34px;
      }
    }
  </style>
</head>

<body>

<header>
  <div class="logo">DigiBaku</div>

  <nav>
    <a href="#">Ana səhifə</a>
    <a href="#">Məhsullar</a>
    <a href="#">Satıcı ol</a>
    <a href="#" class="login">Giriş</a>
  </nav>
</header>

<section class="hero">
  <h1>Digital məhsulların <span>ünvanı</span></h1>
  <p>Hesablar, digital məhsullar və xidmətlər — DigiBaku-da.</p>

  <div class="search">
    <input type="text" placeholder="Məhsul axtar...">
    <button>Axtar</button>
  </div>
</section>

<div class="container">

  <h2 class="section-title">Kateqoriyalar</h2>

  <div class="categories">
    <div class="category">🎮 Oyun</div>
    <div class="category">📺 Streaming</div>
    <div class="category">💻 Proqramlar</div>
    <div class="category">🔑 Hesablar</div>
    <div class="category">🎁 Gift Card</div>
    <div class="category">⚡ Digər</div>
  </div>

  <h2 class="section-title">Populyar məhsullar</h2>

  <div class="products">

    <div class="product">
      <div class="product-img">🎮</div>
      <div class="product-info">
        <h3>Gaming Account</h3>
        <div class="seller">Satıcı: DigiStore</div>

        <div class="bottom">
          <div class="price">5.99 AZN</div>
          <button class="buy">Satın al</button>
        </div>
      </div>
    </div>

    <div class="product">
      <div class="product-img">🎬</div>
      <div class="product-info">
        <h3>Premium Account</h3>
        <div class="seller">Satıcı: PremiumShop</div>

        <div class="bottom">
          <div class="price">7.99 AZN</div>
          <button class="buy">Satın al</button>
        </div>
      </div>
    </div>

    <div class="product">
      <div class="product-img">💻</div>
      <div class="product-info">
        <h3>Digital License</h3>
        <div class="seller">Satıcı: DigitalPro</div>

        <div class="bottom">
          <div class="price">12.99 AZN</div>
          <button class="buy">Satın al</button>
        </div>
      </div>
    </div>

  </div>
</div>

<footer>
  © 2026 DigiBaku — Digital Marketplace
</footer>

</body>
</html>
