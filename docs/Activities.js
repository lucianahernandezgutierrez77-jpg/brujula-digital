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
    return translations[idiomaActual][clave];
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
    contacto: "banco.seguridad@notificaciones-urgentes.com",
    mensaje: "Estimado cliente, su cuenta ha sido comprometida. Haga clic en el siguiente enlace para verificar su identidad o su cuenta será bloqueada en 24 horas: www.banco-seguro-verify.com",
    hora: "10:34 a.m.",
    esEstafa: true,
    opcionCorrecta: 1,
    opciones: ["Hago clic en el enlace para verificar mi cuenta.", "No hago clic. Llamo directamente al número oficial del banco.", "Respondo el correo con mis datos para desbloquear la cuenta."],
    explicacionCorrecta: "✅ ¡Correcto! Los bancos nunca te piden verificar datos por enlaces en correos. Siempre llama al número oficial.",
    explicacionError: "❌ Este es un correo de phishing. El remitente es desconocido y crea urgencia para que actúes sin pensar. Nunca hagas clic en esos enlaces."
  },
  {
    tipo: "whatsapp",
    app: "💬",
    contacto: "Carmen Rodríguez (vecina) ✅",
    mensaje: "Juanito, te mando la receta del arroz con leche que te gustó tanto. 🍚 Necesitas: 1 taza de arroz, 1 litro de leche, azúcar al gusto y canela. ¡Que te quede rico!",
    hora: "11:05 a.m.",
    esEstafa: false,
    opcionCorrecta: 0,
    opciones: ["Respondo normalmente, es un mensaje de mi vecina de confianza.", "No respondo, puede ser una estafa.", "Bloqueo el número por si acaso."],
    explicacionCorrecta: "✅ ¡Correcto! Este mensaje viene de un contacto conocido, no pide datos ni crea urgencia. No todo mensaje es una estafa.",
    explicacionError: "❌ Este es un mensaje legítimo. Viene de un contacto guardado y conocido, sin ninguna señal de alerta. Es importante no desconfiar de todo."
  },
  {
    tipo: "whatsapp",
    app: "💬",
    contacto: "+1 (305) 849-2201 (desconocido)",
    mensaje: "🎉 ¡FELICITACIONES! Ha sido seleccionado ganador de un viaje a Cancún por 5 días. Para reclamar su premio debe pagar $50 de gastos de envío. Responda YA, la oferta vence hoy.",
    hora: "12:18 p.m.",
    esEstafa: true,
    opcionCorrecta: 2,
    opciones: ["Pago los $50 para recibir el premio, parece real.", "Reenvío el mensaje a mis familiares para que también participen.", "Ignoro el mensaje y lo elimino. Nadie regala viajes así."],
    explicacionCorrecta: "✅ ¡Correcto! Los premios que piden un pago previo son una estafa clásica. Si no participaste en ningún sorteo, no puedes haber ganado.",
    explicacionError: "❌ Este es un mensaje de estafa. Viene de un número desconocido, crea urgencia y pide dinero por adelantado. Nadie regala viajes de esa forma."
  },
  {
    tipo: "whatsapp",
    app: "💬",
    contacto: "+57 312 0044 871 (desconocido)",
    mensaje: "Papá soy yo, perdí mi teléfono y este es un número prestado. Estoy en un apuro y necesito que me envíes $200 urgente por transferencia. Te explico después, por favor no llames.",
    hora: "2:45 p.m.",
    esEstafa: true,
    opcionCorrecta: 1,
    opciones: ["Envío el dinero inmediatamente, mi hijo/nieto me necesita.", "Antes de hacer algo, llamo a mi hijo/nieto al número que tengo guardado para verificar.", "Respondo el mensaje pidiendo más información."],
    explicacionCorrecta: "✅ ¡Correcto! Siempre verifica llamando directamente al número real de tu familiar. Esta es la estafa del 'familiar en apuros', muy común.",
    explicacionError: "❌ Esta es la estafa del 'familiar en apuros'. El mensaje pide dinero urgente y dice que no llames, precisamente para que no puedas verificar. Siempre llama primero."
  },
  {
    tipo: "whatsapp",
    app: "💬",
    contacto: "Dr. Martínez (médico) ✅",
    mensaje: "Buenos días Juan, le confirmo su cita para el próximo martes 29 a las 9:00 a.m. en el consultorio. Por favor llegue 10 minutos antes. Cualquier duda con gusto le atiendo.",
    hora: "3:10 p.m.",
    esEstafa: false,
    opcionCorrecta: 0,
    opciones: ["Respondo confirmando la cita, es mi médico de confianza.", "No respondo, puede ser una estafa para robar mis datos.", "Llamo al hospital para verificar si realmente es mi médico."],
    explicacionCorrecta: "✅ ¡Correcto! Este mensaje viene de un contacto guardado, no pide dinero ni datos personales, y el contenido es completamente normal.",
    explicacionError: "❌ Este es un mensaje legítimo de tu médico. Viene de un contacto conocido, solo confirma una cita y no tiene ninguna señal de alerta."
  },
  {
    tipo: "llamada",
    app: "📞",
    contacto: "Número desconocido: +1 (800) 000-9921",
    mensaje: '"Juan, le habla el técnico de Microsoft. Detectamos un virus grave en su computador. Necesitamos acceso remoto ahora mismo para solucionarlo antes de que pierda todos sus archivos."',
    hora: "4:52 p.m.",
    esEstafa: true,
    opcionCorrecta: 2,
    opciones: ["Doy acceso a mi computador, no quiero perder mis archivos.", "Les doy mi contraseña para que puedan revisar el problema.", "Cuelgo la llamada. Microsoft nunca llama así a sus usuarios."],
    explicacionCorrecta: "✅ ¡Correcto! Microsoft ni ninguna empresa tecnológica llama por teléfono para pedir acceso a tu computador. Es una estafa de soporte técnico falso.",
    explicacionError: "❌ Esta es una estafa de soporte técnico falso. Si das acceso a tu computador, pueden robar tu información o instalarte un virus real. Siempre cuelga este tipo de llamadas."
  }
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

  dialogo.textContent = "📩 ¡Tengo mensajes!";
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
  document.getElementById("telefono-contacto").textContent = item.contacto;
  document.getElementById("telefono-hora").textContent = item.hora;

  const burbuja = document.getElementById("burbuja-mensaje");
  burbuja.style.opacity = "0";
  burbuja.style.transform = "translateY(10px)";
  burbuja.textContent = item.mensaje;
  setTimeout(() => {
    burbuja.style.transition = "opacity 0.4s, transform 0.4s";
    burbuja.style.opacity = "1";
    burbuja.style.transform = "translateY(0)";
  }, 100);

  const contenedor = document.getElementById("estafas-pregunta-container");
  document.getElementById("estafas-feedback-container").style.display = "none";

  let html = `<div class="actividad-card">
    <p class="actividad-pregunta"><strong>¿Qué debería hacer Juan?</strong></p>`;
  item.opciones.forEach((op, i) => {
    html += `<button class="actividad-opcion" onclick="responderEstafa(${i}, this)">${op}</button>`;
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
    feedback.textContent = item.explicacionCorrecta;
    feedback.style.color = "var(--green)";
  } else {
    boton.style.backgroundColor = "var(--red)";
    boton.style.color = "white";
    boton.style.borderColor = "var(--red)";
    botones[item.opcionCorrecta].style.backgroundColor = "var(--green)";
    botones[item.opcionCorrecta].style.color = "white";
    botones[item.opcionCorrecta].style.borderColor = "var(--green)";
    feedback.textContent = item.explicacionError;
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