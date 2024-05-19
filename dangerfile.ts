// danger has to be the first thing required!
import { danger, markdown } from 'danger';
import { exec } from 'child_process';
import { loadComparison } from './scripts/sizeSnapshot';
import replaceUrl from './packages/api-docs-builder/utils/replaceUrl';

const circleCIBuildNumber = process.env.CIRCLE_BUILD_NUM;
const circleCIBuildUrl = `https://app.circleci.com/pipelines/github/mui/material-ui/jobs/${circleCIBuildNumber}`;
const dangerCommand = process.env.DANGER_COMMAND;

const parsedSizeChangeThreshold = 300;
const gzipSizeChangeThreshold = 100;

/**
 * Executes a git subcommand.
 * @param {any} args
 */
function git(args: any) {
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
 * Creates a callback for Object.entries(comparison).filter that excludes every
 * entry that does not exceed the given threshold values for parsed and gzip size.
 * @param {number} parsedThreshold
 * @param {number} gzipThreshold
 */
function createComparisonFilter(parsedThreshold: number, gzipThreshold: number) {
  return (comparisonEntry: any) => {
    const [, snapshot] = comparisonEntry;
    return (
      Math.abs(snapshot.parsed.absoluteDiff) >= parsedThreshold ||
      Math.abs(snapshot.gzip.absoluteDiff) >= gzipThreshold
    );
  };
}

/**
 * Generates a user-readable string from a percentage change.
 * @param {number} change
 * @param {string} goodEmoji emoji on reduction
 * @param {string} badEmoji emoji on increase
 */
function addPercent(change: number, goodEmoji = '', badEmoji = ':small_red_triangle:') {
  const formatted = (change * 100).toFixed(2);
  if (/^-|^0(?:\.0+)$/.test(formatted)) {
    return `${formatted}% ${goodEmoji}`;
  }
  return `+${formatted}% ${badEmoji}`;
}

function generateEmphasizedChange([bundle, { parsed, gzip }]: [
  string,
  { parsed: { relativeDiff: number }; gzip: { relativeDiff: number } },
]) {
  // increase might be a bug fix which is a nice thing. reductions are always nice
  const changeParsed = addPercent(parsed.relativeDiff, ':heart_eyes:', '');
  const changeGzip = addPercent(gzip.relativeDiff, ':heart_eyes:', '');

  return `**${bundle}**: parsed: ${changeParsed}, gzip: ${changeGzip}`;
}

/**
 * Puts results in different buckets.
 * @param {*} results
 */
function sieveResults<T>(results: Array<[string, T]>) {
  const main: [string, T][] = [];
  const pages: [string, T][] = [];

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
    `## Bundle size report

Bundle size will be reported once [CircleCI build #${circleCIBuildNumber}](${circleCIBuildUrl}) finishes.`,
  );
}

// A previous build might have failed to produce a snapshot
// Let's walk up the tree a bit until we find a commit that has a successful snapshot
async function loadLastComparison(
  upstreamRef: any,
  n = 0,
): Promise<Awaited<ReturnType<typeof loadComparison>>> {
  const mergeBaseCommit = await git(`merge-base HEAD~${n} ${UPSTREAM_REMOTE}/${upstreamRef}`);
  try {
    return await loadComparison(mergeBaseCommit, upstreamRef);
  } catch (err) {
    if (n >= 5) {
      throw err;
    }
    return loadLastComparison(upstreamRef, n + 1);
  }
}

