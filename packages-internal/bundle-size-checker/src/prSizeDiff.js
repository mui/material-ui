import { calculateSizeDiff } from './sizeDiff.js';

/**
 * @typedef {import('./sizeDiff').Size} Size
 * @typedef {import('./sizeDiff').SizeSnapshot} SizeSnapshot
 * @typedef {import('./sizeDiff').ComparisonResult} ComparisonResult
 */

const displayPercentFormatter = new Intl.NumberFormat(undefined, {
  style: 'percent',
  signDisplay: 'exceptZero',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});

// Formatter for byte sizes (absolute values) - no sign
const byteSizeFormatter = new Intl.NumberFormat(undefined, {
  style: 'unit',
  unit: 'byte',
  notation: 'compact',
  unitDisplay: 'narrow',
  maximumSignificantDigits: 3,
  minimumSignificantDigits: 1,
});

// Formatter for size changes - always show sign
// Created by extending the options from byteSizeFormatter
const byteSizeChangeFormatter = new Intl.NumberFormat(undefined, {
  ...byteSizeFormatter.resolvedOptions(),
  signDisplay: 'exceptZero',
});

/**
 * Generates a symbol based on the absolute change value.
 * @param {number} absolute - The absolute change as a Number
 * @returns {string} Formatted size change string with symbol
 */
function getSymbol(absolute) {
  if (absolute < 0) {
    // eslint-disable-next-line no-template-curly-in-string
    return '$${\\color{green}▼}$$';
  }
  if (absolute > 0) {
    // eslint-disable-next-line no-template-curly-in-string
    return '$${\\color{red}▲}$$';
  }
  return '';
}

/**
 * Formats the relative change value for display.
 * @param {number|null} value - The relative change as a Number
 * @returns {string} Formatted relative change string
 */
function formatRelativeChange(value) {
  if (value === null) {
    return '(new)';
  }
  if (value === -1) {
    return '(removed)';
  }
  return displayPercentFormatter.format(value);
}

/**
 * Generates a user-readable string from a percentage change.
 * @param {number} absolute - The absolute change as a Number
 * @param {number|null} relative - The relative change as a Number
 * @returns {string} Formatted percentage string with emoji
 */
function formatChange(absolute, relative) {
  const symbol = getSymbol(absolute);
  const formattedAbsolute = byteSizeChangeFormatter.format(absolute);
  const formattedChange = formatRelativeChange(relative);
  return `${symbol} ${formattedAbsolute} (${formattedChange})`;
}

/**
 * Generates emphasized change text for a single bundle
 * @param {Size} entry - Bundle entry
 * @returns {string} Formatted change text
 */
function generateEmphasizedChange({ id: bundle, parsed, gzip }) {
  // increase might be a bug fix which is a nice thing. reductions are always nice
  const changeParsed = formatChange(parsed.absoluteDiff, parsed.relativeDiff);
  const changeGzip = formatChange(gzip.absoluteDiff, gzip.relativeDiff);

  return `**${bundle}**: parsed: ${changeParsed}, gzip: ${changeGzip}`;
}

/**
 * Fetches data from a URL with error handling
 * @param {string} url - URL to fetch
 * @returns {Promise<Object|null>} - Parsed JSON response or null on error
 */
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

/**
 * Constructs S3 URLs for size snapshots based on commit SHAs
 * @param {string} sha - Commit SHA
 * @returns {string} S3 URL for the size snapshot
 */
function constructS3Url(sha) {
  // Following CircleCI structure pattern for S3 URLs
  return `https://mui-org.s3.amazonaws.com/artifacts/mui/material-ui/${sha}/size-snapshot.json`;
}

/**
 * Generates a Markdown report for bundle size changes
 * @param {ComparisonResult} comparison - Comparison result from calculateSizeDiff
 * @param {Object} options - Additional options
 * @param {number} options.prNumber - PR number
 * @param {string} options.baseRef - Base branch name
 * @param {string} options.baseCommit - Base commit SHA
 * @param {number} [options.visibleLimit=10] - Number of entries to show before collapsing
 * @returns {string} Markdown report
 */
