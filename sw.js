const CACHE_NAME = 'colibri-cache-v1';
const DYNAMIC_CACHE_NAME = 'colibri-dynamic-v1';

const APP_SHELL = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/icons/icon-512x512.png',
  'https://jsonplaceholder.typicode.com/users?_limit=3' // Ejemplo de API cacheada
];
// A continuación están configurados los eventos del Service Worker, paso por paso

// 1. Instalar el SW y cachear el App Shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cacheando App Shell');
      return cache.addAll(APP_SHELL);
    })
  );
});

// 2. Activar el SW y limpiar cachés viejos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// 3. Interceptar peticiones con estrategia Stale-While-Revalidate
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(DYNAMIC_CACHE_NAME).then(cache => {
      return cache.match(e.request).then(cachedResponse => {
        const fetchedResponse = fetch(e.request).then(networkResponse => {
          // Si la petición a la red es exitosa, la guardamos en el caché dinámico
          cache.put(e.request, networkResponse.clone());
          return networkResponse;
        });

        // Retorna el recurso del caché si existe, si no, espera a la red.
        return cachedResponse || fetchedResponse;
      });
    })
  );
});

/**
 * Escucha el evento 'push' que llega desde un servidor.
 * Muestra la notificación en el dispositivo.
 */
self.addEventListener('push', e => {
  const data = e.data.json(); // Se asume que el servidor envía un JSON
  const title = data.title || 'Plataforma Colibrí';
  const options = {
    body: data.body,
    icon: '/icons/icon-512x512.png',
    badge: '/icons/icon-512x512.png',
  };
  e.waitUntil(self.registration.showNotification(title, options));
});