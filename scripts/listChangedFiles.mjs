// Based on similar script in React
// https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/scripts/shared/listChangedFiles.js

import { $ } from 'execa';

async function listChangedFiles({ branch = 'master' } = {}) {
  const comparedBranch = process.env.CIRCLECI ? `origin/${branch}` : branch;
  const mergeBase = await $`git rev-parse ${comparedBranch}`;
  const gitDiff = await $`git diff --name-only ${mergeBase}`;
  const gitLs = await $`git ls-files --others --exclude-standard`;
  return new Set([...gitDiff.stdout.split('\n'), ...gitLs.stdout.split('\n')]);
}

export default listChangedFiles;
