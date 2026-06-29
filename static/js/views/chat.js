async function getProfile(userId) {
    if (typeof profilesCache !== 'undefined' && profilesCache[userId]) return profilesCache[userId];
    const { data } = await supabaseClient
        .from('profiles')
        .select('nombre, avatar_url, pais, estado_corto')
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
  const inicial = (profile?.nombre || email || "?")[0].toUpperCase();
  return `<div style="width:${size}px; height:${size}px; border-radius:50%; background:rgba(99,102,241,0.6); 
                        display:flex; align-items:center; justify-content:center; 
                        color:white; font-size:${size * 0.4}px; font-weight:600; flex-shrink:0;">
                ${inicial}
            </div>`;
}

function ChatView() {
  return `
        <section class="flex flex-col md:flex-row" style="min-height: calc(100dvh - 64px)">

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

            <!-- Panel central: chat -->
            <div class="flex-1 flex flex-col min-h-0 md:border-r border-white/10">

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

            <!-- Panel derecho: tablón -->
            <div class="md:w-80 flex flex-col flex-shrink-0 border-t md:border-t-0 md:border-l border-white/10">

                <!-- Header tablón -->
                <div class="p-4 md:p-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-1">Comunidad</p>
                        <h2 class="text-xl md:text-2xl font-bold">Tablón Público</h2>
                    </div>
                    <button id="nuevo-post-btn"
                            style="display:none;"
                            class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white text-xs font-medium transition-colors duration-300">
                        + Publicar
                    </button>
                </div>

                <!-- Formulario nuevo post (oculto por defecto) -->
                <div id="nuevo-post-form" style="display:none;" class="p-4 border-b border-white/10 flex flex-col gap-3">
                    <textarea id="post-descripcion"
                              placeholder="¿Qué quieres compartir?"
                              class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                                     text-white placeholder-slate-600 text-sm resize-none
                                     focus:outline-none focus:border-indigo-500 transition-colors duration-300"
                              rows="2"></textarea>
                    <label class="flex items-center gap-2 cursor-pointer text-slate-400 text-sm hover:text-slate-300 transition-colors">
                        <span id="imagen-label">📎 Adjuntar imagen</span>
                        <input id="post-imagen" type="file" accept="image/*" class="hidden"/>
                    </label>
                    <div class="flex gap-2">
                        <button id="publicar-btn"
                                class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-sm font-medium transition-colors duration-300">
                            Publicar
                        </button>
                        <button id="cancelar-post-btn"
                                class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 text-sm transition-colors duration-300">
                            Cancelar
                        </button>
                    </div>
                </div>

                <!-- Feed de posts -->
                <div id="posts-container" class="flex-1 overflow-y-auto flex flex-col">
                    <p class="text-slate-500 text-xs text-center p-6">Cargando...</p>
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
  initTablon();

  // Actualiza cada 5 segundos por si cambia la presencia
  const presenciaInterval = setInterval(() => {
    if (!document.getElementById("usuarios-lista")) {
      clearInterval(presenciaInterval);
      return;
    }
    cargarUsuarios();
  }, 5000);

  window.addEventListener("presencia-actualizada", () => {
    cargarUsuarios();
  });
}

async function cargarUsuarios() {
  const container = document.getElementById("usuarios-lista");
  if (!container) return;

  const { data: usuarios } = await supabaseClient
    .from("profiles")
    .select("id, nombre, avatar_url, pais, estado_corto")
    .not("nombre", "is", null)
    .order("created_at", { ascending: false });

  if (!usuarios || usuarios.length === 0) {
    container.innerHTML =
      '<p class="text-slate-500 text-xs p-4">Sin miembros aún</p>';
    return;
  }

  const onlineIds = new Set(
    typeof presenceChannel !== "undefined" && presenceChannel
      ? Object.keys(presenceChannel.presenceState())
      : [],
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
            ${ordenados
              .slice(0, 5)
              .map((u) => {
                const online = onlineIds.has(u.id);
                const data = JSON.stringify(u).replace(/"/g, "&quot;");
                return `
                    <div onclick="abrirUserCard('${data}')" class="flex flex-col items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0">
                        <div style="position:relative;">
                            ${
                              u.avatar_url
                                ? `<img src="${u.avatar_url}" style="width:40px; height:40px; border-radius:50%; object-fit:cover;"/>`
                                : `<div style="width:40px; height:40px; border-radius:50%; background:rgba(99,102,241,0.6); display:flex; align-items:center; justify-content:center; color:white; font-size:15px; font-weight:600;">${(u.nombre || "?")[0].toUpperCase()}</div>`
                            }
                            ${online ? `<div style="position:absolute; bottom:0; right:0; width:10px; height:10px; background:#22c55e; border-radius:50%; border:2px solid #0a0a14;"></div>` : ""}
                        </div>
                        <span style="font-size:10px; color:#94a3b8; max-width:44px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${u.nombre}</span>
                    </div>
                `;
              })
              .join("")}
        </div>

        <!-- Desktop: lista completa -->
        <div class="hidden md:flex flex-col">
            ${ordenados
              .map((u) => {
                const online = onlineIds.has(u.id);
                const data = JSON.stringify(u).replace(/"/g, "&quot;");
                return `
                    <div onclick="abrirUserCard('${data}')"
                         style="display:flex; align-items:center; gap:10px; padding:10px 16px; cursor:pointer; transition:background 0.15s;"
                         onmouseover="this.style.background='rgba(255,255,255,0.05)'"
                         onmouseout="this.style.background='transparent'">
                        <div style="position:relative; flex-shrink:0;">
                            ${
                              u.avatar_url
                                ? `<img src="${u.avatar_url}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;"/>`
                                : `<div style="width:36px; height:36px; border-radius:50%; background:rgba(99,102,241,0.5); display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:600;">${(u.nombre || "?")[0].toUpperCase()}</div>`
                            }
                            ${online ? `<div style="position:absolute; bottom:0; right:0; width:9px; height:9px; background:#22c55e; border-radius:50%; border:2px solid #0a0a14;"></div>` : ""}
                        </div>
                        <div style="min-width:0;">
                            <p style="font-size:13px; color:#e2e8f0; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${u.nombre}</p>
                            ${u.pais ? `<p style="font-size:11px; color:#64748b; margin:0;">${u.pais}</p>` : ""}
                        </div>
                        ${online ? `<div style="margin-left:auto; font-size:9px; color:#22c55e; flex-shrink:0;">● online</div>` : ""}
                    </div>
                `;
              })
              .join("")}
        </div>
    `;
}

