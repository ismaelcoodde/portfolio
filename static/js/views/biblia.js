function BibliaView() {
    return /*html*/`
        <section class="min-h-screen px-6 py-16">
            <div style="max-width:720px; width:100%;" class="mx-auto flex flex-col gap-8">

                <!-- Cabecera -->
                <div class="text-center">
                    <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-2">
                        Mi camino con Dios
                    </p>
                    <h1 class="text-3xl md:text-4xl font-extrabold mb-2">Lectura Bíblica</h1>
                    <p class="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
    Empecé este camino con el propósito de leer la Biblia completa en 6 meses, 7 capítulos cada día.
    Es la necesidad de acercarme a Dios en estos tiempos, de encontrar fuerza y esperanza,
    tranquilidad y calma, un pequeño paso cada día hacia una vida más plena.
</p>
                </div>

                <!-- Progreso -->
                <div id="progreso-biblia" class="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p class="text-slate-500 text-xs text-center">Cargando progreso...</p>
                </div>

                <!-- Capítulo de hoy -->
                <div id="capitulo-hoy">
                    <p class="text-slate-500 text-sm text-center py-12">Cargando lectura de hoy...</p>
                </div>

                <!-- Enlace al archivo -->
                <a href="#biblia-archivo" style="text-decoration:none;"
                   class="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center justify-center gap-2
                          hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 text-center">
                    <span class="text-slate-300 text-sm font-medium">Ver todo lo leído</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </a>

            </div>
        </section>
    `;
}

async function initBiblia() {
    await cargarProgresoBiblia();
    await cargarCapituloHoy();
}

