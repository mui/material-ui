/* eslint-env serviceworker */
/* global workbox */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0-beta.0/workbox-sw.js');

workbox.core.setCacheNameDetails({
  prefix: 'mui',
});

workbox.precaching.precacheAndRoute([]);
