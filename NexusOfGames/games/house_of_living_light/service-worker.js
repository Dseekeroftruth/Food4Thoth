const CACHE = 'house-living-light-v1';
const ASSETS = ['./', './index.html', './css/styles.css', './js/game.js', './manifest.webmanifest'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener('fetch', event => event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))));
