/* eslint-disable no-console */
// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js

// supported modes = check, check-changed, write, write-changed

import yargs from 'yargs';
import { $ } from 'execa';
import listChangedFiles from './listChangedFiles.mjs';

const numberFormat = new Intl.NumberFormat();

async function runPrettierCli(...args) {
  await $({ stdio: 'inherit' })`prettier ${args}`;
}

async function run(argv) {
  const { mode, branch, ci } = argv;
  const shouldWrite = mode === 'write' || mode === 'write-changed';
  const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

  const commonArgs = ['--ignore-path=.eslintignore'];

  if (shouldWrite) {
    commonArgs.push('--write');
  } else {
    commonArgs.push('--check');
  }

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
    const batchSize = 50;
    const batchCount = Math.ceil(filesToCheck.size / batchSize);
    for (let i = 0; i < batchCount; i += 1) {
      console.log(`Running prettier on batch ${i + 1} of ${batchCount}.`);
      const batch = Array.from(filesToCheck).slice(i * batchSize, (i + 1) * batchSize);
      // eslint-disable-next-line no-await-in-loop
      await runPrettierCli(
        ...commonArgs,
        '--ignore-unknown',
        '--no-error-on-unmatched-pattern',
        ...batch,
      );
    }
  } else {
    await runPrettierCli(...commonArgs, '.');
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
