
// ACTIVIDAD
let animacionPaisaje = null;
let animacionJuan = null;
let paso = false;
let x1 = 0;
let x2 = 900;
let paisajeMoviendo = false;
let velocidadPaisaje = 0;
let juanCaminando = false;
let erroresActividad = 0;

  function iniciarAnimaciones() {
  const paisaje1 = document.getElementById("paisaje1");
  const paisaje2 = document.getElementById("paisaje2");
  const leftArm = document.querySelector(".left-arm");
  const rightArm = document.querySelector(".right-arm");
  const leftLeg = document.querySelector(".left-leg");
  const rightLeg = document.querySelector(".right-leg");
  const head = document.querySelector(".head");

  if (!paisaje1 || !leftArm || !leftLeg || !head) return;

  if (animacionPaisaje) clearInterval(animacionPaisaje);
  if (animacionJuan) clearInterval(animacionJuan);

  animacionPaisaje = setInterval(() => {
    if (!paisajeMoviendo) return;
    x1 -= velocidadPaisaje;
    x2 -= velocidadPaisaje;
    if (x1 <= -900) x1 = x2 + 900;
    if (x2 <= -900) x2 = x1 + 900;
    paisaje1.style.left = x1 + "px";
    paisaje2.style.left = x2 + "px";
  }, 30);

  animacionJuan = setInterval(() => {
    if (!juanCaminando) return;
    if (paso) {
      leftArm.style.transform = "rotate(45deg)";
      rightArm.style.transform = "rotate(-25deg)";
      leftLeg.style.transform = "rotate(35deg)";
      rightLeg.style.transform = "rotate(-15deg)";
      head.style.top = "1px";
    } else {
      leftArm.style.transform = "rotate(25deg)";
      rightArm.style.transform = "rotate(-45deg)";
      leftLeg.style.transform = "rotate(15deg)";
      rightLeg.style.transform = "rotate(-35deg)";
      head.style.top = "0px";
    }
    paso = !paso;
  }, 180);
}

let actividadPreguntas = [
  {
    pregunta: "actividad1.p1",
    opciones: ["actividad1.p1.a", "actividad1.p1.b", "actividad1.p1.c", "actividad1.p1.d"],
    correcta: 0,
    explicacion: "actividad1.p1.exp"
  },
  {
    pregunta: "actividad1.p2",
    opciones: ["actividad1.p2.a", "actividad1.p2.b", "actividad1.p2.c", "actividad1.p2.d"],
    correcta: 1,
    explicacion: "actividad1.p2.exp"
  },
  {
    pregunta: "actividad1.p3",
    opciones: ["actividad1.p3.a", "actividad1.p3.b", "actividad1.p3.c", "actividad1.p3.d"],
    correcta: 1,
    explicacion: "actividad1.p3.exp"
  },
  {
    pregunta: "actividad1.p4",
    opciones: ["actividad1.p4.a", "actividad1.p4.b", "actividad1.p4.c", "actividad1.p4.d"],
    correcta: 1,
    explicacion: "actividad1.p4.exp"
  }
];

