/**
 * JOY LUXURY FURNITURE — SERVICE WORKER
 * Provides cache-first / network-fallback offline support for the web app.
 */

const CACHE_NAME = 'joy-luxury-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/contact.html',
  '/catalog.html',
  '/studio.html',
  '/css/style.css',
  '/css/slider.css',
  '/css/webapp.css',
  '/js/main.js',
  '/js/slider.js',
  '/js/webapp.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache partial skip:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For same-origin assets, try cache first, fall back to network
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch fresh in background
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          }).catch(() => {});
          return cachedResponse;
        }

        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          return networkResponse;
        });
      })
    );
  } else {
    // For external assets (images, fonts), network first, fallback to cache
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
