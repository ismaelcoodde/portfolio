function AhoraView() {
  return /*html*/ `
        <section class="flex flex-col items-center px-6 py-16 max-w-lg mx-auto">

            <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center">
                Mi momento actual
            </p>
            <h1 class="text-4xl font-extrabold text-center mb-10">Ahora mismo</h1>

            <!-- TARJETA DEL ESTADO -->
            <div class="w-full bg-white/5 border border-white/10 rounded-2xl p-6">

                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm">
                        IC
                    </div>
                    <div>
                        <p class="text-white font-medium text-sm">Ismael Cruz</p>
                        <p id="estado-fecha" class="text-slate-500 text-xs"></p>
                    </div>
                    <span id="estado-animo-emoji" class="ml-auto text-2xl"></span>
                </div>

                <div class="flex flex-col gap-5">

                    <div class="border-l-2 border-indigo-500/50 pl-4">
                        <p class="text-slate-500 text-xs mb-1">Haciendo</p>
                        <p id="estado-haciendo" class="text-white text-sm"></p>
                    </div>

                    <div class="border-l-2 border-indigo-500/50 pl-4">
                        <p class="text-slate-500 text-xs mb-1">Estado de ánimo</p>
                        <p id="estado-animo" class="text-white text-sm"></p>
                    </div>

                    <div class="border-l-2 border-indigo-500/50 pl-4">
                        <p class="text-slate-500 text-xs mb-1">Escuchando</p>
                        <p id="estado-escuchando" class="text-white text-sm"></p>
                    </div>

                    <div class="border-l-2 border-pink-500/50 pl-4">
                        <p class="text-pink-400/70 text-xs mb-1">En mi cabeza</p>
                        <p id="estado-cabeza" class="text-white text-sm italic"></p>
                    </div>

                    <div class="border-l-2 border-indigo-500/50 pl-4">
                        <p class="text-slate-500 text-xs mb-1">Objetivo esta semana</p>
                        <p id="estado-objetivo" class="text-white text-sm"></p>
                    </div>

                </div>

                    <div class="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/10">
                    <button class="reaccion-btn flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:border-pink-500/50 hover:text-pink-400 transition-all duration-300" data-tipo="❤️">
                        ❤️ <span id="reaccion-❤️">0</span>
                    </button>
                    <button class="reaccion-btn flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300" data-tipo="🔥">
                        🔥 <span id="reaccion-🔥">0</span>
                    </button>
                    <button class="reaccion-btn flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:border-indigo-500/50 hover:text-indigo-400 transition-all duration-300" data-tipo="👏">
                        👏 <span id="reaccion-👏">0</span>
                    </button>
                    <button class="reaccion-btn flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:border-green-500/50 hover:text-green-400 transition-all duration-300" data-tipo="sonrisa">
                        😊 <span id="reaccion-sonrisa">0</span>
                    </button>
                    <button class="reaccion-btn flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:border-blue-500/50 hover:text-blue-400 transition-all duration-300" data-tipo="triste">
                        😢 <span id="reaccion-triste">0</span>
                    </button>
                </div>

            </div>

            <!-- FORMULARIO NUEVO ESTADO (solo visible para ti) -->
            <div id="formulario-estado" class="w-full bg-white/5 border border-indigo-500/30 rounded-2xl p-6 mt-6 hidden">

                <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-5">Publicar nuevo estado</p>

                <div class="flex flex-col gap-4">

                    <div>
                        <p class="text-slate-500 text-xs mb-2">¿Qué estás haciendo?</p>
                        <input id="form-haciendo" type="text" placeholder="Rediseñando mi web..."
                            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    </div>

                    <div>
                        <p class="text-slate-500 text-xs mb-2">Estado de ánimo</p>
                        <div id="form-animo-selector" class="flex flex-wrap gap-2 mb-2">
                            <button type="button" data-valor="🔥 En llamas" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">🔥 En llamas</button>
                            <button type="button" data-valor="😌 Tranquilo" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">😌 Tranquilo</button>
                            <button type="button" data-valor="😊 Feliz" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">😊 Feliz</button>
                            <button type="button" data-valor="😢 Triste" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">😢 Triste</button>
                            <button type="button" data-valor="🥰 Ilusionado" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">🥰 Ilusionado</button>
                            <button type="button" data-valor="😴 Cansado" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">😴 Cansado</button>
                            <button type="button" data-valor="🤯 Saturado" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">🤯 Saturado</button>
                            <button type="button" data-valor="😔 Pensativo" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">😔 Pensativo</button>
                            <button type="button" data-valor="🎉 Celebrando" class="animo-btn px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-indigo-500/50 transition-all duration-300">🎉 Celebrando</button>
                        </div>
                        <input id="form-animo" type="text" placeholder="O escribe el tuyo..."
                            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    </div>

                    <div>
                        <p class="text-slate-500 text-xs mb-2">¿Qué estás escuchando?</p>
                        <input id="form-escuchando" type="text" placeholder="Artista — Canción..."
                            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    </div>

                    <div>
                        <p class="text-pink-400/70 text-xs mb-2">¿Qué tienes en la cabeza?</p>
                        <input id="form-cabeza" type="text" placeholder="Algo o alguien..."
                            class="w-full bg-white/5 border border-pink-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-pink-500/50 transition-colors duration-300"/>
                    </div>

                    <div>
                        <p class="text-slate-500 text-xs mb-2">Objetivo esta semana</p>
                        <input id="form-objetivo" type="text" placeholder="Lo que quieres conseguir..."
                            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    </div>

                    <div>
                        <p class="text-slate-500 text-xs mb-2">¿Desde dónde escribes?</p>
                        <input id="form-ubicacion" type="text" placeholder="Palma, la playa, casa..."
                            class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors duration-300"/>
                    </div>

                </div>

                <p id="form-status" class="text-sm text-center mt-4 hidden"></p>

                <button id="form-publicar"
                    class="w-full mt-5 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-sm font-medium transition-colors duration-300">
                    Publicar estado
                </button>

            </div>
                
                    <!-- COMENTARIOS -->
            <div class="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mt-6">

                <p class="text-white font-medium text-sm mb-5">
                    Comentarios <span id="comentarios-count" class="text-slate-500 font-normal">(0)</span>
                </p>

                <!-- Lista de comentarios -->
                <div id="comentarios-lista" class="flex flex-col gap-5 mb-6">
                </div>

                <!-- Formulario nuevo comentario -->
                <div class="border-t border-white/10 pt-5">
                    <textarea id="comentario-input" rows="3" placeholder="Escribe algo..."
                        class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                               text-white placeholder-slate-600 text-sm
                               focus:outline-none focus:border-indigo-500 transition-colors duration-300 resize-none"></textarea>
                    <div class="flex items-center justify-between mt-3">
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-green-500"></div>
                            <p class="text-slate-500 text-xs">Comentando como <span id="comentando-como" class="text-white">Anónimo</span></p>
                        </div>
                        <button id="comentario-btn"
                            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white text-sm transition-colors duration-300">
                            Enviar
                        </button>
                    </div>
                </div>

            </div>

            <!-- FEED DE ESTADOS ANTERIORES -->
            <div class="w-full mt-8">
                <p class="text-slate-500 text-xs font-medium tracking-[0.3em] uppercase mb-4">Estados anteriores</p>
                <div id="feed-estados" class="flex flex-col gap-4">
                </div>
            </div>

        </section>
        
    `;
}
function mostrarStatus(id, mensaje, tipo) {
  const el = document.getElementById(id);
  el.textContent = mensaje;
  el.className =
    tipo === "success"
      ? "text-green-400 text-sm text-center mt-4"
      : "text-red-400 text-sm text-center mt-4";
}

