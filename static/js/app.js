function initParallax() {
    const layers = document.querySelectorAll(".parallax-layer");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        layers.forEach((layer) => {
            const speed = parseFloat(layer.dataset.speed);
            layer.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, { passive: true });
}

window.addEventListener("load", function () {
    initParallax();

    const hasOAuthRedirect = window.location.hash.includes("access_token");

    if (!hasOAuthRedirect) {
        if (!window.location.hash) window.location.hash = "#home";
        router();
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
        updateNavAuth(session);

        if (event === "SIGNED_IN" && hasOAuthRedirect) {
            window.location.hash = "#home";
            router();
        }
    });

    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });

        mobileMenu.addEventListener("click", (e) => {
            if (e.target.tagName === "A" || e.target.closest("a")) {
                mobileMenu.classList.add("hidden");
            }
        });
    }
});