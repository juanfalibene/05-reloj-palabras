/* reloj-palabra x juanfalibene.com */
document.addEventListener("DOMContentLoaded", () => {
  const reloj = () => {
    const date = new Date();
    let h = date.getHours();
    let ampm = h >= 12 ? "pm" : "am";
    let m = date.getMinutes();
    let s = date.getSeconds().toString().padStart(2, "0");
    h = h % 12;
    h = h ? h : 12; // LA HORA 0 DEBE SER 12

    pintarHora(h, m, ampm, s);
    cambiarAmPm(h, ampm);
  };

  setInterval(reloj, 1000);

  reloj();
});

const pintarHora = (h, m, ampm, s) => {
  // seleccionar ID hora actual
  const horasArr = [
    "doce",
    "una",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "once",
  ];
  idHora =
    h === 12
      ? (horaActual = document.getElementById(horasArr[0]))
      : (horaActual = document.getElementById(horasArr[h]));
  textHora =
    h === 12
      ? (horaActual.textContent = `${horasArr[0]}`)
      : (horaActual.textContent = `${horasArr[h]}`);
  // crear child .minutero
  const minuteroDIV = document.createElement("div");
  minuteroDIV.classList.add("minutero");
  minuteroDIV.setAttribute("id", `"m-${h}"`);
  horaActual.appendChild(minuteroDIV);

  // % degradado minutero blanco min transcurridos negro min faltan
  let mf = Math.floor(60 - m);
  let porcentaje = (60 - mf) * (100 / 60);

  // al minuto 0 remover elemeto minutero en hora anterior -- ULTIMAS PRUEBAS MIE 27
  let horaAnterior = horasArr.at(h - 1);
  const horaAnteriorLi = document.getElementById(horaAnterior);
  const horaAnteriorMinuteroDIV = document.getElementById(
    `"m-${horaAnterior}"`
  );
  if (m == 0 && horaAnteriorMinuteroDIV != null) {
    horaAnteriorLi.style = "";
    horaAnteriorLi.removeChild(horaAnteriorMinuteroDIV);
  }

  // actualizar estilos de degradado % por minuto
  let coloresArr = [
    "rgba(255, 255, 255, 0.4)",
    "rgba(0, 0, 0, 0.4)",
    "rgba(255, 255, 255, 0.6)",
    "rgba(0, 0, 0, 0.6)",
  ];
  let coloresAMPM =
    ampm === "AM"
      ? [coloresArr[0], coloresArr[1]]
      : [coloresArr[2], coloresArr[3]];
  // css
  horaActual.style.background = `-webkit-linear-gradient(0deg, ${coloresAMPM[1]} ${porcentaje}%, ${coloresAMPM[0]} ${porcentaje}%)`;
  horaActual.style.webkitBackgroundClip = "text";
  horaActual.style.webkitTextFillColor = "transparent";
  horaActual.classList.add("min");
  /* mover minutero segun % let minLeft = m + 1.6; -- SIN UTILIZAR */
  // actualizar minutero y segundero escrito
  let minPseudo = document.querySelector(".minutero");
  // Pproxima mejora: escribir minutos y segundos desde array
  let frase = `${m.toString().padStart(2, "0")} MINUTOS<br>${s} SEGUNDOS`;
  minPseudo.innerHTML = frase;
};

const cambiarClase = (elemento, clase, momentoAdd, momentoRemove) => {
  if (
    clase === "am" &&
    momentoAdd === undefined &&
    momentoRemove === undefined
  ) {
    elemento.classList.remove("pm");
    elemento.classList.add(clase);
  } else if (
    clase === "pm" &&
    momentoAdd === undefined &&
    momentoRemove === undefined
  ) {
    elemento.classList.remove("am");
    elemento.classList.add(clase);
  }
  // cambio clase momentos
  if (momentoAdd === undefined && momentoRemove === undefined) {
  } else {
    elemento.classList.remove(momentoRemove);
    elemento.classList.add(momentoAdd);
  }
};
const cambiarAmPm = (h, ampm) => {
  const bodyOBJ = document.body;
  const cambioAmPm = document.getElementById("am-pm");
  const esLa = document.getElementById("es");
  const momentoDia = [
    "noche",
    "amanece",
    "mediodia",
    "tarde",
    "atardece",
    "anochece",
  ];
  const momentosEmoji = ["🌅", "🌞", "🌇", "🌃", "🌚"];
  esLaText =
    h === 1 ? (esLa.textContent = "ES LA") : (esLa.textContent = "SON LAS");
  if (ampm === "pm") {
    cambiarClase(bodyOBJ, ampm);
    // es - son
    cambiarClase(esLa, ampm);
    // PM - emoji y momento
    if (h == 12 || (h >= 1 && h <= 6)) {
      cambiarClase(bodyOBJ, ampm, momentoDia[3], momentoDia[2]);
      emojiElegido = momentosEmoji[1];
    } else if (h >= 7 && h < 8) {
      cambiarClase(bodyOBJ, ampm, momentoDia[4], momentoDia[3]);
      emojiElegido = momentosEmoji[2];
    } else if (h >= 8 && h < 10) {
      cambiarClase(bodyOBJ, ampm, momentoDia[5], momentoDia[4]);
      emojiElegido = momentosEmoji[3];
    } else if (h >= 10 && h < 12) {
      cambiarClase(bodyOBJ, ampm, momentoDia[0], momentoDia[5]);
      emojiElegido = momentosEmoji[4];
    }
    // PM
    cambiarClase(cambioAmPm, ampm);
    cambioAmPm.innerHTML = `${ampm} <span id="emoji">${emojiElegido}</span>`;
  } else {
    // body
    cambiarClase(bodyOBJ, ampm);
    // es - son
    cambiarClase(esLa, ampm);
    // AM - emoji
    cambiarClase(cambioAmPm, ampm);
    if (h == 12 || (h >= 1 && h <= 6)) {
      cambiarClase(bodyOBJ, ampm, momentoDia[0], momentoDia[0]);
      emojiElegido = momentosEmoji[4];
    } else if (h >= 6 && h < 10) {
      cambiarClase(bodyOBJ, ampm, momentoDia[1], momentoDia[0]);
      emojiElegido = momentosEmoji[0];
    } else if (h >= 10 && h < 12) {
      cambiarClase(bodyOBJ, ampm, momentoDia[2], momentoDia[1]);
      emojiElegido = momentosEmoji[1];
    }
    cambioAmPm.innerHTML = `${ampm} <span id="emoji">${emojiElegido}</span>`;
  }
};
