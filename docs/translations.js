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

    // MODULOS 
    "modulos.titulo": "Módulos",
    "modulos.salud": "📱 Uso saludable de dispositivos",
    "modulos.estafas": "⚠️ Estafas digitales",
    "modulos.deepfakes": "🤖 Deepfakes y desinformación",
    "modulos.privacidad": "🔒 Privacidad y seguridad",

    // INTRO MODULO 1
    "modulo-salud.titulo": "📱 Uso saludable de dispositivos",
    "modulo-salud.descripcion": "La tecnología puede ser una herramienta poderosa para aprender, comunicarnos y descubrir nuevas oportunidades. Sin embargo, también es importante aprender a usarla con equilibrio, ya que un uso excesivo puede afectar nuestra salud y bienestar.",
    "modulo-salud.consejos": "📝 Consejos prácticos",

    "titulo.consejo1": "Regla 20-20-20",
    "descripcion1.consejo1": "¿Alguna vez has sentido los ojos cansados o resecos después de usar el celular por mucho tiempo?",
    "descripcion2.consejo1": "Nuestros ojos también necesitan descansar. Cada 20 minutos, mira algo que esté a unos 6 metros de distancia durante 20 segundos. Este pequeño hábito puede ayudar a reducir la fatiga visual.",

    "titulo.consejo2": "Modo nocturno",
    "descripcion1.consejo2": "¿Te ha pasado que te cuesta dormir después de usar el teléfono por la noche?",
    "descripcion2.consejo2": "La luz azul de las pantallas puede interferir con el sueño. Intenta activar el modo nocturno o la luz cálida después de las 7:00 p. m.",

    "titulo.consejo3": "Zona sin pantallas",
    "descripcion1.consejo3": "¿Cuántas veces has mirado el celular durante una comida o justo antes de dormir?",
    "descripcion2.consejo3": "A veces, dejar el celular a un lado también hace bien. Aprovecha esos momentos para descansar, conversar o disfrutar del tiempo con las personas que te rodean.",

    "titulo.consejo4": "Postura",
    "descripcion1.consejo4": "¿Alguna vez has sentido tensión o dolor en el cuello después de usar el teléfono?",
    "descripcion2.consejo4": "Muchas veces se debe a la postura. Procura sostener el dispositivo a la altura de los ojos para evitar molestias en el cuello y la espalda.",

    "modulo-salud.meta": "🎯 Meta del módulo",
    "modulo-salud.meta.descripcion": "Descubrir cómo pequeños cambios en nuestros hábitos digitales pueden ayudarnos a disfrutar la tecnología de una manera más equilibrada, saludable y consciente. 🧭💙"
  },
  
    //ENGLISH
  en: {

    // HEADER 
    "header.titulo": "🧭 Digital Compass",
    "header.subtitulo": "Use technology in a safer, more conscious, and healthier way.",

    // HOME 
    "home.titulo": "Welcome 👋",
    "home.descripcion": "Every step you take in the digital world is an opportunity to learn, discover, and feel more confident using technology.",
    "home.btn": "Get Started",

    // MODULES 
    "modulos.titulo": "Modules",
    "modulos.salud": "📱 Healthy Device Use",
    "modulos.estafas": "⚠️ Digital Scams",
    "modulos.deepfakes": "🤖 Deepfakes and Misinformation",
    "modulos.privacidad": "🔒 Privacy and Security",

    // INTRO MODULE 1 
    "modulo-salud.titulo": "📱 Healthy Device Use",
    "modulo-salud.descripcion": "Technology can be a powerful tool for learning, communicating, and discovering new opportunities. However, it is also important to use it in a balanced way, since excessive use can affect our health and well-being.",
    "modulo-salud.consejos": "📝 Practical Tips",

    "titulo.consejo1": "20-20-20 Rule",
    "descripcion1.consejo1": "Have you ever felt tired or dry eyes after using your phone for a long time?",
    "descripcion2.consejo1": "Our eyes also need to rest. Every 20 minutes, look at something about 6 meters away for 20 seconds. This small habit can help reduce eye strain.",

    "titulo.consejo2": "Night Mode",
    "descripcion1.consejo2": "Have you ever had trouble falling asleep after using your phone at night?",
    "descripcion2.consejo2": "The blue light from screens can interfere with sleep. Try enabling night mode or warm lighting after 7:00 PM.",

    "titulo.consejo3": "Screen-Free Zone",
    "descripcion1.consejo3": "How many times have you looked at your phone during a meal or right before going to bed?",
    "descripcion2.consejo3": "Sometimes, leaving your phone aside also does good. Take advantage of these moments to rest, chat, or enjoy time with the people around you.",

    "titulo.consejo4": "Posture",
    "descripcion1.consejo4": "Have you ever felt tension or pain in your neck after using your phone?",
    "descripcion2.consejo4": "Many times this is due to posture. Try to hold the device at eye level to avoid discomfort in your neck and back.",

    "modulo-salud.meta": "🎯 Module Goal",
    "modulo-salud.meta.descripcion": "Discover how small changes in our digital habits can help us enjoy technology in a more balanced, healthy, and conscious way. 🧭💙"
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