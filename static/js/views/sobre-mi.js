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
                    <p>En construcción</p>
                </div>

            </div>

        </section>
    `;
}

function initSobreMi() {
    console.log('Vista Sobre mí cargada');
}