/* eslint-disable no-console */

// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js

// supported modes = check, check-changed, write, write-changed

const glob = require('glob-gitignore');
const prettier = require('prettier');
const fs = require('fs');
const path = require('path');
const listChangedFiles = require('./listChangedFiles');

const mode = process.argv[2] || 'write-changed';
const shouldWrite = mode === 'write' || mode === 'write-changed';
const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

function runPrettier(changedFiles) {
  let didWarn = false;
  let didError = false;

  const warnedFiles = [];
  const ignoredFiles = fs
    .readFileSync('.eslintignore', 'utf-8')
    .split(/\r*\n/)
    .filter(notEmpty => notEmpty);

  const files = glob
    .sync('**/*.{js,tsx,d.ts}', { ignore: ['**/node_modules/**', ...ignoredFiles] })
    .filter(f => !changedFiles || changedFiles.has(f));

  if (!files.length) {
    process.exit(0);
  }

  const prettierConfigPath = path.join(__dirname, '../prettier.config.js');

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
      } else {
        console.log(`Checking ${file}`);
        if (!prettier.check(input, { ...options, filepath: file })) {
          warnedFiles.push(file);
          didWarn = true;
        }
      }
    } catch (error) {
      didError = true;
      console.log(`\n\n${error.message}`);
      console.log(file);
    }
  });

  if (didWarn) {
    console.log(
      '\n\nThis project uses prettier to format all JavaScript code.\n' +
        `Please run '${!changedFiles ? 'yarn prettier:all' : 'yarn prettier'}'` +
        'and commit the changes to the files listed below:\n\n',
    );
    console.log(warnedFiles.join('\n'));
  }

  if (didWarn || didError) {
    process.exit(1);
  }
}

async function run() {
  try {
    if (onlyChanged) {
      const changedFiles = await listChangedFiles();
      runPrettier(changedFiles);
      return;
    }

    runPrettier();
  } catch (err) {
    console.error(err);
  }
}

run();