async function cargarReacciones(estadoId) {
  const res = await fetch(`/api/reacciones/${estadoId}`);
  const data = await res.json();
  document.getElementById("reaccion-❤️").textContent =
    data.reacciones["❤️"] || 0;
  document.getElementById("reaccion-🔥").textContent =
    data.reacciones["🔥"] || 0;
  document.getElementById("reaccion-👏").textContent =
    data.reacciones["👏"] || 0;
    document.getElementById('reaccion-sonrisa').textContent = data.reacciones['sonrisa'] || 0;  // cambia esto
    document.getElementById('reaccion-triste').textContent = data.reacciones['triste'] || 0;    // y esto
}

async function cargarComentarios(estadoId) {
  const resC = await fetch(`/api/comentarios/${estadoId}`);
  const dataC = await resC.json();

  const lista = document.getElementById("comentarios-lista");
  const count = document.getElementById("comentarios-count");

  count.textContent = `(${dataC.comentarios.length})`;

  if (dataC.comentarios.length === 0) {
    lista.innerHTML =
      '<p class="text-slate-500 text-sm">Sé el primero en comentar.</p>';
  } else {
    lista.innerHTML = dataC.comentarios
      .map((c) => {
        const avatar = c.es_anonimo
          ? `<div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 flex-shrink-0 text-lg">👻</div>`
          : `<div class="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs flex-shrink-0">${c.autor.slice(0, 2).toUpperCase()}</div>`;

        const fechaC = new Date(c.creado_en).toLocaleDateString("es-ES", {
          day: "numeric",
          month: "short",
        });

        return `
                <div class="flex gap-3">
                    ${avatar}
                    <div>
                        <div class="flex items-baseline gap-2 mb-1">
                            <p class="text-white text-sm font-medium">${c.autor}</p>
                            <p class="text-slate-500 text-xs">${fechaC}</p>
                        </div>
                        <p class="text-slate-300 text-sm">${c.texto}</p>
                    </div>
                </div>
            `;
      })
      .join("");
  }
}

