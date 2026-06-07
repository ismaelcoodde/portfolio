// home.js
// Una vista es simplemente una función que devuelve HTML como texto

function HomeView() {
    return `
        <section class="min-h-screen flex flex-col items-center justify-center px-6 py-20">

            <img src="/images/yo2.png"
            alt="Ismael Cruz"
            class="w-33 h-33 object-cover rounded-full"
            />

        </section>
    `;
}