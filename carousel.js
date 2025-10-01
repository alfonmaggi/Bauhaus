document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    
    const totalItems = items.length; // 5 items
    let currentIndex = 0; // Índice de la tarjeta que está al frente (0 por defecto)

    // Configuración de las posiciones relativas
    const gap = 150; // Distancia horizontal entre el centro y las laterales (en px)
    const scaleFactor = 0.65; // Factor de escala para las tarjetas laterales (65% del tamaño central)
    const opacityFactor = 0.5; // Opacidad para las tarjetas laterales (50%)

    // 1. Reposiciona y estiliza todas las tarjetas (el corazón del efecto 2.5D)
    function positionAndStyleCards() {
        items.forEach((item, index) => {
            let transformValue;
            let scale = 1;
            let opacity = 1;
            let zIndex = 0;

            const relativeIndex = (index - currentIndex + totalItems) % totalItems;

            if (relativeIndex === 0) {
                // Tarjeta Central (al frente)
                transformValue = 'translateX(0) scale(1)';
                opacity = 1;
                zIndex = 10;
                item.style.pointerEvents = 'auto'; // Hacemos clickeable la tarjeta central
            } 
            // Lado Derecho (Tarjeta 1 a la derecha del centro)
            else if (relativeIndex === 1) {
                transformValue = `translateX(${gap}px) scale(${scaleFactor})`;
                opacity = opacityFactor;
                zIndex = 9;
                item.style.pointerEvents = 'none'; // No clickeable
            } 
            // Lado Izquierdo (Tarjeta 1 a la izquierda del centro)
            else if (relativeIndex === totalItems - 1) {
                transformValue = `translateX(-${gap}px) scale(${scaleFactor})`;
                opacity = opacityFactor;
                zIndex = 9;
                item.style.pointerEvents = 'none'; // No clickeable
            } 
            // Tarjetas muy lejanas (las escondemos fuera de la vista central)
            else {
                // Ponemos las tarjetas restantes fuera del campo de visión del carrusel
                transformValue = `translateX(${relativeIndex > 1 ? gap * 2 : -gap * 2}px) scale(0)`;
                opacity = 0;
                zIndex = 1;
                item.style.pointerEvents = 'none';
            }

            item.style.transform = transformValue;
            item.style.opacity = opacity;
            item.style.zIndex = zIndex;
            item.classList.toggle('active', relativeIndex === 0);
        });
    }

    // 2. Control de movimiento
    function moveCarousel(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalItems;
        } else {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        }
        // Llamamos a la función principal para redibujar todo
        positionAndStyleCards();
    }

    // Event Listeners
    nextButton.addEventListener('click', () => moveCarousel('next'));
    prevButton.addEventListener('click', () => moveCarousel('prev'));
    
    // Inicializa el carrusel
    positionAndStyleCards();
});