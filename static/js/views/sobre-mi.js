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

<!-- Lectura bíblica -->
<a href="#biblia" style="text-decoration:none;"
   class="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4
          hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300">
    <div style="width:48px; height:48px; border-radius:12px; background:rgba(99,102,241,0.15);
                display:flex; align-items:center; justify-content:center; flex-shrink:0;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.8">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
    </div>
    <div>
        <p class="text-white font-medium text-sm">Mi camino con Dios</p>
        <p class="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
    Lectura de la Biblia completa en 6 meses, 7 capitulos diarios.
</p>
    </div>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"
         style="margin-left:auto; flex-shrink:0;">
        <polyline points="9 18 15 12 9 6"/>
    </svg>
</a>
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