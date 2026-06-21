function SobreMiView() {
    return /*html*/`
        <section class="flex flex-col items-center px-6 py-16">

            <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">
                Conóceme
            </p>
            <h1 class="text-4xl font-extrabold text-center mb-12">Sobre mí</h1>

            <div style="max-width:680px; width:100%;" class="flex flex-col gap-6">

                <!-- Perfil -->
                <div class="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4">
                    <div class="photo-ring" style="width:120px; height:120px;">
                        <div class="photo-ring-spinner"></div>
                        <img src="/images/yo2.jpg" alt="Ismael Cruz" />
                    </div>
                    <div class="text-center">
                        <p class="text-white font-medium">Ismael Cruz Fernandez</p>
                        <p class="text-slate-500 text-sm">Palma de Mallorca · 1994</p>
                    </div>
                    <p class="text-slate-400 text-sm leading-relaxed text-center max-w-md">
                        En construcción
                    </p>
                </div>

                <!-- Salud -->
                <div>
                    <p class="text-slate-500 text-xs font-medium tracking-[0.3em] uppercase mb-4 text-center">
                        ❤️ Salud · Apple Watch
                    </p>
                    <div id="health-widget">
                        <p class="text-slate-500 text-sm text-center">Cargando datos de salud...</p>
                    </div>
                </div>

            </div>

        </section>
    `;
}

async function initSobreMi() {
    await cargarHealthData();
}