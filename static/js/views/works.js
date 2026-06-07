function WorksView() {
    return `
        <section class="min-h-screen px-6 py-20 max-w-5xl mx-auto">

            <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">
                Portfolio
            </p>
            <h2 class="text-4xl font-extrabold text-center mb-16">
                Trabajos recientes
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <!-- Proyecto 1 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors duration-300">

                    <!-- Preview en vivo -->
                    <div class="relative w-full overflow-hidden" style="height: 220px;">
                        <iframe
                            src="https://mallorca-mar-excursiones.vercel.app/"
                            style="position: absolute; top: 40px; left: calc(50% - 173px); width: 1280px; height: 900px; transform: scale(0.27); transform-origin: top left; pointer-events: none; border: none;"
                            scrolling="no"
                            loading="lazy">
                        </iframe>
                    </div>

                    <!-- Info del proyecto -->
                    <div class="p-5">
                        <h3 class="text-lg font-bold mb-2">Mallorca Mar Excursiones</h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            Web de reservas de excursiones en barco por Mallorca.
                            Diseño responsive con sistema de contacto integrado.
                        </p>

                        <div class="flex gap-2 flex-wrap mb-4">
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">React</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Tailwind</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Vercel</span>
                        </div>

                        <a href="https://mallorca-mar-excursiones.vercel.app/" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                            Ver proyecto en vivo
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </a>
                    </div>

                </div>

                                <!-- Proyecto 2 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors duration-300">

                    <!-- Preview en vivo -->
                    <div class="relative w-full overflow-hidden" style="height: 220px;">
                        <iframe
                            src="https://ismaelcruz.onrender.com/"
                            style="position: absolute; top: 40px; left: calc(50% - 173px); width: 1280px; height: 900px; transform: scale(0.27); transform-origin: top left; pointer-events: none; border: none;"
                            scrolling="no"
                            loading="lazy">
                        </iframe>
                    </div>

                    <!-- Info del proyecto -->
                    <div class="p-5">
                        <h3 class="text-lg font-bold mb-2">Ismael Cruz Fernandez - Full Stack</h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            Desarrollador Web
                        </p>

                        <div class="flex gap-2 flex-wrap mb-4">
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">React</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Tailwind</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Vercel</span>
                        </div>

                        <a href="https://ismaelcruz.onrender.com/" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                            Ver proyecto en vivo
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </a>
                    </div>

                </div>

                                                <!-- Proyecto 2 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors duration-300">

                    <!-- Preview en vivo -->
                    <div class="relative w-full overflow-hidden" style="height: 220px;">
                        <iframe
                            src="https://tonicruzmusic.com/"
                            style="position: absolute; top: 40px; left: calc(50% - 173px); width: 1280px; height: 900px; transform: scale(0.27); transform-origin: top left; pointer-events: none; border: none;"
                            scrolling="no"
                            loading="lazy">
                        </iframe>
                    </div>

                    <!-- Info del proyecto -->
                    <div class="p-5">
                        <h3 class="text-lg font-bold mb-2">Toni Cruz Music</h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            Web de contrataciones para musicos
                        </p>

                        <div class="flex gap-2 flex-wrap mb-4">
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">React</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Tailwind</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Vercel</span>
                        </div>

                        <a href="https://tonicruzmusic.com" target="_blank" rel="noopener noreferrer"
                           class="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                            Ver proyecto en vivo
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                            </svg>
                        </a>
                    </div>

                </div>

            </div>

        </section>
    `;
}