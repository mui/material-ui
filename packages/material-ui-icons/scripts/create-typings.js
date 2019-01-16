/* eslint-disable no-console */

import path from 'path';
import chalk from 'chalk';
import fse from 'fs-extra';
import glob from 'glob';

const SRC_DIR = path.resolve(__dirname, '../src');
const TARGET_DIR = path.resolve(__dirname, '../build');

function normalizeFileName(file) {
  return path.parse(file).name;
}

function createIconTyping(file) {
  const name = normalizeFileName(file);
  const contents = `export { default } from '@material-ui/core/SvgIcon';`;
  return fse.writeFile(path.resolve(TARGET_DIR, `${name}.d.ts`), contents, 'utf8');
}

function createIndexTyping(files) {
  const contents = files
    .map(file => {
      const name = normalizeFileName(file);
      return `export { default as ${name} } from './${name}';`;
    })
    .join('\n');

  return fse.writeFile(path.resolve(TARGET_DIR, 'index.d.ts'), contents, 'utf8');
}

// Generate TypeScript.
async function run() {
  console.log(`\u{1f52c}  Searching for modules inside "${chalk.dim(SRC_DIR)}".`);
  const files = glob.sync('!(index)*.js', { cwd: SRC_DIR });
  const typings = files.map(file => createIconTyping(file));
  await Promise.all([...typings, createIndexTyping(files)]);
  console.log(`\u{1F5C4}  Written typings to ${chalk.dim(TARGET_DIR)}.`);
}

run();