function abrirUserCard(dataStr) {
  const u =
    typeof dataStr === "string"
      ? JSON.parse(dataStr.replace(/&quot;/g, '"'))
      : dataStr;
  const modal = document.getElementById("user-card-modal");
  const content = document.getElementById("user-card-content");
  if (!modal || !content) return;

  const onlineIds = new Set(
    typeof presenceChannel !== "undefined" && presenceChannel
      ? Object.keys(presenceChannel.presenceState())
      : [],
  );
  const online = onlineIds.has(u.id);

  content.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; gap:14px;">
            <div style="position:relative;">
                ${
                  u.avatar_url
                    ? `<img src="${u.avatar_url}" style="width:88px; height:88px; border-radius:50%; object-fit:cover; border:2px solid rgba(99,102,241,0.4);"/>`
                    : `<div style="width:88px; height:88px; border-radius:50%; background:rgba(99,102,241,0.6); display:flex; align-items:center; justify-content:center; color:white; font-size:36px; font-weight:600;">${(u.nombre || "?")[0].toUpperCase()}</div>`
                }
                ${online ? `<div style="position:absolute; bottom:4px; right:4px; width:14px; height:14px; background:#22c55e; border-radius:50%; border:2px solid #0f0f1a;"></div>` : ""}
            </div>
            <div>
                <p style="font-size:20px; font-weight:700; color:#e2e8f0; margin:0 0 4px;">${u.nombre || "Sin nombre"}</p>
                ${u.pais ? `<p style="font-size:13px; color:#64748b; margin:0;">${u.pais}</p>` : ""}
                <p style="font-size:11px; color:${online ? "#22c55e" : "#475569"}; margin:6px 0 0;">${online ? "● Online ahora" : "○ Offline"}</p>
            </div>
            ${
              u.estado_corto
                ? `
                <div style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:10px; padding:10px 14px; width:100%;">
                    <p style="font-size:13px; color:#cbd5e1; margin:0; font-style:italic;">"${u.estado_corto}"</p>
                </div>`
                : ""
            }
            <button onclick="cerrarUserCard()" style="padding:8px 24px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:10px; color:#94a3b8; font-size:13px; cursor:pointer; width:100%;">Cerrar</button>
        </div>
    `;

  modal.style.display = "flex";
}

function cerrarUserCard(e) {
  if (e && e.target !== document.getElementById("user-card-modal")) return;
  const modal = document.getElementById("user-card-modal");
  if (modal) modal.style.display = "none";
}

async function renderChatInput() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  const area = document.getElementById("chat-input-area");
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
    document.getElementById("send-btn").addEventListener("click", sendMessage);
    document.getElementById("chat-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
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
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error cargando mensajes:", error);
    return;
  }

  await renderMessages(data);
}

async function renderMessages(messages) {
  const container = document.getElementById("messages-container");
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
  container.innerHTML = htmlMensajes.join("");
  container.scrollTop = container.scrollHeight;
}

function messageHTML(msg, perfil = null) {
    const time = new Date(msg.created_at).toLocaleTimeString('es-ES', {
        hour: '2-digit', minute: '2-digit'
    });
    const nombre = perfil?.nombre || msg.email.split('@')[0];
    const avatar = avatarHTML(perfil, msg.email, 32);

    const perfilData = JSON.stringify({
        id: msg.user_id,
        nombre: perfil?.nombre || msg.email.split('@')[0],
        avatar_url: perfil?.avatar_url || null,
        pais: perfil?.pais || null,
        estado_corto: perfil?.estado_corto || null
    }).replace(/"/g, '&quot;');

    return `
        <div class="flex gap-3 items-start">
            <div onclick="abrirUserCard('${perfilData}')" style="cursor:pointer; flex-shrink:0;">
                ${avatar}
            </div>
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
  const input = document.getElementById("chat-input");
  const content = input.value.trim();
  if (!content) return;

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) return;

  input.value = "";

  const { error } = await supabaseClient.from("messages").insert({
    user_id: session.user.id,
    email: session.user.email,
    content: content,
  });

  if (error) {
    console.error("Error enviando:", error);
    input.value = content;
    return;
  }
}

