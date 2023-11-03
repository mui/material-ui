/* eslint-disable no-console */
// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js

// supported modes = check, check-changed, write, write-changed

import yargs from 'yargs';
import { $ } from 'execa';
import listChangedFiles from './listChangedFiles.mjs';

const numberFormat = new Intl.NumberFormat();

async function run(argv) {
  const { mode, branch, ci } = argv;
  const shouldWrite = mode === 'write' || mode === 'write-changed';
  const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

  const args = ['--ignore-path=.eslintignore'];

  if (shouldWrite) {
    args.push('--write');
  } else {
    args.push('--check');
  }

  if (onlyChanged) {
    const changedFiles = await listChangedFiles({ branch });

    const hasLockFileChanges =
      changedFiles.has('yarn.lock') ||
      changedFiles.has('pnpm.lock') ||
      changedFiles.has('package-json.lock');

    if (ci && hasLockFileChanges) {
      console.log('Detected lockfile changes in CI, running prettier on all files.');
      args.push('.');
    } else {
      console.log(`Running prettier on ${numberFormat.format(changedFiles.size)} files.`);
      args.push('--ignore-unknown', ...changedFiles);
    }
  } else {
    args.push('.');
  }

  await $({ stdio: 'inherit' })`prettier ${args}`;
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
