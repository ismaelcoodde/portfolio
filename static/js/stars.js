// stars.js
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Ajusta el canvas al tamaño de la ventana
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Crea 200 estrellas con posición, tamaño y brillo aleatorios
const stars = Array.from({ length: 200 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.2,
    opacity: Math.random(),
    speed: (Math.random() - 0.5) * 0.008
}));

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        // Actualiza el brillo para crear el parpadeo
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0.1) star.speed *= -1;

        // Dibuja cada estrella como un círculo pequeño
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

draw();