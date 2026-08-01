const translations = {
    es: {
        //HOME
        "home.titulo": "Bienvenido 👋",
        "home.descrpcion": "Cada paso que das en el mundo digital es una oportunidad para aprender, descubrir y sentirte más seguro al usar la tecnología.",
        "home.btn": "Comenzar",

        //MODULOS
        "modulo.titulo": "Módulos",
        "modulos.salud": "📱 Uso saludable de dispositivos",
        "modulos.estafas": "⚠️ Estafas digitales",
        "modulos.deepfakes": "🤖 Deepfakes y desinformación",
        "modulos.privacidad": "🔒 Privacidad y seguridad",
    },
     en: {
    // HOME
    "home.titulo": "Welcome 👋",
    "home.descripcion": "Every step you take in the digital world is an opportunity to learn, discover, and feel more confident using technology.",
    "home.btn": "Get Started",

    // MODULES
    "modulos.titulo": "Modules",
    "modulos.salud": "📱 Healthy device use",
    "modulos.estafas": "⚠️ Digital scams",
    "modulos.deepfakes": "🤖 Deepfakes and misinformation",
    "modulos.privacidad": "🔒 Privacy and security",
  }
};

let idiomaActual = "es";

function setLanguage(lang) {
  idiomaActual = lang;
  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.querySelectorAll(".lang-btn").forEach(function(btn) {
    btn.classList.toggle("lang-activo", btn.getAttribute("data-lang") === lang);
  });
}