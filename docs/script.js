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

let respuestasCorrectasDeepfakes = 0;
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

function mostrarPuntajeDeepfakes() {

  resultadoMostrado.deepfakes = true;
  mostrarPuntaje(
    quizDataDeepfakes,
    contadorDeepfakes,
    "resultado-final-deepfakes",
    "btn-resultado-deepfakes",

    t("modulo-deepfakes.mensaje.perfecto"),
    t("modulo-deepfakes.mensaje.bien"),
    t("modulo-deepfakes.mensaje.intentar"),

    `
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>${t("modulo-deepfakes.mensaje.cambio")}</h3>
      <p>${t("modulo-deepfakes.mensaje.cambio2")}</p>

      <ul style="line-height: 2;">
        <li>${t("modulo-deepfakes.mensaje.cambio3")}</li>
        <li>${t("modulo-deepfakes.mensaje.cambio4")}</li>
        <li>${t("modulo-deepfakes.mensaje.cambio5")}</li>
        <li>${t("modulo-deepfakes.mensaje.cambio6")}</li>
      </ul>
      
      <p>${t("modulo-deepfakes.mensaje.cambio7")}</p>
    </div>
    `
  );
}

function mostrarPuntajePrivacidad() {
  resultadoMostrado.privacidad = true;
  mostrarPuntaje(
    quizDataPrivacidad,
    contadorPrivacidad,
    "resultado-final-privacidad",
    "btn-resultado-privacidad",

    t("modulo-privacidad.mensaje.perfecto"),
    t("modulo-privacidad.mensaje.bien"),
    t("modulo-privacidad.mensaje.intentar"),

    `
    <div style="background: #F0FDF4; border-radius: 12px; padding: 20px; margin-top: 20px; border-left: 4px solid var(--green);">
      <h3>${t("modulo-privacidad.mensaje.cambio")}</h3>
      <p>${t("modulo-privacidad.mensaje.cambio2")}</p>

      <ul style="line-height: 2;">
        <li>${t("modulo-privacidad.mensaje.cambio3")}</li>
        <li>${t("modulo-privacidad.mensaje.cambio4")}</li>
        <li>${t("modulo-privacidad.mensaje.cambio5")}</li>
        <li>${t("modulo-privacidad.mensaje.cambio6")}</li>
        <li>${t("modulo-privacidad.mensaje.cambio7")}</li>
        <li>${t("modulo-privacidad.mensaje.cambio8")}</li>
      </ul>
      <p>${t("modulo-privacidad.mensaje.cambio9")}</p>
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
  pregunta: "quiz3.p1",
  opciones: [ "quiz3.p1.a", "quiz3.p1.b", "quiz3.p1.c", "quiz3.p1.d"],
  correcta: 1
},

{
  pregunta: "quiz3.p2",
  opciones: ["quiz3.p2.a", "quiz3.p2.b", "quiz3.p2.c", "quiz3.p2.d"],
  correcta: 3
},

{
  pregunta: "quiz3.p3",
  opciones: ["quiz3.p3.a", "quiz3.p3.b", "quiz3.p3.c", "quiz3.p3.d"],
  correcta: 0
},

{
  pregunta: "quiz3.p4",
  opciones: ["quiz3.p4.a", "quiz3.p4.b", "quiz3.p4.c", "quiz3.p4.d"
  ],
  correcta: 2
},

{
  pregunta: "quiz3.p5",
  opciones: ["quiz3.p5.a", "quiz3.p5.b", "quiz3.p5.c", "quiz3.p5.d"
  ],
  correcta: 1
},

{
  pregunta: "quiz3.p6",
  opciones: ["quiz3.p6.a", "quiz3.p6.b", "quiz3.p6.c", "quiz3.p6.d"
  ],
  correcta: 2
},
];

  // QUIZ MODULO 4
const quizDataPrivacidad = [
{
  pregunta: "quiz4.p1",
  opciones: ["12345678", "quiz4.p1.b", "P4rqu3!Sol#92","quiz4.p1.d" ],
  correcta: 2
},

{
  pregunta:"quiz4.p2",
  opciones: ["quiz4.p4.a", "quiz4.p2.b", "quiz4.p2.c",  "quiz4.p2.d"],
  correcta: 1
},

{
  pregunta:  "quiz4.p3",
  opciones: ["quiz4.p3.a", "quiz4.p3.b","quiz4.p3.c", "quiz3.p3.d"],
  correcta: 0
},

{
  pregunta: "quiz4.p4",
  opciones: ["quiz4.p4.a", "quiz4.p4.b", "quiz4.p4.c", "quiz4.p4.d"],
  correcta: 1
},

{
  pregunta: "quiz4.p5",
  opciones: ["quiz4.p5.a", "quiz4.p5.b", "quiz4.p5.c", "quiz4.p5.d",],
  correcta: 3
},

{
  pregunta: "quiz4.p6",
  opciones: ["quiz4.p6.a", "quiz4.p6.b", "quiz4.p6.c",  "quiz4.p6.d"],
  correcta: 2
},
];