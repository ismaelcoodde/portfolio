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

// Renderiza el formulario de loginn o de registro según el modo
function renderAuthForm(mode) {
    const container = document.getElementById('auth-form');
    if (!container) return;

    container.innerHTML = mode === 'login' ? loginFormHTML() : registerFormHTML();

    if (mode === 'login') {
        document.getElementById('auth-btn').addEventListener('click', handleLogin);
    } else {
        document.getElementById('auth-btn').addEventListener('click', handleRegister);
    }
    document.getElementById('google-btn')?.addEventListener('click', handleGoogleLogin);

    document.getElementById('toggle-mode').addEventListener('click', () => {
        renderAuthForm(mode === 'login' ? 'register' : 'login');
    });

    // Preview avatar en registro
    if (mode === 'register') {
        document.getElementById('reg-avatar-input').addEventListener('change', (e) => {
            const f = e.target.files[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                document.getElementById('reg-avatar-placeholder').classList.add('hidden');
                const img = document.getElementById('reg-avatar-preview');
                img.src = ev.target.result;
                img.classList.remove('hidden');
            };
            reader.readAsDataURL(f);
        });
    }
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
            <!-- Divider -->
<div class="flex items-center gap-3 my-1">
    <div class="flex-1 h-px bg-white/10"></div>
    <span class="text-slate-500 text-xs">o</span>
    <div class="flex-1 h-px bg-white/10"></div>
</div>

<!-- Botón Google -->
<button id="google-btn" type="button"
    class="w-full py-3 bg-white hover:bg-gray-50 rounded-xl
           text-gray-700 font-medium transition-colors duration-300
           flex items-center justify-center gap-3">
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    Continuar con Google
</button>
        </div>
    `;
}

function registerFormHTML() {
    return `
        <h2 class="text-4xl font-extrabold text-center mb-2">Crear cuenta</h2>
        <p class="text-slate-500 text-sm text-center mb-8">Tu identidad es tuya — elige el nombre y foto que quieras.</p>

        <div class="flex flex-col gap-5">

            <!-- Avatar -->
            <div class="flex flex-col items-center gap-3">
                <div class="relative cursor-pointer" onclick="document.getElementById('reg-avatar-input').click()">
                    <div id="reg-avatar-circle" class="w-20 h-20 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
                        <span id="reg-avatar-placeholder" class="text-3xl">👤</span>
                        <img id="reg-avatar-preview" class="hidden w-full h-full object-cover"/>
                    </div>
                    <div class="absolute bottom-0 right-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                    </div>
                </div>
                <p class="text-slate-500 text-xs">Toca para subir tu foto (opcional)</p>
                <input type="file" id="reg-avatar-input" accept="image/*" class="hidden"/>
            </div>

            <!-- Nick -->
            <div class="flex flex-col gap-2">
                <label class="text-sm text-slate-400">Nick público</label>
                <input type="text" id="reg-nombre" placeholder="El nombre que verán los demás"
                    class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                           text-white placeholder-slate-600
                           focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
            </div>

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
            <!-- Divider -->
<div class="flex items-center gap-3 my-1">
    <div class="flex-1 h-px bg-white/10"></div>
    <span class="text-slate-500 text-xs">o</span>
    <div class="flex-1 h-px bg-white/10"></div>
</div>

<!-- Botón Google -->
<button id="google-btn" type="button"
    class="w-full py-3 bg-white hover:bg-gray-50 rounded-xl
           text-gray-700 font-medium transition-colors duration-300
           flex items-center justify-center gap-3">
    <svg width="18" height="18" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    Continuar con Google
</button>
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
    const nombre   = document.getElementById('reg-nombre').value.trim();
    const file     = document.getElementById('reg-avatar-input').files[0];

    if (!email || !password) {
        showAuthStatus('Rellena email y contraseña.', 'error');
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
        options: { emailRedirectTo: window.location.origin }
    });

    if (error) {
        showAuthStatus(error.message, 'error');
        btn.textContent = 'Crear cuenta';
        btn.disabled = false;
        return;
    }

    const userId = data.user?.id;
    if (userId) {
        // Sube el avatar si se seleccionó uno
        let avatar_url = null;
        if (file) {
            const ext = file.name.split('.').pop();
            const fileName = `${userId}.${ext}`;
            const { data: storageData } = await supabaseClient.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true });
            if (storageData) {
                const { data: { publicUrl } } = supabaseClient.storage
                    .from('avatars')
                    .getPublicUrl(storageData.path);
                avatar_url = publicUrl;
            }
        }

        // Guarda el nick y avatar en profiles
        const updates = {};
        if (nombre) updates.nombre = nombre;
        if (avatar_url) updates.avatar_url = avatar_url;

        if (Object.keys(updates).length > 0) {
            await supabaseClient
                .from('profiles')
                .update(updates)
                .eq('id', userId);
        }
    }

    showAuthStatus('¡Cuenta creada! Ya puedes entrar.', 'success');

    // Preview del avatar al seleccionarlo
    document.getElementById('reg-avatar-input')?.addEventListener('change', (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            document.getElementById('reg-avatar-placeholder').classList.add('hidden');
            const img = document.getElementById('reg-avatar-preview');
            img.src = ev.target.result;
            img.classList.remove('hidden');
        };
        reader.readAsDataURL(f);
    });

    btn.textContent = 'Crear cuenta';
    btn.disabled = false;
}

