/* eslint no-console: off */

const { join } = require('path');
const { injectManifest } = require('workbox-build');

const exportDir = join(__dirname, '../export');

injectManifest({
  swSrc: join(__dirname, '/service-worker.js'),
  swDest: join(exportDir, '/service-worker.js'),
  globDirectory: exportDir,
  globPatterns: ['**/*.{js,css,html}'],
}).then(({ count }) => {
  console.log(`Successfully built service worker\n${count} files were marked for precaching`);
});
