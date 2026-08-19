const translations = {
    az: {
        home: "Ana səhifə",
        products: "Məhsullar",
        about: "Haqqımızda",
        reviews: "Rəylər",
        login: "Giriş",
        register: "Qeydiyyat",
        logout: "Çıxış",
        profile: "Profilim",
        myAccount: "Hesabım",
        email: "Email",
        password: "Şifrə",
        createAccount: "Hesab yarat",
        loginButton: "Giriş et",
        backHome: "← Ana səhifə",
        loading: "Yüklənir...",
        profileLoading: "Profil yüklənir...",
        active: "● Aktiv",
        registrationDate: "Qeydiyyat tarixi",
        userId: "İstifadəçi ID",
        myProducts: "Məhsullarım",
        purchasedProducts: "Satın aldığınız premium xidmətlər burada görünür.",
        noProducts: "Hazırda sifarişiniz yoxdur.",
        viewProducts: "Məhsullara bax",
        accountActions: "Hesab əməliyyatları",
        added: "Əlavə olunub:",
        cart: "Səbət",
        yourCart: "Səbətiniz",
        cartEmpty: "Səbətiniz boşdur",
        total: "Ümumi məbləğ:",
        confirmOrder: "Sifarişi təsdiq et",
        remove: "Sil",
        buyNow: "İndi al",
        addCart: "Səbətə at",
        choosePeriod: "Müddət seçin",
        premiumService: "Premium rəqəmsal xidmət",
        faq: "FAQ",
        reviewsTitle: "Məhsul haqqında rəylər",
        otherProducts: "Digər premium xidmətlər",
        details: "Ətraflı bax",
        safe: "🔒 Məlumatlarınız təhlükəsiz saxlanılır.",
        fastActivation: "Sürətli aktivləşdirmə",
        safeOrder: "Təhlükəsiz sifariş",
        support: "Operativ dəstək",
        language: "Dil",
        registrationSuccess: "Qeydiyyat uğurludur! Sayta daxil olursunuz...",
        loginSuccess: "Giriş uğurludur! Ana səhifəyə keçirsiniz...",
        accountCreated: "Hesab yaradıldı.",
        loginError: "Giriş mümkün olmadı.",
        error: "Xəta baş verdi.",
        emailConfirm: "Email təsdiqi tələb olunur."
    },

    ru: {
        home: "Главная",
        products: "Товары",
        about: "О нас",
        reviews: "Отзывы",
        login: "Вход",
        register: "Регистрация",
        logout: "Выйти",
        profile: "Мой профиль",
        myAccount: "Мой аккаунт",
        email: "Email",
        password: "Пароль",
        createAccount: "Создать аккаунт",
        loginButton: "Войти",
        backHome: "← Главная",
        loading: "Загрузка...",
        profileLoading: "Загрузка профиля...",
        active: "● Активен",
        registrationDate: "Дата регистрации",
        userId: "ID пользователя",
        myProducts: "Мои товары",
        purchasedProducts: "Здесь отображаются приобретённые вами премиум-услуги.",
        noProducts: "У вас пока нет заказов.",
        viewProducts: "Посмотреть товары",
        accountActions: "Действия с аккаунтом",
        added: "Добавлено:",
        cart: "Корзина",
        yourCart: "Ваша корзина",
        cartEmpty: "Ваша корзина пуста",
        total: "Итого:",
        confirmOrder: "Подтвердить заказ",
        remove: "Удалить",
        buyNow: "Купить сейчас",
        addCart: "В корзину",
        choosePeriod: "Выберите срок",
        premiumService: "Премиум цифровая услуга",
        faq: "FAQ",
        reviewsTitle: "Отзывы о продукте",
        otherProducts: "Другие премиум-услуги",
        details: "Подробнее",
        safe: "🔒 Ваши данные хранятся в безопасности.",
        fastActivation: "Быстрая активация",
        safeOrder: "Безопасный заказ",
        support: "Оперативная поддержка",
        language: "Язык",
        registrationSuccess: "Регистрация успешна! Переходим на сайт...",
        loginSuccess: "Вход выполнен! Переходим на главную...",
        accountCreated: "Аккаунт создан.",
        loginError: "Не удалось войти.",
        error: "Произошла ошибка.",
        emailConfirm: "Требуется подтверждение email."
    },

    en: {
        home: "Home",
        products: "Products",
        about: "About us",
        reviews: "Reviews",
        login: "Login",
        register: "Register",
        logout: "Logout",
        profile: "My Profile",
        myAccount: "My Account",
        email: "Email",
        password: "Password",
        createAccount: "Create account",
        loginButton: "Login",
        backHome: "← Home",
        loading: "Loading...",
        profileLoading: "Loading profile...",
        active: "● Active",
        registrationDate: "Registration date",
        userId: "User ID",
        myProducts: "My products",
        purchasedProducts: "Your purchased premium services will appear here.",
        noProducts: "You have no orders yet.",
        viewProducts: "View products",
        accountActions: "Account actions",
        added: "Added:",
        cart: "Cart",
        yourCart: "Your cart",
        cartEmpty: "Your cart is empty",
        total: "Total:",
        confirmOrder: "Confirm order",
        remove: "Remove",
        buyNow: "Buy now",
        addCart: "Add to cart",
        choosePeriod: "Choose duration",
        premiumService: "Premium digital service",
        faq: "FAQ",
        reviewsTitle: "Product reviews",
        otherProducts: "Other premium services",
        details: "View details",
        safe: "🔒 Your information is stored securely.",
        fastActivation: "Fast activation",
        safeOrder: "Secure order",
        support: "Fast support",
        language: "Language",
        registrationSuccess: "Registration successful! Redirecting...",
        loginSuccess: "Login successful! Redirecting...",
        accountCreated: "Account created.",
        loginError: "Login failed.",
        error: "An error occurred.",
        emailConfirm: "Email confirmation is required."
    }
};

function getLanguage() {
    return localStorage.getItem("digi_language") || "az";
}

function setLanguage(lang) {
    if (!translations[lang]) lang = "az";

    localStorage.setItem("digi_language", lang);

    location.reload();
}

function t(key) {
    const lang = getLanguage();
    return translations[lang]?.[key] || translations.az[key] || key;
}

function languageSwitcher() {
    return `
        <div style="
            display:flex;
            gap:5px;
            align-items:center;
            margin-left:10px;
        ">
            <button onclick="setLanguage('az')" 
                style="background:none;border:0;color:#fff;cursor:pointer;font-weight:bold;">
                AZ
            </button>

            <span style="color:#444;">|</span>

            <button onclick="setLanguage('ru')" 
                style="background:none;border:0;color:#fff;cursor:pointer;font-weight:bold;">
                RU
            </button>

            <span style="color:#444;">|</span>

            <button onclick="setLanguage('en')" 
                style="background:none;border:0;color:#fff;cursor:pointer;font-weight:bold;">
                EN
            </button>
        </div>
    `;
}
