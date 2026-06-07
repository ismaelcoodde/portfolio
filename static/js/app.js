window.addEventListener('load', function() {

    const hasOAuthRedirect = window.location.hash.includes('access_token');

    // Si NO viene de OAuth, carga la vista normal
    if (!hasOAuthRedirect) {
        if (!window.location.hash) window.location.hash = '#home';
        router();
    }

    // onAuthStateChange escucha TODOS los cambios de sesión
    // Se configura siempre, independientemente de si hay redirect OAuth o no
    supabaseClient.auth.onAuthStateChange((event, session) => {
        updateNavAuth(session);

        // Cuando Supabase termina de procesar el token de Google,
        // navega a home y carga la vista
        if (event === 'SIGNED_IN' && hasOAuthRedirect) {
            window.location.hash = '#home';
            router();
        }
    });
});