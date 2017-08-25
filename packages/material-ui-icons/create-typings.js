// @flow
/* eslint-disable no-console */

// Generate type definitions for `material-ui-icons`.

const path = require('path');
const chalk = require('chalk');
const { outputFile } = require('fs-extra');
const glob = require('glob');

const SRC_DIR = path.resolve(__dirname, 'src');
const TARGET_DIR = path.resolve(__dirname, 'build');

function getFiles(dir) {
  return new Promise((resolve, reject) => {
    glob('!(index)*.js', { cwd: dir }, (err, files) => (err ? reject(err) : resolve(files)));
  });
}

function normalizeFileName(file) {
  return path.parse(file).name;
}

function createTypeDefinition(name) {
  return `import SvgIcon from 'material-ui/SvgIcon';
export default class ${name} extends SvgIcon {}`;
}

function createIconTyping(file) {
  const name = normalizeFileName(file);
  return outputFile(path.resolve(TARGET_DIR, `${name}.d.ts`), createTypeDefinition(name), {
    encoding: 'utf8',
  });
}

function createIndexTyping(files) {
  const contents = files
    .map(file => {
      const name = normalizeFileName(file);
      return `export { default as ${name} } from './${name}';`;
    })
    .join('\n');
  return outputFile(path.resolve(TARGET_DIR, 'index.d.ts'), contents, {
    encoding: 'utf8',
  });
}

console.log(`\u{1f52c}  Searching for modules inside "${chalk.dim(SRC_DIR)}".`);
getFiles(SRC_DIR)
  .then(files => {
    const typings = files.map(file => createIconTyping(file));
    return Promise.all([...typings, createIndexTyping(files)]);
  })
  .then(() => console.log(`\u{1F5C4}  Written typings to ${chalk.dim(TARGET_DIR)}.`))
  .catch(err => {
    if (err) {
      console.log(err);
    }
    process.exit(1);
  });
