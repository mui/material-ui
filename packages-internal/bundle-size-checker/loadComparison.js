/**
 * `snapshots` always refer to size snapshots in this file
 */
import path from 'path';
import fse from 'fs-extra';

const ARTIFACT_SERVER = 'https://s3.eu-central-1.amazonaws.com/mui-org-ci';

/**
 * @param {string} [snapshotPath] - Optional path to the snapshot file
 */
async function loadCurrentSnapshot(snapshotPath) {
  const filePath = snapshotPath || path.join(process.cwd(), 'size-snapshot.json');
  return fse.readJSON(filePath);
}

/**
 * @param {string} commitId - the sha of a commit
 * @param {string} ref - the branch containing that commit
 */
async function loadSnapshot(commitId, ref) {
  if (ref === undefined) {
    throw new TypeError(
      `Need a ref for that commit. Did you mean \`loadSnapshot(commitId, 'master')\`?`,
    );
  }
  const url = `${ARTIFACT_SERVER}/artifacts/${ref}/${commitId}/size-snapshot.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch "${url}", HTTP ${response.status}`);
  }
  return response.json();
}

const nullSnapshot = { parsed: 0, gzip: 0 };

/**
 * @param {string} parentId - The commit ID
 * @param {string} ref - The branch reference
 * @param {string} [snapshotPath] - Optional path to the current snapshot file
 */
export default async function loadComparison(parentId, ref, snapshotPath) {
  const [currentSnapshot, previousSnapshot] = await Promise.all([
    loadCurrentSnapshot(snapshotPath),
    // continue non existing snapshots
    loadSnapshot(parentId, ref).catch((reason) => {
      console.warn(`Failed to load snapshot for ref '${ref}' and commit '${parentId}': `, reason);
      return {};
    }),
  ]);

  const bundleKeys = Object.keys({ ...currentSnapshot, ...previousSnapshot });

  const bundles = Object.fromEntries(
    bundleKeys.map((bundle) => {
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
    previous: parentId,
    current: 'HEAD',
    bundles,
  };
}
