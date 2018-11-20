/* eslint-disable no-console */

// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/shared/listChangedFiles.js

const promisify = require('util').promisify;
const execFile = require('child_process').execFile;

const execFileAsync = promisify(execFile);

const exec = async (command, args) => {
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };

  const results = await execFileAsync(command, args, options);
  return results.stdout;
};

const execGitCmd = async args => {
  const gitResults = await exec('git', args);
  return gitResults
    .trim()
    .toString()
    .split('\n');
};

const listChangedFiles = async () => {
  const mergeBase = await execGitCmd(['rev-parse', 'origin/master']);
  const gitDiff = await execGitCmd(['diff', '--name-only'].concat(mergeBase));
  const gitLs = await execGitCmd(['ls-files', '--others', '--exclude-standard']);
  return new Set([...gitDiff, ...gitLs]);
};

module.exports = listChangedFiles;
