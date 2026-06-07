// home.js
// Una vista es simplemente una función que devuelve HTML como texto

function HomeView() {
    return `
        <section class="flex flex-col items-center justify-center px-6 py-16">

            <img
                src="/images/yo2.jpg"
                alt="Ismael Cruz"
                class="w-[200px] h-[200px] rounded-full object-cover mb-6 ring-4 ring-indigo-500/30"
            />

            <h1 class="text-3xl font-bold text-white mb-2">
                Ismael Cruz Fernandez
            </h1>

            <p class="text-indigo-400 text-sm tracking-widest uppercase mb-4">
                Desarrollador Full-Stack
            </p>

            <p class="text-slate-400 text-center max-w-md leading-relaxed">
                Transformo negocios locales en negocios digitales. Tiendas online, reservas con pago, webs con registro de clientes. Todo a medida, profesional y listo para captar clientes.
            </p>


            <div class="flex gap-6 mt-8">

    <!-- Instagram -->
    <a href="https://www.instagram.com/ismaelcruzfernandez_/" target="_blank" rel="noopener noreferrer"
       class="text-slate-500 hover:text-pink-400 transition-colors duration-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
    </a>

    <!-- Facebook -->
    <a href="https://www.facebook.com/profile.php?id=100053090172826" target="_blank" rel="noopener noreferrer"
       class="text-slate-500 hover:text-blue-400 transition-colors duration-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
    </a>

    <!-- TikTok -->
    <a href="https://www.tiktok.com/@ismaelcruzfernandez" target="_blank" rel="noopener noreferrer"
       class="text-slate-500 hover:text-white transition-colors duration-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
    </a>

    <!-- GitHub -->
    <a href="https://github.com/ismaelcoodde" target="_blank" rel="noopener noreferrer"
       class="text-slate-500 hover:text-purple-400 transition-colors duration-300">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
    </a>

</div>
        </section>

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
                    <div class="p-5 text-center">
                        <h3 class="text-lg font-bold mb-2">Ismael Cruz Fernandez - Full Stack</h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            Desarrollador Web
                        </p>

                        <div class="flex gap-2 justify-center flex-wrap mb-4">
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
                    <div class="p-5 text-center">
                        <h3 class="text-lg font-bold mb-2">Toni Cruz Music</h3>
                        <p class="text-slate-400 text-sm mb-4 leading-relaxed">
                            Web de contrataciones para musicos
                        </p>

                        <div class="flex gap-2 flex-wrap mb-4 justify-center">
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



        <!-- CONTACTO -->

        <section class=" flex items-center justify-center px-6 py-16">
            <div class="w-full max-w-lg">

                <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">
                    Contacto
                </p>
                <h2 class="text-4xl font-extrabold text-center mb-2">Hablemos</h2>
                <p class="text-slate-500 text-center mb-10">
                    Cuéntame tu proyecto y te respondo en menos de 24h.
                </p>

                <form id="contact-form" class="flex flex-col gap-5">

                    <div class="flex flex-col gap-2">
                        <label class="text-sm text-slate-400">Nombre</label>
                        <input type="text" id="name" placeholder="Tu nombre"
                            class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                                   text-white placeholder-slate-600
                                   focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm text-slate-400">Email</label>
                        <input type="email" id="email" placeholder="tu@email.com"
                            class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                                   text-white placeholder-slate-600
                                   focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm text-slate-400">Mensaje</label>
                        <textarea id="message" rows="5" placeholder="Cuéntame en qué puedo ayudarte..."
                            class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                                   text-white placeholder-slate-600
                                   focus:outline-none focus:border-indigo-500
                                   transition-colors duration-300 resize-none"></textarea>
                    </div>

                    <!-- Mensaje de estado: cambia según el resultado del envío -->
                    <p id="status-msg" class="text-sm text-center hidden"></p>

                    <button type="button" id="submit-btn"
                        class="w-full py-3 bg-indigo-600 hover:bg-indigo-500
                               rounded-xl text-white font-medium transition-colors duration-300">
                        Enviar mensaje
                    </button>

                </form>
            </div>
        </section>
    `;
}

// Esta función se ejecuta después de que el HTML del formulario existe en el DOM
function initContact() {
    const btn = document.getElementById('submit-btn');
    btn.addEventListener('click', handleSubmit);
}

async function handleSubmit() {
    // Recoge los valores de los campos
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validación básica antes de enviar
    if (!name || !email || !message) {
        showStatus('Por favor rellena todos los campos.', 'error');
        return;
    }

    // Cambia el botón a estado "cargando"
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    try {
        // fetch() envía una petición HTTP al servidor
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        const data = await response.json();

        if (data.ok) {
            showStatus('¡Mensaje enviado! Te respondo pronto.', 'success');
            document.getElementById('name').value    = '';
            document.getElementById('email').value   = '';
            document.getElementById('message').value = '';
        } else {
            showStatus('Algo salió mal. Inténtalo de nuevo.', 'error');
        }

    } catch (error) {
        showStatus('Error de conexión. Inténtalo de nuevo.', 'error');
    } finally {
        // Esto se ejecuta SIEMPRE, haya error o no
        btn.textContent = 'Enviar mensaje';
        btn.disabled = false;
    }
}

function showStatus(message, type) {
    const el = document.getElementById('status-msg');
    el.textContent = message;
    el.className = type === 'success'
        ? 'text-green-400 text-sm text-center'
        : 'text-red-400 text-sm text-center';
}

function initHome() {
    initContact();
}