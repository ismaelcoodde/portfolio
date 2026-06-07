function AuthView() {
    return `
        <section class="min-h-screen flex items-center justify-center px-6 py-20">
            <div class="w-full max-w-md">

                <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">
                    Acceso
                </p>

                <div id="auth-form">
                    <!-- Los formularios se renderizan aquí dinámicamente -->
                </div>

            </div>
        </section>
    `;
}

// Se ejecuta después de que AuthView() carga en el DOM
function initAuth() {
    renderAuthForm('login');
}

// Renderiza el formulario de login o de registro según el modo
function renderAuthForm(mode) {
    const container = document.getElementById('auth-form');
    if (!container) return;

    container.innerHTML = mode === 'login' ? loginFormHTML() : registerFormHTML();

    if (mode === 'login') {
        document.getElementById('auth-btn').addEventListener('click', handleLogin);
    } else {
        document.getElementById('auth-btn').addEventListener('click', handleRegister);
    }

    document.getElementById('toggle-mode').addEventListener('click', () => {
        renderAuthForm(mode === 'login' ? 'register' : 'login');
    });
}

function loginFormHTML() {
    return `
        <h2 class="text-4xl font-extrabold text-center mb-8">Iniciar sesión</h2>

        <div class="flex flex-col gap-5">
            <input type="email" id="auth-email" placeholder="tu@email.com"
                class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                       text-white placeholder-slate-600
                       focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>

            <input type="password" id="auth-password" placeholder="Contraseña"
                class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                       text-white placeholder-slate-600
                       focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>

            <p id="auth-status" class="text-sm text-center hidden"></p>

            <button id="auth-btn"
                class="w-full py-3 bg-indigo-600 hover:bg-indigo-500
                       rounded-xl text-white font-medium transition-colors duration-300">
                Entrar
            </button>

            <p class="text-center text-slate-500 text-sm">
                ¿No tienes cuenta?
                <span id="toggle-mode" class="text-indigo-400 cursor-pointer hover:underline">
                    Regístrate
                </span>
            </p>
        </div>
    `;
}

function registerFormHTML() {
    return `
        <h2 class="text-4xl font-extrabold text-center mb-8">Crear cuenta</h2>

        <div class="flex flex-col gap-5">
            <input type="email" id="auth-email" placeholder="tu@email.com"
                class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                       text-white placeholder-slate-600
                       focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>

            <input type="password" id="auth-password" placeholder="Contraseña (mín. 6 caracteres)"
                class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                       text-white placeholder-slate-600
                       focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>

            <p id="auth-status" class="text-sm text-center hidden"></p>

            <button id="auth-btn"
                class="w-full py-3 bg-indigo-600 hover:bg-indigo-500
                       rounded-xl text-white font-medium transition-colors duration-300">
                Crear cuenta
            </button>

            <p class="text-center text-slate-500 text-sm">
                ¿Ya tienes cuenta?
                <span id="toggle-mode" class="text-indigo-400 cursor-pointer hover:underline">
                    Inicia sesión
                </span>
            </p>
        </div>
    `;
}

function showAuthStatus(message, type) {
    const el = document.getElementById('auth-status');
    if (!el) return;
    el.textContent = message;
    el.className = type === 'success'
        ? 'text-green-400 text-sm text-center'
        : 'text-red-400 text-sm text-center';
}


async function handleLogin() {
    const email    = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;

    if (!email || !password) {
        showAuthStatus('Rellena todos los campos.', 'error');
        return;
    }

    const btn = document.getElementById('auth-btn');
    btn.textContent = 'Entrando...';
    btn.disabled = true;

    // Supabase siempre devuelve { data, error }
    // Si algo falla, error tiene el mensaje. Si va bien, data tiene la sesión.
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        showAuthStatus('Email o contraseña incorrectos.', 'error');
    } else {
        showAuthStatus('¡Bienvenido!', 'success');
        updateNavAuth(data.session);
        setTimeout(() => { window.location.hash = '#home'; }, 1000);
    }

    btn.textContent = 'Entrar';
    btn.disabled = false;
}

async function handleRegister() {
    const email    = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;

    if (!email || !password) {
        showAuthStatus('Rellena todos los campos.', 'error');
        return;
    }

    if (password.length < 6) {
        showAuthStatus('La contraseña debe tener mínimo 6 caracteres.', 'error');
        return;
    }

    const btn = document.getElementById('auth-btn');
    btn.textContent = 'Creando cuenta...';
    btn.disabled = true;

    const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: window.location.origin
        }
    });

    if (error) {
        showAuthStatus(error.message, 'error');
    } else {
        showAuthStatus('¡Cuenta creada! Revisa tu correo para confirmarla.', 'success');
    }

    btn.textContent = 'Crear cuenta';
    btn.disabled = false;
}

// Actualiza el navbar según si hay sesión activa o no
function updateNavAuth(session) {
    const navAuth = document.getElementById('nav-auth');
    if (!navAuth) return;

    if (session && session.user) {
        // Usuario logueado: muestra su email y botón de salir
        navAuth.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-slate-400 text-sm">${session.user.email}</span>
                <button id="logout-btn"
                    class="px-4 py-2 border border-red-500/50 rounded-full text-red-400
                           text-sm hover:bg-red-500/10 transition-colors">
                    Salir
                </button>
            </div>
        `;
        document.getElementById('logout-btn').addEventListener('click', handleLogout);
    } else {
        // Sin sesión: muestra el botón de iniciar sesión
        navAuth.innerHTML = `
            <a href="#auth"
               class="px-4 py-2 border border-indigo-500 rounded-full text-indigo-400
                      text-sm hover:bg-indigo-500/10 transition-colors">
                Iniciar sesión
            </a>
        `;
    }
}

async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.hash = '#home';
}