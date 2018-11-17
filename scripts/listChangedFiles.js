/* eslint-disable no-console */

// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/shared/listChangedFiles.js
import { execFileSync } from 'child_process';

const exec = (command, args) => {
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };
  return execFileSync(command, args, options);
};

const execGitCmd = args =>
  exec('git', args)
    .trim()
    .toString()
    .split('\n');

const listChangedFiles = () => {
  const mergeBase = execGitCmd(['merge-base', 'HEAD', 'master']);
  return new Set([
    ...execGitCmd(['diff', '--name-only', '--diff-filter=ACMRTUB', mergeBase]),
    ...execGitCmd(['ls-files', '--others', '--exclude-standard']),
  ]);
};

module.exports = listChangedFiles;
