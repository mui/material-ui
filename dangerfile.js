// inspire by reacts dangerfile
const { exec } = require('child_process');
const { danger, markdown } = require('danger');
const { loadComparison } = require('./scripts/sizeSnapshot');

/**
 * executes a git subcommand
 * @param {any} args
 */
function git(args) {
  return new Promise((resolve, reject) => {
    exec(`git ${args}`, (err, stdout) => {
      if (err) {
        reject(err);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function run() {
  // Use git locally to grab the commit which represents the place
  // where the branches differ
  const upstreamRepo = danger.github.pr.base.repo.full_name;
  const upstreamRef = danger.github.pr.base.ref;
  await git(`remote add upstream https://github.com/${upstreamRepo}.git`);
  await git('fetch upstream');
  const mergeBaseCommit = await git(`merge-base HEAD upstream/${upstreamRef}`);

  markdown('```json\n' + JSON.stringify(danger.github.pr.base.ref, null, 2) + '\n```');

  const comparison = await loadComparison(mergeBaseCommit);
  console.log(comparison);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