function mezclarArray(arr) {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

let actividadIndice = 0;

function iniciarActividad() {
  document.getElementById("btn-iniciar-actividad").style.display = "none";
  actividadIndice = 0;
  erroresActividad = 0;
  actividadPreguntas = mezclarArray(actividadPreguntas);

  x1 = 0;
  x2 = 900;

  const casa = document.getElementById("meta-casa");
  casa.style.opacity = "0";
  casa.style.right = "-80px";

  document.getElementById("actividad-mensaje-final").style.display = "none";

  iniciarAnimaciones();
  juanCaminando = true;
  paisajeMoviendo = true;
  velocidadPaisaje = 2;

  setTimeout(() => {
    juanCaminando = false;
    paisajeMoviendo = false;
    velocidadPaisaje = 0;
    mostrarPreguntaActividad();
  }, 2000);
}

function mostrarPreguntaActividad() {
  const contenedor = document.getElementById("actividad-pregunta-container");

  if (actividadIndice >= actividadPreguntas.length) {
    contenedor.innerHTML = "";
    const mitad = actividadPreguntas.length / 2;

    if (erroresActividad > mitad) {
      juanCaminando = false;
      paisajeMoviendo = false;
      velocidadPaisaje = 0;

      if (animacionJuan) {
        clearInterval(animacionJuan);
        animacionJuan = null;
      }

      if (animacionPaisaje) {
        clearInterval(animacionPaisaje);
        animacionPaisaje = null;
      }

      const juan = document.getElementById("juan");
      juan.classList.add("tirado");

      setTimeout(() => {
        document.getElementById("actividad-mensaje-fallo").style.display = "block";
      }, 800);

    } else {
      const casa = document.getElementById("meta-casa");
      const juan = document.getElementById("juan");

      casa.style.left = "auto";
      casa.style.right = "10px";
      casa.style.opacity = "1";

      juanCaminando = true;
      paisajeMoviendo = true;
      velocidadPaisaje = 2;

      let casaRight = 10;

      const moverCasa = setInterval(() => {
        casaRight += 2;
        casa.style.right = casaRight + "px";

        const casaLeft = casa.getBoundingClientRect().left;
        const juanLeft = juan.getBoundingClientRect().left;

        if (casaLeft <= juanLeft + 80) {
          clearInterval(moverCasa);

          juanCaminando = false;
          paisajeMoviendo = false;
          velocidadPaisaje = 0;

          if (animacionJuan) {
            clearInterval(animacionJuan);
            animacionJuan = null;
          }

          const dialogo = document.getElementById("juan-dialogo");
          dialogo.textContent = t("actividad1.llegue");
          dialogo.classList.add("victoria-dialogo");
          dialogo.classList.add("visible");

          juan.classList.add("victoria");

          setTimeout(() => {
            dialogo.classList.remove("visible");
            dialogo.classList.remove("victoria-dialogo");
            juan.classList.remove("victoria");

            document.getElementById("actividad-mensaje-final").style.display = "block";
          }, 1400);
        }
      }, 30);
    }

    return;
  }

  const item = actividadPreguntas[actividadIndice];

  let html = `
    <div class="actividad-card">
      <p class="actividad-pregunta">
        <strong>${t(item.pregunta)}</strong>
      </p>
  `;

  item.opciones.forEach((op, i) => {
    html += `
      <button class="actividad-opcion"
        onclick="responderActividad(${i}, this)">
        ${t(op)}
      </button>
    `;
  });

  html += `
      <p id="feedback-actividad" class="quiz-feedback"></p>
    </div>
  `;

  contenedor.innerHTML = html;
}

function responderActividad(opcionElegida, boton) {
  const item = actividadPreguntas[actividadIndice];
  const feedback = document.getElementById("feedback-actividad");
  const actividadCard = boton.closest(".actividad-card");
  const botones = document.querySelectorAll("#actividad-pregunta-container .actividad-opcion");
  const juan = document.getElementById("juan");
  const dialogo = document.getElementById("juan-dialogo");

  botones.forEach(b => b.disabled = true);

  if (opcionElegida === item.correcta) {
    if (actividadCard) {
    actividadCard.classList.remove("respuesta-incorrecta");
    actividadCard.classList.add("respuesta-correcta");
    }
    boton.style.backgroundColor = "var(--green)";
    boton.style.color = "white";
    boton.style.borderColor = "var(--green)";
    feedback.textContent = t("actividad1.correcto");
    feedback.style.color = "var(--green)";

    juanCaminando = true;
    paisajeMoviendo = true;
    velocidadPaisaje = 2;

    setTimeout(() => {
      juanCaminando = false;
      paisajeMoviendo = false;
      velocidadPaisaje = 0;
      actividadIndice++;
      mostrarPreguntaActividad();
    }, 3000);

  } else {
    if (actividadCard) {
    actividadCard.classList.remove("respuesta-correcta");
    actividadCard.classList.add("respuesta-incorrecta");
   }
  erroresActividad++;
  boton.style.backgroundColor = "var(--red)";
  boton.style.color = "white";
  boton.style.borderColor = "var(--red)";
  botones[item.correcta].style.backgroundColor = "var(--green)";
  botones[item.correcta].style.color = "white";
  botones[item.correcta].style.borderColor = "var(--green)";
  feedback.textContent = "❌ " + t(item.explicacion);
  feedback.style.color = "var(--red)";

    if (animacionJuan) clearInterval(animacionJuan);
    if (animacionPaisaje) clearInterval(animacionPaisaje);
    animacionJuan = null;
    animacionPaisaje = null;

    juan.classList.add("tirado");

    setTimeout(() => {
      juan.classList.remove("tirado");
      juan.classList.add("arrodillado");
      dialogo.classList.add("visible");

      setTimeout(() => {
        juan.classList.remove("arrodillado");
        dialogo.classList.remove("visible");

        setTimeout(() => {
          iniciarAnimaciones();
          actividadIndice++;
          mostrarPreguntaActividad();
        }, 700);

      }, 1000);

    }, 2500);
  }
}

function reiniciarActividad() {
  actividadIndice = 0;
  erroresActividad = 0;
  x1 = 0;
  x2 = 900;

  document.getElementById("actividad-mensaje-fallo").style.display = "none";
  document.getElementById("actividad-mensaje-final").style.display = "none";
  document.getElementById("btn-iniciar-actividad").style.display = "block";
  document.getElementById("actividad-pregunta-container").innerHTML = "";

  const juan = document.getElementById("juan");
  juan.classList.remove("tirado", "arrodillado", "victoria");

  const casa = document.getElementById("meta-casa");
  casa.style.opacity = "0";
  casa.style.right = "-80px";

  const paisaje1 = document.getElementById("paisaje1");
  const paisaje2 = document.getElementById("paisaje2");
  paisaje1.style.left = "0px";
  paisaje2.style.left = "900px";

  iniciarAnimaciones();
  juanCaminando = true;
  paisajeMoviendo = true;
  velocidadPaisaje = 2;

  setTimeout(() => {
    juanCaminando = false;
    paisajeMoviendo = false;
    velocidadPaisaje = 0;
    mostrarPreguntaActividad();
  }, 2000);
}

// ===== ACTIVIDAD MODULO 2 ===== //

const mensajesEstafas = [
  {
    tipo: "correo",
    app: "📧",
    contacto: "modulo-estafas.contacto1",
    mensaje: "modulo-estafas.mensaje1",
    hora: "10:34 a.m.",
    esEstafa: true,
    opcionCorrecta: 1,
    opciones: [ "modulo-estafas.mensaje1.a" , "modulo-estafas.mensaje1.b", "modulo-estafas.mensaje1.c"],
    explicacionCorrecta: "modulo-estafas.explicacion.correcta1",
    explicacionError: "modulo-estafas.explicacion.error",
  },
  {
    tipo: "whatsapp",
    app: "💬",
    contacto: "modulo-estafas.contacto2",
    mensaje: "modulo-estafas.mensaje2",
    hora: "11:05 a.m.",
    esEstafa: false,
    opcionCorrecta: 0,
    opciones: ["modulo-estafas.mensaje2.a", "modulo-estafas.mensaje2.b", "modulo-estafas.mensaje2.c"],
    explicacionCorrecta: "modulo-estafas.explicacion.correcta2",
    explicacionError: "modulo-estafas.explicacion.error2",
  },
  {
    tipo: "whatsapp",
    app: "💬",
    contacto: "modulo-estafas.contacto3",
    mensaje: "modulo-estafas.mensaje3",
    hora: "12:18 p.m.",
    esEstafa: true,
    opcionCorrecta: 2,
    opciones: ["modulo-estafas.mensaje3.a", "modulo-estafas.mensaje3.b", "modulo-estafas.mensaje3.c"],
    explicacionCorrecta: "modulo-estafas.explicacion.correcta3",
    explicacionError: "modulo-estafas.explicacion.error3",
  },
  {
    tipo: "whatsapp",
    app: "💬",
    contacto: "modulo-estafas.contacto4",
    mensaje: "modulo-estafas.mensaje4",
    hora: "2:45 p.m.",
    esEstafa: true,
    opcionCorrecta: 1,
    opciones: ["modulo-estafas.mensaje4.a", "modulo-estafas.mensaje4.b", "modulo-estafas.mensaje4.c"],
    explicacionCorrecta: "modulo-estafas.explicacion.correcta4",
    explicacionError: "modulo-estafas.explicacion.error4",
  },
  {
    tipo: "whatsapp",
    app: "💬",
    contacto: "modulo-estafas.contacto5",
    mensaje: "modulo-estafas.mensaje5",
    hora: "3:10 p.m.",
    esEstafa: false,
    opcionCorrecta: 0,
    opciones: ["modulo-estafas.mensaje5.a", "modulo-estafas.mensaje5.b", "modulo-estafas.mensaje5.c"],
    explicacionCorrecta: "modulo-estafas.explicacion.correcta5",
    explicacionError: "modulo-estafas.explicacion.error5",
  },
  {
    tipo: "llamada",
    app: "📞",
    contacto: "modulo-estafas.contacto6",
    mensaje: "modulo-estafas.mensaje6",
    hora: "4:52 p.m.",
    esEstafa: true,
    opcionCorrecta: 2,
    opciones: ["modulo-estafas.mensaje6.a", "modulo-estafas.mensaje6.b" , "modulo-estafas.mensaje6.c"],
    explicacionCorrecta: "modulo-estafas.explicacion.correcta6",
    explicacionError: "modulo-estafas.explicacion.error6",
  },
];

let mensajeEstafasIndice = 0;
let erroresEstafas = 0;
let mensajesMezclados = [];
let animacionJuanEstafas = null;
let pasoEstafas = false;
let juanCaminandoEstafas = false;

function iniciarActividadEstafas() {
  document.getElementById("btn-iniciar-estafas-container").style.display = "none";

  mensajeEstafasIndice = 0;
  erroresEstafas = 0;
  mensajesMezclados = mezclarArray([...mensajesEstafas]);

  const dialogo = document.getElementById("juan-dialogo-estafas");
  const telefono = document.getElementById("telefono-cuarto");
  const notificacion = document.getElementById("notificacion-ping");
  const juan = document.getElementById("juan-estafas");

  juan.style.transition = "none";
  juan.style.transform = "translateX(-50%)";
  void juan.offsetWidth; 
  juan.style.transition = "transform 2s linear";

  notificacion.classList.add("ping-animado");

  dialogo.textContent = t("modulo-estafas.actividad.dialogo");
  dialogo.classList.add("visible");

  iniciarAnimacionJuanEstafas();
  juanCaminandoEstafas = true;

  juan.style.transform = "translateX(185px)";

  setTimeout(() => {

    juanCaminandoEstafas = false;

    telefono.classList.add("zoom-telefono");

    setTimeout(() => {

      document.getElementById("escena-cuarto").style.display = "none";
      document.getElementById("escena-telefono").style.display = "block";

      mostrarMensajeEstafas();

    }, 700);

  }, 2000);
}

function mostrarMensajeEstafas() {
  if (mensajeEstafasIndice >= mensajesMezclados.length) {
    document.getElementById("escena-telefono").style.display = "none";
    const mitad = mensajesMezclados.length / 2;
    if (erroresEstafas > mitad) {
      document.getElementById("estafas-mensaje-fallo").style.display = "block";
    } else {
      document.getElementById("estafas-mensaje-final").style.display = "block";
    }
    return;
  }

  const item = mensajesMezclados[mensajeEstafasIndice];

  document.getElementById("telefono-icono-app").textContent = item.app;
  document.getElementById("telefono-contacto").textContent = t(item.contacto);
  document.getElementById("telefono-hora").textContent = item.hora;

  const burbuja = document.getElementById("burbuja-mensaje");
  burbuja.style.opacity = "0";
  burbuja.style.transform = "translateY(10px)";
  burbuja.innerHTML = t(item.mensaje);
  setTimeout(() => {
    burbuja.style.transition = "opacity 0.4s, transform 0.4s";
    burbuja.style.opacity = "1";
    burbuja.style.transform = "translateY(0)";
  }, 100);

  const contenedor = document.getElementById("estafas-pregunta-container");
  document.getElementById("estafas-feedback-container").style.display = "none";

  let html = `<div class="actividad-card">
    <p class="actividad-pregunta"><strong>${t("modulo-estafas.actividad.pregunta")}</strong></p>`;
  item.opciones.forEach((op, i) => {
    html += `<button class="actividad-opcion" onclick="responderEstafa(${i}, this)">${t(op)}</button>`;
  });
  html += `<p id="feedback-estafa-actual" class="quiz-feedback"></p></div>`;
  contenedor.innerHTML = html;
}

function iniciarAnimacionJuanEstafas() {

  const juan = document.getElementById("juan-estafas");

  const leftArm = juan.querySelector(".left-arm");
  const rightArm = juan.querySelector(".right-arm");
  const leftLeg = juan.querySelector(".left-leg");
  const rightLeg = juan.querySelector(".right-leg");
  const head = juan.querySelector(".head");

  if (animacionJuanEstafas) {
    clearInterval(animacionJuanEstafas);
  }

  animacionJuanEstafas = setInterval(() => {

    if (!juanCaminandoEstafas) return;

    if (pasoEstafas) {
      leftArm.style.transform = "rotate(45deg)";
      rightArm.style.transform = "rotate(-25deg)";
      leftLeg.style.transform = "rotate(35deg)";
      rightLeg.style.transform = "rotate(-15deg)";
      head.style.top = "1px";
    } else {
      leftArm.style.transform = "rotate(25deg)";
      rightArm.style.transform = "rotate(-45deg)";
      leftLeg.style.transform = "rotate(15deg)";
      rightLeg.style.transform = "rotate(-35deg)";
      head.style.top = "0px";
    }

    pasoEstafas = !pasoEstafas;

  },180);
}

function responderEstafa(opcionElegida, boton) {
  const item = mensajesMezclados[mensajeEstafasIndice];
  const botones = document.querySelectorAll("#estafas-pregunta-container .actividad-opcion");
  const actividadCard = boton.closest(".actividad-card");
  botones.forEach(b => b.disabled = true);

  const feedback = document.getElementById("feedback-estafa-actual");

  if (opcionElegida === item.opcionCorrecta) {
    if (actividadCard) {
    actividadCard.classList.remove("respuesta-incorrecta");
    actividadCard.classList.add("respuesta-correcta");
    }
    boton.style.backgroundColor = "var(--green)";
    boton.style.color = "white";
    boton.style.borderColor = "var(--green)";
    feedback.textContent = t(item.explicacionCorrecta);
    feedback.style.color = "var(--green)";
  } else {
    if (actividadCard) {
     actividadCard.classList.remove("respuesta-correcta");
     actividadCard.classList.add("respuesta-incorrecta");
    }
    boton.style.backgroundColor = "var(--red)";
    boton.style.color = "white";
    boton.style.borderColor = "var(--red)";
    botones[item.opcionCorrecta].style.backgroundColor = "var(--green)";
    botones[item.opcionCorrecta].style.color = "white";
    botones[item.opcionCorrecta].style.borderColor = "var(--green)";
    feedback.textContent = t(item.explicacionError);
    feedback.style.color = "var(--red)";
    erroresEstafas++;
  }

  setTimeout(() => {
    siguienteMensaje();
  }, 3000);
}

function siguienteMensaje() {
  mensajeEstafasIndice++;

  const burbuja = document.getElementById("burbuja-mensaje");
  burbuja.style.transition = "opacity 0.3s, transform 0.3s";
  burbuja.style.opacity = "0";
  burbuja.style.transform = "translateY(-10px)";

  setTimeout(() => {
    mostrarMensajeEstafas();
  }, 300);
}

function reiniciarActividadEstafas() {
  mensajeEstafasIndice = 0;
  erroresEstafas = 0;
  mensajesMezclados = mezclarArray([...mensajesEstafas]);
  document.getElementById("estafas-mensaje-fallo").style.display = "none";
  document.getElementById("estafas-mensaje-final").style.display = "none";

  const telefono = document.getElementById("telefono-cuarto");
  telefono.classList.remove("zoom-telefono");
  const notificacion = document.getElementById("notificacion-ping");
  notificacion.classList.remove("ping-animado");
  const dialogo = document.getElementById("juan-dialogo-estafas");
  dialogo.classList.remove("visible");
  dialogo.textContent = "¡Auch! 😣";

  const juan = document.getElementById("juan-estafas");
  juan.style.transition = "none";
  juan.style.transform = "translateX(-50%)";
  juanCaminandoEstafas = false;

if(animacionJuanEstafas){
    clearInterval(animacionJuanEstafas);
    animacionJuanEstafas = null;
}

  document.getElementById("btn-iniciar-estafas-container").style.display = "block";
  document.getElementById("escena-telefono").style.display = "none";
  document.getElementById("escena-cuarto").style.display = "block";
}

// ACTIVIDAD MODULO 3 

const casosDeepfakes = [
  {
    tipo: "seleccion",
    pregunta: "modulo-deepfakes.act.p1",
    imagen: { es: "imagenes/post1-es.jpeg", en: "imagenes/post1-en.jpeg"},
    opciones: ["modulo-deepfakes.act.p1.a", "modulo-deepfakes.act.p1.b", "modulo-deepfakes.act.p1.c", "modulo-deepfakes.act.p1.d"],
    correcta: 2,
    explicacioncorrecta: "modulo-deepfakes.act.p1.exp.correcta",
    explicacionerror: "modulo-deepfakes.act.p1.exp.error",
  },

  {
    tipo: "escritura",
    pregunta: "modulo-deepfakes.act.p2",
    imagen: { es: "imagenes/post2.jpeg", en: "imagenes/post2.jpeg", },
    palabraClave: "modulo-deepfakes.act.p2.palabraclave", // Palabra clave : "verificar", "verify"
    correcta: 2,
    explicacioncorrecta: "modulo-deepfakes.act.p2.exp.correcta",
    explicacionerror: "modulo-deepfakes.act.p2.exp.error"
  },
  
  {
    tipo: "seleccion",
    pregunta: "modulo-deepfakes.act.p3",
    imagen: { es: "imagenes/post3-es.png", en: "imagenes/post3-en.png"},
    opciones: ["modulo-deepfakes.act.p3.a", "modulo-deepfakes.act.p3.b", "modulo-deepfakes.act.p3.c", "modulo-deepfakes.act.p3.d"],
    correcta: 3,
    explicacioncorrecta: "modulo-deepfakes.act.p3.exp.correcta",
    explicacionerror: "modulo-deepfakes.act.p3.exp.error"
  },

  {
    tipo:"seleccion",
    pregunta: "modulo-deepfakes.act.p4",
    imagen: { es: "imagenes/post4-es.png", en: "imagenes/post4-en.jpeg", },
    opciones: ["modulo-deepfakes.act.p4.a", "modulo-deepfakes.act.p4.b", "modulo-deepfakes.act.p4.c", "modulo-deepfakes.act.p4.d"],
    correcta: 1,
    explicacioncorrecta: "modulo-deepfakes.act.p4.exp.correcta",
    explicacionerror: "modulo-deepfakes.act.p4.exp.error"
  },

  {
    tipo:"seleccion",
    pregunta: "modulo-deepfakes.act.p5",
    imagen: { es: "imagenes/post5.jpeg", en: "imagenes/post5.jpeg", },
    opciones: ["modulo-deepfakes.act.p5.a", "modulo-deepfakes.act.p5.b", "modulo-deepfakes.act.p5.c", "modulo-deepfakes.act.p5.d"],
    correcta: 0,
    explicacioncorrecta: "modulo-deepfakes.act.p5.exp.correcta",
    explicacionerror: "modulo-deepfakes.act.p5.exp.error"
  },

  {
    tipo:"escritura",
    pregunta: "modulo-deepfakes.act.p6",
    imagen: { es: "imagenes/post6.jpeg", en: "imagenes/post6.jpeg", },
    palabraClave: "modulo-deepfakes.act.p6.palabraclave", // palabra clave: deepfake
    correcta: 2,
    explicacioncorrecta: "modulo-deepfakes.act.p6.exp.correcta",
    explicacionerror: "modulo-deepfakes.act.p6.exp.error"
  }

];

let casoDeepfakesIndice = 0;
let erroresDeepfakes = 0;
let casosDeepfakesMezclados = [];
let respuestaComprobadaDeepfakes = false;

let animacionJuanDeepfakes = null;
let pasoDeepfakes = false;
let juanCaminandoDeepfakes = false;


function iniciarActividadDeepfakes() {
  document.getElementById("btn-iniciar-actividad").style.display = "none";
  document.getElementById("escena-deepfakes-1").style.display = "block";

  casoDeepfakesIndice = 0;
  erroresDeepfakes = 0;
  casosDeepfakesMezclados = mezclarArray([...casosDeepfakes]);

  const dialogo = document.getElementById("juan-dialogo-deepfakes");
  const juan = document.getElementById("juan-deepfakes");

  juan.style.transition = "none";
  juan.style.transform = "translateX(-50%)";

  void juan.offsetWidth;

  juan.style.transition = "transform 4s linear";

  dialogo.textContent = t("modulo-deepfakes.actividad.dialogo");
  dialogo.classList.add("visible");

  iniciarAnimacionJuanDeepfakes();

  juanCaminandoDeepfakes = true;
  juan.style.transform = "translateX(500px)";

  setTimeout(() => {
    juanCaminandoDeepfakes = false;

    document.getElementById("escena-deepfakes-1").style.display = "none";
    document.getElementById("escena-deepfakes-2").style.display = "block";

    mostrarCasoDeepfakes(casoDeepfakesIndice);
  }, 4000);
}

// JUAN
function iniciarAnimacionJuanDeepfakes() {
  const juan = document.getElementById("juan-deepfakes");

  const leftArm = juan.querySelector(".left-arm-deepfakes");
  const rightArm = juan.querySelector(".right-arm-deepfakes");
  const leftLeg = juan.querySelector(".left-leg-deepfakes");
  const rightLeg = juan.querySelector(".right-leg-deepfakes");
  const head = juan.querySelector(".head-deepfakes");

  if (animacionJuanDeepfakes) {
    clearInterval(animacionJuanDeepfakes);
  }

  animacionJuanDeepfakes = setInterval(() => {
    if (!juanCaminandoDeepfakes) return;

    if (pasoDeepfakes) {
      leftArm.style.transform = "rotate(45deg)";
      rightArm.style.transform = "rotate(-25deg)";
      leftLeg.style.transform = "rotate(35deg)";
      rightLeg.style.transform = "rotate(-15deg)";
      head.style.top = "1px";
    } else {
      leftArm.style.transform = "rotate(25deg)";
      rightArm.style.transform = "rotate(-45deg)";
      leftLeg.style.transform = "rotate(15deg)";
      rightLeg.style.transform = "rotate(-35deg)";
      head.style.top = "0px";
    }

    pasoDeepfakes = !pasoDeepfakes;
  }, 180);
}

function mostrarCasoDeepfakes(indice) {
  const caso = casosDeepfakesMezclados[indice];
  respuestaComprobadaDeepfakes = false;

  if (!caso) return;

  document.getElementById("navegador-deepfakes").scrollTo({
    top: 0,
    behavior: "instant",
  });

  const pestanas = document.querySelectorAll(".pestana-deepfakes");

  pestanas.forEach((pestana, i) => {
    pestana.classList.toggle("activa", i === indice);
  });

  document.getElementById("pregunta-deepfakes").textContent =
    t(caso.pregunta);

  const imagen = document.getElementById("imagen-caso-deepfakes");

  if (imagen) {
    if (caso.imagen && typeof caso.imagen === "object") {
      const rutaImagen = caso.imagen[idiomaActual];

      if (rutaImagen) {
        imagen.src = rutaImagen;
        imagen.alt = t("modulo-deepfakes.act.imagen.alt");
        imagen.hidden = false;
      } else {
        imagen.hidden = true;
        imagen.removeAttribute("src");
      }
    } else {
      imagen.hidden = true;
      imagen.removeAttribute("src");
    }
  }

  const contenedor = document.getElementById("opciones-deepfakes");
  contenedor.innerHTML = "";

  const respuesta = document.getElementById("respuesta-deepfakes");

  respuesta.style.display =
    caso.tipo === "escritura" ? "none" : "block";

  const resultado = document.getElementById("resultado-deepfakes");
  resultado.textContent = "";
  resultado.className = "";

  document.getElementById("numero-respuesta-deepfakes").textContent = "";

  if (caso.tipo === "seleccion") {
    caso.opciones.forEach((opcion, indiceOpcion) => {
      const boton = document.createElement("button");

      boton.textContent = `${indiceOpcion + 1}. ${t(opcion)}`;
      boton.className = "opcion-deepfakes";

      boton.addEventListener("click", () => {
        escribirNumeroDeepfakes(String(indiceOpcion + 1));
      });

      contenedor.appendChild(boton);
    });
  } else if (caso.tipo === "escritura") {
    const campo = document.createElement("input");

    campo.type = "text";
    campo.id = "respuesta-escrita-deepfakes";
    campo.placeholder = "Escribe tu respuesta...";
    campo.setAttribute("aria-label", "Respuesta escrita");

    contenedor.appendChild(campo);
    campo.focus();

    campo.addEventListener("blur", () => {
      campo.focus();
    });
  }
}

document
  .getElementById("siguiente-caso-deepfakes")
  .addEventListener("click", () => {
    if (!respuestaComprobadaDeepfakes) return;
    if (casoDeepfakesIndice < casosDeepfakesMezclados.length - 1) {
      casoDeepfakesIndice++;
      mostrarCasoDeepfakes(casoDeepfakesIndice);
    } else {
      const pregunta = document.getElementById("pregunta-deepfakes");
      const opciones = document.getElementById("opciones-deepfakes");
      const resultado = document.getElementById("resultado-deepfakes");
      const boton = document.getElementById("siguiente-caso-deepfakes");

      pregunta.textContent = t("modulo-deepfakes.act.completada");
      opciones.innerHTML = "";
      resultado.textContent = t("modulo-deepfakes.act.completada.detalle")
        .replace("{errores}", erroresDeepfakes)
        .replace("{total}", casosDeepfakesMezclados.length);
      resultado.className = "";
      boton.style.display = "none";
      document.getElementById("respuesta-deepfakes").style.display = "none";
    }
  });

  function escribirNumeroDeepfakes(numero) {
  const campo = document.getElementById("numero-respuesta-deepfakes");

  campo.textContent = numero;
  campo.focus();
  }


function comprobarRespuestaDeepfakes() {
  if (respuestaComprobadaDeepfakes) return;

  const caso = casosDeepfakesMezclados[casoDeepfakesIndice];
  const resultado = document.getElementById("resultado-deepfakes");

  if (!caso || !resultado) return;

  let esCorrecta = false;

  if (caso.tipo === "seleccion") {
    const numero = document
      .getElementById("numero-respuesta-deepfakes")
      .textContent.trim();

    if (!["1", "2", "3", "4"].includes(numero)) return;

    esCorrecta = Number(numero) - 1 === caso.correcta;
  } else if (caso.tipo === "escritura") {
    const campo = document.getElementById("respuesta-escrita-deepfakes");

    if (!campo || !campo.value.trim()) return;

    const respuesta = campo.value.trim().toLowerCase();
    const palabraClave = t(caso.palabraClave).toLowerCase();

    esCorrecta = respuesta.includes(palabraClave);
  } else {
    return;
  }

  respuestaComprobadaDeepfakes = true;

  const clave = esCorrecta
    ? caso.explicacioncorrecta
    : caso.explicacionerror;

    resultado.textContent = t(clave);
    resultado.className = esCorrecta ? "correcta" : "incorrecta";

  if (!esCorrecta) {
    erroresDeepfakes++;
  }

  document.getElementById("siguiente-caso-deepfakes").style.display =
    "block";

    document.getElementById("resultado-deepfakes").scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
}


// TECLADO
document.addEventListener("keydown", (evento) => {
  const escena = document.getElementById("escena-deepfakes-2");

  if (!escena || escena.style.display === "none") return;

  const caso = casosDeepfakesMezclados[casoDeepfakesIndice];

  if (!caso || respuestaComprobadaDeepfakes) return;

  if (caso.tipo === "escritura") {
    const campo = document.getElementById("respuesta-escrita-deepfakes");

    if (!campo) return;

    if (evento.key === "Enter") {
      evento.preventDefault();
      ocultarAvisoTeclaDeepfakes();
      comprobarRespuestaDeepfakes();
      return;
    }

    if (evento.target === campo) {
      const esLetra = /^[a-záéíóúüñ]$/i.test(evento.key);
      const esEspacio = evento.key === " ";
      const esEdicion = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End"
      ].includes(evento.key);

      if (esLetra || esEspacio || esEdicion) {
        ocultarAvisoTeclaDeepfakes();
      } else if (evento.key.length === 1) {
        evento.preventDefault();
        mostrarAvisoTeclaDeepfakes();
      }

      return;
    }

    mostrarAvisoTeclaDeepfakes();
    return;
  }

  if (["1", "2", "3", "4"].includes(evento.key)) {
    evento.preventDefault();
    ocultarAvisoTeclaDeepfakes();
    escribirNumeroDeepfakes(evento.key);
  } else if (evento.key === "Enter") {
    evento.preventDefault();
    ocultarAvisoTeclaDeepfakes();
    comprobarRespuestaDeepfakes();
  } else {
    mostrarAvisoTeclaDeepfakes();
  }
});

