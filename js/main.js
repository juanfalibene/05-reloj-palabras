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

const mostrarFecha = () => {
  const relojPantalla = document.getElementById("reloj");
  const fecha = new Date();
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviemnre",
    "Diciembre",
  ];
  let nombreDia = dias[fecha.getDay()];
  let numeroDia = fecha.getDate();
  let mes = meses[fecha.getMonth()];
  let anio = fecha.getFullYear();
  let fechaCompleta = `HOY ES ${nombreDia} ${numeroDia} de ${mes} de ${anio}`;

  relojPantalla.textContent = fechaCompleta;
};

mostrarFecha();

const pintarHora = (h, m, ampm) => {
  console.log("MINUTO ACTUAL: " + m);
  let mf = Math.floor(60 - m);
  console.log("MINUTOS FALTAN " + mf);
  let porcentaje = (60 - mf) * (100 / 60);
  console.log("PORCENTAJE: " + porcentaje);
  console.log(ampm);

  // seleccionar ID hora actual
  const horaActual = document.getElementById(h);
  // actualizar estilos de degradado % por minuto
  let blancoA = "rgba(255, 255, 255, 0.5)";
  let negroA = "rgba(0, 0, 0, 0.2)";
  let coloresAMPM = ampm === "AM" ? [negroA, blancoA] : [blancoA, negroA];
  console.log(coloresAMPM);
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
    document.body.classList.remove("am");
    document.body.classList.add("pm");
    // hoy
    hoy.classList.remove("am");
    hoy.classList.add("pm");
    // es
    esLa.classList.remove("am");
    esLa.classList.add("pm");
    // PM - emoji
    if (h >= 1 && h <= 6) {
      console.log("tarde");
      hoy.classList.remove("pm");
      document.body.classList.add("tarde");
      emojiElegido = momentosEmoji[1];
    } else if (h >= 6 && h <= 7) {
      console.log("atardece");
      document.body.classList.add("atardece");
      emojiElegido = momentosEmoji[2];
    } else if (h >= 8 && h <= 11) {
      console.log("anochece");
      document.body.classList.add("anochece");
      emojiElegido = momentosEmoji[3];
    } else if (h === 11 && h <= 12) {
      console.log("noche");
      document.body.classList.remove("anochece");
      document.body.classList.add("pm");
      emojiElegido = momentosEmoji[4];
    }
    // PM
    cambioAmPm.classList.remove("am");
    cambioAmPm.classList.add("pm");
    cambioAmPm.innerHTML = `${ampm} <span id="emoji">${emojiElegido}</span>`;
  } else {
    // es - son
    esLa.classList.remove("am");
    esLa.classList.add("pm");
    // AM - emoji
    cambioAmPm.classList.remove("am");
    cambioAmPm.classList.add("pm");
    if (h >= 12 && h <= 6) {
      console.log("noche");
      emojiElegido = momentosEmoji[4];
    } else if (h >= 6 && h <= 7) {
      console.log("amanece");
      emojiElegido = momentosEmoji[0];
    } else if (h >= 8 && h <= 11) {
      console.log("mediodia");
      emojiElegido = momentosEmoji[1];
    }
    cambioAmPm.innerHTML = `${ampm} <span id="emoji">${emojiElegido}</span>`;
  }
};
