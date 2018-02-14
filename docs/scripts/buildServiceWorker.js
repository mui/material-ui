/* eslint-disable no-console */

import path from 'path';
import workboxBuild from 'workbox-build';

const exportDir = path.join(__dirname, '../export');

workboxBuild
  .injectManifest({
    swSrc: path.join(__dirname, '../src/sw.js'),
    swDest: path.join(exportDir, '/sw.js'),
    globDirectory: exportDir,
    globPatterns: ['**/*.{js,html}'],
  })
  .then(({ count }) => {
    console.log('Successfully built service worker');
    console.log(`${count} files were marked for precaching`);
  });
