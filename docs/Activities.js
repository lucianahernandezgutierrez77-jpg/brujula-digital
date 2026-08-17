
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

function t(clave) {

    if (!translations[clave]) {
        console.warn("Traducción no encontrada:", clave);
        return clave;
    }

    return translations[clave][idiomaActual] || translations[clave].es || clave;
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
  const botones = document.querySelectorAll("#actividad-pregunta-container .actividad-opcion");
  const juan = document.getElementById("juan");
  const dialogo = document.getElementById("juan-dialogo");

  botones.forEach(b => b.disabled = true);

  if (opcionElegida === item.correcta) {
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
  botones.forEach(b => b.disabled = true);

  const feedback = document.getElementById("feedback-estafa-actual");

  if (opcionElegida === item.opcionCorrecta) {
    boton.style.backgroundColor = "var(--green)";
    boton.style.color = "white";
    boton.style.borderColor = "var(--green)";
    feedback.textContent = t(item.explicacionCorrecta);
    feedback.style.color = "var(--green)";
  } else {
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