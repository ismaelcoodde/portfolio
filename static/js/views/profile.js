const PAISES = [
    { valor: 'Afganistán', bandera: '🇦🇫' },
    { valor: 'Alemania', bandera: '🇩🇪' },
    { valor: 'Argentina', bandera: '🇦🇷' },
    { valor: 'Australia', bandera: '🇦🇺' },
    { valor: 'Brasil', bandera: '🇧🇷' },
    { valor: 'Canadá', bandera: '🇨🇦' },
    { valor: 'Chile', bandera: '🇨🇱' },
    { valor: 'China', bandera: '🇨🇳' },
    { valor: 'Colombia', bandera: '🇨🇴' },
    { valor: 'Corea del Sur', bandera: '🇰🇷' },
    { valor: 'Cuba', bandera: '🇨🇺' },
    { valor: 'Ecuador', bandera: '🇪🇨' },
    { valor: 'Egipto', bandera: '🇪🇬' },
    { valor: 'El Salvador', bandera: '🇸🇻' },
    { valor: 'Emiratos Árabes', bandera: '🇦🇪' },
    { valor: 'España', bandera: '🇪🇸' },
    { valor: 'Estados Unidos', bandera: '🇺🇸' },
    { valor: 'Filipinas', bandera: '🇵🇭' },
    { valor: 'Francia', bandera: '🇫🇷' },
    { valor: 'Grecia', bandera: '🇬🇷' },
    { valor: 'Guatemala', bandera: '🇬🇹' },
    { valor: 'Honduras', bandera: '🇭🇳' },
    { valor: 'Hungría', bandera: '🇭🇺' },
    { valor: 'India', bandera: '🇮🇳' },
    { valor: 'Indonesia', bandera: '🇮🇩' },
    { valor: 'Iraq', bandera: '🇮🇶' },
    { valor: 'Irlanda', bandera: '🇮🇪' },
    { valor: 'Israel', bandera: '🇮🇱' },
    { valor: 'Italia', bandera: '🇮🇹' },
    { valor: 'Japón', bandera: '🇯🇵' },
    { valor: 'Jordania', bandera: '🇯🇴' },
    { valor: 'Kazajistán', bandera: '🇰🇿' },
    { valor: 'Marruecos', bandera: '🇲🇦' },
    { valor: 'México', bandera: '🇲🇽' },
    { valor: 'Países Bajos', bandera: '🇳🇱' },
    { valor: 'Pakistán', bandera: '🇵🇰' },
    { valor: 'Panamá', bandera: '🇵🇦' },
    { valor: 'Paraguay', bandera: '🇵🇾' },
    { valor: 'Perú', bandera: '🇵🇪' },
    { valor: 'Polonia', bandera: '🇵🇱' },
    { valor: 'Portugal', bandera: '🇵🇹' },
    { valor: 'Reino Unido', bandera: '🇬🇧' },
    { valor: 'República Dominicana', bandera: '🇩🇴' },
    { valor: 'Rumanía', bandera: '🇷🇴' },
    { valor: 'Rusia', bandera: '🇷🇺' },
    { valor: 'Arabia Saudita', bandera: '🇸🇦' },
    { valor: 'Senegal', bandera: '🇸🇳' },
    { valor: 'Serbia', bandera: '🇷🇸' },
    { valor: 'Singapur', bandera: '🇸🇬' },
    { valor: 'Somalia', bandera: '🇸🇴' },
    { valor: 'Suecia', bandera: '🇸🇪' },
    { valor: 'Suiza', bandera: '🇨🇭' },
    { valor: 'Tailandia', bandera: '🇹🇭' },
    { valor: 'Taiwán', bandera: '🇹🇼' },
    { valor: 'Turquía', bandera: '🇹🇷' },
    { valor: 'Ucrania', bandera: '🇺🇦' },
    { valor: 'Uruguay', bandera: '🇺🇾' },
    { valor: 'Venezuela', bandera: '🇻🇪' },
    { valor: 'Vietnam', bandera: '🇻🇳' },
];

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

                <!-- Select personalizado de país -->
                <div class="flex flex-col gap-2">
                    <label class="text-sm text-slate-400">País</label>
                    <div class="relative" id="pais-wrapper">
                        <!-- Trigger -->
                        <div id="pais-trigger"
                             style="background:rgba(255,255,255,0.05); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:12px 16px; color:white; cursor:pointer; display:flex; align-items:center; justify-content:space-between; font-size:14px; user-select:none;">
                            <span id="pais-selected" style="color:#94a3b8;">Selecciona tu país</span>
                            <svg id="pais-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transition:transform 0.2s; flex-shrink:0;">
                                <polyline points="6 9 12 15 18 9"/>
                            </svg>
                        </div>

                        <!-- Dropdown -->
                        <div id="pais-dropdown"
                             style="display:none; position:absolute; top:calc(100% + 4px); left:0; right:0; z-index:100; background:rgba(15,15,26,0.95); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.1); border-radius:12px; overflow:hidden; box-shadow:0 20px 40px rgba(0,0,0,0.4);">

                            <!-- Buscador -->
                            <div style="padding:8px; border-bottom:1px solid rgba(255,255,255,0.08);">
                                <input type="text" id="pais-search" placeholder="Buscar país..."
                                    style="width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:8px 12px; color:white; font-size:13px; outline:none;"
                                    oninput="filtrarPaises(this.value)"/>
                            </div>

                            <!-- Lista de países -->
                            <div id="pais-lista" style="max-height:220px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.1) transparent;">
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="profile-pais" value=""/>
                </div>

                <div class="flex flex-col gap-2">
                    <label class="text-sm text-slate-400">Estado corto</label>
                    <input type="text" id="profile-estado" placeholder="Aprendiendo React, desde Madrid..." maxlength="60"
                        class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                               text-white placeholder-slate-600
                               focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    <p class="text-slate-600 text-xs text-right" id="estado-contador">0/60</p>
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

