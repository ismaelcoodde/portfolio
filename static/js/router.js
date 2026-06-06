// router.js
// Este es el corazón del SPA

// El mapa de rutas: qué función llamar según el # de la URL
const routes = {
    '#home':     HomeView,
    '#about':    AboutView,
    '#services': ServicesView,
    '#gallery':  GalleryView,
    '#contact':  ContactView,
};

function router() {
    // Lee lo que hay después del # en la URL
    // Si no hay nada, usamos #home por defecto
    const hash = window.location.hash || '#home';

    // Busca la vista que corresponde a esa ruta
    const view = routes[hash];

    // Mete el HTML de la vista dentro del <main id="app">
    const app = document.getElementById('app');
    if (view) {
        app.innerHTML = view();
    } else {
        app.innerHTML = '<p class="p-8 text-gray-400">Página no encontrada</p>';
    }
}

// Cada vez que el # cambia (sin recargar), ejecuta el router
window.addEventListener('hashchange', router);