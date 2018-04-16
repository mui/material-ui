/* eslint-disable no-console */

import path from 'path';
import workboxBuild from 'workbox-build';

const exportDir = path.join(__dirname, '../export');

async function run() {
  const output = await workboxBuild.injectManifest({
    globDirectory: exportDir,
    globPatterns: ['**/*.{js,html}'],
    swDest: path.join(exportDir, '/sw.js'),
    swSrc: path.join(__dirname, '../src/sw.js'),
  });
  console.log('Successfully built service worker');
  console.log(`${output.count} files were marked for precaching`);
}

run();
