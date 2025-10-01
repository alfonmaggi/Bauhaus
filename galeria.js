// 1. Obtiene SÓLO las imágenes que NO son estáticas (las 12 interactivas)
const galleryItems = document.querySelectorAll('.gallery-item:not(.static-item) img');

// 2. Elementos del Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxInfoText = document.getElementById('lightbox-info-text');

// 3. Índice de la imagen actualmente visible (0 a 11)
let currentIndex = 0;

/**
 * Abre el lightbox y muestra la imagen seleccionada.
 * @param {number} index - El índice de la imagen a mostrar (0 a 11).
 */
function openLightbox(index) {
    // Solo se abre el lightbox si la imagen con ese índice existe en el array de interactivos
    if (galleryItems[index]) { 
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active'); // Muestra el lightbox con la animación CSS
        document.body.style.overflow = 'hidden'; // Evita el scroll del cuerpo
    }
}

/**
 * Cierra el lightbox.
 */
function closeLightbox() {
    lightbox.classList.remove('active'); // Oculta el lightbox con la animación CSS
    document.body.style.overflow = 'auto'; // Restaura el scroll
}

/**
 * Permite cerrar el lightbox si se hace clic fuera del contenido principal.
 * @param {Event} event - El evento click.
 */
function closeLightboxOutside(event) {
    // Si el clic es directamente sobre el fondo del lightbox
    if (event.target === lightbox) {
        closeLightbox();
    }
}

/**
 * Cambia la imagen actual en el lightbox (adelante o atrás).
 * @param {number} direction - 1 para siguiente, -1 para anterior.
 */
function changeImage(direction) {
    currentIndex += direction;

    // Lógica para que el índice dé la vuelta (loop)
    // galleryItems.length será igual a 12
    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    } else if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    updateLightboxContent();
}

/**
 * Actualiza la imagen y el texto de información dentro del lightbox.
 */
function updateLightboxContent() {
    const currentItem = galleryItems[currentIndex];
    
    // Actualiza el src de la imagen
    lightboxImg.src = currentItem.src;
    lightboxImg.alt = currentItem.alt;

    // Obtiene la información de los atributos data
    const obra = currentItem.getAttribute('data-obra');
    const anio = currentItem.getAttribute('data-anio');
    const artista = currentItem.getAttribute('data-artista');

    // Muestra la información debajo de la imagen
    lightboxInfoText.innerHTML = `<strong>Obra:</strong> ${obra} &bull; <strong>Año:</strong> ${anio} &bull; <strong>Artista:</strong> ${artista}`;
}

// Escucha el evento 'keydown' para cerrar con la tecla ESC
document.addEventListener('keydown', (e) => {
    // Si la tecla presionada es ESC 
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
    // Opcional: Navegación con flechas del teclado
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});