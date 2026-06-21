module.exports = {
    content: [
        './static/**/*.{html,js}',
    ],
    safelist: [
    'animate-marquee',
    'photo-ring-spinner--nuevo',
    'fade-up',
    'visible',
    'menu-abierto',
    'mb-10',
    'mb-16',
],
    theme: {
        extend: {
            keyframes: {
                marquee: {
                    '0%':   { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            }
        }
    },
    plugins: [],
}