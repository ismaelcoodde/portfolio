function ContactView() {
    return `
        <section class="min-h-screen flex items-center justify-center px-6 py-20">
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