/* eslint-env serviceworker */
/* eslint-disable no-restricted-globals */
/* global workbox */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0-alpha.0/workbox-sw.js');

workbox.core.setCacheNameDetails({
  // This allows you to work on multiple projects using
  // the same localhost port number without mixing up the caches.
  prefix: 'mui',
});

workbox.routing.registerRoute(/(\/|\.js)$/, workbox.strategies.staleWhileRevalidate());

self.addEventListener('message', event => {
  switch (event.data) {
    case 'skipWaiting':
      // console.log('self.skipWaiting()');
      self.skipWaiting();
      // We don't call claim as it would be too strong.
      // Instead of controlling the page after it was loaded.
      // We wait for the activated event to reload the page and have the
      // activated service worker control it.
      // self.clients.claim();
      break;
    default:
      break;
  }
});
