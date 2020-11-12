/* eslint-disable no-console */
// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js

// supported modes = check, check-changed, write, write-changed

const glob = require('globby');
const prettier = require('prettier');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const { LANGUAGES } = require('docs/src/modules/constants');
const listChangedFiles = require('./listChangedFiles');

// FIXME: Incorrect assumption
const workspaceRoot = process.cwd();

function isTranslatedDocument(filename) {
  // markdown files from crowdin end with a 2 letter locale
  return new RegExp(String.raw`-(${LANGUAGES.join('|')})\.md$`).test(filename);
}

function runPrettier(options) {
  const { changedFiles, shouldWrite } = options;

  let didWarn = false;
  let didError = false;

  const warnedFiles = [];
  const ignoredFiles = fs
    .readFileSync(path.join(workspaceRoot, '.eslintignore'), 'utf-8')
    .split(/\r*\n/)
    .filter((line) => {
      return (
        // ignore comments
        !line.startsWith('#') &&
        // skip empty lines
        line.length > 0
      );
    })
    .map((line) => {
      if (line.startsWith('/')) {
        // "/" marks the cwd of the ignore file.
        // Since we declare the dirname of the gitignore the cwd we can prepend "." as a shortcut.
        return `.${line}`;
      }
      return line;
    });

  const files = glob
    .sync('**/*.{js,md,tsx,ts,json}', {
      cwd: workspaceRoot,
      gitignore: true,
      ignore: [
        // these are auto-generated
        'docs/pages/api-docs/**/*.md',
        ...ignoredFiles,
      ],
      dot: true,
    })
    .filter(
      (f) =>
        (!changedFiles || changedFiles.has(f)) &&
        // These come from crowdin.
        // If we would commit changes crowdin would immediately try to revert.
        // If we want to format these files we'd need to do it in crowdin
        !isTranslatedDocument(f),
    );

  if (!files.length) {
    return;
  }

  const prettierConfigPath = path.join(workspaceRoot, 'prettier.config.js');

  files.forEach((file) => {
    const prettierOptions = prettier.resolveConfig.sync(file, {
      config: prettierConfigPath,
    });

    try {
      const input = fs.readFileSync(file, 'utf8');
      if (shouldWrite) {
        console.log(`Formatting ${file}`);
        const output = prettier.format(input, { ...prettierOptions, filepath: file });
        if (output !== input) {
          fs.writeFileSync(file, output, 'utf8');
        }
      } else {
        console.log(`Checking ${file}`);
        if (!prettier.check(input, { ...prettierOptions, filepath: file })) {
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
        ' and commit the changes to the files listed below:\n\n',
    );
    console.log(warnedFiles.join('\n'));
  }

  if (didWarn || didError) {
    throw new Error('Triggered at least one error or warning');
  }
}

async function run(argv) {
  const { mode, branch } = argv;
  const shouldWrite = mode === 'write' || mode === 'write-changed';
  const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

  let changedFiles;
  if (onlyChanged) {
    changedFiles = await listChangedFiles({ branch });
  }

  runPrettier({ changedFiles, shouldWrite, branch });
}

yargs
  .command({
    command: '$0 [mode]',
    description: 'formats codebase',
    builder: (command) => {
      return command
        .positional('mode', {
          description: '"write" | "check-changed" | "write-changed"',
          type: 'string',
          default: 'write-changed',
        })
        .option('branch', {
          default: 'next',
          describe: 'The branch to diff against',
          type: 'string',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
