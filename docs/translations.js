const translations = {
  //ESPANOL
  es: {
    // HEADER
    "header.titulo": "🧭 Brújula Digital",
    "header.subtitulo": "Usa la tecnología de forma más segura, consciente y saludable.",

    // HOME 
    "home.titulo": "Bienvenido 👋",
    "home.descripcion": "Cada paso que das en el mundo digital es una oportunidad para aprender, descubrir y sentirte más seguro al usar la tecnología.",
    "home.btn": "Comenzar",

    // ===== MÓDULOS =====
    "modulos.titulo": "Módulos",
    "modulos.salud": "📱 Uso saludable de dispositivos",
    "modulos.estafas": "⚠️ Estafas digitales",
    "modulos.deepfakes": "🤖 Deepfakes y desinformación",
    "modulos.privacidad": "🔒 Privacidad y seguridad",

    // ===== MÓDULO 1 =====
    "modulo-salud.titulo": "📱 Uso saludable de dispositivos",
    "modulo-salud.descripcion": "La tecnología puede ser una herramienta poderosa para aprender, comunicarnos y descubrir nuevas oportunidades. Sin embargo, también es importante aprender a usarla con equilibrio, ya que un uso excesivo puede afectar nuestra salud y bienestar.",
    "modulo-salud.consejos": "📝 Consejos prácticos"
  },
    //ENGLISH
  en: {

    // ===== HEADER =====
    "header.titulo": "🧭 Digital Compass",
    "header.subtitulo": "Use technology in a safer, more conscious, and healthier way.",

    // ===== HOME =====
    "home.titulo": "Welcome 👋",
    "home.descripcion": "Every step you take in the digital world is an opportunity to learn, discover, and feel more confident using technology.",
    "home.btn": "Get Started",

    // ===== MODULES =====
    "modulos.titulo": "Modules",
    "modulos.salud": "📱 Healthy Device Use",
    "modulos.estafas": "⚠️ Digital Scams",
    "modulos.deepfakes": "🤖 Deepfakes and Misinformation",
    "modulos.privacidad": "🔒 Privacy and Security",

    // ===== MODULE 1 =====
    "modulo-salud.titulo": "📱 Healthy Device Use",
    "modulo-salud.descripcion": "Technology can be a powerful tool for learning, communicating, and discovering new opportunities. However, it is also important to use it in a balanced way, since excessive use can affect our health and well-being.",
    "modulo-salud.consejos": "📝 Practical Tips"
  }
};

let idiomaActual = "es";

function setLanguage(lang) {
  idiomaActual = lang;

  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function(el) {
    const key = el.getAttribute("data-i18n");

    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach(function(btn) {
    btn.classList.toggle(
      "lang-activo",
      btn.getAttribute("data-lang") === lang
    );
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setLanguage("es");
});