function generateMarkdownReport(comparison, { prNumber, baseRef, baseCommit, visibleLimit = 10 }) {
  // Generate query param for detailed comparison URLs
  const detailedComparisonQuery = `baseRef=${baseRef}&baseCommit=${baseCommit}&prNumber=${prNumber}`;

  // URLs for detailed comparison tools
  const detailedComparisonRoute = `/size-comparison?${detailedComparisonQuery}`;
  const detailedComparisonUrl = `https://mui-dashboard.netlify.app${detailedComparisonRoute}`;

  const hasChanges = comparison.entries.some(
    (entry) => entry.parsed.absoluteDiff !== 0 || entry.gzip.absoluteDiff !== 0,
  );

  if (!hasChanges) {
    return `## Bundle size report\n\nNo bundle size changes detected.`;
  }

  const changedEntries = comparison.entries.filter(
    (entry) => entry.parsed.absoluteDiff !== 0 || entry.gzip.absoluteDiff !== 0,
  );

  const visibleEntries = changedEntries.slice(0, visibleLimit);
  const hiddenEntries = changedEntries.slice(visibleLimit);

  let markdownContent = '## Bundle size report\n\n';

  if (changedEntries.length > 0) {
    const importantChanges = visibleEntries.map(generateEmphasizedChange);
    const hiddenChanges = hiddenEntries.map(generateEmphasizedChange);

    // Add important changes to markdown
    if (importantChanges.length > 0) {
      // Show the most significant changes first, up to the visible limit
      const visibleChanges = importantChanges.slice(0, visibleLimit);
      markdownContent += `${visibleChanges.join('\n')}\n\n`;

      // If there are more changes, add them in a collapsible details section
      if (importantChanges.length > visibleLimit) {
        markdownContent += `<details>\n<summary>Show ${hiddenChanges.length} more bundle changes</summary>\n\n`;
        markdownContent += `${hiddenChanges.join('\n')}\n\n`;
        markdownContent += `</details>\n\n`;
      }
    }

    // Add links to detailed tools
    markdownContent += `[Details of bundle changes](${detailedComparisonUrl})`;
  } else {
    markdownContent += `[No bundle size changes](${detailedComparisonUrl})`;
  }

  return markdownContent;
}

/**
 * Fetches size snapshots for a PR and generates a markdown report
 * @param {Object} prInfo - PR information
 * @param {number} prInfo.number - PR number
 * @param {Object} prInfo.base - Base branch information
 * @param {string} prInfo.base.sha - Base commit SHA
 * @param {string} prInfo.base.ref - Base branch name
 * @param {Object} prInfo.head - Head branch information
 * @param {string} prInfo.head.sha - Head commit SHA
 * @param {string} prInfo.head.ref - Head branch name
 * @returns {Promise<string>} Markdown report string
 */
export async function getPRBundleSizeDiff(prInfo) {
  const prNumber = prInfo.number;

  // Extract base and head SHAs
  const baseCommit = prInfo.base.sha;
  const headCommit = prInfo.head.sha;
  const baseRef = prInfo.base.ref;

  // Construct S3 URLs
  const baseSnapshotUrl = constructS3Url(baseCommit);
  const headSnapshotUrl = constructS3Url(headCommit);

  // Fetch snapshots in parallel
  const [baseSnapshot, headSnapshot] = await Promise.all([
    /** @type {Promise<SizeSnapshot>} */ (fetchData(baseSnapshotUrl)),
    /** @type {Promise<SizeSnapshot>} */ (fetchData(headSnapshotUrl)),
  ]);

  let report = '';

  // Check if snapshots were found
  if (!baseSnapshot) {
    report += `_:warning: No bundle size snapshot found for base commit ${baseCommit}._\n\n`;
  }

  if (!headSnapshot) {
    throw new Error(`Couldn't find bundle size snapshot for head commit ${headCommit}.`);
  }

  // Calculate size differences
  const comparison = calculateSizeDiff(baseSnapshot ?? {}, headSnapshot);

  // Generate markdown report
  report += generateMarkdownReport(comparison, {
    prNumber,
    baseRef,
    baseCommit,
  });

  return report;
}