async function cargarFeed() {
    const res = await fetch('/api/estados');
    const data = await res.json();

    const feed = document.getElementById('feed-estados');

    if (!data.ok || data.estados.length <= 1) {
        feed.innerHTML = '<p class="text-slate-500 text-sm">Aún no hay estados anteriores.</p>';
        return;
    }

    // Saltamos el primero porque ya se muestra arriba como estado actual
    const anteriores = data.estados.slice(1);

    feed.innerHTML = anteriores.map(e => {
        const fecha = new Date(e.creado_en).toLocaleDateString('es-ES', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        return `
            <div class="w-full bg-white/5 border border-white/10 rounded-2xl p-5">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-xs flex-shrink-0">
                        IC
                    </div>
                    <div>
                        <p class="text-white text-xs font-medium">Ismael Cruz</p>
                        <p class="text-slate-500 text-xs">${fecha} · ${e.ubicacion || ''}</p>
                    </div>
                    <span class="ml-auto text-lg">${e.estado_animo?.split(' ')[0] || ''}</span>
                </div>

                <div class="flex flex-col gap-3">
                    ${e.haciendo ? `
                    <div class="border-l-2 border-indigo-500/30 pl-3">
                        <p class="text-slate-500 text-xs mb-0.5">Haciendo</p>
                        <p class="text-slate-300 text-sm">${e.haciendo}</p>
                    </div>` : ''}

                    ${e.estado_animo ? `
                    <div class="border-l-2 border-indigo-500/30 pl-3">
                        <p class="text-slate-500 text-xs mb-0.5">Estado de ánimo</p>
                        <p class="text-slate-300 text-sm">${e.estado_animo}</p>
                    </div>` : ''}

                    ${e.escuchando ? `
                    <div class="border-l-2 border-indigo-500/30 pl-3">
                        <p class="text-slate-500 text-xs mb-0.5">Escuchando</p>
                        <p class="text-slate-300 text-sm">${e.escuchando}</p>
                    </div>` : ''}

                    ${e.en_mi_cabeza ? `
                    <div class="border-l-2 border-pink-500/30 pl-3">
                        <p class="text-pink-400/70 text-xs mb-0.5">En mi cabeza</p>
                        <p class="text-slate-300 text-sm italic">"${e.en_mi_cabeza}"</p>
                    </div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

async function initAhora() {
  try {
    // Comprobamos si hay sesión activa
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    const usuario = session?.user;
    const nombreMostrado = usuario
      ? usuario.user_metadata?.full_name ||
        usuario.user_metadata?.name ||
        usuario.email.split("@")[0]
      : "Anónimo";

    document.getElementById("comentando-como").textContent = nombreMostrado;

    // Mostramos el formulario solo si eres tú
    if (usuario && usuario.email === "ibcruzismael@gmail.com") {
      document.getElementById("formulario-estado").classList.remove("hidden");

      // Selector de estado de ánimo
      let animoSeleccionado = "";
      document.querySelectorAll(".animo-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".animo-btn").forEach((b) => {
            b.classList.remove("border-indigo-500", "text-indigo-400");
            b.classList.add("border-white/10");
          });
          btn.classList.add("border-indigo-500", "text-indigo-400");
          btn.classList.remove("border-white/10");
          animoSeleccionado = btn.dataset.valor;
          document.getElementById("form-animo").value = animoSeleccionado;
        });
      });

      // Botón publicar
      document
        .getElementById("form-publicar")
        .addEventListener("click", async () => {
          const haciendo = document
            .getElementById("form-haciendo")
            .value.trim();
          const animo = document.getElementById("form-animo").value.trim();
          const escuchando = document
            .getElementById("form-escuchando")
            .value.trim();
          const cabeza = document.getElementById("form-cabeza").value.trim();
          const objetivo = document
            .getElementById("form-objetivo")
            .value.trim();
          const ubicacion = document
            .getElementById("form-ubicacion")
            .value.trim();

          if (!haciendo || !animo) {
            mostrarStatus(
              "form-status",
              'El campo "Haciendo" y "Estado de ánimo" son obligatorios.',
              "error",
            );
            return;
          }

          const btn = document.getElementById("form-publicar");
          btn.textContent = "Publicando...";
          btn.disabled = true;

          try {
            const res = await fetch("/api/estado", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                haciendo,
                estado_animo: animo,
                escuchando,
                en_mi_cabeza: cabeza,
                objetivo,
                ubicacion,
              }),
            });
            const data = await res.json();
            if (data.ok) {
              mostrarStatus("form-status", "¡Estado publicado!", "success");
              setTimeout(() => location.reload(), 1000);
            }
          } catch (err) {
            mostrarStatus("form-status", "Error al publicar.", "error");
          } finally {
            btn.textContent = "Publicar estado";
            btn.disabled = false;
          }
        });
    }

    const res = await fetch("/api/estado");
    const data = await res.json();

    if (!data.ok || !data.estado) {
      document.getElementById("estado-haciendo").textContent =
        "Sin estado publicado aún";
      return;
    }

    const e = data.estado;

    document.getElementById("estado-haciendo").textContent = e.haciendo || "";
    document.getElementById("estado-animo").textContent = e.estado_animo || "";
    document.getElementById("estado-animo-emoji").textContent =
      e.estado_animo?.split(" ")[0] || "";
    document.getElementById("estado-escuchando").textContent =
      e.escuchando || "";
    document.getElementById("estado-cabeza").textContent = e.en_mi_cabeza
      ? `"${e.en_mi_cabeza}"`
      : "";
    document.getElementById("estado-objetivo").textContent = e.objetivo || "";

    const fecha = new Date(e.creado_en);
    document.getElementById("estado-fecha").textContent =
      fecha.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " · " +
      (e.ubicacion || "");

    // Cargamos los comentarios de este estado
    await cargarComentarios(e.id);

    // Cargamos las reacciones
    await cargarReacciones(e.id);

            // Cargamos el feed de estados anteriores
        await cargarFeed();

    // Lógica de los botones de reacción
    document.querySelectorAll(".reaccion-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const tipo = btn.dataset.tipo;

        try {
          await fetch("/api/reacciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ estado_id: e.id, tipo }),
          });
          await cargarReacciones(e.id);
        } catch (err) {
          console.error("Error enviando reacción:", err);
        }
      });
    });

    // Lógica del botón enviar comentario
    document
      .getElementById("comentario-btn")
      .addEventListener("click", async () => {
        const texto = document.getElementById("comentario-input").value.trim();
        if (!texto) return;

        const btn = document.getElementById("comentario-btn");
        btn.textContent = "Enviando...";
        btn.disabled = true;

        try {
          const res = await fetch("/api/comentarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              estado_id: e.id,
              texto: texto,
              autor: usuario
                ? usuario.user_metadata?.full_name ||
                  usuario.user_metadata?.name ||
                  usuario.email.split("@")[0]
                : "Anónimo",
              es_anonimo: usuario ? false : true,
            }),
          });

          const data = await res.json();
          if (data.ok) {
            document.getElementById("comentario-input").value = "";
            await cargarComentarios(e.id);
          }
        } catch (err) {
          console.error("Error enviando comentario:", err);
        } finally {
          btn.textContent = "Enviar";
          btn.disabled = false;
        }
      });
  } catch (error) {
    console.error("Error cargando el estado:", error);
  }
}
