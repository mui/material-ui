/* eslint-env serviceworker */
/* global workbox */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js');

workbox.core.setCacheNameDetails({
  // This allows you to work on multiple projects using
  // the same localhost port number without mixing up the caches.
  prefix: 'mui',
});

workbox.precaching.precacheAndRoute([]);
