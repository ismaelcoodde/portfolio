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