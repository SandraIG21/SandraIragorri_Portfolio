const cursor = document.querySelector('.cursor-ball');
const proyectos = document.querySelector('.padre-proyectos');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const calendario = document.querySelector('.proceso-creativo-calendario');
const sibarita = document.querySelector('.apartado2-sibarita');
const alisau = document.querySelector('.contenido-2-alisau');
const container = document.querySelector('.fotografia-fondo-alisau');
const museo = document.querySelector('.pictogramas-museo-galactico');

const colors = {
  coral: '#FF6F61',
  azul: '#1B2A49',
  blanco: '#ffffff',
};

let mouseX = 0;
let mouseY = 0;

// ⚡️ Transición suave del color del cursor
if (cursor) {
  cursor.style.transition = 'background-color 0.3s ease';
}

function updateCursorPosition() {
  if (!cursor) return;

  // Detectar elemento debajo del puntero
  const elem = document.elementFromPoint(mouseX, mouseY);

  // FOOTER
  if (footer && elem && footer.contains(elem)) {
    cursor.style.display = 'none';           
    document.body.style.cursor = 'default';    
    return;
  }

  // Si no estamos en footer, mostrar la bola
  cursor.style.display = 'block';
  document.body.style.cursor = 'none';

  // Obtener zonas
  const rectProyectos = proyectos?.getBoundingClientRect();
  const rectHeader = header?.getBoundingClientRect();

  const insideProyectos = rectProyectos &&
    mouseX >= rectProyectos.left &&
    mouseX <= rectProyectos.right &&
    mouseY >= rectProyectos.top &&
    mouseY <= rectProyectos.bottom;

  const insideHeader = rectHeader &&
    mouseX >= rectHeader.left &&
    mouseX <= rectHeader.right &&
    mouseY >= rectHeader.top &&
    mouseY <= rectHeader.bottom;

// Color según zona
if (elem && elem.closest('[class^="Proyecto-"]')) {
  cursor.style.backgroundColor = colors.coral; 
} else if (insideHeader) {
  cursor.style.backgroundColor = colors.coral; 
} else if (insideProyectos) {
  cursor.style.backgroundColor = colors.azul;
} else if (elem && elem.closest('.proceso-creativo-calendario')) {
  cursor.style.backgroundColor = colors.coral; 
} else if (elem && elem.closest('.apartado2-sibarita')) {
  cursor.style.backgroundColor = colors.coral; 
} else if (elem && elem.closest('.contenido-2-alisau')) {
  cursor.style.backgroundColor = colors.coral; 
} else if (elem && elem.closest('.fotografia-fondo-alisau')) {
  cursor.style.backgroundColor = colors.blanco; 
} else if (elem && elem.closest('.pictogramas-museo-galactico')) {
  cursor.style.backgroundColor = colors.coral; 
} else {
  cursor.style.backgroundColor = colors.azul; 
}

  // Posicionar cursor
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
}

// Seguir el mouse
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
    updateCursorPosition();
  }
});

// Actualizar al hacer scroll o rueda
window.addEventListener('scroll', () => requestAnimationFrame(updateCursorPosition));
window.addEventListener('wheel', () => requestAnimationFrame(updateCursorPosition));

// Inicializa
updateCursorPosition();

// ===== CONTROL DE COOKIES EN OTRAS PÁGINAS =====
window.addEventListener('DOMContentLoaded', () => {
  const decision = sessionStorage.getItem('cookies'); 

  if (decision === 'aceptadas') {
    console.log('Cookies aceptadas: activo funcionalidades');
  } else if (decision === 'rechazadas') {
    console.log('Cookies rechazadas: no activo funcionalidades');
  } else {
    console.log('Usuario no pasó por el index o no tomó decisión');
  }
});


function cargarAnalytics() {
  console.log('Analytics cargado');
}