function subscribeToMessages() {
  supabaseClient
    .channel("chat-room")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      async (payload) => {
        const container = document.getElementById("messages-container");
        if (!container) return;
        const placeholder = container.querySelector(".chat-placeholder");
        if (placeholder) placeholder.remove();
        const perfil = payload.new.user_id
          ? await getProfile(payload.new.user_id)
          : null;
        container.insertAdjacentHTML(
          "beforeend",
          messageHTML(payload.new, perfil),
        );
        container.scrollTop = container.scrollHeight;
      },
    )
    .subscribe();
}

async function initTablon() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  // Mostrar botón publicar solo si hay sesión
  const btn = document.getElementById("nuevo-post-btn");
  if (btn && session) btn.style.display = "block";

  // Toggle formulario
  document.getElementById("nuevo-post-btn")?.addEventListener("click", () => {
    const form = document.getElementById("nuevo-post-form");
    form.style.display = form.style.display === "none" ? "flex" : "none";
    form.style.flexDirection = "column";
  });

  document
    .getElementById("cancelar-post-btn")
    ?.addEventListener("click", () => {
      document.getElementById("nuevo-post-form").style.display = "none";
      document.getElementById("post-descripcion").value = "";
      document.getElementById("post-imagen").value = "";
      document.getElementById("imagen-label").textContent =
        "📎 Adjuntar imagen";
    });

  // Preview nombre del archivo seleccionado
  document.getElementById("post-imagen")?.addEventListener("change", (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      document.getElementById("imagen-label").textContent =
        `✅ ${archivo.name}`;
    }
  });

  document
    .getElementById("publicar-btn")
    ?.addEventListener("click", publicarPost);

  // Cargar posts existentes
  await cargarPosts();

  // Suscripción realtime
  supabaseClient
    .channel("posts-room")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "posts" },
      async (payload) => {
        const container = document.getElementById("posts-container");
        if (!container) return;
        const placeholder = container.querySelector(".posts-placeholder");
        if (placeholder) placeholder.remove();
        const perfil = await getProfile(payload.new.user_id);
        const html = await renderPost(payload.new, perfil);
        container.insertAdjacentHTML("afterbegin", html);
      },
    )
    .subscribe();
}

async function cargarPosts() {
  const container = document.getElementById("posts-container");
  if (!container) return;

  const { data: posts, error } = await supabaseClient
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !posts || posts.length === 0) {
    container.innerHTML =
      '<p class="posts-placeholder text-slate-500 text-xs text-center p-6">Aún no hay publicaciones.</p>';
    return;
  }

  const htmlPosts = [];
  for (const post of posts) {
    const perfil = await getProfile(post.user_id);
    htmlPosts.push(await renderPost(post, perfil));
  }
  container.innerHTML = htmlPosts.join("");
}

