const CACHE_NAME = 'yourgift-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/todo.html',
  '/feedback.php',
  // Добавьте сюда пути к вашим CSS и JS файлам, если они есть
  // Например: '/style.css', '/script.js'
];

// Установка Service Worker и кэширование ресурсов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Кэширование ресурсов приложения');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Активация и удаление старых кэшей
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Удаление старого кэша:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Перехват запросов и отдача из кэша
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Возвращаем ресурс из кэша, если он там есть, иначе делаем запрос в сеть
      return response || fetch(event.request);
    })
  );
});