async function cargarProgresoBiblia() {
    const container = document.getElementById('progreso-biblia');
    if (!container) return;

    try {
        const res = await fetch('/api/biblia/progreso');
        const data = await res.json();

        if (!data.ok) {
            container.innerHTML = '<p class="text-slate-500 text-xs text-center">No se pudo cargar el progreso.</p>';
            return;
        }

        const { leidos, total, porcentaje } = data;

        container.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:10px;">
                <p style="font-size:13px; color:#94a3b8; margin:0;">Progreso total</p>
                <p style="font-size:13px; color:#818cf8; font-weight:600; margin:0;">${porcentaje}%</p>
            </div>
            <div style="width:100%; height:8px; background:rgba(255,255,255,0.06); border-radius:99px; overflow:hidden;">
                <div style="width:${porcentaje}%; height:100%; background:linear-gradient(90deg, #6366f1, #a855f7); border-radius:99px; transition:width 0.6s ease;"></div>
            </div>
            <p style="font-size:12px; color:#475569; margin:10px 0 0; text-align:center;">
                ${leidos} de ${total} capítulos leídos
            </p>
        `;
    } catch (err) {
        console.error('Error cargando progreso:', err);
        container.innerHTML = '<p class="text-slate-500 text-xs text-center">No se pudo cargar el progreso.</p>';
    }
}

let capitulosDelDia = [];
let indiceActual = 0;
let diaActual = null;

async function cargarCapituloHoy() {
    const container = document.getElementById('capitulo-hoy');
    if (!container) return;

    try {
        const res = await fetch('/api/biblia/hoy');
        const data = await res.json();

        if (!data.ok) {
            container.innerHTML = '<p class="text-slate-500 text-sm text-center py-12">No se pudo cargar la lectura de hoy.</p>';
            return;
        }

        if (data.completado) {
            container.innerHTML = `
                <div class="bg-white/5 border border-indigo-500/20 rounded-2xl p-10 text-center">
                    <p class="text-2xl mb-2">🕊️</p>
                    <p class="text-white font-semibold mb-1">Has completado la Biblia entera</p>
                    <p class="text-slate-500 text-sm">Gracias a Dios por este recorrido.</p>
                </div>
            `;
            return;
        }

        capitulosDelDia = data.capitulos;
        diaActual = data.dia;
        indiceActual = 0;

        renderLectorCapitulo();
    } catch (err) {
        console.error('Error cargando capítulo:', err);
        container.innerHTML = '<p class="text-slate-500 text-sm text-center py-12">No se pudo cargar la lectura de hoy.</p>';
    }
}

function renderLectorCapitulo() {
    const container = document.getElementById('capitulo-hoy');
    if (!container) return;

    const cap = capitulosDelDia[indiceActual];
    const total = capitulosDelDia.length;
    const esPrimero = indiceActual === 0;
    const esUltimo = indiceActual === total - 1;

    container.innerHTML = `
        <div style="text-align:center; margin-bottom:8px;">
            <p style="font-size:12px; color:#475569; letter-spacing:0.05em;">
                DÍA ${diaActual} · CAPÍTULO ${indiceActual + 1} DE ${total}
            </p>
        </div>

        ${capituloHTML(cap, true)}

        <div style="display:flex; gap:10px; margin-top:8px;">
            <button id="cap-anterior"
                    ${esPrimero ? 'disabled' : ''}
                    style="flex:1; padding:12px; border-radius:12px; border:1px solid rgba(255,255,255,0.1);
                           background:rgba(255,255,255,0.04); color:${esPrimero ? '#3f4a5c' : '#cbd5e1'};
                           font-size:14px; cursor:${esPrimero ? 'not-allowed' : 'pointer'};
                           display:flex; align-items:center; justify-content:center; gap:6px;
                           transition:background 0.2s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"/>
                </svg>
                Anterior
            </button>
            <button id="cap-siguiente"
                    ${esUltimo ? 'disabled' : ''}
                    style="flex:1; padding:12px; border-radius:12px; border:1px solid rgba(99,102,241,0.3);
                           background:${esUltimo ? 'rgba(255,255,255,0.04)' : 'rgba(99,102,241,0.15)'};
                           color:${esUltimo ? '#3f4a5c' : '#a5b4fc'};
                           font-size:14px; cursor:${esUltimo ? 'not-allowed' : 'pointer'};
                           display:flex; align-items:center; justify-content:center; gap:6px;
                           transition:background 0.2s;">
                Siguiente
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </button>
        </div>
    `;

    if (!esPrimero) {
        document.getElementById('cap-anterior').addEventListener('click', () => {
            indiceActual--;
            renderLectorCapitulo();
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    if (!esUltimo) {
        document.getElementById('cap-siguiente').addEventListener('click', () => {
            indiceActual++;
            renderLectorCapitulo();
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

function capituloHTML(cap, esPrimero) {
    const parrafos = cap.texto.split('\n').filter(p => p.trim());

    const parrafosHTML = parrafos.map((p, i) => {
        if (i === 0 && esPrimero) {
            const primeraLetra = p.charAt(0);
            const resto = p.slice(1);
            return `<p style="margin:0 0 16px;">
                <span style="float:left; font-size:52px; line-height:0.8; padding:6px 8px 0 0; font-weight:700; color:#a78bfa; font-family:Georgia, serif;">${primeraLetra}</span>${resto}
            </p>`;
        }
        return `<p style="margin:0 0 16px;">${p}</p>`;
    }).join('');

    return `
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 mb-4">
            <p style="font-size:11px; color:#818cf8; text-transform:uppercase; letter-spacing:0.15em; margin:0 0 6px; text-align:center;">
                ${cap.libro}
            </p>
            <h2 style="font-size:22px; font-weight:700; color:#f1f5f9; margin:0 0 20px; text-align:center; font-family:Georgia, 'Times New Roman', serif;">
                Capítulo ${cap.capitulo}
            </h2>
            <div style="font-family:Georgia, 'Times New Roman', serif; font-size:16px; line-height:1.85; color:#cbd5e1;">
                ${parrafosHTML}
            </div>
            ${cap.nota ? `
                <div style="margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.08);">
                    <p style="font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:0.1em; margin:0 0 8px;">Mi reflexión</p>
                    <p style="font-size:14px; color:#94a3b8; font-style:italic; line-height:1.6; margin:0;">${cap.nota}</p>
                </div>
            ` : ''}
        </div>
    `;
}