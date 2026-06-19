function SuscripcionView() {
    return `
        <section class="flex flex-col items-center justify-center px-6 py-16 min-h-screen">
            <div class="w-full max-w-md">
                <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">Apóyame</p>
                <h2 class="text-4xl font-extrabold text-center mb-2">Suscríbete</h2>
                <p class="text-slate-500 text-center mb-10">Más barato que un café, pero da mucha más energía</p>

                <div class="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <p class="text-2xl font-bold text-white">1€ <span class="text-slate-500 text-sm font-normal">/ mes</span></p>
                            <p class="text-slate-400 text-sm">Suscripción mensual</p>
                        </div>
                        <div class="text-4xl">✨</div>
                    </div>
                    <ul class="flex flex-col gap-3 mb-6">
                        <li class="flex items-center gap-2 text-slate-300 text-sm">
                            <span class="text-green-400">✓</span> Apoyas este proyecto personal
                        </li>
                        <li class="flex items-center gap-2 text-slate-300 text-sm">
                            <span class="text-green-400">✓</span> Mantienes vivo este rincón de internet
                        </li>
                        <li class="flex items-center gap-2 text-slate-300 text-sm">
                            <span class="text-green-400">✓</span> Cancela cuando quieras
                        </li>
                    </ul>
                </div>

                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="text-sm text-slate-400">Email</label>
                        <input type="email" id="sub-email" placeholder="tu@email.com"
                            class="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label class="text-sm text-slate-400">Número de tarjeta</label>
                       <div id="card-element" class="bg-white/5 border border-white/10 rounded-xl px-4 py-3" style="min-height:44px; cursor:text;"></div>
                    </div>
                    <p id="sub-error" class="text-red-400 text-sm hidden"></p>
                    <p id="sub-success" class="text-green-400 text-sm hidden"></p>
                    <button type="button" id="sub-btn"
                        class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-medium transition-colors duration-300">
                        Suscribirme por 1€/mes
                    </button>
                </div>
            </div>
        </section>
    `;
}

async function initSuscripcion() {
    // Obtener publishable key
    const configRes = await fetch('/api/stripe/config');
    const config = await configRes.json();
    
    // Inicializar Stripe
    const stripe = Stripe(config.publishableKey);
    const elements = stripe.elements();
    const cardElement = elements.create('card', {
        style: {
            base: {
                color: '#e2e8f0',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                fontSize: '16px',
                '::placeholder': { color: '#475569' }
            }
        }
    });
    cardElement.mount('#card-element');

    document.getElementById('sub-btn').addEventListener('click', async () => {
        const email = document.getElementById('sub-email').value.trim();
        const btn = document.getElementById('sub-btn');
        const errorEl = document.getElementById('sub-error');
        const successEl = document.getElementById('sub-success');

        if (!email) { errorEl.textContent = 'Por favor introduce tu email.'; errorEl.classList.remove('hidden'); return; }

        btn.textContent = 'Procesando...';
        btn.disabled = true;
        errorEl.classList.add('hidden');

        try {
            const res = await fetch('/api/stripe/create-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (data.error) { throw new Error(data.error); }

            const { error } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card: cardElement, billing_details: { email } }
            });

            if (error) { throw new Error(error.message); }

            successEl.textContent = '¡Suscripción completada! Gracias por tu apoyo 🎉';
            successEl.classList.remove('hidden');
            btn.textContent = '✓ Suscrito';
        } catch (error) {
            errorEl.textContent = error.message;
            errorEl.classList.remove('hidden');
            btn.textContent = 'Suscribirme por 1€/mes';
            btn.disabled = false;
        }
    });
}