// NAVEGACION

function showSection(id) {
  document.querySelectorAll("main.container > section").forEach(function(sec) {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";

  if (id === "modulo-salud" && document.getElementById("quiz-container").children.length === 0) {
    initQuiz(quizData, "quiz-container", "btn-resultado", "resultado-final", "salud", contador, "quizData", "contador");
   }

  if (id === "modulo-estafas" && document.getElementById("quiz-container-estafas").children.length === 0) {
  initQuiz(
    quizDataEstafas,"quiz-container-estafas","btn-resultado-estafas","resultado-final-estafas", "estafas", contadorEstafas, "quizDataEstafas", "contadorEstafas");
  }

  if (id === "modulo-deepfakes" && document.getElementById("quiz-container-deepfakes").children.length === 0) {
    initQuiz(quizDataDeepfakes, "quiz-container-deepfakes", "btn-resultado-deepfakes", "resultado-final-deepfakes", "deepfakes", contadorDeepfakes, "quizDataDeepfakes", "contadorDeepfakes");
   }

  if (id === "modulo-privacidad" && document.getElementById("quiz-container-privacidad").children.length === 0) {
    initQuiz(quizDataPrivacidad, "quiz-container-privacidad", "btn-resultado-privacidad", "resultado-final-privacidad", "privacidad", contadorPrivacidad, "quizDataPrivacidad", "contadorPrivacidad");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goHome() {
  showSection("home");
}

let respuestasCorrectas = 0;
let preguntasRespondidas = 0;

let respuestasCorrectasEstafas = 0;
let preguntasRespondidasEstafas = 0;

let repuestasCorrectasDeepfakes = 0;
let preguntasRespondidasDeepfakes = 0;

let respuestasCorrectasPrivacidad = 0;
let preguntasRespondidasPrivacidad = 0;

let resultadoMostrado = {
  salud: false,
  estafas: false,
  deepfakes: false,
  privacidad: false
};

const contador = {
    get correctas() {
      return respuestasCorrectas;
    },
    set correctas(valor) {
      respuestasCorrectas = valor;
    },
    get respondidas() {
      return preguntasRespondidas;
    },
    set respondidas(valor) {
      preguntasRespondidas = valor;
    }
  };

  const contadorEstafas = {
  get correctas() {
    return respuestasCorrectasEstafas;
  },
  set correctas(valor) {
    respuestasCorrectasEstafas = valor;
  },

  get respondidas() {
    return preguntasRespondidasEstafas;
  },
  set respondidas(valor) {
    preguntasRespondidasEstafas = valor;
  }
};

const contadorDeepfakes = {
  get correctas() {
    return respuestasCorrectasDeepfakes
  },
  set correctas(valor) {
    respuestasCorrectasDeepfakes = valor;
  },
  get respondidas() {
    return preguntasRespondidasDeepfakes;
  },
  set respondidas(valor) {
    preguntasRespondidasDeepfakes = valor;
  }
};

const contadorPrivacidad = {
  get correctas() {
    return respuestasCorrectasPrivacidad
  },
  set correctas(valor) {
    respuestasCorrectasPrivacidad = valor;
  },
  get respondidas() {
    return preguntasRespondidasPrivacidad
  },
  set respondidas(valor) {
    preguntasRespondidasPrivacidad = valor;
  },
}


function initQuiz(
  quizData, containerId, btnResultadoId, resultadoFinalId, prefijo, contador, nombreQuizData, nombreContador
) {
  const container = document.getElementById(containerId);
  const btnResultado = document.getElementById(btnResultadoId);
  const resultadoFinal = document.getElementById(resultadoFinalId);

  btnResultado.style.display = "none";
  resultadoFinal.style.display = "none";
  resultadoFinal.innerHTML = "";

  let quizHTML = "";

  quizData.forEach(function(item, indice) {
    quizHTML += `<div class="quiz-pregunta" id="pregunta-${prefijo}-${indice}">`;
    
    quizHTML += `<p><strong class="txt-pregunta" data-key="${item.pregunta}">${indice + 1}. ${t(item.pregunta)}</strong></p>`;

    item.opciones.forEach(function(opcion, opcionIndice) {
      quizHTML += `<button class="quiz-opcion"
        data-key="${opcion}"
        onclick="verificarRespuesta(
          ${nombreQuizData},
          ${indice},
          ${opcionIndice},
          this,
          '${prefijo}',
          ${nombreContador},
          '${btnResultadoId}'
        )">
        ${t(opcion)}
      </button>`;
    });

    quizHTML += `<p id="feedback-${prefijo}-${indice}" class="quiz-feedback"></p>`;
    quizHTML += `</div>`;
  });

  container.innerHTML = quizHTML;
}

function verificarRespuesta(
  quizData, preguntaIndice, opcionElegida, botonPresionado, prefijo, contador, btnResultadoId
) {
  const correcta = quizData[preguntaIndice].correcta;

  const feedback = document.getElementById(
    `feedback-${prefijo}-${preguntaIndice}`
  );

  const botonesDeEsaPregunta = document.querySelectorAll(
    `#pregunta-${prefijo}-${preguntaIndice} .quiz-opcion`
  );

  botonesDeEsaPregunta.forEach(function(btn) {
    btn.disabled = true;
  });

  // CORRECTA
  if (opcionElegida === correcta) {

    botonPresionado.style.backgroundColor = "var(--green)";

    feedback.textContent = t("quizes.pregunta.correcta");
    feedback.style.color = "var(--green)";

    contador.correctas++;

  // INCORRECTA
  } else {

    botonPresionado.style.backgroundColor = "var(--red)";

    feedback.textContent =
      t("quizes.pregunta.incorrecta") +
      t(quizData[preguntaIndice].opciones[correcta]);

    feedback.style.color = "var(--red)";

    botonesDeEsaPregunta[correcta].style.backgroundColor = "var(--green)";
  }

  contador.respondidas++;

  if (contador.respondidas === quizData.length) {
  const btn = document.getElementById(btnResultadoId);
  if (btn) btn.style.display = "inline-block"; 
 }
}

function mostrarPuntaje(
  quizData, contador, resultadoFinalId, btnResultadoId, mensajePerfecto, mensajeBien, mensajeIntentar, contenidoFinal
) {

  const total = quizData.length;
  const resultado = document.getElementById(resultadoFinalId);

  let mensaje = "";
  let color = "";

  if (contador.correctas === total) {
    mensaje = mensajePerfecto;
    color = "var(--green)";
  } else if (contador.correctas >= total / 2) {
    mensaje = mensajeBien;
    color = "var(--blue)";
  } else {
    mensaje = mensajeIntentar;
    color = "var(--orange)";
  }

  resultado.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 20px; margin-top: 15px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="color: ${color};">${mensaje}</h3>

      <p style="font-size: 1.3rem;">
        ${t("quizes.puntaje")
          .replace("{respuestasCorrectas}", contador.correctas)
          .replace("{total}", total)}
      </p>
    </div>

    ${contenidoFinal}
  `;

  resultado.style.display = "block";
  document.getElementById(btnResultadoId).style.display = "none";
}

function mostrarPuntajeSalud() {
  mostrarPuntaje(
    quizData,
    contador,
    "resultado-final",
    "btn-resultado",

    t("modulo-salud.mensaje.perfecto"),
    t("modulo-salud.mensaje.bien"),
    t("modulo-salud.mensaje.intentar"),

    `
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>${t("modulo-salud.mensaje.cambio")}</h3>
      <p>${t("modulo-salud.mensaje.cambio2")}</p>

      <ul style="line-height: 2;">
        <li>${t("modulo-salud.mensaje.cambio3")}</li>
        <li>${t("modulo-salud.mensaje.cambio4")}</li>
        <li>${t("modulo-salud.mensaje.cambio5")}</li>
        <li>${t("modulo-salud.mensaje.cambio6")}</li>
        <li>${t("modulo-salud.mensaje.cambio7")}</li>
      </ul>

      <p>${t("modulo-salud.mensaje.cambio8")}</p>
    </div>
    `
  );
}

function mostrarPuntajeEstafas() {

  resultadoMostrado.estafas = true;
  mostrarPuntaje(
    quizDataEstafas,
    contadorEstafas,
    "resultado-final-estafas",
    "btn-resultado-estafas",

    t("modulo-estafas.mensaje.perfecto"),
    t("modulo-estafas.mensaje.bien"),
    t("modulo-estafas.mensaje.intentar"),

    `
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>${t("modulo-estafas.mensaje.cambio")}</h3>
      <p>${t("modulo-estafas.mensaje.cambio2")}</p>

      <ul style="line-height: 2;">
        <li>${t("modulo-estafas.mensaje.cambio3")}</li>
        <li>${t("modulo-estafas.mensaje.cambio4")}</li>
        <li>${t("modulo-estafas.mensaje.cambio5")}</li>
        <li>${t("modulo-estafas.mensaje.cambio6")}</li>
        <li>${t("modulo-estafas.mensaje.cambio7")}</li>
      </ul>

      <p>${t("modulo-estafas.mensaje.cambio8")}</p>
    </div>
    `
  );
}

// QUIZ MODULO 1
const quizData = [
  {
    pregunta: "quiz1.p1",
    opciones: ["quiz1.p1.a", "quiz1.p1.b", "quiz1.p1.c", "quiz1.p1.d"],
    correcta: 1
  },
  {
    pregunta: "quiz1.p2",
    opciones: ["quiz1.p2.a", "quiz1.p2.b", "quiz1.p2.c", "quiz1.p2.d"],
    correcta: 2
  },
  {
    pregunta: "quiz1.p3",
    opciones: ["quiz1.p3.a", "quiz1.p3.b", "quiz1.p3.c", "quiz1.p3.d"],
    correcta: 3
  },
  {
    pregunta: "quiz1.p4",
    opciones: ["quiz1.p4.a", "quiz1.p4.b", "quiz1.p4.c", "quiz1.p4.d"],
    correcta: 0
  },
  {
    pregunta: "quiz1.p5",
    opciones: ["quiz1.p5.a", "quiz1.p5.b", "quiz1.p5.c", "quiz1.p5.d"],
    correcta: 1
  },
  {
    pregunta: "quiz1.p6",
    opciones: ["quiz1.p6.a", "quiz1.p6.b", "quiz1.p6.c", "quiz1.p6.d"],
    correcta: 2
  }
]

// QUIZ MODULO 2
const quizDataEstafas = [
  {
    pregunta: "quiz2.p1",
    opciones: ["quiz2.p1.a", "quiz2.p1.b", "quiz2.p1.c", "quiz2.p1.d"],
    correcta: 1
  },
  {
    pregunta: "quiz2.p2",
    opciones: ["quiz2.p2.a", "quiz2.p2.b", "quiz2.p2.c", "quiz2.p2.d"],
    correcta: 2
  },
  {
    pregunta: "quiz2.p3",
    opciones: ["quiz2.p3.a", "quiz2.p3.b", "quiz2.p3.c", "quiz2.p3.d"],
    correcta: 3
  },
  {
    pregunta: "quiz2.p4",
    opciones: ["quiz2.p4.a", "quiz2.p4.b", "quiz2.p4.c", "quiz2.p4.d"],
    correcta: 1
  },
  {
    pregunta: "quiz2.p5",
    opciones: ["quiz2.p5.a", "quiz2.p5.b", "quiz2.p5.c", "quiz2.p5.d"],
    correcta: 1
  },
  {
    pregunta: "quiz2.p6",
    opciones: ["quiz2.p6.a", "quiz2.p6.b", "quiz2.p6.c", "quiz2.p6.d"],
    correcta: 2
  },
];

//QUIZ MODULO 3
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

  function verificarRespuestaDeepfakes(preguntaIndice, opcionElegida, botonPresionado) {
  const correcta = quizDataDeepfakes[preguntaIndice].correcta;
  const feedback = document.getElementById(`feedback-deepfakes-${preguntaIndice}`);
  const botones = document.querySelectorAll(`#pregunta-deepfakes-${preguntaIndice} .quiz-opcion`);

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

  // QUIZ MODULO 4
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

function verificarRespuestaPrivacidad(preguntaIndice, opcionElegida, botonPresionado) {

  const correcta = quizDataPrivacidad[preguntaIndice].correcta;
  const feedback = document.getElementById(`feedback-privacidad-${preguntaIndice}`);
  const botones = document.querySelectorAll(`#pregunta-privacidad-${preguntaIndice} .quiz-opcion`);

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
    mensaje = "🏆 ¡Excelente! Sabes proteger tu privacidad en internet.";
    color = "var(--green)";
  } else if (respuestasCorrectasPrivacidad >= total / 2) {
    mensaje = "👍 ¡Muy bien! Vas desarrollando buenos hábitos digitales.";
    color = "var(--blue)";
  } else {
    mensaje = "📖 No pasa nada. Puedes volver a leer la lección e intentarlo otra vez.";
    color = "var(--orange)";
  }

  resultado.innerHTML = `
    <div style="background: white; border-radius: 12px; padding: 20px; margin-top: 15px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <h3 style="color: ${color};">${mensaje}</h3>
      <p style="font-size: 1.3rem;">Obtuviste <strong>${respuestasCorrectasPrivacidad} de ${total}</strong> respuestas correctas.</p>
    </div>
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>🔒 ¿Cómo proteger tu información en internet?</h3>
      <p>Cuidar tu privacidad digital es un hábito que puedes desarrollar paso a paso. Recuerda:</p>
      <ul style="line-height: 2;">
        <li>🔑 Usa contraseñas seguras y diferentes para cada cuenta importante.</li>
        <li>📱 Activa la verificación en dos pasos siempre que sea posible.</li>
        <li>🚫 Nunca compartas datos personales con desconocidos o por mensajes.</li>
        <li>📶 Evita hacer trámites importantes desde redes Wi-Fi públicas.</li>
        <li>🔄 Mantén tus dispositivos y aplicaciones actualizados.</li>
        <li>🚪 Cierra sesión cuando uses un computador compartido.</li>
      </ul>
      <p>Con estos hábitos puedes navegar por internet con mucha más tranquilidad y seguridad.</p>
    </div>`;

  resultado.style.display = "block";
  document.getElementById("btn-resultado-privacidad").style.display = "none";
}