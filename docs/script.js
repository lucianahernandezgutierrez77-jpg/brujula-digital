// NAVEGACION
function showSection(id) {
  document.querySelectorAll("main.container > section").forEach(function(sec) {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";

  if (id === "leccion-salud") initQuiz(); initRuleta();
  if (id === "leccion-estafas") initQuizEstafas();
  if (id === "leccion-deepfakes") initQuizDeepfakes();
  if (id === "leccion-privacidad") initQuizPrivacidad();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  showSection("home");
}

// QUIZ MÓDULO 1
const quizData = [
  {
    pregunta: "¿Cuál de estos efectos puede causar pasar demasiado tiempo frente a una pantalla?",
    opciones: ["Mejora la calidad del sueño", "Puede dificultar el descanso y el sueño", "Aumenta las ganas de hacer ejercicio", "No tiene ningún efecto en la salud"],
    correcta: 1
  },
  {
    pregunta: "¿Cómo debemos ver la tecnología?",
    opciones: ["Como algo que debemos evitar por completo", "Como el centro de nuestra vida diaria", "Como una herramienta que nos ayuda si la usamos bien", "Como algo solo para jóvenes"],
    correcta: 2
  },
  {
    pregunta: "¿Qué podemos hacer para cuidar nuestro tiempo en pantalla?",
    opciones: ["Nunca usar tecnología después de las 6pm", "Usar el teléfono hasta quedarnos dormidos", "Ver pantallas todo el día si nos sentimos bien", "Poner límites de tiempo y hacer pausas regulares"],
    correcta: 3
  },
  {
    pregunta: "¿En qué consiste la regla 20-20-20?",
    opciones: ["Cada 20 minutos, mirar algo lejano durante 20 segundos", "Usar el teléfono 20 minutos y descansar 20 horas", "Cargar el teléfono cada 20 minutos", "Caminar 20 pasos cada 20 minutos"],
    correcta: 0
  },
  {
    pregunta: "¿Por qué se recomienda activar el modo nocturno en la noche?",
    opciones: ["Para ahorrar batería", "Porque la luz azul dificulta conciliar el sueño", "Para ver mejor la pantalla", "No hay ninguna razón real"],
    correcta: 1
  },
  {
    pregunta: "¿Cuál es una buena alternativa a usar el teléfono en tiempo libre?",
    opciones: ["Ver más televisión", "Buscar otra pantalla", "Llamar a un familiar o dar una caminata", "Ninguna, el teléfono es la mejor opción"],
    correcta: 2
  }
];

let respuestasCorrectas = 0;
let preguntasRespondidas = 0;

function initQuiz() {
  respuestasCorrectas = 0;
  preguntasRespondidas = 0;

  const container = document.getElementById("quiz-container");
  const btnResultado = document.getElementById("btn-resultado");
  const resultadoFinal = document.getElementById("resultado-final");

  btnResultado.style.display = "none";
  resultadoFinal.style.display = "none";
  resultadoFinal.innerHTML = "";

  let quizHTML = "";
  quizData.forEach(function(item, indice) {
    quizHTML += `<div class="quiz-pregunta" id="pregunta-${indice}">`;
    quizHTML += `<p><strong>${indice + 1}. ${item.pregunta}</strong></p>`;
    item.opciones.forEach(function(opcion, opcionIndice) {
      quizHTML += `<button class="quiz-opcion" onclick="verificarRespuesta(${indice}, ${opcionIndice}, this)">${opcion}</button>`;
    });
    quizHTML += `<p id="feedback-${indice}" class="quiz-feedback"></p>`;
    quizHTML += `</div>`;
  });

  container.innerHTML = quizHTML;
}

function verificarRespuesta(preguntaIndice, opcionElegida, botonPresionado) {
  const correcta = quizData[preguntaIndice].correcta;
  const feedback = document.getElementById(`feedback-${preguntaIndice}`);
  const botonesDeEsaPregunta = document.querySelectorAll(`#pregunta-${preguntaIndice} .quiz-opcion`);

  botonesDeEsaPregunta.forEach(function(btn) { btn.disabled = true; });

  if (opcionElegida === correcta) {
    botonPresionado.style.backgroundColor = "var(--green)";
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "var(--green)";
    respuestasCorrectas++;
  } else {
    botonPresionado.style.backgroundColor = "var(--red)";
    feedback.textContent = "❌ No es correcto. La respuesta correcta era: " + quizData[preguntaIndice].opciones[correcta];
    feedback.style.color = "var(--red)";
    botonesDeEsaPregunta[correcta].style.backgroundColor = "var(--green)";
  }

  preguntasRespondidas++;
  if (preguntasRespondidas === quizData.length) {
    document.getElementById("btn-resultado").style.display = "block";
  }
}

function mostrarPuntaje() {
  const total = quizData.length;
  const resultado = document.getElementById("resultado-final");
  let mensaje = "";
  let color = "";

  if (respuestasCorrectas === total) {
    mensaje = "🏆 ¡Perfecto! Respondiste todo correctamente.";
    color = "var(--green)";
  } else if (respuestasCorrectas >= total / 2) {
    mensaje = "👍 ¡Bien hecho! Vas por buen camino.";
    color = "var(--blue)";
  } else {
    mensaje = "📖 No te preocupes. Puedes releer la lección e intentarlo de nuevo.";
    color = "var(--orange)";
  }

  resultado.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 20px; margin-top: 15px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="color: ${color};">${mensaje}</h3>
      <p style="font-size: 1.3rem;">Obtuviste <strong>${respuestasCorrectas} de ${total}</strong> respuestas correctas.</p>
    </div>
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>🌿 ¿Qué hacer en cambio?</h3>
      <p>Reducir el tiempo en pantalla no significa aburrirse. Aquí algunas ideas:</p>
      <ul style="line-height: 2;">
        <li>🚶 Dar una caminata corta de 10-15 minutos</li>
        <li>📞 Llamar a un familiar o amigo por teléfono</li>
        <li>📖 Leer un libro o revista física</li>
        <li>🧩 Hacer un crucigrama o rompecabezas</li>
        <li>🌱 Regar las plantas o salir al balcón</li>
      </ul>
      <p>La tecnología es una herramienta, no un pasatiempo obligatorio.</p>
    </div>`;

  resultado.style.display = "block";
  document.getElementById("btn-resultado").style.display = "none";
}

// QUIZ MÓDULO 2
const quizDataEstafas = [
  {
    pregunta: "Recibes un mensaje de tu banco diciendo que tu cuenta será bloqueada en 2 horas. ¿Qué haces?",
    opciones: ["Hago clic en el enlace del mensaje inmediatamente", "Llamo directamente al número oficial de mi banco para verificar", "Le reenvío el mensaje a un familiar", "Respondo el mensaje con mis datos"],
    correcta: 1
  },
  {
    pregunta: "¿Cuál de estas es una señal de alerta de una posible estafa?",
    opciones: ["El mensaje viene de un contacto conocido", "El mensaje tiene buena ortografía", "El mensaje crea urgencia y pide datos personales", "El mensaje llega por correo oficial"],
    correcta: 2
  },
  {
    pregunta: "Te llaman diciendo que ganaste un viaje gratis pero debes pagar $50 para recibirlo. ¿Qué es esto?",
    opciones: ["Una oferta legítima", "Un error del sistema", "Una promoción real de una empresa", "Una estafa clásica de premio falso"],
    correcta: 3
  },
  {
    pregunta: "¿Qué nunca te pedirá tu banco por mensaje o llamada?",
    opciones: ["Tu nombre completo", "Tu contraseña o código de seguridad", "El saldo de tu cuenta", "Tu número de cliente"],
    correcta: 1
  },
  {
    pregunta: "Recibes un WhatsApp de un número desconocido diciendo ser tu hijo en apuros y pidiendo dinero urgente. ¿Qué haces?",
    opciones: ["Envías el dinero inmediatamente", "Llamas directamente a tu hijo al número que ya tienes guardado", "Respondes el mensaje pidiendo más información", "Le envías una foto de tu tarjeta"],
    correcta: 1
  },
  {
    pregunta: "¿Cuál es la mejor forma de verificar si un mensaje de una institución es real?",
    opciones: ["Hacer clic en el enlace del mensaje", "Responder el mensaje preguntando si es real", "Contactar directamente a la institución por sus canales oficiales", "Reenviar el mensaje a tus contactos"],
    correcta: 2
  },
];

function initQuizEstafas() {
  respuestasCorrectasEstafas = 0;
  preguntasRespondidasEstafas = 0;

  const container = document.getElementById("quiz-container-estafas");
  const btnResultado = document.getElementById("btn-resultado-estafas");
  const resultadoFinal = document.getElementById("resultado-final-estafas");

  btnResultado.style.display = "none";
  resultadoFinal.style.display = "none";
  resultadoFinal.innerHTML = "";

  let quizHTML = "";
  quizDataEstafas.forEach(function(item, indice) {
    quizHTML += `<div class="quiz-pregunta" id="pregunta-estafas-${indice}">`;
    quizHTML += `<p><strong>${indice + 1}. ${item.pregunta}</strong></p>`;
    item.opciones.forEach(function(opcion, opcionIndice) {
      quizHTML += `<button class="quiz-opcion" onclick="verificarRespuestaEstafas(${indice}, ${opcionIndice}, this)">${opcion}</button>`;
    });
    quizHTML += `<p id="feedback-estafas-${indice}" class="quiz-feedback"></p>`;
    quizHTML += `</div>`;
  });

  container.innerHTML = quizHTML;
}

function verificarRespuestaEstafas(preguntaIndice, opcionElegida, botonPresionado) {
  const correcta = quizDataEstafas[preguntaIndice].correcta;
  const feedback = document.getElementById(`feedback-estafas-${preguntaIndice}`);
  const botones = document.querySelectorAll(`#pregunta-estafas-${preguntaIndice} .quiz-opcion`);

  botones.forEach(function(btn) { btn.disabled = true; });

  if (opcionElegida === correcta) {
    botonPresionado.style.backgroundColor = "var(--green)";
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "var(--green)";
    respuestasCorrectasEstafas++;
  } else {
    botonPresionado.style.backgroundColor = "var(--red)";
    feedback.textContent = "❌ No es correcto. La respuesta correcta era: " + quizDataEstafas[preguntaIndice].opciones[correcta];
    feedback.style.color = "var(--red)";
    botones[correcta].style.backgroundColor = "var(--green)";
  }

  preguntasRespondidasEstafas++;
  if (preguntasRespondidasEstafas === quizDataEstafas.length) {
    document.getElementById("btn-resultado-estafas").style.display = "block";
  }
}

function mostrarPuntajeEstafas() {
  const total = quizDataEstafas.length;
  const resultado = document.getElementById("resultado-final-estafas");
  let mensaje = "";
  let color = "";

  if (respuestasCorrectasEstafas === total) {
    mensaje = "🏆 ¡Perfecto! Sabes reconocer una estafa.";
    color = "var(--green)";
  } else if (respuestasCorrectasEstafas >= total / 2) {
    mensaje = "👍 ¡Bien hecho! Vas por buen camino.";
    color = "var(--blue)";
  } else {
    mensaje = "📖 No te preocupes. Puedes releer la lección e intentarlo de nuevo.";
    color = "var(--orange)";
  }

  resultado.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 20px; margin-top: 15px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="color: ${color};">${mensaje}</h3>
      <p style="font-size: 1.3rem;">Obtuviste <strong>${respuestasCorrectasEstafas} de ${total}</strong> respuestas correctas.</p>
    </div>
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>🛡️ ¿Qué hacer si sospechas de una estafa?</h3>
      <ul style="line-height: 2;">
        <li>🚫 No respondas ni hagas clic en ningún enlace</li>
        <li>📞 Llama directamente a la institución por su número oficial</li>
        <li>👨‍👩‍👧 Consulta con un familiar de confianza antes de actuar</li>
        <li>🚔 Si fuiste víctima, repórtalo a las autoridades locales</li>
        <li>🔒 Cambia tus contraseñas si compartiste algún dato</li>
      </ul>
    </div>`;

  resultado.style.display = "block";
  document.getElementById("btn-resultado-estafas").style.display = "none";
}

//QUIZ MÓDULO 3
const quizDataDeepfakes = [
{
  pregunta: "Un familiar te envía por WhatsApp un video que asegura mostrar un hecho muy grave. El video parece real, pero no encuentras información en medios confiables. ¿Qué deberías hacer primero?",
  opciones: [ "Compartir el video para advertir a otras personas.", "Buscar si medios confiables o fuentes oficiales también informan sobre el hecho.", "Creer que es verdadero porque el video parece auténtico.", "Guardar el video como prueba sin verificarlo."
  ],
  correcta: 1
},

{
  pregunta: "¿Cuál de estas situaciones podría ser un ejemplo de un deepfake?",
  opciones: ["Una fotografía tomada con un celular.", "Un correo electrónico con publicidad.", "Una videollamada con mala conexión.", "Un video donde una persona parece decir algo que realmente nunca dijo."
  ],
  correcta: 3
},

{
  pregunta: "Un video muestra a un personaje público diciendo algo muy inesperado. ¿Qué aumenta la probabilidad de que sea auténtico?",
  opciones: ["Que varias fuentes confiables informen el mismo hecho.", "Que tenga miles de compartidos.", "Que alguien de tu familia lo haya enviado.", "Que el video tenga buena calidad."
  ],
  correcta: 0
},

{
  pregunta: "¿Cuál de estas características debería hacerte revisar una noticia con más cuidado?",
  opciones: ["Indica claramente su fuente y la fecha de publicación.", "Aparece en varios medios reconocidos.", "Promete una información impactante pero no menciona quién la publicó.", "Incluye declaraciones verificables."
  ],
  correcta: 2
},

{
  pregunta: "¿Por qué los deepfakes pueden ser difíciles de identificar?",
  opciones: ["Porque siempre tienen una marca de agua.", "Porque pueden verse y escucharse muy parecidos a un contenido real.", "Porque solo existen en películas.", "Porque únicamente afectan a personas famosas."
  ],
  correcta: 1
},

{
  pregunta: "¿Qué significa tener pensamiento crítico al consumir información en internet?",
  opciones: ["Creer únicamente lo que dicen las redes sociales.", "Aceptar cualquier información si tiene muchas reacciones.", "Analizar y verificar la información antes de creerla o compartirla.", "Desconfiar de toda la información que existe en internet."
  ],
  correcta: 2
},

];

let respuestasCorrectasDeepfakes = 0;
let preguntasRespondidasDeepfakes = 0;

function initQuizDeepfakes() {
  respuestasCorrectasDeepfakes = 0;
  preguntasRespondidasDeepfakes = 0;

  const container = document.getElementById("quiz-container-deepfakes");
  const btnResultado = document.getElementById("btn-resultado-deepfakes");
  const resultadoFinal = document.getElementById("resultado-final-deepfakes");

  btnResultado.style.display = "none";
  resultadoFinal.style.display = "none";
  resultadoFinal.innerHTML = "";

  let quizHTML = "";
  quizDataDeepfakes.forEach(function(item, indice) {
    quizHTML += `<div class="quiz-pregunta" id="pregunta-deepfakes-${indice}">`;
    quizHTML += `<p><strong>${indice + 1}. ${item.pregunta}</strong></p>`;
    item.opciones.forEach(function(opcion, opcionIndice) {
      quizHTML += `<button class="quiz-opcion" onclick="verificarRespuestaDeepfakes(${indice}, ${opcionIndice}, this)">${opcion}</button>`;
    });
    quizHTML += `<p id="feedback-deepfakes-${indice}" class="quiz-feedback"></p>`;
    quizHTML += `</div>`;
  });

  container.innerHTML = quizHTML;

}

  function verificarRespuestaDeepfakes(preguntaIndice, opcionElegida, botonPresionado) {
  const correcta = quizDataDeepfakes[preguntaIndice].correcta;
  const feedback = document.getElementById(`feedback-deepfakes-${preguntaIndice}`);
  const botones = document.querySelectorAll(`#pregunta-deepfakes-${preguntaIndice} .quiz-opcion`);
  const resultado = document.getElementById("resultado-final-deepfakes");

  botones.forEach(function(btn) { btn.disabled = true; });

  if (opcionElegida === correcta) {
    botonPresionado.style.backgroundColor = "var(--green)";
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "var(--green)";
    respuestasCorrectasDeepfakes++;
  } else {
    botonPresionado.style.backgroundColor = "var(--red)";
    feedback.textContent = "❌ No es correcto. La respuesta correcta era: " + quizDataDeepfakes[preguntaIndice].opciones[correcta];
    feedback.style.color = "var(--red)";
    botones[correcta].style.backgroundColor = "var(--green)";
  }

  preguntasRespondidasDeepfakes++;
  if (preguntasRespondidasDeepfakes === quizDataDeepfakes.length) {
    document.getElementById("btn-resultado-deepfakes").style.display = "block";
  }
} 

  function mostrarPuntajeDeepfakes() {

    const total = quizDataDeepfakes.length;
    const resultado = document.getElementById("resultado-final-deepfakes");

    let mensaje = "";
    let color = "";

    if (respuestasCorrectasDeepfakes === total) {
        mensaje = "🏆 ¡Excelente! Sabes identificar la desinformación.";
        color = "var(--green)";
    }
    else if (respuestasCorrectasDeepfakes >= total/2){
        mensaje = "👍 ¡Muy bien! Cada vez analizas mejor la información.";
        color = "var(--blue)";
    }
    else{
        mensaje = "📖 No pasa nada. Puedes volver a leer la lección e intentarlo otra vez.";
        color = "var(--orange)";
    }

  resultado.innerHTML = ` 
    <div style="background: white; border-radius: 12px; padding: 20px; margin-top: 15px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="color: ${color};">${mensaje}</h3>
      <p style="font-size: 1.3rem;">Obtuviste <strong>${respuestasCorrectasDeepfakes} de ${total}</strong> respuestas correctas.</p>
    </div>
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>📰 ¿Cómo protegerte de la desinformación?</h3>
      <p>No todo lo que vemos en internet es verdadero. Antes de creer o compartir una noticia, recuerda:</p>
      <ul style="line-height: 2;">
        <li>🔍 Verifica la información en fuentes confiables y reconocidas.</li>
        <li>📅 Revisa la fecha de publicación y el contexto de la noticia.</li>
        <li>🤖 Recuerda que imágenes, videos y audios pueden haber sido creados o modificados con inteligencia artificial.</li>
        <li>⚠️ Desconfía de contenidos que buscan generar miedo, urgencia o emociones muy fuertes.</li>
        <li>📤 Si tienes dudas, no compartas el contenido hasta comprobar que sea verdadero.</li>
      </ul>
      <p>La mejor forma de combatir la desinformación es detenerse unos minutos para verificar antes de compartir.</p>
    </div>`;
  
  resultado.style.display = "block";
  document.getElementById("btn-resultado-deepfakes").style.display = "none";

  }

  // QUIZ MÓDULO 4
const quizDataPrivacidad = [
{
  pregunta: "Vas a crear una cuenta en una página web. ¿Cuál de estas contraseñas es la más segura?",
  opciones: ["12345678", "MiNombre2026", "P4rqu3!Sol#92","contraseña" ],
  correcta: 2
},

{
  pregunta:"Recibes un correo que te pide confirmar tu contraseña mediante un enlace. ¿Qué deberías hacer?",
  opciones: ["Ignorar el mensaje para siempre.", "Entrar directamente al sitio web oficial y verificar si el aviso es real.", "Responder el correo con tu contraseña.",  "Hacer clic en el enlace inmediatamente."],
  correcta: 1
},

{
  pregunta:  "¿Cuál de estos datos es mejor evitar publicar en redes sociales?",
  opciones: ["Tu dirección de casa y número de teléfono.", "Una receta de cocina.","Una foto de un paisaje.", "La ciudad donde vives."],
  correcta: 0
},

{
  pregunta: "¿Para qué sirve la verificación en dos pasos?",
  opciones: ["Para hacer que internet sea más rápido.", "Para añadir una capa extra de seguridad al iniciar sesión.", "Para cambiar automáticamente la contraseña.", "Para guardar más fotos en el teléfono."],
  correcta: 1
},

{
  pregunta: "Una aplicación solicita permiso para acceder a tu ubicación, cámara y contactos. ¿Qué es lo más recomendable?",
  opciones: ["Aceptar todos los permisos sin leer.", "Desinstalar inmediatamente la aplicación.", "Apagar el teléfono.", "Revisar cuáles permisos realmente necesita antes de aceptarlos.",],
  correcta: 3
},

{
  pregunta: "¿Qué ayuda a mantener más seguros tu teléfono y tus aplicaciones?",
  opciones: ["No actualizar nunca el dispositivo.", "Instalar todas las aplicaciones que encuentres.", "Actualizar el sistema y las aplicaciones cuando haya nuevas versiones.",  "Compartir tu contraseña con un familiar."],
  correcta: 2
},
];

  function initQuizPrivacidad() {
    let respuestasCorrectasPrivacidad = 0;
    let preguntasRespondidasPrivacidad = 0;

    const container = document.getElementById("quiz-container-privacidad");
    const btnResultado = document.getElementById("btn-resultado-privacidad");
    const resultadoFinal = document.getElementById("resultado-final-privacidad");

    btnResultado.style.display = "none";
    resultadoFinal.style.display = "none";
    resultadoFinal.innerHTML = "";

     let quizHTML = "";
  quizDataPrivacidad.forEach(function(item, indice) {
    quizHTML += `<div class="quiz-pregunta" id="pregunta-privacidad-${indice}">`;
    quizHTML += `<p><strong>${indice + 1}. ${item.pregunta}</strong></p>`;
    item.opciones.forEach(function(opcion, opcionIndice) {
      quizHTML += `<button class="quiz-opcion" onclick="verificarRespuestaPrivacidad(${indice}, ${opcionIndice}, this)">${opcion}</button>`;
    });
    quizHTML += `<p id="feedback-privacidad-${indice}" class="quiz-feedback"></p>`;
    quizHTML += `</div>`;
  });
  container.innerHTML = quizHTML;
}

function verificarRespuestaPrivacidad(preguntaIndice, opcionElegida, botonPresionado) {

  const correcta = quizDataPrivacidad[preguntaIndice].correcta;
  const feedback = document.getElementById(`feedback-privacidad-${preguntaIndice}`);
  const botones = document.querySelectorAll(`#pregunta-privacidad-${preguntaIndice} .quiz-opcion`);
  const resultado = document.getElementById("resultado-final-privacidad");

  botones.forEach(function(btn) { btn.disabled = true; });

  if (opcionElegida === correcta) {
    botonPresionado.style.backgroundColor = "var(--green)";
    feedback.textContent = "✅ ¡Correcto!";
    feedback.style.color = "var(--green)";
    respuestasCorrectasPrivacidad++;
  } else {
    botonPresionado.style.backgroundColor = "var(--red)";
    feedback.textContent = "❌ No es correcto. La respuesta correcta era: " + quizDataPrivacidad[preguntaIndice].opciones[correcta];
    feedback.style.color = "var(--red)";
    botones[correcta].style.backgroundColor = "var(--green)";
  }

  preguntasRespondidasPrivacidad++;
  if (preguntasRespondidasPrivacidad === quizDataPrivacidad.length) {
    document.getElementById("btn-resultado-privacidad").style.display = "block";
  }
}

function mostrarPuntajePrivacidad() {
  
  const total = quizDataPrivacidad.length;
    const resultado = document.getElementById("resultado-final-privacidad");

    let mensaje = "";
    let color = "";

    if (respuestasCorrectasPrivacidad === total) {
        mensaje = "🏆 ¡Excelente! Sabes identificar la desinformación.";
        color = "var(--green)";
    }
    else if (respuestasCorrectasPrivacidad >= total/2){
        mensaje = "👍 ¡Muy bien! Cada vez analizas mejor la información.";
        color = "var(--blue)";
    }
    else{
        mensaje = "📖 No pasa nada. Puedes volver a leer la lección e intentarlo otra vez.";
        color = "var(--orange)";
    }

    resultado.innerHTML = ` 
    <div style="background: white; border-radius: 12px; padding: 20px; margin-top: 15px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="color: ${color};">${mensaje}</h3>
      <p style="font-size: 1.3rem;">Obtuviste <strong>${respuestasCorrectasPrivacidad} de ${total}</strong> respuestas correctas.</p>
    </div>
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>📰 ¿Cómo protegerte de la desinformación?</h3>
      <p>No todo lo que vemos en internet es verdadero. Antes de creer o compartir una noticia, recuerda:</p>
      <ul style="line-height: 2;">
        <li>🔍 Verifica la información en fuentes confiables y reconocidas.</li>
        <li>📅 Revisa la fecha de publicación y el contexto de la noticia.</li>
        <li>🤖 Recuerda que imágenes, videos y audios pueden haber sido creados o modificados con inteligencia artificial.</li>
        <li>⚠️ Desconfía de contenidos que buscan generar miedo, urgencia o emociones muy fuertes.</li>
        <li>📤 Si tienes dudas, no compartas el contenido hasta comprobar que sea verdadero.</li>
      </ul>
      <p>La mejor forma de combatir la desinformación es detenerse unos minutos para verificar antes de compartir.</p>
    </div>`;
  
  resultado.style.display = "block";
  document.getElementById("btn-resultado-deepfakes").style.display = "none";

}