// TECLADO DIBUJADO
document.getElementById("teclado").addEventListener("click", (evento) => {
  const tecla = evento.target.closest("button");

  if (!tecla) return;

  const textoTecla = tecla.textContent.trim();
  const caso = casosDeepfakesMezclados[casoDeepfakesIndice];

  if (!caso) return;

  if (respuestaComprobadaDeepfakes) return;
  ocultarAvisoTeclaDeepfakes();

  if (caso.tipo === "escritura") {
  const campo = document.getElementById("respuesta-escrita-deepfakes");

  if (!campo) return;

  if (textoTecla === "Enter") {
    comprobarRespuestaDeepfakes();
  } else if (textoTecla === "←") {
    campo.value = campo.value.slice(0, -1);
  } else if (tecla.classList.contains("espacio")) {
    campo.value += " ";
  } else if (/^[A-Z]$/i.test(textoTecla)) {
    campo.value += textoTecla.toLowerCase();
  } else {
    mostrarAvisoTeclaDeepfakes();
  }

  return;
}
  if (["1", "2", "3", "4"].includes(textoTecla)) {
  escribirNumeroDeepfakes(textoTecla);
  } else if (textoTecla === "Enter") {
    comprobarRespuestaDeepfakes();
  } else {
    mostrarAvisoTeclaDeepfakes();
  }
});

