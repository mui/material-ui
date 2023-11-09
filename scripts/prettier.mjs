/* eslint-disable no-console */
// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js

// supported modes = check, check-changed, write, write-changed

import yargs from 'yargs';
import { $ } from 'execa';
import prettier from 'prettier';
import fs from 'fs/promises';
import listChangedFiles from './listChangedFiles.mjs';

const IGNORE_PATH = '.eslintignore';

const numberFormat = new Intl.NumberFormat();

async function runPrettierOnFile(file, { write } = {}) {
  const info = await prettier.getFileInfo(file, { ignorePath: IGNORE_PATH });
  if (info.ignored || !info.inferredParser) {
    console.log(`"${file}": IGNORED`);
    return;
  }

  const src = await fs.readFile(file, 'utf8').catch((err) => {
    if (err.code === 'ENOENT') {
      return null;
    }
    throw err;
  });

  if (!src) {
    console.log(`"${file}": IGNORED`);
    return;
  }

  const config = await prettier.resolveConfig(file);
  const options = { ...config, filepath: file };

  if (write) {
    const formatted = await prettier.format(src, options);
    if (formatted === src) {
      console.log(`"${file}": OK`);
    } else {
      await fs.writeFile(file, formatted, 'utf8');
      console.log(`"${file}": FORMATTED`);
    }
  } else {
    const isOk = await prettier.check(src, options);

    if (isOk) {
      console.log(`"${file}": OK`);
    } else {
      throw new Error(`"${file}": FAIL`);
    }
  }
}

async function runPrettierOnFiles(files) {
  const concurrency = 10;
  const iterator = Array.from(files).values();

  const createWorker = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of iterator) {
      // eslint-disable-next-line no-await-in-loop
      await runPrettierOnFile(file);
    }
  };

  const workers = [];

  for (let i = 0; i < concurrency; i += 1) {
    workers.push(createWorker());
  }

  await Promise.allSettled(workers);
}

async function run(argv) {
  const { mode, branch, ci } = argv;
  const shouldWrite = mode === 'write' || mode === 'write-changed';
  const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

  let filesToCheck = null;

  if (onlyChanged) {
    filesToCheck = await listChangedFiles({ branch });

    const hasLockFileChanges =
      filesToCheck.has('yarn.lock') ||
      filesToCheck.has('pnpm.lock') ||
      filesToCheck.has('package-json.lock');

    if (ci && hasLockFileChanges) {
      console.log('Detected lockfile changes in CI, running prettier on all files.');
      filesToCheck = null;
    }
  }

  if (filesToCheck) {
    console.log(`Running prettier on ${numberFormat.format(filesToCheck.size)} files.`);
    await runPrettierOnFiles(Array.from(filesToCheck), { write: shouldWrite });
  } else {
    const args = [`--ignore-path=${IGNORE_PATH}`, shouldWrite ? '--write' : '--check'];
    await $({ stdio: 'inherit' })`prettier ${args}`;
  }
}

yargs(process.argv.slice(2))
  .command({
    command: '$0 [mode]',
    description: 'formats codebase',
    builder: (command) => {
      return command
        .positional('mode', {
          description: '"check" | "write" | "check-changed" | "write-changed"',
          type: 'string',
          default: 'write-changed',
        })
        .option('branch', {
          // #default-branch-switch
          default: 'master',
          describe: 'The branch to diff against',
          type: 'string',
        })
        .option('ci', {
          default: false,
          describe: 'Run in CI mode',
          type: 'boolean',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
