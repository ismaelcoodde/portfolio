const CACHE_NAME = 'ismael-portfolio-v1';

// Archivos que se guardan en caché al instalar la PWA
const ASSETS = [
    '/',
    '/manifest.json',
    '/css/style.css',
    '/js/supabase-client.js',
    '/js/stars.js',
    '/js/app.js',
    '/js/router.js',
    '/js/views/home.js',
    '/js/views/gallery.js',
    '/js/views/works.js',
    '/js/views/contact.js',
    '/js/views/auth.js',
    '/js/views/chat.js',
    '/images/yo2.jpg',
    '/images/icon-192.png',
    '/images/icon-512.png',
];

// Se ejecuta cuando el service worker se instala por primera vez
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Se ejecuta cuando el service worker toma el control
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            )
        )
    );
});

// Intercepta todas las peticiones de red
self.addEventListener('fetch', (event) => {
    // Las peticiones a Supabase y APIs siempre van a la red
    if (event.request.url.includes('supabase.co') ||
        event.request.url.includes('/api/')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cached) => {
            // Si está en caché lo devuelve, si no va a la red
            return cached || fetch(event.request);
        })
    );
});

// Recibe notificaciones push
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Ismael Cruz';
    const options = {
        body: data.body || 'Hay algo nuevo en la web',
        icon: '/images/icon-192.png',
        badge: '/images/icon-192.png',
        data: { url: data.url || '/' }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Al hacer clic en la notificación abre la web
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});