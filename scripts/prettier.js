/* eslint-disable no-console */

// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js

import glob from 'glob';
import prettier from 'prettier';
import fs from 'fs';
import os from 'os';
import path from 'path';
import listChangedFiles from './listChangedFiles';

const prettierConfigPath = path.join(__dirname, '../prettier.config.js');

const mode = process.argv[2] || 'check';
const shouldWrite = mode === 'write' || mode === 'write-changed';
const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

const changedFiles = onlyChanged ? listChangedFiles() : null;
let didWarn = false;
let didError = false;

const ignoredFiles = fs
  .readFileSync('.eslintignore', 'utf-8')
  .split(os.EOL)
  .filter(notEmpty => notEmpty)
  .map(file => `**/${file}/**`);

const files = glob
  .sync('**/*.{js,tsx,d.ts}', { ignore: ['**/node_modules/**', ...ignoredFiles] })
  .filter(f => !onlyChanged || changedFiles.has(f));

if (!files.length) {
  process.exit(0);
}

files.forEach(file => {
  const options = prettier.resolveConfig.sync(file, {
    config: prettierConfigPath,
  });
  try {
    const input = fs.readFileSync(file, 'utf8');
    if (shouldWrite) {
      console.log(`Formatting ${file}`);
      const output = prettier.format(input, { ...options, filepath: file });
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
      }
    } else if (!prettier.check(input, { ...options, filepath: file })) {
      if (!didWarn) {
        console.log(`\nThis project uses prettier to format all JavaScript code.
           Please run 'yarn prettier-all' and add changes to files listed
           below to your commit:\n\n`);
        didWarn = true;
      }
      console.log(file);
    }
  } catch (error) {
    didError = true;
    console.log(`\n\n${error.message}`);
    console.log(file);
  }
});

if (didWarn || didError) {
  process.exit(1);
}
