function HomeView() {
  return `
        <section class="flex flex-col items-center justify-center px-6 py-16">

            <div style="position:relative; display:inline-block; cursor:pointer;" id="hero-foto-wrapper">
                <div class="photo-ring" id="hero-foto">
                    <div class="photo-ring-spinner" id="hero-anillo"></div>
                    <img src="/images/yo2.jpg" alt="Ismael Cruz" />
                </div>
                <div id="hero-burbuja" style="display:none; position:absolute; top:-10px; left:67%; transform:translateX(-10%); width:130px; cursor:pointer;">
                    <div style="background:rgba(15,15,26,0.95); border:1px solid rgba(168,85,247,0.4); border-radius:12px; padding:8px 12px;">
                        <p style="font-size:10px; color:#a855f7; margin:0 0 3px; text-transform:uppercase; letter-spacing:0.05em;">nuevo estado</p>
                        <p id="hero-burbuja-texto" style="font-size:12px; color:#e2e8f0; margin:0; line-height:1.4;"></p>
                    </div>
                    <div style="position:absolute; left:-7px; top:50%; transform:translateY(-50%); width:0; height:0; border-top:6px solid transparent; border-bottom:6px solid transparent; border-right:7px solid rgba(168,85,247,0.4);"></div>
                </div>
            </div>

            <h1 class="text-3xl font-bold text-white mb-2 fade-up">Ismael Cruz Fernandez</h1>
            <p class="text-indigo-400 text-sm tracking-widest uppercase mb-4 fade-up">ENTRE CÓDIGO Y ESTRELLAS</p>
            <p class="text-slate-400 text-center max-w-md leading-relaxed fade-up mb-5">Palma de Mallorca, España. 1994</p>

            <div class="flex gap-6 mt-8 fade-up">
                <a href="https://www.instagram.com/ismaelcruzfernandez_/" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-pink-400 transition-colors duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="https://www.facebook.com/profile.php?id=100053090172826" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-blue-400 transition-colors duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/ismael-cruz-fernandez-180989144/" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-blue-400 transition-colors duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.tiktok.com/@ismaelcruzfernandez" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-white transition-colors duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
                <a href="https://discord.com/users/codigobeach" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-indigo-400 transition-colors duration-300">
                    <svg width="22" height="22" viewBox="0 0 127.14 96.36" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
                </a>
                <a href="https://github.com/ismaelcoodde" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-purple-400 transition-colors duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
            </div>

            <button id="btn-notificaciones" style="display:none; margin-top:16px; padding:8px 16px; background:rgba(99,102,241,0.15); border:1px solid rgba(99,102,241,0.3); border-radius:10px; color:#a5b4fc; font-size:12px; cursor:pointer;">
                🔔 Activar notificaciones
            </button>

            <div id="lastfm-widget" class="mt-6 fade-up md:hidden">
                <p class="text-slate-600 text-xs text-center">Cargando música...</p>
            </div>

            <div class="mt-20 fade-up w-full max-w-sm md:max-w-md">
                <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p class="text-indigo-400 text-xs uppercase tracking-widest font-medium mb-2">¿QUÉ ES ESTE SITIO?</p>
                    <div class="max-h-40 overflow-y-auto pr-1" style="scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.1) transparent;">
                        <p class="text-slate-400 text-xs md:text-sm leading-relaxed">
                            Bienvenidos a mi patio de recreo digital. No soy desarrollador profesional, pero he encontrado en la programación un lenguaje fascinante para dar forma a ideas y poner en practica los conocimientos que voy adquiriendo. Este rincón de internet es un experimento. Lo empecé simplemente porque estoy aprendiendo a desarrollar lógica y quería un lienzo en blanco donde poner en práctica mis ideas. No busca venderte nada, solo es un reflejo de lo que hago y lo que me gusta.
                        </p>
                    </div>
                </div>
            </div>

            <div class="mb-16 mx-auto w-full max-w-lg md:max-w-xl px-0 mt-12 fade-up">
                <div class="flex items-center justify-center mb-4">
                    <p class="text-slate-500 text-xs font-medium tracking-[0.3em] uppercase mr-3">Fotos recientes</p>
                    <a href="#gallery" class="text-indigo-400 text-xs hover:underline">Ver todas →</a>
                </div>
                <div id="home-fotos-grid" class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <p class="text-slate-500 text-sm col-span-3 text-center py-8">Cargando...</p>
                </div>
            </div>

        </section>

        <!-- Chat solo desktop -->
        <div id="home-chat" class="hidden md:block md:absolute md:left-8 md:top-24 md:w-72">
            <div style="background:rgba(13,17,23,0.9); border:1px solid rgba(255,255,255,0.1); border-radius:16px; overflow:hidden; backdrop-filter:blur(10px);">
                <div class="p-4 border-b border-white/10">
                    <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-1">Comunidad</p>
                    <h3 class="text-sm font-bold">Chat en vivo</h3>
                </div>
                <div id="home-messages-container" style="height:200px; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:8px;">
                    <p class="text-slate-500 text-xs text-center">Cargando...</p>
                </div>
                <div id="home-chat-input" class="p-3 border-t border-white/10"></div>
            </div>
        </div>

        <!-- GitHub Stats solo desktop -->
        <div id="github-card" class=" md:absolute md:left-8 md:top-150 md:w-72">
            <p class="text-slate-500 text-xs text-center">Cargando GitHub...</p>
        </div>

        <!-- Botón salud solo desktop -->
        <div id="health-section" class=" md:absolute md:left-8 md:w-72 mt-4">
            <button onclick="toggleHealthPanel()" style="width:100%; display:flex; align-items:center; gap:10px; background:rgba(13,17,23,0.9); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:12px 16px; cursor:pointer; transition:border-color 0.3s;" onmouseover="this.style.borderColor='rgba(239,68,68,0.4)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
                <span style="font-size:13px; color:#e6edf3; font-weight:500;">Salud</span>
                <span style="margin-left:auto; color:#8b949e; font-size:12px;">→</span>
            </button>
        </div>
    `;
}