async function updateNavAuth(session) {
    const desktopAuth  = document.getElementById('nav-auth');
    const mobileAvatar = document.getElementById('nav-auth-mobile');
    const menuAuth     = document.getElementById('mobile-menu-auth');

    if (session && session.user) {
        const email = session.user.email;

        // Carga el perfil para obtener avatar y nombre
        const { data: perfil } = await supabaseClient
            .from('profiles')
            .select('nombre, avatar_url')
            .eq('id', session.user.id)
            .single();

        const nombre = perfil?.nombre || email.split('@')[0];
        const avatarEl = perfil?.avatar_url
            ? `<img src="${perfil.avatar_url}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:2px solid rgba(99,102,241,0.4);"/>`
            : `<div style="width:40px; height:40px; border-radius:50%; background:rgba(99,102,241,0.6); display:flex; align-items:center; justify-content:center; color:white; font-size:13px; font-weight:600;">${nombre[0].toUpperCase()}</div>`;

        // Desktop: avatar + enlace a perfil + botón Salir
        if (desktopAuth) {
            desktopAuth.innerHTML = `
                <div class="flex items-center gap-3">
                    <a href="#profile" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        ${avatarEl}
                        <span class="text-slate-300 text-sm">${nombre}</span>
                    </a>
                    <button id="logout-btn"
                        class="px-4 py-2 border border-red-500/50 rounded-full text-red-400
                               text-sm hover:bg-red-500/10 transition-colors">
                        Salir
                    </button>
                </div>
            `;
            document.getElementById('logout-btn').addEventListener('click', handleLogout);
        }

        // Mobile: avatar clickable que va a perfil
        if (mobileAvatar) {
            mobileAvatar.innerHTML = `
                <a href="#profile" class="flex items-center">
                    ${avatarEl}
                </a>
            `;
        }

        // Menú móvil
        if (menuAuth) {
            menuAuth.innerHTML = `
                <div class="flex flex-col gap-2 pt-2 border-t border-white/10">
                    <a href="#profile" class="flex items-center gap-2 text-slate-300 text-sm hover:text-white transition-colors">
                        ${avatarEl}
                        <span>${nombre}</span>
                    </a>
                    <button id="logout-btn-mobile"
                        class="w-full py-2 border border-red-500/50 rounded-xl text-red-400
                               text-sm hover:bg-red-500/10 transition-colors">
                        Salir
                    </button>
                </div>
            `;
            document.getElementById('logout-btn-mobile').addEventListener('click', handleLogout);
        }

    } else {
        // Sin sesión
        if (desktopAuth) {
            desktopAuth.innerHTML = `<a href="#auth" class="px-4 py-2 border border-indigo-500/50 rounded-full text-indigo-400 text-sm hover:bg-indigo-500/10 transition-colors">Iniciar sesión</a>`;
        }
        if (mobileAvatar) mobileAvatar.innerHTML = '';
        if (menuAuth) {
            menuAuth.innerHTML = `<a href="#auth" class="mobile-link text-lg hover:text-indigo-400 transition-colors">Iniciar sesión</a>`;
        }
    }
}

async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.hash = '#home';
}


async function handleGoogleLogin() {
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin
        }
    });
    if (error) showAuthStatus('Error al conectar con Google.', 'error');
    // Si va bien, Google redirige automáticamente. No hace falta más código aquí.
}