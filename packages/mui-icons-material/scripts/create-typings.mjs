/* eslint-disable no-console */
import path from 'path';
import chalk from 'chalk';
import * as fs from 'fs/promises';
import glob from 'fast-glob';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const SRC_DIR = path.resolve(currentDirectory, '../lib/esm');
const TARGET_DIR = path.resolve(currentDirectory, '../lib');
const TARGET_DIR_ESM = path.resolve(currentDirectory, '../lib/esm');

function normalizeFileName(file) {
  return path.parse(file).name;
}

async function createIconTyping(targetDir) {
  const contents = `export { default } from '@mui/material/SvgIcon';`;
  await fs.writeFile(path.resolve(targetDir, `icon.d.ts`), contents, 'utf8');
}

async function createIndexTyping(targetDir, files) {
  const contents = `
import SvgIcon from '@mui/material/SvgIcon';

type SvgIconComponent = typeof SvgIcon;

${files.map((file) => `export const ${normalizeFileName(file)}: SvgIconComponent;`).join('\n')}
`;

  await fs.writeFile(path.resolve(targetDir, 'index.d.ts'), contents, 'utf8');
}

// Generate TypeScript.
async function run() {
  await Promise.all([
    fs.mkdir(TARGET_DIR, { recursive: true }),
    fs.mkdir(TARGET_DIR_ESM, { recursive: true }),
  ]);
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
