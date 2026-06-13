function GalleryView() {
    return `
        <section class="min-h-screen px-6 py-16 max-w-6xl mx-auto">

            <!-- Cabecera -->
            <div class="flex items-center justify-between mb-12">
                <div>
                    <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-2">
                        Astrofotografía
                    </p>
                    <h2 class="text-4xl font-extrabold">Galería</h2>
                </div>

                <!-- Botón subir foto: solo visible para el admin -->
                <button id="upload-btn" class="hidden px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500
                       rounded-xl text-white text-sm font-medium transition-colors duration-300
                       flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Subir foto
                </button>
            </div>

            <!-- Grid de fotos -->
            <div id="photos-grid" class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <p class="text-slate-500 text-sm col-span-full text-center py-20">
                    Cargando fotos...
                </p>
            </div>

        </section>
    `;
}

async function initGallery() {
    await loadPhotos();
    setupUploadButton();

    // Comprueba el admin tanto al cargar como cuando cambia la sesión
    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (session && session.user.email === 'ibcruzismael@gmail.com') {
            const btn = document.getElementById('upload-btn');
            if (btn) btn.classList.remove('hidden');
        }
    });

    // También comprueba la sesión actual por si ya está cargada
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session && session.user.email === 'ibcruzismael@gmail.com') {
        const btn = document.getElementById('upload-btn');
        if (btn) btn.classList.remove('hidden');
    }
}

// Muestra el botón de subir solo si eres el admin
async function checkAdminButton() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session && session.user.email === 'ibcruzismael@gmail.com') {
        const btn = document.getElementById('upload-btn');
        if (btn) btn.classList.remove('hidden');
    }
}

// Carga las fotos desde Supabase
async function loadPhotos() {
    const { data, error } = await supabaseClient
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

    const grid = document.getElementById('photos-grid');
    if (!grid) return;

    if (error || !data || data.length === 0) {
        grid.innerHTML = `
            <p class="text-slate-500 text-sm col-span-full text-center py-20">
                Aún no hay fotos. ¡Sé el primero en subir una!
            </p>
        `;
        return;
    }

    grid.innerHTML = data.map(photo => `
        <div onclick="openPhoto('${photo.id}')"
             class="relative aspect-square overflow-hidden rounded-xl cursor-pointer group">
            <img src="${photo.url}" alt="${photo.description || ''}"
                 class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300
                        flex items-end p-3 opacity-0 group-hover:opacity-100">
                <p class="text-white text-xs font-medium line-clamp-2">${photo.description || ''}</p>
            </div>
        </div>
    `).join('');
}



