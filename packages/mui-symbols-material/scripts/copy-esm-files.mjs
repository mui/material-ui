import path from 'path';
import fse from 'fs-extra';
import url from 'url';
import { rimraf } from 'rimraf';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const SRC_DIR = path.resolve(currentDirectory, '../packages/esm');
const TARGET_DIR = path.resolve(currentDirectory, '../packages');

async function handler() {
  const directories = await fse.readdir(SRC_DIR, { withFileTypes: true });
  const dirs = directories.filter((dir) => dir.isDirectory()).map((dir) => dir.name);
  await Promise.all(
    dirs.map((dir) =>
      (async () => {
        const srcPath = path.join(SRC_DIR, dir);
        const targetPath = path.join(TARGET_DIR, dir, 'esm');
        // move srcPath dir to targetPath
        await rimraf(targetPath);
        await fse.move(srcPath, targetPath);
      })(),
    ),
  );

  await rimraf(SRC_DIR);
}

handler();
