/* FOOD4THOTH Sacred Geometry Tarot — Service Worker
   File location:
   https://www.food4thoth.com/TarotSacredGeometry/sw.js

   Main app:
   https://www.food4thoth.com/TarotSacredGeometry/NewSacredTarot.html
*/

const CACHE_VERSION = 'food4thoth-sacred-tarot-v2.2.0';

const STATIC_CACHE = `${CACHE_VERSION}-static`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;
const TEXT_CACHE = `${CACHE_VERSION}-texts`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const APP_ORIGIN = 'https://www.food4thoth.com';
const APP_BASE = 'https://www.food4thoth.com/TarotSacredGeometry/';
const APP_URL = 'https://www.food4thoth.com/TarotSacredGeometry/NewSacredTarot.html';

const NAVIGATION_FALLBACK = APP_URL;

const APP_SHELL = [
  APP_URL,
  'https://www.food4thoth.com/TarotSacredGeometry/icons/apple-touch-icon.png',
  'https://www.food4thoth.com/TarotSacredGeometry/icons/icon-192.png',
  'https://www.food4thoth.com/TarotSacredGeometry/icons/icon-512.png',
  'https://www.food4thoth.com/TarotSacredGeometry/images/social-preview.jpeg'
];

const ALLOWED_HOSTS = new Set([
  'www.food4thoth.com',
  'raw.githubusercontent.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
]);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(() => null)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys
            .filter(key => !key.startsWith(CACHE_VERSION))
            .map(key => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING'){
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if(request.method !== 'GET') return;

  let url;

  try{
    url = new URL(request.url);
  }catch(_){
    return;
  }

  if(!ALLOWED_HOSTS.has(url.hostname)) return;

  if(request.mode === 'navigate'){
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if(isTarotImageOrIcon(url)){
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  if(isTarotDescription(url)){
    event.respondWith(staleWhileRevalidate(request, TEXT_CACHE));
    return;
  }

  if(isGoogleFont(url) || request.destination === 'font' || request.destination === 'style'){
    event.respondWith(staleWhileRevalidate(request, FONT_CACHE));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});

function isTarotImageOrIcon(url){
  return (
    url.hostname === 'www.food4thoth.com' &&
    (
      url.pathname.includes('/TarotSacredGeometry/images/') ||
      url.pathname.includes('/TarotSacredGeometry/icons/')
    )
  );
}

function isTarotDescription(url){
  return (
    url.hostname === 'raw.githubusercontent.com' &&
    url.pathname.includes('/Dseekeroftruth/Food4Thoth/') &&
    url.pathname.includes('/TarotSacredGeometry/full_descriptions/') &&
    url.pathname.endsWith('.txt')
  );
}

function isGoogleFont(url){
  return (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  );
}

async function networkFirstNavigation(request){
  const cache = await caches.open(STATIC_CACHE);

  try{
    const fresh = await fetch(request);

    if(canCache(fresh)){
      cache.put(request, fresh.clone()).catch(() => null);
    }

    return fresh;
  }catch(_){
    const cached = await cache.match(request, { ignoreSearch: true });
    if(cached) return cached;

    const fallback =
      await cache.match(NAVIGATION_FALLBACK, { ignoreSearch: true }) ||
      await caches.match(NAVIGATION_FALLBACK, { ignoreSearch: true }) ||
      await cache.match(APP_URL, { ignoreSearch: true }) ||
      await caches.match(APP_URL, { ignoreSearch: true });

    if(fallback) return fallback;

    return new Response(
      'Offline — FOOD4THOTH Sacred Geometry Tarot will be available after it has been opened once online.',
      {
        status: 503,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8'
        }
      }
    );
  }
}

async function staleWhileRevalidate(request, cacheName){
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: false });

  const freshPromise = fetch(request)
    .then(response => {
      if(canCache(response)){
        cache.put(request, response.clone()).catch(() => null);
      }

      return response;
    })
    .catch(() => null);

  if(cached) return cached;

  const fresh = await freshPromise;
  if(fresh) return fresh;

  return new Response('', {
    status: 504,
    statusText: 'Offline'
  });
}

function canCache(response){
  return (
    response &&
    (
      response.status === 200 ||
      response.status === 0
    )
  );
}