// Abre el modal cuando se hace clic en una foto
async function openPhoto(photoId) {
    const { data: photo } = await supabaseClient
        .from('photos')
        .select('*')
        .eq('id', photoId)
        .single();

    if (!photo) return;

    // Crea el modal y lo añade al body
    const modal = document.createElement('div');
    modal.id = 'photo-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4';

    modal.innerHTML = `
        <div class="bg-[#0f0f1a] rounded-2xl overflow-hidden w-full max-w-4xl
                    flex flex-col md:flex-row max-h-[90vh]">

            <!-- Foto izquierda -->
            <div class="md:w-3/5 bg-black flex items-center justify-center">
                <img src="${photo.url}" alt="${photo.description || ''}"
                     class="w-full object-contain max-h-[45vh] md:max-h-[90vh]"/>
            </div>

            <!-- Panel derecho -->
            <div class="md:w-2/5 flex flex-col max-h-[45vh] md:max-h-[90vh] border-l border-white/10">

                <!-- Header -->
                <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                            I
                        </div>
                        <div>
                            <p class="text-sm font-semibold">Ismael Cruz</p>
                            <p class="text-slate-500 text-xs">${new Date(photo.created_at).toLocaleDateString('es-ES')}</p>
                        </div>
                    </div>
                    <button onclick="closeModal()"
                            class="text-slate-400 hover:text-white transition-colors p-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                ${photo.description ? `
                <div class="px-4 py-3 border-b border-white/10 flex-shrink-0">
                    <p class="text-sm text-slate-300 leading-relaxed">${photo.description}</p>
                </div>` : ''}

                <!-- Lista de comentarios -->
                <div id="comments-list" class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <p class="text-slate-500 text-xs text-center">Cargando comentarios...</p>
                </div>

                <!-- Input comentario -->
                <div id="comment-input-area" class="border-t border-white/10 p-4 flex-shrink-0">
                </div>

            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    await loadComments(photoId);
    setupCommentInput(photoId);
    subscribeToPhotoComments(photoId);
}

function closeModal() {
    const modal = document.getElementById('photo-modal');
    if (modal) modal.remove();
}

// Carga los comentarios de una foto
async function loadComments(photoId) {
    const { data } = await supabaseClient
        .from('comments')
        .select('*')
        .eq('photo_id', photoId)
        .order('created_at', { ascending: true });

    renderComments(data || []);
}

function renderComments(comments) {
    const list = document.getElementById('comments-list');
    if (!list) return;

    if (comments.length === 0) {
        list.innerHTML = `<p class="text-slate-500 text-xs text-center py-4">Sin comentarios aún. ¡Sé el primero!</p>`;
        return;
    }

    list.innerHTML = comments.map(c => `
        <div class="flex gap-3">
            <div class="w-7 h-7 rounded-full bg-indigo-600/60 flex items-center justify-center
                        text-white text-xs font-bold flex-shrink-0">
                ${c.email[0].toUpperCase()}
            </div>
            <div>
                <span class="text-xs font-semibold text-indigo-400">${c.email.split('@')[0]}</span>
                <p class="text-sm text-slate-300 mt-0.5">${c.content}</p>
                <p class="text-slate-600 text-xs mt-1">${new Date(c.created_at).toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'})}</p>
            </div>
        </div>
    `).join('');

    list.scrollTop = list.scrollHeight;
}

// Input para escribir comentarios
async function setupCommentInput(photoId) {
    const area = document.getElementById('comment-input-area');
    if (!area) return;

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        area.innerHTML = `
            <div class="flex gap-2">
                <input id="comment-text" type="text" placeholder="Añade un comentario..."
                       class="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2
                              text-white text-sm placeholder-slate-600
                              focus:outline-none focus:border-indigo-500 transition-colors"/>
                <button id="comment-send"
                        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl
                               text-white text-sm font-medium transition-colors">
                    Enviar
                </button>
            </div>
        `;

        document.getElementById('comment-send').addEventListener('click', () => sendComment(photoId, session));
        document.getElementById('comment-text').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendComment(photoId, session);
        });
    } else {
        area.innerHTML = `
            <p class="text-slate-500 text-xs text-center">
                <a href="#auth" onclick="closeModal()" class="text-indigo-400 hover:underline">Inicia sesión</a>
                para comentar
            </p>
        `;
    }
}

async function sendComment(photoId, session) {
    const input = document.getElementById('comment-text');
    const content = input.value.trim();
    if (!content) return;

    input.value = '';

    await supabaseClient.from('comments').insert({
        photo_id: photoId,
        user_id:  session.user.id,
        email:    session.user.email,
        content:  content
    });
}

// Realtime: nuevos comentarios aparecen al instante
function subscribeToPhotoComments(photoId) {
    supabaseClient
        .channel(`comments-${photoId}`)
        .on('postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'comments', filter: `photo_id=eq.${photoId}` },
            (payload) => {
                const list = document.getElementById('comments-list');
                if (!list) return;
                const placeholder = list.querySelector('p');
                if (placeholder) placeholder.remove();
                list.insertAdjacentHTML('beforeend', `
                    <div class="flex gap-3">
                        <div class="w-7 h-7 rounded-full bg-indigo-600/60 flex items-center justify-center
                                    text-white text-xs font-bold flex-shrink-0">
                            ${payload.new.email[0].toUpperCase()}
                        </div>
                        <div>
                            <span class="text-xs font-semibold text-indigo-400">${payload.new.email.split('@')[0]}</span>
                            <p class="text-sm text-slate-300 mt-0.5">${payload.new.content}</p>
                        </div>
                    </div>
                `);
                list.scrollTop = list.scrollHeight;
            }
        )
        .subscribe();
}

//Fase 4

// Abre el modal cuando se hace clic en una foto
async function openPhoto(photoId) {
    const { data: photo } = await supabaseClient
        .from('photos')
        .select('*')
        .eq('id', photoId)
        .single();

    if (!photo) return;

    // Crea el modal y lo añade al body
    const modal = document.createElement('div');
    modal.id = 'photo-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4';

    modal.innerHTML = `
        <div class="bg-[#0f0f1a] rounded-2xl overflow-hidden w-full max-w-4xl
                    flex flex-col md:flex-row max-h-[90vh]">

            <!-- Foto izquierda -->
            <div class="md:w-3/5 bg-black flex items-center justify-center">
                <img src="${photo.url}" alt="${photo.description || ''}"
                     class="w-full object-contain max-h-[45vh] md:max-h-[90vh]"/>
            </div>

            <!-- Panel derecho -->
            <div class="md:w-2/5 flex flex-col max-h-[45vh] md:max-h-[90vh] border-l border-white/10">

                <!-- Header -->
                <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                            I
                        </div>
                        <div>
                            <p class="text-sm font-semibold">Ismael Cruz</p>
                            <p class="text-slate-500 text-xs">${new Date(photo.created_at).toLocaleDateString('es-ES')}</p>
                        </div>
                    </div>
                    <button onclick="closeModal()"
                            class="text-slate-400 hover:text-white transition-colors p-1">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                ${photo.description ? `
                <div class="px-4 py-3 border-b border-white/10 flex-shrink-0">
                    <p class="text-sm text-slate-300 leading-relaxed">${photo.description}</p>
                </div>` : ''}

                <!-- Lista de comentarios -->
                <div id="comments-list" class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <p class="text-slate-500 text-xs text-center">Cargando comentarios...</p>
                </div>

                <!-- Input comentario -->
                <div id="comment-input-area" class="border-t border-white/10 p-4 flex-shrink-0">
                </div>

            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    await loadComments(photoId);
    setupCommentInput(photoId);
    subscribeToPhotoComments(photoId);
}

function closeModal() {
    const modal = document.getElementById('photo-modal');
    if (modal) modal.remove();
}

// Carga los comentarios de una foto
async function loadComments(photoId) {
    const { data } = await supabaseClient
        .from('comments')
        .select('*')
        .eq('photo_id', photoId)
        .order('created_at', { ascending: true });

    renderComments(data || []);
}

function renderComments(comments) {
    const list = document.getElementById('comments-list');
    if (!list) return;

    if (comments.length === 0) {
        list.innerHTML = `<p class="text-slate-500 text-xs text-center py-4">Sin comentarios aún. ¡Sé el primero!</p>`;
        return;
    }

    list.innerHTML = comments.map(c => `
        <div class="flex gap-3">
            <div class="w-7 h-7 rounded-full bg-indigo-600/60 flex items-center justify-center
                        text-white text-xs font-bold flex-shrink-0">
                ${c.email[0].toUpperCase()}
            </div>
            <div>
                <span class="text-xs font-semibold text-indigo-400">${c.email.split('@')[0]}</span>
                <p class="text-sm text-slate-300 mt-0.5">${c.content}</p>
                <p class="text-slate-600 text-xs mt-1">${new Date(c.created_at).toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'})}</p>
            </div>
        </div>
    `).join('');

    list.scrollTop = list.scrollHeight;
}

// Input para escribir comentarios
async function setupCommentInput(photoId) {
    const area = document.getElementById('comment-input-area');
    if (!area) return;

    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        area.innerHTML = `
            <div class="flex gap-2">
                <input id="comment-text" type="text" placeholder="Añade un comentario..."
                       class="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2
                              text-white text-sm placeholder-slate-600
                              focus:outline-none focus:border-indigo-500 transition-colors"/>
                <button id="comment-send"
                        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl
                               text-white text-sm font-medium transition-colors">
                    Enviar
                </button>
            </div>
        `;

        document.getElementById('comment-send').addEventListener('click', () => sendComment(photoId, session));
        document.getElementById('comment-text').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendComment(photoId, session);
        });
    } else {
        area.innerHTML = `
            <p class="text-slate-500 text-xs text-center">
                <a href="#auth" onclick="closeModal()" class="text-indigo-400 hover:underline">Inicia sesión</a>
                para comentar
            </p>
        `;
    }
}

