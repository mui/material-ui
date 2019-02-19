/**
 * `snapshots` always refer to size snapshots in this file
 */
const fse = require('fs-extra');
const path = require('path');
const fetch = require('node-fetch');

const artifactServer = 'https://s3.eu-central-1.amazonaws.com/eps1lon-material-ui';

async function loadCurrentSnapshot() {
  return fse.readJSON(path.join(__dirname, '../../size-snapshot.json'));
}

/**
 * @param {string} commitId the sha of a commit
 * @param {string} ref the branch containing that commit
 */
async function loadSnapshot(commitId, ref = 'master') {
  const response = await fetch(`${artifactServer}/artifacts/${ref}/${commitId}/size-snapshot.json`);
  return response.json();
}

function flatten(array) {
  return array.reduce((acc, entry) => acc.concat(entry), []);
}

function fromEntries(entries) {
  return entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, []);
}

function uniqueKeys(...objects) {
  return Array.from(new Set(flatten(objects.map(Object.keys))));
}

const nullSnapshot = { gzip: Number.NaN, parsed: Number.NaN };

module.exports = async function loadComparison(parrentId, ref) {
  const [currentSnapshot, previousSnapshot] = await Promise.all([
    loadCurrentSnapshot(),
    // silence non existing snapshots
    loadSnapshot(parrentId, ref).catch(() => ({})),
  ]);

  const bundleKeys = uniqueKeys(currentSnapshot, previousSnapshot);

  const bundles = fromEntries(
    bundleKeys.map(bundle => {
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
