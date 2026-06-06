// home.js
// Una vista es simplemente una función que devuelve HTML como texto

function HomeView() {
    return `
        <div class="max-w-2xl mx-auto mt-20 text-center">
            <h1 class="text-5xl font-bold mb-4">Hola, soy [Tu nombre]</h1>
            <p class="text-xl text-gray-400">Desarrollador web y astrofotógrafo</p>
        </div>
    `;
}