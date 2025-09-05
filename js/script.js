/ ===== MENÚ BURBUJA ===== /
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
toggle.addEventListener('click', () => {
  burbuja.classList.toggle('active');
});

// ===== CURSOR PERSONALIZADO =====
function setCursorColorByElement(element) {
  if (!element) return;

  if (element.closest('.LoQueBusco')) {
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



// ===== ANIMACIÓN DE ONDAS EN HEADER ===== //
const header = document.getElementById('header');
const canvas = document.getElementById('wave-canvas');
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

// ===== ANIMACIÓN DE OLAS EN .MisConocimientos =====
const conocimientosDiv = document.querySelector('.MisConocimientos');
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
  constructor({ctx, width, height, amplitude, wavelength, speed, yOffset, gradientColors, lineWidth}) {
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
    // Aquí puedes cargar scripts externos, analítica, etc.
  }

  function disableCookiesFeatures() {
    console.log('Cookies rechazadas: funcionalidades deshabilitadas');
    // Evitar cargar scripts de terceros
  }

  if (!banner) return;

  // Mostrar siempre el banner en index
  banner.style.display = 'flex';

  // Aplicar decisión previa si existe
  const decision = sessionStorage.getItem('cookies');
  if (decision === 'aceptadas') enableCookiesFeatures();
  if (decision === 'rechazadas') disableCookiesFeatures();

  // Cuando el usuario acepta
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      sessionStorage.setItem('cookies', 'aceptadas'); // Guardar decisión
      enableCookiesFeatures();
      banner.style.display = 'none';
    });
  }

  // Cuando el usuario rechaza
  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      sessionStorage.setItem('cookies', 'rechazadas'); // Guardar decisión
      disableCookiesFeatures();
      banner.style.display = 'none';
    });
  }
});