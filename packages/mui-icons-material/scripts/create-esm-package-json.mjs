import path from 'path';
import * as fs from 'fs/promises';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const BUILD_DIR = path.resolve(currentDirectory, '../build');
const TARGET_DIR_ESM = path.join(BUILD_DIR, 'esm');

async function run() {
  await fs.writeFile(
    path.resolve(TARGET_DIR_ESM, 'package.json'),
    JSON.stringify({ type: 'module', sideEffects: false }),
    'utf8',
  );
  const pkgJson = JSON.parse(await fs.readFile(path.join(BUILD_DIR, 'package.json'), 'utf8'));
  delete pkgJson.scripts;
  delete pkgJson.devDependencies;
  delete pkgJson.publishConfig.directory;
  pkgJson.main = 'index.js';
  pkgJson.types = 'index.d.ts';
  await fs.writeFile(
    path.resolve(BUILD_DIR, 'package.json'),
    `${JSON.stringify(pkgJson, null, 2)}\n`,
    'utf8',
  );
}

run();
