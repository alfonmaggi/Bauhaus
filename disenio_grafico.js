document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecciona todas las imágenes que tienen la clase 'artist-image'
    const artistImages = document.querySelectorAll('.artist-image');

    artistImages.forEach(img => {
        // 2. Almacena la ruta original y la ruta de hover
        const originalSrc = img.src;
        const hoverSrc = img.getAttribute('data-hover-img');

        // Si la ruta de hover no está definida, no hacemos nada con esta imagen.
        if (!hoverSrc) {
            console.error('La imagen no tiene un atributo data-hover-img definido:', img);
            return; 
        }

        // 3. EVENTO: Al pasar el mouse por encima
        img.addEventListener('mouseenter', () => {
            // Cambia el atributo src a la ruta de hover
            img.src = hoverSrc;
        });

        // 4. EVENTO: Al quitar el mouse
        img.addEventListener('mouseleave', () => {
            // Vuelve a cambiar el atributo src a la ruta original
            img.src = originalSrc;
        });
    });
});