async function handleSubmit() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) { showStatus("Por favor rellena todos los campos.", "error"); return; }
  const btn = document.getElementById("submit-btn");
  btn.textContent = "Enviando...";
  btn.disabled = true;
  try {
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }) });
    const data = await response.json();
    if (data.ok) {
      showStatus("¡Mensaje enviado! Te respondo pronto.", "success");
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    } else { showStatus("Algo salió mal. Inténtalo de nuevo.", "error"); }
  } catch (error) { showStatus("Error de conexión. Inténtalo de nuevo.", "error"); }
  finally { btn.textContent = "Enviar mensaje"; btn.disabled = false; }
}

function showStatus(message, type) {
  const el = document.getElementById("status-msg");
  el.textContent = message;
  el.className = type === "success" ? "text-green-400 text-sm text-center" : "text-red-400 text-sm text-center";
}

const projects = [
  { title: "Full Stack Developer", description: "Especialista en tiendas online, plataformas de reservas automatizadas e integración de pagos seguros. Soluciones rápidas, modernas y listas para hacer crecer tu negocio.", url: "#works", images: ["/images/programacion.png", "/images/programacion2.jpg", "/images/programacion3.jpg"] },
  { title: "Astrofotografía", description: "Aprendiendo cada día un poco más sobre los misterios del cielo nocturno, capturando desde los detalles de la Luna hasta nuestros planetas vecinos. A veces, la mejor forma de poner los pies en la tierra es pasar la noche mirando hacia el cielo.", url: "#gallery", images: ["/images/luna1.JPG", "/images/luna2.JPG", "/images/astrofotografia.png"] },
  { title: "¿Quien soy?", description: "mi espacio personal", url: "#gallery", images: ["/images/astrofotografia.png", "/images/yo2.jpg", "/images/programacion.png"] }
];

