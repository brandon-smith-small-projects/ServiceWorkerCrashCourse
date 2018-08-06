// Make Sure Service Workers Are Supported

if (navigator.serviceWorker) {
  // Register the service worker when the window loads
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw_cached_pages.js')
      .then(reg => console.log('Service Worker: Registered', reg))
      .catch(err => console.log(`Service Worker: Error ${err}`));
  });
}
