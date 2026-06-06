// home.js
// Una vista es simplemente una función que devuelve HTML como texto

function HomeView() {
    return `
        <section class="min-h-screen flex flex-col items-center justify-center text-center px-6 -mt-20">

            <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-6">
                Bienvenido a mi portfolio
            </p>

            <h1 class="text-6xl md:text-8xl font-extrabold mb-4 leading-tight
                        bg-gradient-to-r from-indigo-200 via-indigo-400 to-purple-400
                        bg-clip-text text-transparent">
                Ismael Cruz
            </h1>

            <p class="text-slate-400 text-lg md:text-xl mb-3 tracking-wide">
                Desarrollador Web · Astrofotógrafo
            </p>

            <p class="text-slate-600 max-w-md mb-10 leading-relaxed">
                Creo páginas web para pequeñas empresas
                y capturo el universo con mi cámara.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
                <a href="#services"
                   class="px-8 py-3 bg-indigo-600 hover:bg-indigo-500
                          rounded-full text-white text-sm font-medium
                          transition-colors duration-300">
                    Ver servicios
                </a>
                <a href="#gallery"
                   class="px-8 py-3 border border-indigo-500 hover:bg-indigo-500/10
                          rounded-full text-indigo-400 text-sm font-medium
                          transition-colors duration-300">
                    Ver galería
                </a>
            </div>

        </section>
    `;
}