function initProjectCard() {
  const imgs = document.querySelectorAll("#card-images img");
  const title = document.getElementById("card-title");
  const desc = document.getElementById("card-desc");
  const btn = document.getElementById("card-btn");
  const prev = document.getElementById("proj-prev");
  const next = document.getElementById("proj-next");
  const card = document.getElementById("project-card");
  if (!imgs.length) return;
  let currentProject = 0, currentImg = 0, imgTimer;
  function loadProject(index) {
    const p = projects[index];
    title.textContent = p.title;
    desc.textContent = p.description;
    btn.href = p.url;
    imgs.forEach((img, i) => { img.src = p.images[i]; img.classList.toggle("opacity-100", i === 0); img.classList.toggle("opacity-0", i !== 0); });
    currentImg = 0;
    clearInterval(imgTimer);
    imgTimer = setInterval(() => { imgs[currentImg].classList.replace("opacity-100", "opacity-0"); currentImg = (currentImg + 1) % imgs.length; imgs[currentImg].classList.replace("opacity-0", "opacity-100"); }, 3500);
  }
  function goTo(index) { currentProject = (index + projects.length) % projects.length; loadProject(currentProject); }
  prev.addEventListener("click", () => goTo(currentProject - 1));
  next.addEventListener("click", () => goTo(currentProject + 1));
  let startX = 0;
  card.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
  card.addEventListener("touchend", (e) => { const diff = startX - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) goTo(currentProject + (diff > 0 ? 1 : -1)); });
  loadProject(0);
}

async function comprobarEstadoNuevo() {
  try {
    const res = await fetch("/api/estado");
    const data = await res.json();
    if (!data.ok || !data.estado) return;
    const estado = data.estado;
    const ultimaVista = localStorage.getItem("estado_ultima_vista");
    const fechaEstado = new Date(estado.creado_en).getTime();
    const fechaVista = ultimaVista ? new Date(ultimaVista).getTime() : 0;
    if (fechaEstado > fechaVista) {
      document.getElementById("hero-anillo").style.background = "conic-gradient(from 0deg, #a855f7, #c084fc, #34d399, #6ee7b7, #a855f7, #34d399, #a855f7)";
      const burbuja = document.getElementById("hero-burbuja");
      const texto = document.getElementById("hero-burbuja-texto");
      texto.textContent = estado.haciendo || estado.estado_animo || "nuevo estado";
      burbuja.style.display = "block";
    }
    document.getElementById("hero-foto-wrapper").addEventListener("click", () => {
      localStorage.setItem("estado_ultima_vista", new Date().toISOString());
      document.getElementById("hero-anillo").style.background = "";
      document.getElementById("hero-burbuja").style.display = "none";
      window.location.hash = "#ahora";
    });
  } catch (error) { console.error("Error comprobando estado nuevo:", error); }
}

async function cargarFotosRecientes() {
  const { data, error } = await supabaseClient.from("photos").select("id, url, description").order("created_at", { ascending: false }).limit(6);
  const grid = document.getElementById("home-fotos-grid");
  if (!grid || error || !data || data.length === 0) return;
  grid.innerHTML = data.map((photo) => `
    <div onclick="window.location.hash='#gallery'" class="relative aspect-square overflow-hidden rounded-xl cursor-pointer group">
        <img src="${photo.url}" alt="${photo.description || ""}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
    </div>`).join("");
}

