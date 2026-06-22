// router.js
// Este es el corazón del SPA

// El mapa de rutas: qué función llamar según el # de la URL
const routes = {
  "#home": HomeView,
  "#works": WorksView,
  "#gallery": GalleryView,
  "#contact": ContactView,
  "#auth": AuthView,
  "#chat": ChatView,
  "#profile": ProfileView,
  "#ahora": AhoraView,
  "#sobre-mi": SobreMiView,
  "#suscripcion": SuscripcionView,
};

// Cada vista puede tener una función que se ejecuta
// DESPUÉS de que su HTML esté en el DOM
const inits = {
  "#home": initHome,
  "#gallery": initGallery,
  "#contact": initContact,
  "#auth": initAuth,
  "#chat": initChat,
  "#profile": initProfile,
  "#ahora": initAhora,
  "#sobre-mi": initSobreMi,
  "#suscripcion": initSuscripcion,
};

function router() {
  const hash = window.location.hash || "#home";
  const view = routes[hash];
  const app = document.getElementById("app");
  if (view) {
    app.innerHTML = view();

    // Muestra el formulario de contacto fijo solo en #home
    const contactoFixed = document.getElementById("contacto-fixed");
    if (contactoFixed) {
      contactoFixed.style.display = hash === "#home" ? "" : "none";
    }

    if (inits[hash]) inits[hash]();
    initScrollAnimations();
  } else {
    app.innerHTML = '<p class="p-8 text-gray-400">Página no encontrada</p>';
  }
}

// Cada vez que el # cambia (sin recargar), ejecuta el router
window.addEventListener("hashchange", router);
