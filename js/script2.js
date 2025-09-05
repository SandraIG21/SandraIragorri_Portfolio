// ===== CURSOR PERSONALIZADO SOBRE-MI.HTML =====
const cursor = document.querySelector('.cursor-ball');
const colors = {
  coral: '#FF6F61',
  azul: '#1B2A49',
  blanco: '#FFFFFF'
};

let mouseX = 0;
let mouseY = 0;

function updateCursorColor(element) {
  if (!element) return;
  
  // Prioridad: bloques específicos
  if (element.closest('.mi-forma-de-trabajar')) {
    cursor.style.backgroundColor = colors.blanco;
  } else if (element.closest('.sobre-mi-texto')) {
    cursor.style.backgroundColor = colors.azul;
  } else {
    cursor.style.backgroundColor = colors.coral;
  }

  cursor.style.transform = "scale(1)";
}

function updateCursorPosition() {
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
  const elem = document.elementFromPoint(mouseX, mouseY);
  updateCursorColor(elem);
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
window.addEventListener('wheel', () => {
  requestAnimationFrame(updateCursorPosition);
});
window.addEventListener('scroll', () => {
  requestAnimationFrame(updateCursorPosition);
});

// Seleccionamos todas las cajas
const cajas = document.querySelectorAll('.beneficios > div:not(.sobre-mi-h1)');

// Creamos un observer para animar al entrar en pantalla
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

// Observamos cada caja
cajas.forEach(caja => observer.observe(caja));

// Seleccionamos todas las cajas dentro de .mi-forma-de-trabajar
const puntos = document.querySelectorAll('.apartados-trabajar > div');

// Observer para animar al entrar en pantalla
const observerPuntos = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

// Observamos cada caja
puntos.forEach(punto => observerPuntos.observe(punto));

// Animar al cargar la página
window.addEventListener('load', () => {
  const formaTrabajar = document.querySelector('.mi-forma-de-trabajar');
  formaTrabajar.classList.add('visible');
});

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