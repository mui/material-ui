/**
 * `snapshots` always refer to size snapshots in this file
 */
const fse = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');
const { fromEntries, uniqueKeys } = require('../utils');

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

module.exports = async function loadComparison(parrentId, ref) {
  const [currentSnapshot, previousSnapshot] = await Promise.all([
    loadCurrentSnapshot(),
    // silence non existing snapshots
    loadSnapshot(parrentId, ref).catch(() => ({})),
  ]);

  const bundleKeys = uniqueKeys(currentSnapshot, previousSnapshot);

  const bundles = fromEntries(
    bundleKeys.map(bundle => {
      // if a bundle was added the change should be +inf
      // if a bundle was removed the change should be -inf
      const currentSize = currentSnapshot[bundle] || {
        gzip: Number.POSITIVE_INFINITY,
        parsed: Number.POSITIVE_INFINITY,
      };
      const previousSize = previousSnapshot[bundle] || {
        gzip: Number.NEGATIVE_INFINITY,
        parsed: Number.NEGATIVE_INFINITY,
      };

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
