async function getProfile(userId) {
    if (typeof profilesCache !== 'undefined' && profilesCache[userId]) return profilesCache[userId];
    const { data } = await supabaseClient
        .from('profiles')
        .select('nombre, avatar_url')
        .eq('id', userId)
        .single();
    if (data && typeof profilesCache !== 'undefined') profilesCache[userId] = data;
    return data;
}

function avatarHTML(profile, email, size = 28) {
    if (profile?.avatar_url) {
        return `<img src="${profile.avatar_url}" 
                     style="width:${size}px; height:${size}px; border-radius:50%; object-fit:cover; flex-shrink:0;"/>`;
    }
    const inicial = (profile?.nombre || email || '?')[0].toUpperCase();
    return `<div style="width:${size}px; height:${size}px; border-radius:50%; background:rgba(99,102,241,0.6); 
                        display:flex; align-items:center; justify-content:center; 
                        color:white; font-size:${size * 0.4}px; font-weight:600; flex-shrink:0;">
                ${inicial}
            </div>`;
}

function ChatView() {
    return `
        <section class="flex flex-col md:flex-row" style="height: calc(100dvh - 64px)">

            <!-- Panel izquierdo -->
            <div class="md:w-64 md:border-r border-white/10 flex flex-col flex-shrink-0">

                <!-- Header panel izquierdo -->
                <div class="p-4 md:p-6 border-b border-white/10">
                    <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-1">Comunidad</p>
                    <h2 class="text-xl md:text-2xl font-bold">Usuarios</h2>
                </div>

                <!-- Lista usuarios (móvil: horizontal, desktop: vertical) -->
                <div class="flex-1 overflow-y-auto overflow-x-auto md:overflow-x-hidden">
                    <div id="usuarios-lista" class="flex md:flex-col gap-3 p-4 md:gap-0 md:p-0">
                        <p class="text-slate-500 text-xs p-4">Cargando...</p>
                    </div>
                </div>

            </div>

            <!-- Panel derecho: chat -->
            <div class="flex-1 flex flex-col min-h-0">

                <!-- Header chat -->
                <div class="p-4 md:p-6 border-b border-white/10">
                    <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-1">Messenger</p>
                    <h2 class="text-xl md:text-2xl font-bold">Chat en vivo</h2>
                </div>


                <div id="messages-container"
                     class="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 min-h-0">
                    <p class="text-slate-500 text-sm text-center">Un momento...</p>
                </div>

                <div id="chat-input-area" class="p-4 border-t border-white/10 flex-shrink-0">
                </div>

            </div>

        </section>

        <!-- Modal tarjeta de usuario -->
        <div id="user-card-modal"
             style="display:none; position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.7); backdrop-filter:blur(8px); align-items:center; justify-content:center;"
             onclick="cerrarUserCard(event)">
            <div id="user-card-content"
                 style="background:rgba(15,15,26,0.97); border:1px solid rgba(255,255,255,0.12); border-radius:20px; padding:28px; width:300px; text-align:center;">
            </div>
        </div>
    `;
}

function initChat() {
    renderChatInput();
    loadMessages();
    subscribeToMessages();
    cargarUsuarios();

    window.addEventListener('presencia-actualizada', () => {
        cargarUsuarios();
    });
}

