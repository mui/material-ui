import path from 'path';
import * as fs from 'fs/promises';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const TARGET_DIR_ESM = path.resolve(currentDirectory, '../build/esm');

async function run() {
  await fs.writeFile(
    path.resolve(TARGET_DIR_ESM, 'package.json'),
    JSON.stringify({ type: 'module', sideEffects: false }),
    'utf8',
  );
}

run();