async function publicarPost() {
  const descripcion = document.getElementById("post-descripcion").value.trim();
  const archivoInput = document.getElementById("post-imagen");
  const archivo = archivoInput.files[0];

  if (!descripcion && !archivo) return;

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) return;

  const btn = document.getElementById("publicar-btn");
  btn.textContent = "Publicando...";
  btn.disabled = true;

  let imagen_url = null;

  // Subir imagen si hay una
  if (archivo) {
    const extension = archivo.name.split(".").pop();
    const nombreArchivo = `${session.user.id}/${Date.now()}.${extension}`;

    const { error: uploadError } = await supabaseClient.storage
      .from("posts-images")
      .upload(nombreArchivo, archivo);

    if (uploadError) {
      console.error("Error subiendo imagen:", uploadError);
      btn.textContent = "Publicar";
      btn.disabled = false;
      return;
    }

    const { data: urlData } = supabaseClient.storage
      .from("posts-images")
      .getPublicUrl(nombreArchivo);

    imagen_url = urlData.publicUrl;
  }

  // Insertar post en la tabla
  const { error } = await supabaseClient.from("posts").insert({
    user_id: session.user.id,
    descripcion: descripcion || null,
    imagen_url: imagen_url,
  });

  if (error) {
    console.error("Error publicando:", error);
    btn.textContent = "Publicar";
    btn.disabled = false;
    return;
  }

  // Limpiar formulario
  document.getElementById("post-descripcion").value = "";
  archivoInput.value = "";
  document.getElementById("imagen-label").textContent = "📎 Adjuntar imagen";
  document.getElementById("nuevo-post-form").style.display = "none";
  btn.textContent = "Publicar";
  btn.disabled = false;
}

async function renderPost(post, perfil) {
  const fecha = new Date(post.created_at).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const hora = new Date(post.created_at).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const nombre = perfil?.nombre || "Usuario";
  const avatar = avatarHTML(perfil, nombre, 32);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  const esMio = session && session.user.id === post.user_id;

  const perfilData = JSON.stringify({
    id: post.user_id,
    nombre: perfil?.nombre || "Usuario",
    avatar_url: perfil?.avatar_url || null,
    pais: perfil?.pais || null,
    estado_corto: perfil?.estado_corto || null,
  }).replace(/"/g, "&quot;");
  console.log('perfil en renderPost:', perfil);


  return `
        <div id="post-${post.id}" style="padding:16px; border-bottom:1px solid rgba(255,255,255,0.06);">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <div onclick="abrirUserCard('${perfilData}')" style="cursor:pointer; flex-shrink:0;">
                    ${avatar}
                </div>
                <div style="min-width:0; flex:1;">
                    <p style="font-size:13px; color:#e2e8f0; margin:0; font-weight:500;">${nombre}</p>
                    <p style="font-size:11px; color:#475569; margin:0;">${fecha} · ${hora}</p>
                </div>
                ${
                  esMio
                    ? `
                    <button onclick="borrarPost('${post.id}', '${post.imagen_url || ""}')"
                            style="background:none; border:none; cursor:pointer; color:#475569; padding:4px; transition:color 0.15s;"
                            onmouseover="this.style.color='#ef4444'"
                            onmouseout="this.style.color='#475569'">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6"/><path d="M14 11v6"/>
                            <path d="M9 6V4h6v2"/>
                        </svg>
                    </button>
                `
                    : ""
                }
            </div>
            ${
              post.imagen_url
                ? `
                <img src="${post.imagen_url}"
                     style="width:100%; border-radius:12px; object-fit:cover; max-height:200px; margin-bottom:${post.descripcion ? "10px" : "0"};"
                     loading="lazy"/>
            `
                : ""
            }
            ${
              post.descripcion
                ? `
                <p style="font-size:13px; color:#cbd5e1; margin:0; line-height:1.5;">${post.descripcion}</p>
            `
                : ""
            }
        </div>
    `;
}

async function borrarPost(postId, imagenUrl) {
  if (!confirm("¿Borrar esta publicación?")) return;

  if (imagenUrl) {
    const path = imagenUrl.split("/posts-images/")[1];
    if (path) await supabaseClient.storage.from("posts-images").remove([path]);
  }

  await supabaseClient.from("posts").delete().eq("id", postId);

  const el = document.getElementById(`post-${postId}`);
  if (el) el.remove();
}
