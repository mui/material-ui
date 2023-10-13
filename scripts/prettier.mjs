/* eslint-disable no-console */
// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/prettier/index.js

// supported modes = check, check-changed, write, write-changed

import util from 'util';
import yargs from 'yargs';
import childProcess, { spawn } from 'child_process';
import listChangedFiles from './listChangedFiles.mjs';

const execFile = util.promisify(childProcess.execFile);

async function run(argv) {
  const { mode, branch } = argv;
  const shouldWrite = mode === 'write' || mode === 'write-changed';
  const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

  const args = [
    '--ignore-path=.eslintignore',
    '--ignore-unknown',
    '--no-error-on-unmatched-pattern',
  ];

  if (shouldWrite) {
    args.push('--write');
  } else {
    args.push('--check');
  }

  if (onlyChanged) {
    const changedFiles = await listChangedFiles({ branch });
    args.push(...changedFiles);
  } else {
    args.push('.');
  }

  const child = spawn('prettier', args, { stdio: 'inherit' });

  await new Promise((resolve, reject) => {
    child.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`prettier ${shouldWrite ? 'write' : 'check'} failed`));
        return;
      }
      resolve();
    });
  });
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
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
