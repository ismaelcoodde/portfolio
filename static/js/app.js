// app.js
// El punto de arranque: se ejecuta cuando la página termina de cargar

window.addEventListener('load', function() {
    // Si entras a la web sin # en la URL, te manda a #home
    if (!window.location.hash) {
        window.location.hash = '#home';
    }
    // Arranca el router para mostrar la vista correcta
    router();

        // Comprueba si ya hay una sesión activa al cargar la página
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateNavAuth(session);

    // Escucha cualquier cambio de sesión (login, logout, expiración)
    // y actualiza el navbar automáticamente
    supabaseClient.auth.onAuthStateChange((event, session) => {
        updateNavAuth(session);
    });
});