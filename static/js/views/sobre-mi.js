function SobreMiView() {
    return /*html*/`
        <section class="flex flex-col items-center px-6 py-16">

            <p class="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-3 text-center fade-up">
                Conóceme
            </p>
            <h1 class="text-4xl font-extrabold text-center mb-12 fade-up">Sobre mí</h1>

            <div style="max-width:680px; width:100%;" class="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-8 fade-up">

                <div class="flex flex-col items-center gap-4">
                    <div class="photo-ring" style="width:120px; height:120px; margin-bottom:0;">
                        <div class="photo-ring-spinner"></div>
                        <img src="/images/yo2.jpg" alt="Ismael Cruz" />
                    </div>
                    <div class="text-center">
                        <p class="text-white font-medium">Ismael Cruz Fernandez</p>
                    </div>
                </div>

                <div class="flex flex-col gap-8 text-slate-300 leading-relaxed">
                    <p class="fade-up">Hola, me llamo Ismael. Tengo 31 años, soy de Palma de Mallorca y te doy la bienvenida a mi espacio personal.</p>
                    <p class="fade-up">Durante mucho tiempo he buscado la manera de gestionar la ansiedad, de entenderme un poco mejor y de sanar en momentos donde el entorno se volvía demasiado complicado. En ese proceso aprendes que la resiliencia empieza por regalarte a ti mismo un lienzo en blanco; un lugar seguro donde no existan presiones externas. Este sitio es mi lienzo. Lo construí para recordarme que soy capaz de crear orden en medio del caos, y las herramientas que elegí para dar forma a esa paz fueron la programación y la fotografía.</p>
                    <p class="fade-up">Mi relación con estas dos disciplinas empezó hace muchos años, de manera autodidacta. Sin embargo, la vida me llevó por otros caminos y trabajé en sectores totalmente distintos. Si soy sincero, nunca pensé que este pudiera ser mi lugar; miraba el mundo del código desde la distancia, pensando que me quedaba grande y que yo no valía para esto. Nos autosaboteamos tan bien que a veces enterramos lo que nos gusta por miedo a no estar a la altura. Ha tenido que ser ahora, en esta búsqueda de calma, cuando picar código se ha convertido en mi mayor refugio, dándome la vía para volver a sentirme útil, realizado y en paz.</p>
                    <p class="fade-up">La otra mitad de mi calma la encontré mirando al cielo. Vengo de una familia de músicos y artistas, y creo que de ellos heredé una sensibilidad especial para conectar con la naturaleza y con esos pequeños detalles que a menudo pasan desapercibidos. Siempre he sido una persona reflexiva, que disfruta de la tranquilidad y de su propia compañía; por eso, hay algo mágico para mí en las noches a solas con el telescopio, capturando la Luna, los planetas o la inmensidad del cielo en absoluto silencio.</p>

                    <blockquote class="border-l-2 border-indigo-500/50 pl-6 py-2 fade-up">
                        <p class="text-white text-lg italic leading-relaxed">"Este rincón de internet es, de momento, un experimento. Lo empecé simplemente porque quería un lugar propio donde plasmar mis ideas y poner en práctica todo lo que voy aprendiendo. No busca venderte nada, solo es un reflejo honesto de lo que hago, de lo que me apasiona y del camino que he decidido tomar para sanar."</p>
                    </blockquote>
                </div>

            </div>

        </section>
    `;
}

function initSobreMi() {
    console.log('Vista Sobre mí cargada');
}