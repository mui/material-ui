/**
 * `snapshots` always refer to size snapshots in this file
 */
const fse = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');
const lodash = require('lodash');

const artifactServer = 'https://s3.eu-central-1.amazonaws.com/eps1lon-material-ui';

async function loadCurrentSnapshot() {
  return fse.readJSON(path.join(__dirname, '../../size-snapshot.json'));
}

/**
 * @param {string} commitId - the sha of a commit
 * @param {string} ref - the branch containing that commit
 */
async function loadSnapshot(commitId, ref = 'master') {
  const response = await fetch(`${artifactServer}/artifacts/${ref}/${commitId}/size-snapshot.json`);
  return response.json();
}

const nullSnapshot = { parsed: 0, gzip: 0 };

module.exports = async function loadComparison(parrentId, ref) {
  const [currentSnapshot, previousSnapshot] = await Promise.all([
    loadCurrentSnapshot(),
    // silence non existing snapshots
    loadSnapshot(parrentId, ref).catch(() => ({})),
  ]);

  const bundleKeys = Object.keys({ ...currentSnapshot, ...previousSnapshot });

  const bundles = lodash.fromPairs(
    bundleKeys.map(bundle => {
      // if a bundle was added the change should be +inf
      // if a bundle was removed the change should be -100%
      const currentSize = currentSnapshot[bundle] || nullSnapshot;
      const previousSize = previousSnapshot[bundle] || nullSnapshot;

      return [
        bundle,
        {
          parsed: {
            previous: previousSize.parsed,
            current: currentSize.parsed,
            absoluteDiff: currentSize.parsed - previousSize.parsed,
            relativeDiff: currentSize.parsed / previousSize.parsed - 1,
          },
          gzip: {
            previous: previousSize.gzip,
            current: currentSize.gzip,
            absoluteDiff: currentSize.gzip - previousSize.gzip,
            relativeDiff: currentSize.gzip / previousSize.gzip - 1,
          },
        },
      ];
    }),
  );

  return {
    previous: parrentId,
    current: 'HEAD',
    bundles,
  };
};
