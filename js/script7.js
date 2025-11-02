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

    function resizeAllGridItems() {
      const gallery = document.getElementById('gallery');
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

    window.addEventListener('load', () => {
      const imgs = document.querySelectorAll('.gallery img');
      let loaded = 0;
      imgs.forEach(img => {
        if (img.complete) {
          loaded++;
          return;
        }
        img.addEventListener('load', resizeAllGridItems);
      });
      if (loaded === imgs.length) resizeAllGridItems();
    });

    window.addEventListener('resize', () => {
      clearTimeout(window._gridResizeTimeout);
      window._gridResizeTimeout = setTimeout(resizeAllGridItems, 120);
    });

    document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".va-item");
  let currentIndex = 0;

  // Mostrar la primera imagen al cargar
  items[currentIndex].classList.add("active");

  // Crear controles si no existen
  if (!document.querySelector(".gallery-controls")) {
    const controls = document.createElement("div");
    controls.classList.add("gallery-controls");

    const upBtn = document.createElement("button");
    upBtn.classList.add("arrow-btn");
    upBtn.innerHTML = "▲";

    const downBtn = document.createElement("button");
    downBtn.classList.add("arrow-btn");
    downBtn.innerHTML = "▼";

    controls.appendChild(upBtn);
    controls.appendChild(downBtn);

    const galeria = document.querySelector(".galeria-verde-aroma");
    galeria.insertBefore(controls, document.getElementById("va-gallery"));

    // Función para cambiar imagen
    const showImage = (index) => {
      items.forEach((item, i) => {
        item.classList.remove("active");
        item.style.zIndex = 1;
      });
      items[index].classList.add("active");
      items[index].style.zIndex = 2;
    };

    // Eventos de flechas
    upBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showImage(currentIndex);
    });

    downBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      showImage(currentIndex);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".va-item");
  let index = 0;

  // Inicializa la primera imagen visible
  items[index].classList.add("active");

  const upBtn = document.querySelector(".arrow-up");
  const downBtn = document.querySelector(".arrow-down");

  function showImage(newIndex) {
    items[index].classList.remove("active");
    index = (newIndex + items.length) % items.length;
    items[index].classList.add("active");
  }

  upBtn?.addEventListener("click", () => showImage(index - 1));
  downBtn?.addEventListener("click", () => showImage(index + 1));
});