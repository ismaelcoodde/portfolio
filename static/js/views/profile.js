function ProfileView() {
    return `
        <section class="flex flex-col items-center px-6 py-16 max-w-lg mx-auto">

            <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">
                Cuenta
            </p>
            <h1 class="text-4xl font-extrabold text-center mb-12">Mi perfil</h1>

            <!-- Avatar -->
            <div class="relative mb-8 cursor-pointer" id="avatar-wrapper" onclick="document.getElementById('avatar-input').click()">
                <div class="w-28 h-28 rounded-full overflow-hidden bg-white/10 border-2 border-white/20 flex items-center justify-center">
                    <img id="avatar-preview" src="" class="w-full h-full object-cover hidden"/>
                    <span id="avatar-placeholder" class="text-4xl text-slate-500">👤</span>
                </div>
                <div class="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                </div>
                <input type="file" id="avatar-input" accept="image/*" class="hidden"/>
            </div>
            <p class="text-slate-500 text-xs mb-10">Toca la foto para cambiarla</p>

            <!-- Formulario -->
            <div class="w-full flex flex-col gap-5">

                <div class="flex flex-col gap-2">
                    <label class="text-sm text-slate-400">Nombre</label>
                    <input type="text" id="profile-nombre" placeholder="Tu nombre"
                        class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                               text-white placeholder-slate-600
                               focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-sm text-slate-400">País</label>
                    <input type="text" id="profile-pais" placeholder="España"
                        class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                               text-white placeholder-slate-600
                               focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-sm text-slate-400">Teléfono</label>
                    <input type="text" id="profile-telefono" placeholder="+34 600 000 000"
                        class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                               text-white placeholder-slate-600
                               focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                </div>

                <p id="profile-status" class="text-sm text-center hidden"></p>

                <button id="profile-save-btn"
                    class="w-full py-3 bg-indigo-600 hover:bg-indigo-500
                           rounded-xl text-white font-medium transition-colors duration-300">
                    Guardar cambios
                </button>

            </div>

        </section>
    `;
}

async function initProfile() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    // Si no hay sesión redirige al login
    if (!session) {
        window.location.hash = '#auth';
        return;
    }

    // Carga el perfil del usuario desde la tabla profiles
    const { data: profile } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    // Rellena los campos con los datos existentes
    if (profile) {
        if (profile.nombre)   document.getElementById('profile-nombre').value   = profile.nombre;
        if (profile.pais)     document.getElementById('profile-pais').value     = profile.pais;
        if (profile.telefono) document.getElementById('profile-telefono').value = profile.telefono;

        // Muestra el avatar si tiene uno
        if (profile.avatar_url) {
            const img = document.getElementById('avatar-preview');
            const placeholder = document.getElementById('avatar-placeholder');
            img.src = profile.avatar_url;
            img.classList.remove('hidden');
            placeholder.classList.add('hidden');
        }
    }

    // Conecta el botón de guardar
    document.getElementById('profile-save-btn').addEventListener('click', () => {
        guardarPerfil(session);
    });

    // Preview del avatar al seleccionar imagen
    document.getElementById('avatar-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = document.getElementById('avatar-preview');
            const placeholder = document.getElementById('avatar-placeholder');
            img.src = ev.target.result;
            img.classList.remove('hidden');
            placeholder.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    });
}

async function guardarPerfil(session) {
    const btn = document.getElementById('profile-save-btn');
    const status = document.getElementById('profile-status');

    const nombre   = document.getElementById('profile-nombre').value.trim();
    const pais     = document.getElementById('profile-pais').value.trim();
    const telefono = document.getElementById('profile-telefono').value.trim();

    btn.textContent = 'Guardando...';
    btn.disabled = true;

    try {
        // 1. Sube el avatar si se seleccionó uno nuevo
        let avatar_url = null;
        const fileInput = document.getElementById('avatar-input');
        const file = fileInput.files[0];

        if (file) {
            const extension = file.name.split('.').pop();
            const fileName  = `${session.user.id}.${extension}`;

            const { data: storageData, error: storageError } = await supabaseClient.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true });

            if (storageError) throw storageError;

            const { data: { publicUrl } } = supabaseClient.storage
                .from('avatars')
                .getPublicUrl(storageData.path);

            avatar_url = publicUrl;
        }

        // 2. Actualiza el perfil en la base de datos
        const updates = { nombre, pais, telefono, updated_at: new Date().toISOString() };
        if (avatar_url) updates.avatar_url = avatar_url;

        const { error } = await supabaseClient
            .from('profiles')
            .update(updates)
            .eq('id', session.user.id);

        if (error) throw error;

        status.textContent = '¡Perfil actualizado!';
        status.className = 'text-green-400 text-sm text-center';
        status.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        status.textContent = 'Error al guardar. Inténtalo de nuevo.';
        status.className = 'text-red-400 text-sm text-center';
        status.classList.remove('hidden');
    } finally {
        btn.textContent = 'Guardar cambios';
        btn.disabled = false;
    }
}