async function sendComment(photoId, session) {
    const input = document.getElementById('comment-text');
    const content = input.value.trim();
    if (!content) return;

    input.value = '';

    await supabaseClient.from('comments').insert({
        photo_id: photoId,
        user_id:  session.user.id,
        email:    session.user.email,
        content:  content
    });
}

// Realtime: nuevos comentarios aparecen al instante
function subscribeToPhotoComments(photoId) {
    supabaseClient
        .channel(`comments-${photoId}`)
        .on('postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'comments', filter: `photo_id=eq.${photoId}` },
            (payload) => {
                const list = document.getElementById('comments-list');
                if (!list) return;
                const placeholder = list.querySelector('p');
                if (placeholder) placeholder.remove();
                list.insertAdjacentHTML('beforeend', `
                    <div class="flex gap-3">
                        <div class="w-7 h-7 rounded-full bg-indigo-600/60 flex items-center justify-center
                                    text-white text-xs font-bold flex-shrink-0">
                            ${payload.new.email[0].toUpperCase()}
                        </div>
                        <div>
                            <span class="text-xs font-semibold text-indigo-400">${payload.new.email.split('@')[0]}</span>
                            <p class="text-sm text-slate-300 mt-0.5">${payload.new.content}</p>
                        </div>
                    </div>
                `);
                list.scrollTop = list.scrollHeight;
            }
        )
        .subscribe();
}