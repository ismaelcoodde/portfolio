// app.js
// El punto de arranque: se ejecuta cuando la página termina de cargar

window.addEventListener('load', function() {
    // Si entras a la web sin # en la URL, te manda a #home
    if (!window.location.hash) {
        window.location.hash = '#home';
    }
    // Arranca el router para mostrar la vista correcta
    router();
});