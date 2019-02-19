// inspire by reacts dangerfile
// danger has to be the first thing required!
const { danger, markdown } = require('danger');
const { exec } = require('child_process');
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

const upstreamRemote = 'danger-upstream';

async function cleanup() {
  await git(`remote remove ${upstreamRemote}`);
}

function createComparisonFilter(parsedThreshold, gzipThreshold) {
  return ([, { parsed, gzip }]) => {
    return (
      Math.abs(parsed.absoluteDiff) >= parsedThreshold ||
      Math.abs(gzip.absoluteDiff) >= gzipThreshold
    );
  };
}

/**
 * checks if the bundle is of a package e.b. `@material-ui/core` but not
 * `@material-ui/core/Paper`
 * @param {[string]} comparison entry
 */
function isPackageComparison([bundle]) {
  return /^@[\w-]+\/[\w-]+$/.test(bundle);
}

/**
 * Generates a user-readable string from a percentage change
 * @param {number} change
 * @param {boolean} includeEmoji
 */
function addPercent(change, includeEmoji) {
  if (!Number.isFinite(change)) {
    // When a new package is created
    return 'n/a';
  }
  const formatted = (change * 100).toFixed(2);
  if (/^-|^0(?:\.0+)$/.test(formatted)) {
    return `${formatted}%`;
  }
  if (includeEmoji) {
    return `:small_red_triangle:+${formatted}%`;
  }
  return `+${formatted}%`;
}

/**
 * Generates a Markdown table
 * @param {string[]} headers
 * @param {string[][]} body
 */
function generateMDTable(headers, body) {
  const tableHeaders = [headers.join(' | '), headers.map(() => ' --- ').join(' | ')];

  const tablebody = body.map(r => r.join(' | '));
  return `${tableHeaders.join('\n')}\n${tablebody.join('\n')}`;
}

function generateEmphasizedChange([bundle, { parsed, gzip }]) {
  const changeParsed = addPercent(parsed.relativeDiff, true);
  const changeGzip = addPercent(gzip.relativeDiff, true);

  return `**${bundle}**: parsed: ${changeParsed}, gzip: ${changeGzip}`;
}

async function run() {
  // Use git locally to grab the commit which represents the place
  // where the branches differ
  const upstreamRepo = danger.github.pr.base.repo.full_name;
  const upstreamRef = danger.github.pr.base.ref;
  try {
    await git(`remote add ${upstreamRemote} https://github.com/${upstreamRepo}.git`);
  } catch (err) {
    // ignore if it already exist for local testing
  }
  await git(`fetch ${upstreamRemote}`);
  const mergeBaseCommit = await git(`merge-base HEAD ${upstreamRemote}/${upstreamRef}`);

  const commitRange = `${mergeBaseCommit}...${danger.github.pr.head.sha}`;
  console.log(`comparing ${commitRange}`);

  const comparison = await loadComparison(mergeBaseCommit, upstreamRef);
  const results = Object.entries(comparison.bundles);
  const anyResultsChanges = results.filter(createComparisonFilter(0, 0));

  if (anyResultsChanges.length > 0) {
    markdown('This PR introduced some changes to the bundle size.');

    const importantChanges = results
      .filter(createComparisonFilter(parsedSizeChangeThreshold, gzipSizeChangeThreshold))
      .filter(isPackageComparison)
      .map(generateEmphasizedChange);
    markdown(importantChanges.join('\n'));

    const detailsTable = generateMDTable(
      [
        'bundle',
        'parsed diff',
        'gzip diff',
        'prev parsed',
        'current parsed',
        'prev gzip',
        'current gzip',
      ],
      results.map(([bundle, { parsed, gzip }]) => {
        return [
          bundle,
          addPercent(parsed.relativeDiff, true),
          addPercent(gzip.relativeDiff, true),
          parsed.previous,
          parsed.current,
          gzip.previous,
          gzip.current,
        ];
      }),
    );

    const details = `
  <details>
  <summary>Details of bundle changes.</summary>

  <p>Comparing: ${commitRange}</p>

  ${detailsTable}

  </details>`;

    markdown(details);
  }
}

run()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    return cleanup();
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    process.exit(1);
  });
