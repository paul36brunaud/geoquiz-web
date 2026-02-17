const CACHE_NAME = "geoquiz-v3";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/category.html",
  "/themes.html",
  "/quiz.html",

  "/css/style.css",

  "/js/database.js",
  "/js/navigation.js",
  "/js/theme.js",
  "/js/stats.js",
  "/js/home.js",
  "/js/quiz.js",
  "/js/transition.js",
  "/js/themes.js",

  "/manifest.json",

  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

/* =========================
   INSTALL
========================= */

self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

/* =========================
   ACTIVATE
========================= */

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

/* =========================
   FETCH - CACHE FIRST SAFE
========================= */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then(networkResponse => {

            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });

          })
          .catch(() => {
            // Ici tu pourras ajouter une page offline plus tard
          });

      })
  );

});