async function reportBundleSize() {
  // Use git locally to grab the commit which represents the place where the branches differ
  const upstreamRepo = danger.github.pr.base.repo.full_name;
  const upstreamRef = danger.github.pr.base.ref;
  try {
    await git(`remote add ${UPSTREAM_REMOTE} https://github.com/${upstreamRepo}.git`);
  } catch (err) {
    // ignore if it already exist for local testing
  }
  await git(`fetch ${UPSTREAM_REMOTE}`);

  const comparison = await loadLastComparison(upstreamRef);

  const detailedComparisonQuery = `circleCIBuildNumber=${circleCIBuildNumber}&baseRef=${danger.github.pr.base.ref}&baseCommit=${comparison.previous}&prNumber=${danger.github.pr.number}`;
  const detailedComparisonToolpadUrl = `https://tools-public.onrender.com/prod/pages/h71gdad?${detailedComparisonQuery}`;
  const detailedComparisonRoute = `/size-comparison?${detailedComparisonQuery}`;
  const detailedComparisonUrl = `https://mui-dashboard.netlify.app${detailedComparisonRoute}`;

  const { all: allResults, main: mainResults } = sieveResults(Object.entries(comparison.bundles));
  const anyResultsChanges = allResults.filter(createComparisonFilter(1, 1));

  if (anyResultsChanges.length > 0) {
    const importantChanges = mainResults
      .filter(createComparisonFilter(parsedSizeChangeThreshold, gzipSizeChangeThreshold))
      .sort(([, a], [, b]) => {
        const aDiff = Math.abs(a.parsed.absoluteDiff) + Math.abs(a.gzip.absoluteDiff);
        const bDiff = Math.abs(b.parsed.absoluteDiff) + Math.abs(b.gzip.absoluteDiff);
        return bDiff - aDiff;
      })
      .map(generateEmphasizedChange);

    // have to guard against empty strings
    if (importantChanges.length > 0) {
      const maxVisible = 20;

      const lines = importantChanges.slice(0, maxVisible);

      const nrOfHiddenChanges = Math.max(0, importantChanges.length - maxVisible);
      if (nrOfHiddenChanges > 0) {
        lines.push(`and [${nrOfHiddenChanges} more changes](${detailedComparisonToolpadUrl})`);
      }

      markdown(lines.join('\n'));
    }

    const details = `## Bundle size report

[Details of bundle changes (Toolpad)](${detailedComparisonToolpadUrl})
[Details of bundle changes](${detailedComparisonUrl})`;

    markdown(details);
  } else {
    markdown(`## Bundle size report

[No bundle size changes (Toolpad)](${detailedComparisonToolpadUrl})
[No bundle size changes](${detailedComparisonUrl})`);
  }
}

function addDeployPreviewUrls() {
  /**
   * The incoming path from danger does not start with `/`
   * e.g. ['docs/data/joy/components/button/button.md']
   */
  function formatFileToLink(path: string) {
    let url = path.replace('docs/data', '').replace(/\.md$/, '');

    const fragments = url.split('/').reverse();
    if (fragments[0] === fragments[1]) {
      // check if the end of pathname is the same as the one before
      // for example `/data/material/getting-started/overview/overview.md
      url = fragments.slice(1).reverse().join('/');
    }

    if (url.startsWith('/material')) {
      // needs to convert to correct material legacy folder structure to the existing url.
      url = replaceUrl(url.replace('/material', ''), '/material-ui').replace(/^\//, '');
    } else {
      url = url
        .replace(/^\//, '') // remove initial `/`
        .replace('joy/', 'joy-ui/')
        .replace('components/', 'react-');
    }

    return url;
  }

  const netlifyPreview = `https://deploy-preview-${danger.github.pr.number}--material-ui.netlify.app/`;

  const files = [...danger.git.created_files, ...danger.git.modified_files];

  // limit to the first 5 docs
  const docs = files
    .filter((file) => file.startsWith('docs/data') && file.endsWith('.md'))
    .slice(0, 5);

  markdown(`
## Netlify deploy preview

${
  docs.length
    ? docs
        .map((path) => {
          const formattedUrl = formatFileToLink(path);
          return `- [${path}](${netlifyPreview}${formattedUrl})`;
        })
        .join('\n')
    : netlifyPreview
}
`);
}

async function run() {
  addDeployPreviewUrls();

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
