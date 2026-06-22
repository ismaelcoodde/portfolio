const profilesCache = {};

async function getProfile(userId) {
    if (profilesCache[userId]) return profilesCache[userId];
    const { data } = await supabaseClient
        .from('profiles')
        .select('nombre, avatar_url')
        .eq('id', userId)
        .single();
    if (data) profilesCache[userId] = data;
    return data;
}

function avatarHTML(profile, email, size = 28) {
    if (profile?.avatar_url) {
        return `<img src="${profile.avatar_url}" 
                     style="width:${size}px; height:${size}px; border-radius:50%; object-fit:cover; flex-shrink:0;"/>`;
    }
    const inicial = (profile?.nombre || email || '?')[0].toUpperCase();
    return `<div style="width:${size}px; height:${size}px; border-radius:50%; background:rgba(99,102,241,0.6); 
                        display:flex; align-items:center; justify-content:center; 
                        color:white; font-size:${size * 0.4}px; font-weight:600; flex-shrink:0;">
                ${inicial}
            </div>`;
}

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

    // getSession en paralelo sin bloquear el router
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
        if (session) updateNavAuth(session);
    });

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

    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) submitBtn.addEventListener('click', handleSubmit);
});