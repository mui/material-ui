/* eslint-disable no-console */
import path from 'path';
import chalk from 'chalk';
import fse from 'fs-extra';
import glob from 'fast-glob';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const SRC_DIR = path.resolve(currentDirectory, '../lib/esm');
const CJS_TARGET_DIR = path.resolve(currentDirectory, '../build');
const ESM_TARGET_DIR = path.resolve(currentDirectory, '../build/esm');

function normalizeFileName(file) {
  return path.parse(file).name;
}

function createIconTyping(file, targetDir) {
  const name = normalizeFileName(file);
  const contents = `export { default } from '@mui/material/SvgIcon';`;
  return fse.writeFile(path.resolve(targetDir, `${name}.d.ts`), contents, 'utf8');
}

function createIndexTyping(files, targetDir) {
  const contents = `
import SvgIcon from '@mui/material/SvgIcon';

type SvgIconComponent = typeof SvgIcon;

${files.map((file) => `export const ${normalizeFileName(file)}: SvgIconComponent;`).join('\n')}
`;

  return fse.writeFile(path.resolve(targetDir, 'index.d.ts'), contents, 'utf8');
}

// Generate TypeScript.
async function run() {
  await fse.ensureDir(CJS_TARGET_DIR);
  await fse.ensureDir(ESM_TARGET_DIR);
  console.log(`\u{1f52c}  Searching for modules inside "${chalk.dim(SRC_DIR)}".`);
  const files = await glob('!(index)*.js', { cwd: SRC_DIR });
  const cjsTypings = files.map((file) => createIconTyping(file, CJS_TARGET_DIR));
  const esmTypings = files.map((file) => createIconTyping(file, ESM_TARGET_DIR));
  await Promise.all([
    ...cjsTypings,
    ...esmTypings,
    createIndexTyping(files, CJS_TARGET_DIR),
    createIndexTyping(files, ESM_TARGET_DIR),
  ]);
  console.log(
    `\u{1F5C4}  Written typings to ${chalk.dim(CJS_TARGET_DIR)} and ${chalk.dim(ESM_TARGET_DIR)}.`,
  );
}

run();
