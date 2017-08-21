// @flow
/* eslint-disable no-console */

// Generate type definitions for `material-ui-icons`.
// The generated contens will be written to
// `src/typings/material-ui-icons.d.ts`!

const path = require('path');
const { EOL } = require('os');
const chalk = require('chalk');
const { outputFile } = require('fs-extra');
const glob = require('glob');

const SRC_DIR = path.resolve(__dirname, 'src');
const TARGET_FILE = path.resolve(__dirname, 'build/index.d.ts');

function getFiles(dir) {
  return new Promise((resolve, reject) => {
    glob('!(index)*.js', { cwd: dir }, (err, files) => (err ? reject(err) : resolve(files)));
  });
}

function normalizeFileName(name) {
  return path.parse(name).name;
}

function createTypeDefinition(name) {
  return `declare module 'material-ui-icons/${name}' {
    import SvgIcon from 'material-ui/SvgIcon';
    export default class ${name} extends SvgIcon {}
  }`;
}

function convertFilesToTypings(files) {
  return files.map(file => createTypeDefinition(normalizeFileName(file)));
}

console.log(`\u{1f52c}  Searching for modules inside "${chalk.dim(SRC_DIR)}".`);
getFiles(SRC_DIR)
  .then(convertFilesToTypings)
  .then(typings => typings.join(`${EOL}${EOL}`))
  .then(contents => outputFile(TARGET_FILE, contents, { encoding: 'utf8' }))
  .then(() => console.log(`\u{1F5C4}  Written typings to ${chalk.dim(TARGET_FILE)}.`))
  .catch(err => {
    if (err) {
      console.log(err);
    }
    process.exit(1);
  });
