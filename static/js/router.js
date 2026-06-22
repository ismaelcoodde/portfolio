// router.js
// Este es el corazón del SPA

// El mapa de rutas: qué función llamar según el # de la URL
const routes = {
    '#home':     HomeView,
    '#works':   WorksView,
    '#gallery': GalleryView,
    '#contact':  ContactView,
    '#auth':     AuthView,
    '#chat': ChatView,
    '#profile': ProfileView,
    '#ahora': AhoraView,
    '#sobre-mi':  SobreMiView,
    '#suscripcion': SuscripcionView,

};

// Cada vista puede tener una función que se ejecuta
// DESPUÉS de que su HTML esté en el DOM
const inits = {
    '#home':    initHome,
    '#gallery': initGallery,
    '#contact': initContact,
    '#auth':    initAuth,
    '#chat': initChat,
    '#profile': initProfile,
    '#ahora': initAhora,
    '#sobre-mi':  initSobreMi,
    '#suscripcion': initSuscripcion,
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
        // Si esta ruta tiene init, la ejecutamos ahora que el HTML ya existe
        if (inits[hash]) inits[hash]();
        initScrollAnimations();
    } else {
        app.innerHTML = '<p class="p-8 text-gray-400">Página no encontrada</p>';
    }
}

// Cada vez que el # cambia (sin recargar), ejecuta el router
window.addEventListener('hashchange', router);