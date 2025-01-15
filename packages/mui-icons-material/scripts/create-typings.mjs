/* eslint-disable no-console */
import path from 'path';
import chalk from 'chalk';
import fse from 'fs-extra';
import glob from 'fast-glob';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const SRC_DIR = path.resolve(currentDirectory, '../lib/esm');
const TARGET_DIR = path.resolve(currentDirectory, '../build');
const TARGET_DIR_ESM = path.resolve(currentDirectory, '../build/esm');

function normalizeFileName(file) {
  return path.parse(file).name;
}

function createIconTyping(targetDir) {
  const contents = `export { default } from '@mui/material/SvgIcon';`;
  return fse.writeFile(path.resolve(targetDir, `_icon.d.ts`), contents, 'utf8');
}

function createIndexTyping(targetDir, files) {
  const contents = `
import SvgIcon from '@mui/material/SvgIcon';

type SvgIconComponent = typeof SvgIcon;

${files.map((file) => `export const ${normalizeFileName(file)}: SvgIconComponent;`).join('\n')}
`;

  return fse.writeFile(path.resolve(targetDir, 'index.d.ts'), contents, 'utf8');
}

// Generate TypeScript.
async function run() {
  await fse.ensureDir(TARGET_DIR);
  console.log(`\u{1f52c}  Searching for modules inside "${chalk.dim(SRC_DIR)}".`);
  const files = await glob('!(index)*.js', { cwd: SRC_DIR });
  await Promise.all([
    createIconTyping(TARGET_DIR),
    createIndexTyping(TARGET_DIR, files),
    createIconTyping(TARGET_DIR_ESM),
    createIndexTyping(TARGET_DIR_ESM, files),
  ]);
  console.log(`\u{1F5C4}  Written typings to ${chalk.dim(TARGET_DIR)}.`);
}

run();
