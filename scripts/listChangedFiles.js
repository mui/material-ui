// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/shared/listChangedFiles.js

const util = require('util');
const childProcess = require('child_process');

const execFileNode = util.promisify(childProcess.execFile);

function execFile(command, args) {
  return execFileNode(command, args, {
    cwd: process.cwd(),
    env: process.env,
    encoding: 'utf-8',
  });
}

async function execGitCmd(args) {
  const gitResults = await execFile('git', args);
  const stdout = gitResults.stdout.trim();
  if (stdout === '') {
    return [];
  }
  return stdout.split('\n');
}

async function listChangedFiles({ branch }) {
  const comparedBranch = process.env.CIRCLECI ? `origin/${branch}` : branch;
  const mergeBase = await execGitCmd(['rev-parse', comparedBranch]);
  const gitDiff = await execGitCmd(['diff', '--name-only', mergeBase]);
  const gitLs = await execGitCmd(['ls-files', '--others', '--exclude-standard']);
  return new Set([...gitDiff, ...gitLs]);
}

module.exports = listChangedFiles;
