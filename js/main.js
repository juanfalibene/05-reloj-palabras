/* reloj-palabra x juanfalibene.com */
document.addEventListener("DOMContentLoaded", () => {
  const relojPantalla = document.getElementById("reloj");

  const reloj = () => {
    const date = new Date();
    let h = date.getHours();
    let ampm = h >= 12 ? "PM." : "AM.";
    let m = date.getMinutes().toString().padStart(2, "0");
    let s = date.getSeconds().toString().padStart(2, "0");
    h = h % 12;
    h = h ? h : 12; // LA HORA 0 DEBE SER 12
    let horaCompleta = `${h}:${m}:${s}`;

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
    let nombreDia = dias[date.getDay()];
    let numeroDia = date.getDate();
    let mes = meses[date.getMonth()];
    let anio = date.getFullYear();
    let fechaCompleta = `${nombreDia} ${numeroDia} de ${mes} ${anio}`;

    relojPantalla.textContent = "HOY ES " + fechaCompleta;

    cambiarEsLa(h);
    pintarHora(h, m);
    cambiarAmPm(ampm);
  };

  setInterval(reloj, 1000);

  reloj();
});

const cambiarEsLa = (h) => {
  const esLa = document.getElementById("es");
  if (h === 1) {
    esLa.textContent = "ES LA";
  } else {
    esLa.textContent = "SON LAS";
  }
};

const pintarHora = (h, m, ampm) => {
  console.log(h + m);
  let mf = Math.floor(60 - m);
  console.log(mf);
  let porcentaje = 60 - mf;
  console.log(porcentaje);
  let porcentaje100 = porcentaje * 1.6;
  console.log(porcentaje100);

  // seleccionar ID hora actual
  const horaActual = document.getElementById(h);
  // actualizar estilos de degradado % por minuto
  let color1 = ampm === "PM." ? "gray" : "white";
  let color2 = ampm === "AM." ? "white" : "gray";
  horaActual.style.background = `-webkit-linear-gradient(0deg, ${color1} ${porcentaje100}%, ${color2} ${porcentaje100}%)`;
  horaActual.style.webkitBackgroundClip = "text";
  horaActual.style.webkitTextFillColor = "transparent";
  horaActual.classList.add("min");
};

const cambiarAmPm = (ampm) => {
  const cambioAmPm = document.getElementById("am-pm");
  cambioAmPm.textContent = ampm;
  const hoy = document.getElementById("reloj");
  if (ampm === "PM.") {
    document.body.classList.remove("am");
    document.body.classList.add("pm");
    hoy.classList.remove("am");
    hoy.classList.add("pm");
  }
};
