// Cache name
const CACHE_NAME = 'oxygen-monitor-v1';

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/alarm-sound.mp3',
  '/oxygen-alert-icon.png'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event - remove old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  const data = event.data.json();
  console.log('Push data:', data);

  const options = {
    body: data.body,
    icon: data.icon || '/vite.svg',
    badge: data.badge || '/vite.svg',
    tag: data.tag || 'oxygen-alert',
    requireInteraction: true,
    actions: [
      {
        action: 'stop-alarm',
        title: 'Stop Alarm'
      }
    ],
    data: {
      url: self.location.origin
    }
  };

  console.log('Notification options:', options);

  event.waitUntil(
    self.registration.showNotification(data.title, options)
      .then(() => console.log('Notification shown successfully'))
      .catch(error => console.error('Error showing notification:', error))
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'stop-alarm') {
    // Send message to clients
    event.waitUntil(
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({
            action: 'stop-alarm',
            timestamp: Date.now()
          });
        });
      })
    );
  }

  // Focus or open app
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});
