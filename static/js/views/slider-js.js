function initHome() {
    initContact();
    initSlider();
}

function initSlider() {
    const slider = document.querySelector('.cards-slider');
    const dots   = document.querySelectorAll('.dot');
    const prev   = document.getElementById('slide-prev');
    const next   = document.getElementById('slide-next');

    if (!slider) return;

    let current = 0;
    const total = document.querySelectorAll('.card-ring').length;
    let timer;

    function goTo(index) {
        current = (index + total) % total;
        const card = slider.querySelector('.card-ring');
        slider.scrollTo({ left: current * card.offsetWidth, behavior: 'smooth' });
        dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    function startAutoplay() {
        timer = setInterval(() => goTo(current + 1), 4000);
    }

    function stopAutoplay() {
        clearInterval(timer);
    }

    if (prev) prev.addEventListener('click', () => { stopAutoplay(); goTo(current - 1); startAutoplay(); });
    if (next) next.addEventListener('click', () => { stopAutoplay(); goTo(current + 1); startAutoplay(); });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => { stopAutoplay(); goTo(i); startAutoplay(); });
    });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    slider.addEventListener('scroll', () => {
        const card = slider.querySelector('.card-ring');
        const index = Math.round(slider.scrollLeft / card.offsetWidth);
        if (index !== current) {
            current = index;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
        }
    });

    startAutoplay();
}