async function cargarMusicaActual() {
  try {
    const res = await fetch("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Ibcruz94&api_key=370f4140de1aad49efa9610c04b799f9&format=json&limit=1");
    const data = await res.json();
    const track = data.recenttracks.track[0];
    const escuchando = track["@attr"]?.nowplaying === "true";
    const cancion = track.name;
    const artista = track.artist["#text"];
    const caratula = track.image[2]["#text"];
    const spotifyUrl = `https://open.spotify.com/search/${encodeURIComponent(cancion)}%20${encodeURIComponent(artista)}`;
    const widget = document.getElementById("lastfm-widget");
    if (!widget) return;
    const navWidget = document.getElementById("nav-lastfm");
    if (navWidget) {
      navWidget.innerHTML = `
        <a href="${spotifyUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:flex; align-items:center; gap:8px;">
            ${caratula ? `<img src="${caratula}" style="width:28px; height:28px; border-radius:4px; object-fit:cover;"/>` : ""}
            <div>
                <p style="font-size:9px; color:${escuchando ? "#1db954" : "#64748b"}; margin:0; text-transform:uppercase; letter-spacing:0.05em;">${escuchando ? "Escuchando ahora en Spotify" : "Última canción en Spotify"}</p>
                <p style="font-size:11px; color:#e2e8f0; margin:0; max-width:150px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${cancion}</p>
            </div>
        </a>`;
    }
    widget.innerHTML = `
        <a href="${spotifyUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; display:block; max-width:280px; margin:0 auto;">
            <div style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:10px 14px; transition:border-color 0.3s;" onmouseover="this.style.borderColor='rgba(29,185,84,0.4)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
                ${caratula ? `<img src="${caratula}" style="width:40px; height:40px; border-radius:6px; object-fit:cover; flex-shrink:0;"/>` : ""}
                <div style="min-width:0;">
                    <p style="font-size:10px; color:${escuchando ? "#1db954" : "#64748b"}; margin:0 0 2px; text-transform:uppercase; letter-spacing:0.05em;">${escuchando ? "Escuchando ahora en Spotify" : "Última canción en Spotify"}</p>
                    <p style="font-size:13px; color:#e2e8f0; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:500;">${cancion}</p>
                    <p style="font-size:11px; color:#94a3b8; margin:2px 0 0;">${artista}</p>
                </div>
            </div>
        </a>`;
    setTimeout(cargarMusicaActual, 30000);
  } catch (error) { console.error("Error cargando música:", error); }
}

async function initNotificaciones() {
  if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) return;
  const btn = document.getElementById("btn-notificaciones");
  if (!btn) return;
  if (Notification.permission === "granted") {
    btn.style.display = "none";
    setTimeout(suscribirPush, 1000);
  } else if (Notification.permission === "default") {
    btn.style.display = "inline-block";
    btn.addEventListener("click", async () => {
      const permiso = await Notification.requestPermission();
      if (permiso === "granted") { btn.style.display = "none"; setTimeout(suscribirPush, 1000); }
    });
  }
}

async function suscribirPush() {
  try {
    const registro = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    function urlBase64ToUint8Array(base64String) {
      const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) { outputArray[i] = rawData.charCodeAt(i); }
      return outputArray;
    }
    const suscripcion = await registro.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BIZv4I_n2ih0IRejbShGfu8ZwHUzlmVuYeLQNaHDGpmWR--KJen3k0uVZBbpZvUc904fi_YQTIc7PBugRsh9a7g")
    });
    const keys = suscripcion.toJSON().keys;
    const { data: { session } } = await supabaseClient.auth.getSession();
    await fetch("https://cruzismael.es/api/push/suscribir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: suscripcion.endpoint, p256dh: keys.p256dh, auth: keys.auth, user_id: session?.user?.id || null })
    });
  } catch (error) { console.error("Error:", error); }
}

