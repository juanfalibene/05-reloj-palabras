/* reloj-palabra x juanfalibene.com */
document.addEventListener("DOMContentLoaded", () => {
  const reloj = () => {
    const date = new Date();
    let h = date.getHours();
    let ampm = h >= 12 ? "PM" : "AM";
    let m = date.getMinutes();
    h = h % 12;
    h = h ? h : 12; // LA HORA 0 DEBE SER 12

    pintarHora(h, m, ampm);
    cambiarAmPm(h, ampm);
  };

  setInterval(reloj, 60000 - (new Date().getTime() % 60000));

  reloj();
});

const pintarHora = (h, m, ampm) => {
  // seleccionar ID hora actual
  const horaActual = document.getElementById(h);

  console.log("MINUTO ACTUAL: " + m);
  let mf = Math.floor(60 - m);
  console.log("MINUTOS FALTAN " + mf);
  let porcentaje = (60 - mf) * (100 / 60);
  console.log("PORCENTAJE: " + porcentaje);
  console.log(ampm);
  if (m === 59 && horaActual === h) {
    console.log("ULTIMO MINUTO Y NO COMPLETO");
    porcentaje === 100;
    const horaSiguiente = document.getElementById(h + 1);
    console.log("HORA SIGUIENTE: " + horaSiguiente);
    if (horaSiguiente.classList.contains("min")) {
      horaSiguiente.classList.remove("min");
    }
  }
  if (mf === 1) {
    console.log("falta un minuto");
    porcentaje === 100;
  }

  // actualizar estilos de degradado % por minuto
  let blancoA = "rgba(255, 255, 255, 0.2)";
  let negroA = "rgba(0, 0, 0, 0.2)";
  let coloresAMPM = ampm === "AM" ? [negroA, blancoA] : [blancoA, negroA];
  horaActual.style.background = `-webkit-linear-gradient(0deg, ${coloresAMPM[0]} ${porcentaje}%, ${coloresAMPM[1]} ${porcentaje}%)`;
  horaActual.style.webkitBackgroundClip = "text";
  horaActual.style.webkitTextFillColor = "transparent";
  horaActual.classList.add("min");
};

const cambiarAmPm = (h, ampm) => {
  const cambioAmPm = document.getElementById("am-pm");
  const hoy = document.getElementById("reloj");
  const esLa = document.getElementById("es");
  const momentosEmoji = ["🌅", "🌞", "🌇", "🌃", "🌚"];
  esLaText =
    h === 1 ? (esLa.textContent = "ES LA") : (esLa.textContent = "SON LAS");
  if (ampm === "PM") {
    // body
    document.body.classList.replace("am", "pm");
    // hoy
    hoy.classList.replace("am", "pm");
    // es
    esLa.classList.replace("am", "pm");
    // PM - emoji
    if (h >= 1 && h <= 6) {
      console.log("tarde");
      hoy.classList.remove("pm");
      document.body.classList.replace("mediodia", "tarde");
      emojiElegido = momentosEmoji[1];
    } else if (h >= 6 && h <= 7) {
      console.log("atardece");
      document.body.classList.replace("tarde", "atardece");
      emojiElegido = momentosEmoji[2];
    } else if (h >= 8 && h <= 11) {
      console.log("anochece");
      document.body.classList.replace("atardece", "anochece");
      emojiElegido = momentosEmoji[3];
    } else if (h === 11 && h <= 12) {
      console.log("noche");
      document.body.classList.replace("anochece", "noche");
      emojiElegido = momentosEmoji[4];
    }
    // PM
    cambioAmPm.classList.replace("am", "pm");
    cambioAmPm.innerHTML = `${ampm} <span id="emoji">${emojiElegido}</span>`;
  } else {
    // es - son
    esLa.classList.replace("am", "pm");
    // AM - emoji
    cambioAmPm.classList.replace("am", "pm");
    if (h >= 12 && h <= 6) {
      console.log("noche");
      emojiElegido = momentosEmoji[4];
    } else if (h >= 6 && h <= 7) {
      console.log("amanece");
      document.body.classList.replace("noche", "amanece");
      emojiElegido = momentosEmoji[0];
    } else if (h >= 8 && h <= 11) {
      console.log("mediodia");
      document.body.classList.replace("amanece", "mediodia");
      emojiElegido = momentosEmoji[1];
    }
    cambioAmPm.innerHTML = `${ampm} <span id="emoji">${emojiElegido}</span>`;
  }
};