async function cargarUsuarios() {
    const container = document.getElementById('usuarios-lista');
    if (!container) return;

    const { data: usuarios } = await supabaseClient
        .from('profiles')
        .select('id, nombre, avatar_url, pais, estado_corto')
        .not('nombre', 'is', null)
        .order('created_at', { ascending: false });

    if (!usuarios || usuarios.length === 0) {
        container.innerHTML = '<p class="text-slate-500 text-xs p-4">Sin miembros aún</p>';
        return;
    }

    const onlineIds = new Set(
        typeof presenceChannel !== 'undefined' && presenceChannel
            ? Object.keys(presenceChannel.presenceState())
            : []
    );

    // Ordena: online primero, luego offline
    const ordenados = [...usuarios].sort((a, b) => {
        const aOnline = onlineIds.has(a.id) ? 1 : 0;
        const bOnline = onlineIds.has(b.id) ? 1 : 0;
        return bOnline - aOnline;
    });

    // Móvil: solo avatares en fila horizontal (máx 5)
    // Desktop: lista completa vertical
    container.innerHTML = `
        <!-- Móvil: solo avatares -->
        <div class="flex md:hidden gap-3">
            ${ordenados.slice(0, 5).map(u => {
                const online = onlineIds.has(u.id);
                const data = JSON.stringify(u).replace(/"/g, '&quot;');
                return `
                    <div onclick="abrirUserCard('${data}')" class="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
                        <div style="position:relative;">
                            ${u.avatar_url
                                ? `<img src="${u.avatar_url}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;"/>`
                                : `<div style="width:40px; height:40px; border-radius:50%; background:rgba(99,102,241,0.6); display:flex; align-items:center; justify-content:center; color:white; font-size:15px; font-weight:600;">${(u.nombre||'?')[0].toUpperCase()}</div>`
                            }
                            ${online ? `<div style="position:absolute; bottom:0; right:0; width:10px; height:10px; background:#22c55e; border-radius:50%; border:2px solid #0a0a14;"></div>` : ''}
                        </div>
                        <span style="font-size:10px; color:#94a3b8; max-width:44px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${u.nombre}</span>
                    </div>
                `;
            }).join('')}
        </div>

        <!-- Desktop: lista completa -->
        <div class="hidden md:flex flex-col">
            ${ordenados.map(u => {
                const online = onlineIds.has(u.id);
                const data = JSON.stringify(u).replace(/"/g, '&quot;');
                return `
                    <div onclick="abrirUserCard('${data}')"
                         style="display:flex; align-items:center; gap:10px; padding:10px 16px; cursor:pointer; transition:background 0.15s;"
                         onmouseover="this.style.background='rgba(255,255,255,0.05)'"
                         onmouseout="this.style.background='transparent'">
                        <div style="position:relative; flex-shrink:0;">
                            ${u.avatar_url
                                ? `<img src="${u.avatar_url}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;"/>`
                                : `<div style="width:36px; height:36px; border-radius:50%; background:rgba(99,102,241,0.5); display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:600;">${(u.nombre||'?')[0].toUpperCase()}</div>`
                            }
                            ${online ? `<div style="position:absolute; bottom:0; right:0; width:9px; height:9px; background:#22c55e; border-radius:50%; border:2px solid #0a0a14;"></div>` : ''}
                        </div>
                        <div style="min-width:0;">
                            <p style="font-size:13px; color:#e2e8f0; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${u.nombre}</p>
                            ${u.pais ? `<p style="font-size:11px; color:#64748b; margin:0;">${u.pais}</p>` : ''}
                        </div>
                        ${online ? `<div style="margin-left:auto; font-size:9px; color:#22c55e; flex-shrink:0;">● online</div>` : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function abrirUserCard(dataStr) {
    const u = typeof dataStr === 'string' ? JSON.parse(dataStr.replace(/&quot;/g, '"')) : dataStr;
    const modal = document.getElementById('user-card-modal');
    const content = document.getElementById('user-card-content');
    if (!modal || !content) return;

    const onlineIds = new Set(
        typeof presenceChannel !== 'undefined' && presenceChannel
            ? Object.keys(presenceChannel.presenceState())
            : []
    );
    const online = onlineIds.has(u.id);

    content.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:14px;">
            <div style="position:relative;">
                ${u.avatar_url
                    ? `<img src="${u.avatar_url}" style="width:88px; height:88px; border-radius:50%; object-fit:cover; border:2px solid rgba(99,102,241,0.4);"/>`
                    : `<div style="width:88px; height:88px; border-radius:50%; background:rgba(99,102,241,0.6); display:flex; align-items:center; justify-content:center; color:white; font-size:36px; font-weight:600;">${(u.nombre||'?')[0].toUpperCase()}</div>`
                }
                ${online ? `<div style="position:absolute; bottom:4px; right:4px; width:14px; height:14px; background:#22c55e; border-radius:50%; border:2px solid #0f0f1a;"></div>` : ''}
            </div>
            <div>
                <p style="font-size:20px; font-weight:700; color:#e2e8f0; margin:0 0 4px;">${u.nombre || 'Sin nombre'}</p>
                ${u.pais ? `<p style="font-size:13px; color:#64748b; margin:0;">${u.pais}</p>` : ''}
                <p style="font-size:11px; color:${online ? '#22c55e' : '#475569'}; margin:6px 0 0;">${online ? '● Online ahora' : '○ Offline'}</p>
            </div>
            ${u.estado_corto ? `
                <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:10px 14px; width:100%;">
                    <p style="font-size:13px; color:#cbd5e1; margin:0; font-style:italic;">"${u.estado_corto}"</p>
                </div>` : ''
            }
            <button onclick="cerrarUserCard()" style="padding:8px 24px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#94a3b8; font-size:13px; cursor:pointer; width:100%;">Cerrar</button>
        </div>
    `;

    modal.style.display = 'flex';
}

function cerrarUserCard(e) {
    if (e && e.target !== document.getElementById('user-card-modal')) return;
    const modal = document.getElementById('user-card-modal');
    if (modal) modal.style.display = 'none';
}

async function renderChatInput() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    const area = document.getElementById('chat-input-area');
    if (!area) return;

    if (session) {
        area.innerHTML = `
            <div class="flex gap-3">
                <input id="chat-input" type="text"
                    placeholder="Escribe un mensaje..."
                    class="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3
                           text-white placeholder-slate-600
                           focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                <button id="send-btn"
                    class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500
                           rounded-xl text-white font-medium transition-colors duration-300">
                    Enviar
                </button>
            </div>
        `;
        document.getElementById('send-btn').addEventListener('click', sendMessage);
        document.getElementById('chat-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    } else {
        area.innerHTML = `
            <p class="text-center text-slate-500 text-sm">
                <a href="#auth" class="text-indigo-400 hover:underline">Inicia sesión</a>
                para participar en el chat.
            </p>
        `;
    }
}

async function loadMessages() {
    const { data, error } = await supabaseClient
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error cargando mensajes:', error);
        return;
    }

    await renderMessages(data);
}

async function renderMessages(messages) {
    const container = document.getElementById('messages-container');
    if (!container) return;

    if (messages.length === 0) {
        container.innerHTML = `
            <p class="chat-placeholder text-slate-500 text-sm text-center">
                Sé el primero en escribir algo.
            </p>
        `;
        return;
    }

    const htmlMensajes = [];
    for (const msg of messages) {
        const perfil = msg.user_id ? await getProfile(msg.user_id) : null;
        htmlMensajes.push(messageHTML(msg, perfil));
    }
    container.innerHTML = htmlMensajes.join('');
    container.scrollTop = container.scrollHeight;
}

function messageHTML(msg, perfil = null) {
    const time = new Date(msg.created_at).toLocaleTimeString('es-ES', {
        hour: '2-digit', minute: '2-digit'
    });
    const nombre = perfil?.nombre || msg.email.split('@')[0];
    const avatar = avatarHTML(perfil, msg.email, 32);

    return `
        <div class="flex gap-3 items-start">
            ${avatar}
            <div class="flex flex-col gap-1">
                <div class="flex items-baseline gap-2">
                    <span class="text-indigo-400 text-xs font-medium">${nombre}</span>
                    <span class="text-slate-600 text-xs">${time}</span>
                </div>
                <p class="text-slate-300 text-sm leading-relaxed">${msg.content}</p>
            </div>
        </div>
    `;
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const content = input.value.trim();
    if (!content) return;

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return;

    input.value = '';

    const { error } = await supabaseClient
        .from('messages')
        .insert({
            user_id: session.user.id,
            email:   session.user.email,
            content: content
        });

    if (error) {
        console.error('Error enviando:', error);
        input.value = content;
        return;
    }
}

function subscribeToMessages() {
    supabaseClient
        .channel('chat-room')
        .on('postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'messages' },
            async (payload) => {
                const container = document.getElementById('messages-container');
                if (!container) return;
                const placeholder = container.querySelector('.chat-placeholder');
                if (placeholder) placeholder.remove();
                const perfil = payload.new.user_id ? await getProfile(payload.new.user_id) : null;
                container.insertAdjacentHTML('beforeend', messageHTML(payload.new, perfil));
                container.scrollTop = container.scrollHeight;
            }
        )
        .subscribe();
}