async function cargarGithubStats() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/ismaelcoodde"),
      fetch("https://api.github.com/users/ismaelcoodde/repos?per_page=100")
    ]);
    const user = await userRes.json();
    const repos = await reposRes.json();
    const lenguajes = {};
    repos.forEach((r) => { if (r.language) lenguajes[r.language] = (lenguajes[r.language] || 0) + 1; });
    const topLenguajes = Object.entries(lenguajes).sort((a, b) => b[1] - a[1]).slice(0, 4);
    const totalLenguajes = topLenguajes.reduce((a, b) => a + b[1], 0);
    const colores = { JavaScript: "#f7df1e", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c", TypeScript: "#2b7489", Vue: "#41b883", React: "#61dafb" };
    const ultimosRepos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 4);
    const card = document.getElementById("github-card");
    if (!card) return;
    card.innerHTML = `
      <div style="background:rgba(13,17,23,0.9); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:16px; backdrop-filter:blur(10px);">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
          <img src="${user.avatar_url}" style="width:40px; height:40px; border-radius:50%; border:2px solid rgba(255,255,255,0.1);"/>
          <div>
            <p style="font-size:13px; font-weight:600; color:#e6edf3; margin:0;">${user.name || user.login}</p>
            <a href="${user.html_url}" target="_blank" style="font-size:11px; color:#58a6ff; text-decoration:none;">@${user.login}</a>
          </div>
          <svg style="margin-left:auto;" width="20" height="20" viewBox="0 0 24 24" fill="#e6edf3"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:16px;">
          <div style="background:rgba(255,255,255,0.05); border-radius:8px; padding:8px; text-align:center;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${user.public_repos}</p><p style="font-size:10px; color:#8b949e; margin:0;">Repos</p></div>
          <div style="background:rgba(255,255,255,0.05); border-radius:8px; padding:8px; text-align:center;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${user.followers}</p><p style="font-size:10px; color:#8b949e; margin:0;">Seguidores</p></div>
          <div style="background:rgba(255,255,255,0.05); border-radius:8px; padding:8px; text-align:center;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${user.following}</p><p style="font-size:10px; color:#8b949e; margin:0;">Siguiendo</p></div>
        </div>
        <p style="font-size:11px; color:#8b949e; margin:0 0 8px; text-transform:uppercase; letter-spacing:0.05em;">Últimos repositorios</p>
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
          ${ultimosRepos.map((r) => `
            <a href="${r.html_url}" target="_blank" style="text-decoration:none; display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:8px 10px;">
              <div style="min-width:0;">
                <p style="font-size:12px; color:#58a6ff; margin:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${r.name}</p>
                ${r.description ? `<p style="font-size:10px; color:#8b949e; margin:2px 0 0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${r.description}</p>` : ""}
              </div>
              ${r.language ? `<span style="font-size:10px; color:${colores[r.language] || "#8b949e"}; flex-shrink:0; margin-left:8px;">● ${r.language}</span>` : ""}
            </a>`).join("")}
        </div>
        <p style="font-size:11px; color:#8b949e; margin:0 0 6px; text-transform:uppercase; letter-spacing:0.05em;">Lenguajes</p>
        <div style="display:flex; gap:4px; border-radius:4px; overflow:hidden; margin-bottom:8px;">
          ${topLenguajes.map(([lang, count]) => `<div style="height:6px; width:${((count / totalLenguajes) * 100).toFixed(0)}%; background:${colores[lang] || "#8b949e"};"></div>`).join("")}
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          ${topLenguajes.map(([lang, count]) => `<span style="font-size:10px; color:#8b949e;"><span style="color:${colores[lang] || "#8b949e"};">●</span> ${lang} ${((count / totalLenguajes) * 100).toFixed(0)}%</span>`).join("")}
        </div>
      </div>`;
  } catch (error) { console.error("Error cargando GitHub:", error); }
}

async function initHomeChat() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  const area = document.getElementById("home-chat-input");
  if (area) {
    if (session) {
      area.innerHTML = `
        <div style="display:flex; gap:8px;">
          <input id="home-chat-texto" type="text" placeholder="Escribe..." style="flex:1; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; padding:8px 12px; color:white; font-size:12px; outline:none;"/>
          <button id="home-chat-btn" style="padding:8px 12px; background:#4f46e5; border:none; border-radius:8px; color:white; font-size:12px; cursor:pointer;">→</button>
        </div>`;
      const sendHomeMsg = async () => {
        const input = document.getElementById("home-chat-texto");
        const content = input.value.trim();
        if (!content) return;
        input.value = "";
        await supabaseClient.from("messages").insert({ user_id: session.user.id, email: session.user.email, content });
      };
      document.getElementById("home-chat-btn").addEventListener("click", sendHomeMsg);
      document.getElementById("home-chat-texto").addEventListener("keydown", (e) => { if (e.key === "Enter") sendHomeMsg(); });
    } else {
      area.innerHTML = `<p style="text-align:center; font-size:11px; color:#64748b;"><a href="#auth" style="color:#818cf8;">Inicia sesión</a> para chatear.</p>`;
    }
  }
  const { data } = await supabaseClient.from("messages").select("*").order("created_at", { ascending: true }).limit(20);
  const container = document.getElementById("home-messages-container");
  if (container && data) {
    container.innerHTML = data.map((msg) => {
      const time = new Date(msg.created_at).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
      const shortEmail = msg.email.split("@")[0];
      return `<div style="display:flex; flex-direction:column; gap:2px;">
        <div style="display:flex; gap:6px; align-items:baseline;">
          <span style="font-size:10px; color:#818cf8; font-weight:500;">${shortEmail}</span>
          <span style="font-size:9px; color:#475569;">${time}</span>
        </div>
        <p style="font-size:11px; color:#cbd5e1; margin:0;">${msg.content}</p>
      </div>`;
    }).join("");
    container.scrollTop = container.scrollHeight;
  }
  supabaseClient.channel("home-chat").on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
    const container = document.getElementById("home-messages-container");
    if (!container) return;
    const msg = payload.new;
    const time = new Date(msg.created_at).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
    const shortEmail = msg.email.split("@")[0];
    container.insertAdjacentHTML("beforeend", `<div style="display:flex; flex-direction:column; gap:2px;">
      <div style="display:flex; gap:6px; align-items:baseline;">
        <span style="font-size:10px; color:#818cf8; font-weight:500;">${shortEmail}</span>
        <span style="font-size:9px; color:#475569;">${time}</span>
      </div>
      <p style="font-size:11px; color:#cbd5e1; margin:0;">${msg.content}</p>
    </div>`);
    container.scrollTop = container.scrollHeight;
  }).subscribe();
}

async function cargarHealthData() {
  const { data, error } = await supabaseClient.from('health_data').select('*').order('fecha', { ascending: false }).limit(7);
  if (error || !data || data.length === 0) return;
  const widget = document.getElementById('health-widget');
  if (!widget) return;
  const hoy = data.find(d => d.frecuencia_cardiaca_avg) || data[0];
  const maxPasos = Math.max(...data.map(d => d.pasos || 0));
  const barrasPasos = data.slice().reverse().map(d => {
    const pct = maxPasos > 0 ? ((d.pasos || 0) / maxPasos * 100).toFixed(0) : 0;
    const dia = new Date(d.fecha).toLocaleDateString('es-ES', { weekday: 'short' });
    return `<div style="display:flex; flex-direction:column; align-items:center; gap:4px; flex:1;">
      <div style="width:100%; background:rgba(255,255,255,0.05); border-radius:4px; height:50px; display:flex; align-items:flex-end;">
        <div style="width:100%; height:${pct}%; background:linear-gradient(to top, #6366f1, #818cf8); border-radius:4px; min-height:3px;"></div>
      </div>
      <p style="font-size:9px; color:#475569; margin:0;">${dia}</p>
    </div>`;
  }).join('');
  widget.innerHTML = `
    <div style="background:rgba(13,17,23,0.9); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:16px; backdrop-filter:blur(10px);">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
        <p style="font-size:11px; color:#8b949e; margin:0; text-transform:uppercase; letter-spacing:0.05em;">❤️ Salud · 7 días</p>
        <span style="font-size:9px; color:#475569;">Apple Watch</span>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; margin-bottom:12px;">
        ${hoy.pasos ? `<div style="background:rgba(99,102,241,0.1); border:1px solid rgba(99,102,241,0.2); border-radius:10px; padding:8px;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${hoy.pasos.toLocaleString()}</p><p style="font-size:9px; color:#8b949e; margin:2px 0 0;">👟 Pasos</p></div>` : ''}
        ${hoy.frecuencia_cardiaca_avg ? `<div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.2); border-radius:10px; padding:8px;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${Math.round(hoy.frecuencia_cardiaca_avg)} <span style="font-size:9px;">bpm</span></p><p style="font-size:9px; color:#8b949e; margin:2px 0 0;">❤️ Frec. cardíaca</p></div>` : ''}
        ${hoy.sueno_total ? `<div style="background:rgba(139,92,246,0.1); border:1px solid rgba(139,92,246,0.2); border-radius:10px; padding:8px;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${hoy.sueno_total.toFixed(1)} <span style="font-size:9px;">h</span></p><p style="font-size:9px; color:#8b949e; margin:2px 0 0;">😴 Sueño</p></div>` : ''}
        ${hoy.oxigeno_sangre ? `<div style="background:rgba(14,165,233,0.1); border:1px solid rgba(14,165,233,0.2); border-radius:10px; padding:8px;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${Math.round(hoy.oxigeno_sangre)} <span style="font-size:9px;">%</span></p><p style="font-size:9px; color:#8b949e; margin:2px 0 0;">🫁 SpO2</p></div>` : ''}
        ${hoy.tiempo_ejercicio ? `<div style="background:rgba(34,197,94,0.1); border:1px solid rgba(34,197,94,0.2); border-radius:10px; padding:8px;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${Math.round(hoy.tiempo_ejercicio)} <span style="font-size:9px;">min</span></p><p style="font-size:9px; color:#8b949e; margin:2px 0 0;">🏃 Ejercicio</p></div>` : ''}
        ${hoy.tiempo_sol ? `<div style="background:rgba(234,179,8,0.1); border:1px solid rgba(234,179,8,0.2); border-radius:10px; padding:8px;"><p style="font-size:16px; font-weight:700; color:#e6edf3; margin:0;">${Math.round(hoy.tiempo_sol)} <span style="font-size:9px;">min</span></p><p style="font-size:9px; color:#8b949e; margin:2px 0 0;">☀️ Sol</p></div>` : ''}
      </div>
      <p style="font-size:9px; color:#475569; margin:0 0 6px; text-transform:uppercase; letter-spacing:0.05em;">Pasos últimos 7 días</p>
      <div style="display:flex; gap:4px; align-items:flex-end; height:66px;">${barrasPasos}</div>
      <p style="font-size:9px; color:#475569; margin:10px 0 6px; text-transform:uppercase; letter-spacing:0.05em;">Sueño últimos 7 días</p>
      <div style="display:flex; flex-direction:column; gap:4px;">
        ${data.slice().reverse().map(d => {
          const dia = new Date(d.fecha).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
          const pct = d.sueno_total ? Math.min((d.sueno_total / 9) * 100, 100).toFixed(0) : 0;
          const color = d.sueno_total >= 7 ? '#22c55e' : d.sueno_total >= 5 ? '#eab308' : '#ef4444';
          return `<div style="display:flex; align-items:center; gap:6px;">
            <p style="font-size:9px; color:#475569; margin:0; width:36px;">${dia}</p>
            <div style="flex:1; background:rgba(255,255,255,0.05); border-radius:4px; height:6px;">
              <div style="width:${pct}%; height:100%; background:${color}; border-radius:4px;"></div>
            </div>
            <p style="font-size:9px; color:#8b949e; margin:0; width:24px; text-align:right;">${d.sueno_total ? d.sueno_total.toFixed(1) + 'h' : '-'}</p>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

let healthCargado = false;
function toggleHealthPanel() {
  const modal = document.getElementById('health-modal');
  if (modal.style.display === 'none' || modal.style.display === '') {
    modal.style.cssText = 'display:flex; position:fixed; top:0; left:0; width:100vw; height:100vh; z-index:999; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); align-items:center; justify-content:center;';
    if (!healthCargado) { cargarHealthData(); healthCargado = true; }
  } else {
    modal.style.cssText = 'display:none;';
  }
}

async function initHome() {
  initProjectCard();
  await cargarFotosRecientes();
  await cargarMusicaActual();
  await comprobarEstadoNuevo();
  initNotificaciones();
  await cargarGithubStats();
  await initHomeChat();
}