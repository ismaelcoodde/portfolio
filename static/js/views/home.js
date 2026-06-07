// home.js
// Una vista es simplemente una función que devuelve HTML como texto

function HomeView() {
    return `
        <section class="min-h-screen flex flex-col items-center justify-center px-6 py-20">

            <img
                src="/images/yo2.png"
                alt="Ismael Cruz"
                class="w-[200px] h-[200px] rounded-full object-cover mb-6 ring-4 ring-indigo-500/30"
            />

            <h1 class="text-3xl font-bold text-white mb-2">
                Ismael Cruz
            </h1>

            <p class="text-indigo-400 text-sm tracking-widest uppercase mb-4">
                Desarrollador Web · Astrofotógrafo
            </p>

            <p class="text-slate-400 text-center max-w-md leading-relaxed">
                Aquí escribe tu descripción personal.
                Cuéntale al visitante quién eres en 2-3 frases.
            </p>
        </section>
    `;
}