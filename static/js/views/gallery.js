function GalleryView() {
    return `
        <section class="min-h-screen px-6 py-16 max-w-6xl mx-auto">

            <div class="flex items-center justify-between mb-12">
                <div>
                    <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-2">
                        Ismael Cruz Fernandez
                    </p>
                    <h2 class="text-4xl font-extrabold">Galería</h2>
                </div>

                <button id="upload-btn" class="hidden px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500
                       rounded-xl text-white text-sm font-medium transition-colors duration-300
                       flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Subir foto
                </button>
            </div>

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

    const uploadBtn = document.getElementById('upload-btn');
    if (uploadBtn) uploadBtn.addEventListener('click', openUploadModal);

    supabaseClient.auth.onAuthStateChange((event, session) => {
        if (session && session.user.email === 'ibcruzismael@gmail.com') {
            const btn = document.getElementById('upload-btn');
            if (btn) btn.classList.remove('hidden');
        }
    });

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session && session.user.email === 'ibcruzismael@gmail.com') {
        const btn = document.getElementById('upload-btn');
        if (btn) btn.classList.remove('hidden');
    }
}

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

async function openPhoto(photoId) {
    const { data: photo } = await supabaseClient
        .from('photos')
        .select('*')
        .eq('id', photoId)
        .single();

    if (!photo) return;

    const { data: { session } } = await supabaseClient.auth.getSession();
    const isAdmin = session && session.user.email === 'ibcruzismael@gmail.com';

    const modal = document.createElement('div');
    modal.id = 'photo-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4';

    modal.innerHTML = `
        <div class="bg-[#0f0f1a] rounded-2xl overflow-hidden w-full max-w-4xl
                    flex flex-col md:flex-row max-h-[90vh]">

            <div class="md:w-3/5 bg-black flex items-center justify-center">
                <img src="${photo.url}" alt="${photo.description || ''}"
                     class="w-full object-contain max-h-[45vh] md:max-h-[90vh]"/>
            </div>

            <div class="md:w-2/5 flex flex-col max-h-[45vh] md:max-h-[90vh] border-l border-white/10">

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
                    <div class="flex items-center gap-2">
                        ${isAdmin ? `
                        <button id="delete-photo-btn"
                                class="text-red-400 hover:text-red-300 transition-colors p-1">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                <path d="M10 11v6"/><path d="M14 11v6"/>
                                <path d="M9 6V4h6v2"/>
                            </svg>
                        </button>` : ''}
                        <button onclick="closeModal()"
                                class="text-slate-400 hover:text-white transition-colors p-1">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>

                ${photo.description ? `
                <div class="px-4 py-3 border-b border-white/10 flex-shrink-0">
                    <p class="text-sm text-slate-300 leading-relaxed">${photo.description}</p>
                </div>` : ''}

                <div id="comments-list" class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    <p class="text-slate-500 text-xs text-center">Cargando comentarios...</p>
                </div>

                <div id="comment-input-area" class="border-t border-white/10 p-4 flex-shrink-0">
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    if (isAdmin) {
        document.getElementById('delete-photo-btn').addEventListener('click', () => deletePhoto(photo));
    }

    await loadComments(photoId);
    setupCommentInput(photoId);
    subscribeToPhotoComments(photoId);
}

function closeModal() {
    const modal = document.getElementById('photo-modal');
    if (modal) modal.remove();
}

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

function openUploadModal() {
    const modal = document.createElement('div');
    modal.id = 'upload-modal';
    modal.className = 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4';

    modal.innerHTML = `
        <div class="bg-[#0f0f1a] rounded-2xl p-6 w-full max-w-md border border-white/10">

            <div class="flex items-center justify-between mb-6">
                <h3 class="text-lg font-bold">Subir foto</h3>
                <button onclick="closeUploadModal()"
                        class="text-slate-400 hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>

            <div id="image-preview"
                 class="w-full h-48 bg-white/5 border-2 border-dashed border-white/20
                        rounded-xl flex items-center justify-center mb-4 overflow-hidden cursor-pointer"
                 onclick="document.getElementById('file-input').click()">
                <div id="preview-placeholder" class="text-center">
                    <svg class="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p class="text-slate-500 text-sm">Haz clic para seleccionar una foto</p>
                </div>
                <img id="preview-img" class="hidden w-full h-full object-cover"/>
            </div>

            <input type="file" id="file-input" accept="image/*" class="hidden"/>

            <div class="flex flex-col gap-4">
                <textarea id="upload-description" rows="3"
                          placeholder="Descripción de la foto..."
                          class="bg-white/5 border border-white/10 rounded-xl px-4 py-3
                                 text-white text-sm placeholder-slate-600 resize-none
                                 focus:outline-none focus:border-indigo-500 transition-colors"></textarea>

                <p id="upload-status" class="text-sm text-center hidden"></p>

                <button id="upload-submit"
                        class="w-full py-3 bg-indigo-600 hover:bg-indigo-500
                               rounded-xl text-white font-medium transition-colors duration-300">
                    Publicar foto
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeUploadModal(); });

    document.getElementById('file-input').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            document.getElementById('preview-placeholder').classList.add('hidden');
            const img = document.getElementById('preview-img');
            img.src = ev.target.result;
            img.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    });

    document.getElementById('upload-submit').addEventListener('click', uploadPhoto);
}

function closeUploadModal() {
    const modal = document.getElementById('upload-modal');
    if (modal) modal.remove();
}

async function uploadPhoto() {
    const file = document.getElementById('file-input').files[0];
    const description = document.getElementById('upload-description').value.trim();
    const btn = document.getElementById('upload-submit');
    const status = document.getElementById('upload-status');

    if (!file) {
        status.textContent = 'Selecciona una foto primero.';
        status.className = 'text-red-400 text-sm text-center';
        return;
    }

    btn.textContent = 'Subiendo...';
    btn.disabled = true;

    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
    const { data: storageData, error: storageError } = await supabaseClient.storage
        .from('gallery')
        .upload(fileName, file);

    if (storageError) {
        status.textContent = 'Error al subir la imagen.';
        status.className = 'text-red-400 text-sm text-center';
        btn.textContent = 'Publicar foto';
        btn.disabled = false;
        return;
    }

    const { data: { publicUrl } } = supabaseClient.storage
        .from('gallery')
        .getPublicUrl(storageData.path);

    const { error: dbError } = await supabaseClient
        .from('photos')
        .insert({ url: publicUrl, description });

    if (dbError) {
        status.textContent = 'Error al guardar la foto.';
        status.className = 'text-red-400 text-sm text-center';
        btn.textContent = 'Publicar foto';
        btn.disabled = false;
        return;
    }

    closeUploadModal();
    await loadPhotos();
}

async function deletePhoto(photo) {
    if (!confirm('¿Seguro que quieres borrar esta foto?')) return;

    const filePath = photo.url.split('/gallery/')[1];

    await supabaseClient.storage.from('gallery').remove([filePath]);
    await supabaseClient.from('photos').delete().eq('id', photo.id);

    closeModal();
    await loadPhotos();
}