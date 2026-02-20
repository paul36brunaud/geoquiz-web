const CACHE_NAME = "geoquiz-v5";

/* =========================
   FICHIERS À PRÉ-CACHER
========================= */

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/categorie.html",
  "/themes.html",
  "/difficulty.html",
  "/quiz.html",
  "/offline.html",

  "/css/style.css",

  "/js/database.js",
  "/js/navigation.js",
  "/js/theme.js",
  "/js/stats.js",
  "/js/user.js",
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
   FETCH STRATEGY
========================= */

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  const requestURL = new URL(event.request.url);

  /* =========================
     HTML → Network First
  ========================= */

  if (
    requestURL.pathname.endsWith(".html") ||
    requestURL.pathname === "/"
  ) {

    event.respondWith(
      fetch(event.request)
        .then(response => {

          const clone = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, clone));

          return response;

        })
        .catch(() => {
          return caches.match(event.request)
            .then(res => res || caches.match("/offline.html"));
        })
    );

    return;
  }

  /* =========================
     ASSETS → Cache First
  ========================= */

  event.respondWith(
    caches.match(event.request)
      .then(cached => {

        if (cached) return cached;

        return fetch(event.request)
          .then(response => {

            if (!response || response.status !== 200) {
              return response;
            }

            const clone = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, clone));

            return response;
          })
          .catch(() => {
            // Optionnel : image fallback ici
          });

      })
  );
});

/* =========================
   UPDATE SILENCIEUSE
========================= */

self.addEventListener("message", event => {

  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }

});