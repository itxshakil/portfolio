const CACHE_NAME = "my-site-cache-v9.3";
const urlsToCache = [
  "/",
  "/index.html",
  "/app.webmanifest",
  "/index.html?source=pwa",
  "/js/main.js",
  "/assets/images/itxshakil.webp",
  "/assets/images/appediary.png",
  "/assets/images/movie-guru.webp",
  "/assets/images/laralib.webp",
  "/assets/images/mi-dukaan.png",
  "/assets/images/theimp.png",
  "/assets/images/todo.png",
  "/assets/images/pfx-to-pem-converter.jpg",
  "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (
          !response ||
          response.status !== 200 ||
          response.type !== "basic" ||
          event.request.method !== "GET"
        ) {
          return response;
        }

        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});
