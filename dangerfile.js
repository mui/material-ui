// inspire by reacts dangerfile
// danger has to be the first thing required!
const { danger, markdown } = require('danger');
const { exec } = require('child_process');
const prettyBytes = require('pretty-bytes');
const { loadComparison } = require('./scripts/sizeSnapshot');

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
async function cleanup() {
  await git(`remote remove ${UPSTREAM_REMOTE}`);
}

/**
 * creates a callback for Object.entries(comparison).filter that excludes every
 * entry that does not exceed the given threshold values for parsed and gzip size
 *
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

function formatDiff(absoluteChange, relativeChange) {
  if (absoluteChange === 0) {
    return '--';
  }

  const trendIcon = absoluteChange < 0 ? '▼' : '▲';

  return `${trendIcon} ${prettyBytes(absoluteChange, { signed: true })} (${addPercent(
    relativeChange,
    '',
    '',
  )})`;
}

/**
 * Generates a Markdown table
 * @param {{ label: string, align: 'left' | 'center' | 'right'}[]} headers
 * @param {string[][]} body
 * @returns {string}
 */
function generateMDTable(headers, body) {
  const headerRow = headers.map((header) => header.label);
  const alignmentRow = headers.map((header) => {
    if (header.align === 'right') {
      return ' ---:';
    }
    if (header.align === 'center') {
      return ':---:';
    }
    return ' --- ';
  });

  return [headerRow, alignmentRow, ...body].map((row) => row.join(' | ')).join('\n');
}

function generateEmphasizedChange([bundle, { parsed, gzip }]) {
  // increase might be a bug fix which is a nice thing. reductions are always nice
  const changeParsed = addPercent(parsed.relativeDiff, ':heart_eyes:', '');
  const changeGzip = addPercent(gzip.relativeDiff, ':heart_eyes:', '');

  return `**${bundle}**: parsed: ${changeParsed}, gzip: ${changeGzip}`;
}

/**
 *
 * @param {[string, object][]} entries
 * @param {object} options
 * @param {function (string): string} options.computeBundleLabel
 */
function createComparisonTable(entries, options) {
  const { computeBundleLabel } = options;

  return generateMDTable(
    [
      { label: 'bundle' },
      { label: 'Size Change', align: 'right' },
      { label: 'Size', align: 'right' },
      { label: 'Gzip Change', align: 'right' },
      { label: 'Gzip', align: 'right' },
    ],
    entries
      .map(([bundleId, size]) => [computeBundleLabel(bundleId), size])
      // orderBy(|parsedDiff| DESC, |gzipDiff| DESC, name ASC)
      .sort(([labelA, statsA], [labelB, statsB]) => {
        const compareParsedDiff =
          Math.abs(statsB.parsed.absoluteDiff) - Math.abs(statsA.parsed.absoluteDiff);
        const compareGzipDiff =
          Math.abs(statsB.gzip.absoluteDiff) - Math.abs(statsA.gzip.absoluteDiff);
        const compareName = labelA.localeCompare(labelB);

        if (compareParsedDiff === 0 && compareGzipDiff === 0) {
          return compareName;
        }
        if (compareParsedDiff === 0) {
          return compareGzipDiff;
        }
        return compareParsedDiff;
      })
      .map(([label, { parsed, gzip }]) => {
        return [
          label,
          formatDiff(parsed.absoluteDiff, parsed.relativeDiff),
          prettyBytes(parsed.current),
          formatDiff(gzip.absoluteDiff, gzip.relativeDiff),
          prettyBytes(gzip.current),
        ];
      }),
  );
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

async function run() {
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

  const commitRange = `${mergeBaseCommit}...${danger.github.pr.head.sha}`;

  const comparison = await loadComparison(mergeBaseCommit, upstreamRef);

  const { all: allResults, main: mainResults, pages: pageResults } = sieveResults(
    Object.entries(comparison.bundles),
  );
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

    const mainDetailsTable = createComparisonTable(mainResults, {
      computeBundleLabel: (bundleId) => {
        if (bundleId === 'packages/material-ui/build/umd/material-ui.production.min.js') {
          return '@material-ui/core[umd]';
        }
        if (bundleId === '@material-ui/core/Textarea') {
          return 'TextareaAutosize';
        }
        if (bundleId === 'docs.main') {
          return 'docs:/_app';
        }
        if (bundleId === 'docs.landing') {
          return 'docs:/';
        }
        return bundleId.replace(/^@material-ui\/core\//, '').replace(/\.esm$/, '');
      },
    });
    const pageDetailsTable = createComparisonTable(pageResults, {
      computeBundleLabel: (bundleId) => {
        // a page
        if (bundleId.startsWith('docs:/')) {
          const host = `https://deploy-preview-${danger.github.pr.number}--material-ui.netlify.app`;
          const page = bundleId.replace(/^docs:/, '');
          return `[${page}](${host}${page})`;
        }

        // shared
        return bundleId;
      },
    });

    const details = `
  <details>
  <summary>Details of bundle changes.</summary>

  <p>Comparing: ${commitRange}</p>

  <details>
  <summary>Details of page changes</summary>

  ${pageDetailsTable}
  </details>

  ${mainDetailsTable}

  </details>`;

    markdown(details);
  } else {
    // this can later be removed to reduce PR noise. It is kept for now for debug
    // purposes only. DangerJS will swallow console.logs if it completes successfully
    markdown(`No bundle size changes comparing ${commitRange}`);
  }
}

(async () => {
  let exitCode = 0;
  try {
    await run();
  } catch (err) {
    console.error(err);
    exitCode = 1;
  }

  try {
    await cleanup();
  } catch (err) {
    console.error(err);
    exitCode = 1;
  }

  process.exit(exitCode);
})();
