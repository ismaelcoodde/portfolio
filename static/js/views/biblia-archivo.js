function BibliaArchivoView() {
    return /*html*/`
        <section class="min-h-screen px-6 py-16">
            <div style="max-width:720px; width:100%;" class="mx-auto flex flex-col gap-6">

                <div class="text-center">
                    <a href="#biblia" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px; color:#818cf8; font-size:13px; margin-bottom:16px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                        Volver a la lectura de hoy
                    </a>
                    <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-2">
                        Mi camino con Dios
                    </p>
                    <h1 class="text-3xl md:text-4xl font-extrabold mb-1">Archivo de lectura</h1>
                    <p class="text-slate-500 text-sm">Todo lo leído hasta ahora, libro por libro</p>
                </div>

                <div id="lista-libros" class="flex flex-col gap-2">
                    <p class="text-slate-500 text-sm text-center py-12">Cargando archivo...</p>
                </div>

            </div>
        </section>
    `;
}

let libroExpandido = null;
let resumenLibrosCache = [];

async function initBibliaArchivo() {
    libroExpandido = null;
    await cargarResumenLibros();
}

async function cargarResumenLibros() {
    const container = document.getElementById('lista-libros');
    if (!container) return;

    try {
        const res = await fetch('/api/biblia/resumen-libros');
        const data = await res.json();

        if (!data.ok) {
            container.innerHTML = '<p class="text-slate-500 text-sm text-center py-12">No se pudo cargar el archivo.</p>';
            return;
        }

        resumenLibrosCache = data.libros;
        renderListaLibros();
    } catch (err) {
        console.error('Error cargando archivo:', err);
        container.innerHTML = '<p class="text-slate-500 text-sm text-center py-12">No se pudo cargar el archivo.</p>';
    }
}

function renderListaLibros() {
    const container = document.getElementById('lista-libros');
    if (!container) return;

    container.innerHTML = resumenLibrosCache.map(libro => libroFilaHTML(libro)).join('');

    resumenLibrosCache.forEach(libro => {
        if (libro.leidos === 0) return;
        const header = document.getElementById(`libro-header-${slugify(libro.libro)}`);
        if (header) {
            header.addEventListener('click', () => toggleLibro(libro.libro));
        }
    });
}

function libroFilaHTML(libro) {
    const slug = slugify(libro.libro);
    const empezado = libro.leidos > 0;
    const completo = libro.leidos === libro.total_capitulos;
    const expandido = libroExpandido === libro.libro;

    return `
        <div style="border:1px solid rgba(255,255,255,0.08); border-radius:14px; overflow:hidden; background:rgba(255,255,255,0.03);">
            <div id="libro-header-${slug}"
                 style="display:flex; align-items:center; justify-content:space-between; padding:14px 18px;
                        cursor:${empezado ? 'pointer' : 'default'}; opacity:${empezado ? '1' : '0.4'};">
                <div style="display:flex; align-items:center; gap:10px;">
                    ${completo ? `<span style="color:#22c55e; font-size:14px;">✓</span>` : ''}
                    <span style="font-size:14px; color:${empezado ? '#e2e8f0' : '#64748b'}; font-weight:500;">
                        ${libro.libro}
                    </span>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:12px; color:#64748b;">${libro.leidos}/${libro.total_capitulos}</span>
                    ${empezado ? `
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"
                             style="transform:rotate(${expandido ? '90' : '0'}deg); transition:transform 0.2s;">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    ` : ''}
                </div>
            </div>
            ${expandido ? `
                <div style="padding:0 18px 16px;">
                    <div id="capitulo-expandido-${slug}"></div>
                    <div style="display:flex; flex-wrap:wrap; gap:6px;">
                        ${Array.from({length: libro.total_capitulos}, (_, i) => i + 1).map(cap => `
                            <button onclick="abrirCapituloArchivo('${libro.libro}', ${cap})"
                                    style="width:34px; height:34px; border-radius:8px; border:1px solid rgba(255,255,255,0.1);
                                           background:rgba(255,255,255,0.05); color:#94a3b8; font-size:12px; cursor:pointer;
                                           transition:background 0.15s;">
                                ${cap}
                            </button>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function toggleLibro(nombreLibro) {
    libroExpandido = libroExpandido === nombreLibro ? null : nombreLibro;
    renderListaLibros();
}

async function abrirCapituloArchivo(libro, capitulo) {
    const slug = slugify(libro);
    const target = document.getElementById(`capitulo-expandido-${slug}`);
    if (!target) return;

    target.innerHTML = '<p style="color:#64748b; font-size:13px; text-align:center; padding:20px 0;">Cargando capítulo...</p>';

    try {
        const res = await fetch(`/api/biblia/libro/${encodeURIComponent(libro)}`);
        const data = await res.json();
        const cap = data.capitulos.find(c => c.capitulo === capitulo);

        if (!cap) {
            target.innerHTML = '<p style="color:#64748b; font-size:13px; text-align:center; padding:20px 0;">Capítulo no encontrado.</p>';
            return;
        }

        target.innerHTML = capituloHTML(cap, true);
    } catch (err) {
        console.error('Error cargando capítulo:', err);
        target.innerHTML = '<p style="color:#64748b; font-size:13px; text-align:center; padding:20px 0;">Error al cargar.</p>';
    }
}

function slugify(texto) {
    return texto.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}