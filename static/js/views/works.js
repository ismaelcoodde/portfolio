function WorksView() {
    return `

        <!-- PORTFOLIO -->
        <section class="px-6 py-16 max-w-5xl mx-auto">

            <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">
                Portfolio
            </p>
            <h2 class="text-4xl font-extrabold text-center mb-16">
                Trabajos recientes
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

                <!-- Proyecto 1 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors duration-300">
                    <div class="relative w-full overflow-hidden" style="height: 220px;">
                        <iframe
                            src="https://mallorca-mar-excursiones.vercel.app/"
                            style="position: absolute; top: 40px; left: calc(50% - 173px); width: 1280px; height: 900px; transform: scale(0.27); transform-origin: top left; pointer-events: none; border: none;"
                            scrolling="no"
                            loading="lazy">
                        </iframe>
                    </div>
                    <div class="p-5 text-center">
                        <h3 class="text-lg font-bold mb-2">Mallorca Mar Excursiones</h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            Web de reservas de excursiones en barco por Mallorca.
                            Diseño responsive con sistema de contacto integrado.
                        </p>
                        <div class="flex gap-2 justify-center flex-wrap mb-4">
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
                    <div class="relative w-full overflow-hidden" style="height: 220px;">
                        <iframe
                            src="https://ismaelcruz.onrender.com/"
                            style="position: absolute; top: 40px; left: calc(50% - 173px); width: 1280px; height: 900px; transform: scale(0.27); transform-origin: top left; pointer-events: none; border: none;"
                            scrolling="no"
                            loading="lazy">
                        </iframe>
                    </div>
                    <div class="p-5 text-center">
                        <h3 class="text-lg font-bold mb-2">Ismael Cruz Fernandez - Full Stack</h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            Desarrollador Web
                        </p>
                        <div class="flex gap-2 justify-center flex-wrap mb-4">
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">FastAPI</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Tailwind</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Supabase</span>
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

                <!-- Proyecto 3 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors duration-300">
                    <div class="relative w-full overflow-hidden" style="height: 220px;">
                        <iframe
                            src="https://peluqueria-rust.vercel.app/"
                            style="position: absolute; top: 40px; left: calc(50% - 173px); width: 1280px; height: 900px; transform: scale(0.27); transform-origin: top left; pointer-events: none; border: none;"
                            scrolling="no"
                            loading="lazy">
                        </iframe>
                    </div>
                    <div class="p-5 text-center">
                        <h3 class="text-lg font-bold mb-2">Peluquería</h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            Web de reservas y citas para peluquería.
                        </p>
                        <div class="flex gap-2 justify-center flex-wrap mb-4">
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">React</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Tailwind</span>
                            <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">Vercel</span>
                        </div>
                        <a href="https://peluqueria-rust.vercel.app/" target="_blank" rel="noopener noreferrer"
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

        <!-- SERVICIOS -->
        <section class="px-6 py-16 max-w-5xl mx-auto">

            <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">
                Servicios
            </p>
            <h2 class="text-4xl font-extrabold text-center mb-4">
                Lo que puedo hacer por ti
            </h2>
            <p class="text-slate-400 text-center max-w-xl mx-auto mb-16">
                Tu web lista en <span class="text-white font-semibold">1 semana</span>.
                Sin complicaciones, a medida y lista para captar clientes desde el primer día.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <!-- Tarjeta 1 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-white/8 transition-all duration-300">
                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2"/>
                            <path d="M3 9h18"/>
                            <path d="M9 21V9"/>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold mb-2">Web corporativa</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-4">
                        Presentación profesional de tu negocio. Diseño moderno, responsive y optimizado para que tus clientes te encuentren.
                    </p>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">
                        Lista en 5 días
                    </span>
                </div>

                <!-- Tarjeta 2 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-white/8 transition-all duration-300">
                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold mb-2">Tienda online</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-4">
                        Catálogo de productos con carrito de compra y pago seguro integrado con Stripe. Tus clientes compran sin salir de tu web.
                    </p>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">
                        Lista en 7 días
                    </span>
                </div>

                <!-- Tarjeta 3 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-white/8 transition-all duration-300">
                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold mb-2">Sistema de reservas</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-4">
                        Calendario de citas online con pago automático por Stripe. Ideal para clínicas, peluquerías, restaurantes y cualquier negocio de servicios.
                    </p>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">
                        Lista en 7 días
                    </span>
                </div>

                <!-- Tarjeta 4 -->
                <div class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-white/8 transition-all duration-300">
                    <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <h3 class="text-lg font-bold mb-2">Web con área de clientes</h3>
                    <p class="text-slate-400 text-sm leading-relaxed mb-4">
                        Registro e inicio de sesión para tus clientes. Acceso a contenido exclusivo, historial de pedidos o reservas. Tu negocio siempre conectado.
                    </p>
                    <span class="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-full border border-indigo-500/20">
                        Lista en 7 días
                    </span>
                </div>

            </div>
            <div class="max-w-4xl mt-20 mx-auto p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 font-sans transition-transform hover:shadow-xl">
  
  <div class="mb-8 text-center md:text-left md:flex md:items-center md:justify-between">
    <div>
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">Stack Tecnológico</h2>
      <p class="text-gray-500 dark:text-gray-400">Las herramientas y tecnologías con las que construyo aplicaciones web.</p>
    </div>
  </div>

  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    
    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="HTML5" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">HTML5</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="CSS3" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">CSS3</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="JavaScript" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">JavaScript</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="Tailwind CSS" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Tailwind CSS</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="React" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">React</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="Vue.js" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Vue.js</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="Vite" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Vite</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="Python" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">Python</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="FastAPI" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">FastAPI</span>
    </div>

    <div class="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group">
      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" class="w-12 h-12 mb-3 group-hover:scale-110 transition-transform duration-300" alt="PostgreSQL" />
      <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">PostgreSQL</span>
    </div>

  </div>
</div>

        </section>
    `;
}