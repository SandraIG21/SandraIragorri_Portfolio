/* ===== MENÚ BURBUJA ===== */
const toggle = document.getElementById('menu-toggle');
const burbuja = document.getElementById('menu-burbuja');
const cursor = document.querySelector('.cursor-ball');

const colors = {
  azul: '#1B2A49',
  coral: '#FF6F61',
  blanco: '#FFFFFF'
};

let mouseX = 0;
let mouseY = 0;

// Mostrar/ocultar menú
if (toggle && burbuja) {
  toggle.addEventListener('click', () => {
    burbuja.classList.toggle('active');
  });
}

// ===== CURSOR PERSONALIZADO =====
function setCursorColorByElement(element) {
  if (!element || !cursor) return;

  if (element.closest('.LoQueBusco')) {
    cursor.style.backgroundColor = colors.coral;
    cursor.style.transform = "scale(1)";
    return;
  }
  if (element.closest('.galeria-verde-aroma')) {
    cursor.style.backgroundColor = colors.coral;
    cursor.style.transform = "scale(1)";
    return;
  }

  if (element.closest('#menu-burbuja')) {
    cursor.style.backgroundColor = colors.blanco;
    return;
  }

  if (element.closest('.boton-conoceme') || element.closest('.boton-misProyectos')) {
    cursor.style.backgroundColor = colors.coral;
    return;
  }

  if (element.closest('.SobreMi')) {
    cursor.style.backgroundColor = colors.azul;
    cursor.style.transform = "scale(1)";
    return;
  }

  if (element.closest('header')) {
    cursor.style.backgroundColor = colors.coral;
    cursor.style.transform = "scale(1)";
    return;
  }

  if (element.closest('.MisConocimientos')) {
    cursor.style.backgroundColor = colors.blanco;
    cursor.style.transform = "scale(1)";
    return;
  }

  cursor.style.backgroundColor = colors.azul;
  cursor.style.transform = "scale(1)";
}

function updateCursorColor(e) {
  setCursorColorByElement(e.target);
}

function updateCursorColorAtPosition() {
  const elem = document.elementFromPoint(mouseX, mouseY);
  if (!elem) return;
  setCursorColorByElement(elem);
}

if (cursor) {
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const footer = document.querySelector('footer');
    if (footer && footer.contains(document.elementFromPoint(mouseX, mouseY))) {
      cursor.style.display = 'none';
      document.body.style.cursor = 'default';
    } else {
      cursor.style.display = 'block';
      document.body.style.cursor = 'none';
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      updateCursorColor(e);
    }
  });

  window.addEventListener('wheel', () => {
    requestAnimationFrame(updateCursorColorAtPosition);
  });

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateCursorColorAtPosition);
  });
}


// ===== ANIMACIÓN DE ONDAS EN HEADER ===== //
const header = document.getElementById('header');
const canvas = document.getElementById('wave-canvas');

