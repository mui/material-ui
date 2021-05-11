// inspire by reacts dangerfile
// danger has to be the first thing required!
const { danger, markdown } = require('danger');
const { exec } = require('child_process');
const { loadComparison } = require('./scripts/sizeSnapshot');

const azureBuildId = process.env.AZURE_BUILD_ID;
const azureBuildUrl = `https://dev.azure.com/mui-org/Material-UI/_build/results?buildId=${azureBuildId}`;
const dangerCommand = process.env.DANGER_COMMAND;

const parsedSizeChangeThreshold = 300;
const gzipSizeChangeThreshold = 100;

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

const UPSTREAM_REMOTE = 'danger-upstream';

/**
 * This is mainly used for local development. It should be executed before the
 * scripts exit to avoid adding internal remotes to the local machine. This is
 * not an issue in CI.
 */
async function reportBundleSizeCleanup() {
  await git(`remote remove ${UPSTREAM_REMOTE}`);
}

/**
 * creates a callback for Object.entries(comparison).filter that excludes every
 * entry that does not exceed the given threshold values for parsed and gzip size
 * @param {number} parsedThreshold
 * @param {number} gzipThreshold
 */
function createComparisonFilter(parsedThreshold, gzipThreshold) {
  return (comparisonEntry) => {
    const [, snapshot] = comparisonEntry;
    return (
      Math.abs(snapshot.parsed.absoluteDiff) >= parsedThreshold ||
      Math.abs(snapshot.gzip.absoluteDiff) >= gzipThreshold
    );
  };
}

/**
 * checks if the bundle is of a package e.b. `@material-ui/core` but not
 * `@material-ui/core/Paper`
 * @param {[string, any]} comparisonEntry
 */
function isPackageComparison(comparisonEntry) {
  const [bundleKey] = comparisonEntry;
  return /^@[\w-]+\/[\w-]+$/.test(bundleKey);
}

/**
 * Generates a user-readable string from a percentage change
 * @param {number} change
 * @param {string} goodEmoji emoji on reduction
 * @param {string} badEmoji emoji on increase
 */
function addPercent(change, goodEmoji = '', badEmoji = ':small_red_triangle:') {
  const formatted = (change * 100).toFixed(2);
  if (/^-|^0(?:\.0+)$/.test(formatted)) {
    return `${formatted}% ${goodEmoji}`;
  }
  return `+${formatted}% ${badEmoji}`;
}

function generateEmphasizedChange([bundle, { parsed, gzip }]) {
  // increase might be a bug fix which is a nice thing. reductions are always nice
  const changeParsed = addPercent(parsed.relativeDiff, ':heart_eyes:', '');
  const changeGzip = addPercent(gzip.relativeDiff, ':heart_eyes:', '');

  return `**${bundle}**: parsed: ${changeParsed}, gzip: ${changeGzip}`;
}

/**
 * Puts results in different buckets wh
 * @param {*} results
 */
function sieveResults(results) {
  const main = [];
  const pages = [];

  results.forEach((entry) => {
    const [bundleId] = entry;

    if (bundleId.startsWith('docs:')) {
      pages.push(entry);
    } else {
      main.push(entry);
    }
  });

  return { all: results, main, pages };
}

function prepareBundleSizeReport() {
  markdown(
    `Bundle size will be reported once [Azure build #${azureBuildId}](${azureBuildUrl}) finishes.`,
  );
}

async function reportBundleSize() {
  // Use git locally to grab the commit which represents the place
  // where the branches differ
  const upstreamRepo = danger.github.pr.base.repo.full_name;
  const upstreamRef = danger.github.pr.base.ref;
  try {
    await git(`remote add ${UPSTREAM_REMOTE} https://github.com/${upstreamRepo}.git`);
  } catch (err) {
    // ignore if it already exist for local testing
  }
  await git(`fetch ${UPSTREAM_REMOTE}`);
  const mergeBaseCommit = await git(`merge-base HEAD ${UPSTREAM_REMOTE}/${upstreamRef}`);

  const detailedComparisonRoute = `/size-comparison?buildId=${azureBuildId}&baseRef=${danger.github.pr.base.ref}&baseCommit=${mergeBaseCommit}&prNumber=${danger.github.pr.number}`;
  const detailedComparisonUrl = `https://mui-dashboard.netlify.app${detailedComparisonRoute}`;
  const detailedComparisonUrlExperimental = `https://mui-maintainer-dashboard-remix.vercel.app/${detailedComparisonRoute}`;

  const comparison = await loadComparison(mergeBaseCommit, upstreamRef);

  const { all: allResults, main: mainResults } = sieveResults(Object.entries(comparison.bundles));
  const anyResultsChanges = allResults.filter(createComparisonFilter(1, 1));

  if (anyResultsChanges.length > 0) {
    const importantChanges = mainResults
      .filter(createComparisonFilter(parsedSizeChangeThreshold, gzipSizeChangeThreshold))
      .filter(isPackageComparison)
      .map(generateEmphasizedChange);

    // have to guard against empty strings
    if (importantChanges.length > 0) {
      markdown(importantChanges.join('\n'));
    }

    const details = `[Details of bundle changes](${detailedComparisonUrl}) ([experimental](${detailedComparisonUrlExperimental}))`;

    markdown(details);
  } else {
    markdown(
      `[No bundle size changes](${detailedComparisonUrl}) ([experimental](${detailedComparisonUrlExperimental}))`,
    );
  }
}

async function run() {
  switch (dangerCommand) {
    case 'prepareBundleSizeReport':
      prepareBundleSizeReport();
      break;
    case 'reportBundleSize':
      try {
        await reportBundleSize();
      } finally {
        await reportBundleSizeCleanup();
      }
      break;
    default:
      throw new TypeError(`Unrecognized danger command '${dangerCommand}'`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