function renderPaises(paises) {
    const lista = document.getElementById('pais-lista');
    if (!lista) return;
    lista.innerHTML = paises.map(p => `
        <div onclick="seleccionarPais('${p.valor}', '${p.bandera}')"
             style="padding:10px 16px; cursor:pointer; display:flex; align-items:center; gap:10px; font-size:14px; color:#e2e8f0; transition:background 0.15s;"
             onmouseover="this.style.background='rgba(255,255,255,0.08)'"
             onmouseout="this.style.background='transparent'">
            <span style="font-size:18px;">${p.bandera}</span>
            <span>${p.valor}</span>
        </div>
    `).join('');
}

function filtrarPaises(busqueda) {
    const filtrados = PAISES.filter(p =>
        p.valor.toLowerCase().includes(busqueda.toLowerCase())
    );
    renderPaises(filtrados);
}

function seleccionarPais(valor, bandera) {
    document.getElementById('profile-pais').value = valor;
    const selected = document.getElementById('pais-selected');
    selected.style.color = 'white';
    selected.textContent = `${bandera} ${valor}`;
    cerrarDropdownPais();
}

function cerrarDropdownPais() {
    const dropdown = document.getElementById('pais-dropdown');
    const arrow = document.getElementById('pais-arrow');
    if (dropdown) dropdown.style.display = 'none';
    if (arrow) arrow.style.transform = 'rotate(0deg)';
}

function initSelectPais(valorActual) {
    const trigger = document.getElementById('pais-trigger');
    const dropdown = document.getElementById('pais-dropdown');
    const arrow = document.getElementById('pais-arrow');

    renderPaises(PAISES);

    // Si hay valor guardado lo muestra
    if (valorActual) {
        const pais = PAISES.find(p => p.valor === valorActual);
        if (pais) {
            document.getElementById('profile-pais').value = pais.valor;
            const selected = document.getElementById('pais-selected');
            selected.style.color = 'white';
            selected.textContent = `${pais.bandera} ${pais.valor}`;
        }
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const abierto = dropdown.style.display === 'block';
        if (abierto) {
            dropdown.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        } else {
            dropdown.style.display = 'block';
            arrow.style.transform = 'rotate(180deg)';
            document.getElementById('pais-search').focus();
        }
    });

    // Cierra al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!document.getElementById('pais-wrapper')?.contains(e.target)) {
            cerrarDropdownPais();
        }
    });
}

async function initProfile() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        window.location.hash = '#auth';
        return;
    }

    const { data: profile } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (profile) {
        if (profile.nombre)       document.getElementById('profile-nombre').value  = profile.nombre;
        if (profile.estado_corto) document.getElementById('profile-estado').value  = profile.estado_corto;

        if (profile.avatar_url) {
            const img = document.getElementById('avatar-preview');
            const placeholder = document.getElementById('avatar-placeholder');
            img.src = profile.avatar_url;
            img.classList.remove('hidden');
            placeholder.classList.add('hidden');
        }
    }

    // Inicia el select personalizado con el valor guardado
    initSelectPais(profile?.pais || '');

    // Contador estado
    const estadoInput = document.getElementById('profile-estado');
    const contador = document.getElementById('estado-contador');
    if (estadoInput && contador) {
        contador.textContent = `${estadoInput.value.length}/60`;
        estadoInput.addEventListener('input', () => {
            contador.textContent = `${estadoInput.value.length}/60`;
        });
    }

    document.getElementById('profile-save-btn').addEventListener('click', () => {
        guardarPerfil(session);
    });

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

    const nombre      = document.getElementById('profile-nombre').value.trim();
    const pais        = document.getElementById('profile-pais').value.trim();
    const estado_corto = document.getElementById('profile-estado').value.trim();

    btn.textContent = 'Guardando...';
    btn.disabled = true;

    try {
        let avatar_url = null;
        const fileInput = document.getElementById('avatar-input');
        const file = fileInput.files[0];

        if (file) {
            const extension = file.name.split('.').pop();
            const fileName = `${session.user.id}.${extension}`;
            const { data: storageData, error: storageError } = await supabaseClient.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true });
            if (storageError) throw storageError;
            const { data: { publicUrl } } = supabaseClient.storage
                .from('avatars')
                .getPublicUrl(storageData.path);
            avatar_url = publicUrl;
        }

        const updates = { nombre, pais, estado_corto, updated_at: new Date().toISOString() };
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