if (header && canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = header.clientWidth;
    canvas.height = header.clientHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Wave {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.alpha = 0.6;
    }
    update() {
      this.radius += 2;
      this.alpha -= 0.005;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }

  const waves = [];
  header.addEventListener('mousemove', (e) => {
    const rect = header.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    waves.push(new Wave(x, y));
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = waves.length - 1; i >= 0; i--) {
      let wave = waves[i];
      wave.update();
      wave.draw();
      if (wave.alpha <= 0) waves.splice(i, 1);
    }
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== ANIMACIÓN DE OLAS EN .MisConocimientos =====
// OJO: esta sección solo existe en index.html, por eso todo va dentro de un "if".
// Antes, si .MisConocimientos no existía, esto rompía TODO el script a partir
// de aquí (incluido el carrusel de la galería IA y el banner de cookies).
const conocimientosDiv = document.querySelector('.MisConocimientos');
if (conocimientosDiv) {
  const conocimientosCanvas = document.createElement('canvas');
  conocimientosCanvas.style.position = 'absolute';
  conocimientosCanvas.style.top = 0;
  conocimientosCanvas.style.left = 0;
  conocimientosCanvas.style.width = '100%';
  conocimientosCanvas.style.height = '100%';
  conocimientosCanvas.style.pointerEvents = 'none';
  conocimientosCanvas.style.zIndex = '-1';
  conocimientosDiv.style.position = 'relative';
  conocimientosDiv.appendChild(conocimientosCanvas);

  const ctxConocimientos = conocimientosCanvas.getContext('2d');

  function resizeConocimientosCanvas() {
    conocimientosCanvas.width = conocimientosDiv.clientWidth;
    conocimientosCanvas.height = conocimientosDiv.clientHeight;
  }
  resizeConocimientosCanvas();
  window.addEventListener('resize', resizeConocimientosCanvas);

  class SineWave {
    constructor({ ctx, width, height, amplitude, wavelength, speed, yOffset, gradientColors, lineWidth }) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
      this.amplitude = amplitude;
      this.wavelength = wavelength;
      this.speed = speed;
      this.yOffset = yOffset;
      this.gradientColors = gradientColors;
      this.lineWidth = lineWidth || 2;
      this.phase = 0;
    }
    update() {
      this.phase += this.speed;
    }
    draw() {
      const ctx = this.ctx;
      const gradient = ctx.createLinearGradient(this.width, 0, 0, 0);
      gradient.addColorStop(0, this.gradientColors[0]);
      gradient.addColorStop(1, this.gradientColors[1]);
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = gradient;
      for (let x = 0; x <= this.width; x++) {
        const y = this.yOffset + this.amplitude * Math.sin((x / this.wavelength) * 2 * Math.PI + this.phase);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  const conocimientosWaves = [
    new SineWave({
      ctx: ctxConocimientos,
      width: conocimientosCanvas.width,
      height: conocimientosCanvas.height,
      amplitude: 15,
      wavelength: 180,
      speed: 0.03,
      yOffset: conocimientosCanvas.height / 2,
      gradientColors: ['#1B2A49', 'rgba(255,111,97,0.3)'],
      lineWidth: 4
    }),
    new SineWave({
      ctx: ctxConocimientos,
      width: conocimientosCanvas.width,
      height: conocimientosCanvas.height,
      amplitude: 10,
      wavelength: 100,
      speed: 0.05,
      yOffset: conocimientosCanvas.height / 2 + 15,
      gradientColors: ['#1B2A49', 'rgba(255,111,97,0.3)'],
      lineWidth: 2
    })
  ];

  function animateConocimientos() {
    ctxConocimientos.clearRect(0, 0, conocimientosCanvas.width, conocimientosCanvas.height);
    conocimientosWaves.forEach(wave => {
      wave.update();
      wave.draw();
    });
    requestAnimationFrame(animateConocimientos);
  }
  animateConocimientos();
}

// ===== OCULTAR CURSOR DEL NAVEGADOR EN EL BOTÓN =====
const botonesMisProyectos = document.querySelectorAll('.boton-misProyectos');
botonesMisProyectos.forEach(boton => {
  boton.addEventListener('mouseenter', () => { document.body.style.cursor = 'none'; });
  boton.addEventListener('mouseleave', () => { document.body.style.cursor = ''; });
});


// ===== BANNER DE COOKIES =====
window.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  const rejectBtn = document.getElementById('reject-cookies');

  function enableCookiesFeatures() {
    console.log('Cookies aceptadas: funcionalidades habilitadas');
  }

  function disableCookiesFeatures() {
    console.log('Cookies rechazadas: funcionalidades deshabilitadas');
  }

  if (!banner) return;

  banner.style.display = 'flex';

  const decision = sessionStorage.getItem('cookies');
  if (decision === 'aceptadas') enableCookiesFeatures();
  if (decision === 'rechazadas') disableCookiesFeatures();

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      sessionStorage.setItem('cookies', 'aceptadas');
      enableCookiesFeatures();
      banner.style.display = 'none';
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      sessionStorage.setItem('cookies', 'rechazadas');
      disableCookiesFeatures();
      banner.style.display = 'none';
    });
  }
});

function cargarAnalytics() {
  console.log('Analytics cargado');
}

function resizeAllGridItems() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  const rowHeight = parseInt(getComputedStyle(gallery).getPropertyValue('grid-auto-rows'));
  const gap = parseInt(getComputedStyle(gallery).getPropertyValue('gap'));
  const items = gallery.querySelectorAll('.item');

  items.forEach(item => {
    const img = item.querySelector('img');
    if (!img.complete) {
      item.style.gridRowEnd = null;
      return;
    }
    const height = img.getBoundingClientRect().height;
    const span = Math.ceil((height + gap) / (rowHeight + gap));
    item.style.gridRowEnd = 'span ' + span;
  });
}

// ===== CARRUSEL GALERÍA IA (.va-item) =====
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".va-item");
  if (!items.length) return; // por si esta página no tiene galería

  let index = 0;
  items[index].classList.add("active");

  const galeria = document.querySelector(".galeria-verde-aroma");
  const gallery = document.getElementById("va-gallery");

  const controls = document.createElement("div");
  controls.classList.add("gallery-controls");

  const upBtn = document.createElement("button");
  upBtn.classList.add("arrow-btn");
  upBtn.innerHTML = "▲";
  upBtn.setAttribute("aria-label", "Imagen anterior");

  const downBtn = document.createElement("button");
  downBtn.classList.add("arrow-btn");
  downBtn.innerHTML = "▼";
  downBtn.setAttribute("aria-label", "Imagen siguiente");

  controls.append(upBtn, downBtn);
  galeria.insertBefore(controls, gallery);

  function showImage(newIndex) {
    items[index].classList.remove("active");
    index = (newIndex + items.length) % items.length;
    items[index].classList.add("active");
  }

  upBtn.addEventListener("click", () => showImage(index - 1));
  downBtn.addEventListener("click", () => showImage(index + 1));
});