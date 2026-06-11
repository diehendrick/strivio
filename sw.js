const CACHE_NAME = 'strivio-cache-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './styles.css',
  './design-tokens.css',
  './assets/strivio_logo.svg',
  './screens/auth/splash.html',
  './screens/onboarding/splash-onboarding.html',
  './screens/auth/welcome.html',
  './screens/auth/login.html',
  './screens/auth/register.html',
  './screens/auth/forgot-password.html',
  './screens/auth/forgot-confirm.html',
  './screens/onboarding/q1.html',
  './screens/onboarding/q2.html',
  './screens/onboarding/q3.html',
  './screens/onboarding/q4.html',
  './screens/onboarding/q5.html',
  './screens/onboarding/q6.html',
  './screens/onboarding/q7.html',
  './screens/onboarding/q8.html',
  './screens/onboarding/q9.html',
  './screens/onboarding/q10.html',
  './screens/onboarding/q11.html',
  './screens/onboarding/q12.html',
  './screens/onboarding/q13.html',
  './screens/onboarding/q14.html',
  './screens/onboarding/q15.html',
  './screens/onboarding/conflicts.html',
  './screens/onboarding/coach.html',
  './screens/onboarding/loading.html',
  './screens/onboarding/reveal.html',
  './screens/home/home.html'
];

// Cacheable external resources (Google Fonts, Iconify, etc.)
const isCacheableExternal = (url) => {
  return url.includes('fonts.googleapis.com') ||
         url.includes('fonts.gstatic.com') ||
         url.includes('code.iconify.design');
};

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching core assets...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const requestUrl = event.request.url;
  const isLocal = requestUrl.startsWith(self.location.origin);
  const isExternalCacheable = isCacheableExternal(requestUrl);

  // Only handle local requests and specific external CDNs
  if (!isLocal && !isExternalCacheable) return;

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(cachedResponse => {
      if (cachedResponse) {
        // Serve from cache, and asynchronously update cache (Stale-While-Revalidate)
        fetch(event.request).then(networkResponse => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {
          // Silent catch for network errors during background revalidation
        });
        return cachedResponse;
      }

      // Serve from network and add to cache
      return fetch(event.request).then(networkResponse => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Cache the newly fetched asset
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(error => {
        // Offline fallback for HTML pages
        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          // If offline and request is an HTML page, fallback to cached splash/welcome page
          return caches.match('./screens/auth/welcome.html', { ignoreSearch: true }) ||
                 caches.match('./screens/auth/splash.html', { ignoreSearch: true }) ||
                 caches.match('./index.html', { ignoreSearch: true });
        }
        throw error;
      });
    })
  );
});