let temporizadorAvisoDeepfakes;
let temporizadorScrollDeepfakes;

function mostrarAvisoTeclaDeepfakes() {
  const aviso = document.getElementById("aviso-tecla-deepfakes");
  const navegador = document.getElementById("navegador-deepfakes");

  if (!aviso || !navegador) return;

  aviso.textContent = t("modulo-deepfakes.act.aviso.tecla");

  clearTimeout(temporizadorAvisoDeepfakes);
  clearTimeout(temporizadorScrollDeepfakes);

  aviso.classList.remove("aviso-visible");
  aviso.style.display = "block";
  void aviso.offsetWidth;
  aviso.classList.add("aviso-visible");

  navegador.scrollTo({
    top: navegador.scrollHeight,
    behavior: "smooth"
  });

  temporizadorScrollDeepfakes = setTimeout(() => {
    navegador.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, 3000);

  temporizadorAvisoDeepfakes = setTimeout(() => {
    aviso.classList.remove("aviso-visible");
    aviso.style.display = "none";
  }, 3600);
}


function ocultarAvisoTeclaDeepfakes() {
  const aviso = document.getElementById("aviso-tecla-deepfakes");
  if (!aviso) return;

  clearTimeout(temporizadorAvisoDeepfakes);
  aviso.classList.remove("aviso-visible");
  aviso.style.display = "none";
}
