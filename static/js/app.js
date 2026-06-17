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
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

window.addEventListener("load", function () {
    initParallax();
    initScrollAnimations();

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
        const estaAbierto = !mobileMenu.classList.contains("hidden");
        if (estaAbierto) {
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            setTimeout(() => mobileMenu.classList.add("hidden"), 300);
        } else {
            mobileMenu.classList.remove("hidden");
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            requestAnimationFrame(() => {
                mobileMenu.style.opacity = '1';
                mobileMenu.style.transform = 'translateY(0)';
            });
        }
    });

    mobileMenu.addEventListener("click", (e) => {
        if (e.target.tagName === "A" || e.target.closest("a")) {
            mobileMenu.style.opacity = '0';
            mobileMenu.style.transform = 'translateY(-10px)';
            setTimeout(() => mobileMenu.classList.add("hidden"), 300);
        }
    });
}
});