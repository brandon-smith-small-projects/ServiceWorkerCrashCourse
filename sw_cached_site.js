const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove Unwanted Caches
  e.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make copy Of Response
        const resClone = res.clone();
        // Open Cache
        caches.open(cacheName).then(cache => {
          // Add Response To Cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => {
        caches.match(e.request.then(res => res));
      })
  );
});
