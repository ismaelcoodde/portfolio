


function ChatView() {
    return `
        <section class="flex flex-col" style="height: calc(100dvh - 170px)">

            <div class="p-6 border-b border-white/10">
                <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-1">
                    Comunidad
                </p>
                <h2 class="text-2xl font-bold">Chat en vivo</h2>
            </div>
            
            <div id="messages-container"
                 class="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                <p class="text-slate-500 text-sm text-center">Un momento...</p>
            </div>
            
            <div id="chat-input-area" class="p-4 border-t border-white/10">
            </div>

        </section>
    `;
}

function initChat() {
    renderChatInput();
    loadMessages();
    subscribeToMessages(); // se llama solo una vez aquí
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

// loadMessages solo carga y renderiza, sin suscribirse (eso lo hace initChat)

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
        input.value = content; // restaura si hay error
        return;
    }

     // recarga como respaldo si el realtime tarda
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