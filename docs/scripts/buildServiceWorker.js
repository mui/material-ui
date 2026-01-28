/* eslint-disable no-console */
const path = require('path');
const fs = require('node:fs/promises');

async function prepend(file, string) {
  const data = await fs.readFile(file, 'utf8');
  await fs.writeFile(file, string + data, 'utf8');
}

async function run() {
  const swDest = path.join(__dirname, '../export/sw.js');
  const swSrc = path.join(__dirname, '../src/sw.js');

  await fs.cp(swSrc, swDest, { recursive: true });
  await prepend(
    swDest,
    `
// uuid: ${new Date()}
`,
  );

  console.log('Successfully built service worker');
}

run();
