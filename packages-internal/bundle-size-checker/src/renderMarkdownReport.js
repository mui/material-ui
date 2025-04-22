/**
 * @typedef {import('./sizeDiff.js').Size} Size
 * @typedef {import('./sizeDiff.js').SizeSnapshot} SizeSnapshot
 * @typedef {import('./sizeDiff.js').ComparisonResult} ComparisonResult
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
 * Generates a symbol based on the relative change value.
 * @param {number|null} relative - The relative change as a Number
 * @returns {string} Formatted size change string with symbol
 */
function getSymbol(relative) {
  if (relative === null) {
    // eslint-disable-next-line no-template-curly-in-string
    return '$${\\color{yellow}▲}$$';
  }
  if (relative === -1) {
    // eslint-disable-next-line no-template-curly-in-string
    return '$${\\color{blue}▼}$$';
  }
  if (relative < 0) {
    // eslint-disable-next-line no-template-curly-in-string
    return '$${\\color{green}▼}$$';
  }
  if (relative > 0) {
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
    return 'new';
  }
  if (value === -1) {
    return 'removed';
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
  const formattedAbsolute = byteSizeChangeFormatter.format(absolute);
  const formattedChange = formatRelativeChange(relative);
  return `${formattedAbsolute} (${formattedChange})`;
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

  return `${getSymbol(parsed.relativeDiff)} **${bundle}**: parsed: ${changeParsed}, gzip: ${changeGzip}`;
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
export function renderMarkdownReport(
  comparison,
  { prNumber, baseRef, baseCommit, visibleLimit = 10 },
) {
  // Generate query param for detailed comparison URLs
  const detailedComparisonQuery = `baseRef=${baseRef}&baseCommit=${baseCommit}&prNumber=${prNumber}`;

  // URLs for detailed comparison tools
  const detailedComparisonRoute = `/size-comparison?${detailedComparisonQuery}`;
  const detailedComparisonUrl = `https://mui-dashboard.netlify.app${detailedComparisonRoute}`;

  const hasChanges = comparison.entries.some(
    (entry) => entry.parsed.absoluteDiff !== 0 || entry.gzip.absoluteDiff !== 0,
  );

  if (!hasChanges) {
    return `No bundle size changes detected.`;
  }

  const changedEntries = comparison.entries.filter(
    (entry) => entry.parsed.absoluteDiff !== 0 || entry.gzip.absoluteDiff !== 0,
  );

  const visibleEntries = changedEntries.slice(0, visibleLimit);
  const hiddenEntries = changedEntries.slice(visibleLimit);

  let markdownContent = '';

  if (changedEntries.length > 0) {
    const importantChanges = visibleEntries.map(generateEmphasizedChange);
    const hiddenChanges = hiddenEntries.map(generateEmphasizedChange);

    // Add important changes to markdown
    if (importantChanges.length > 0) {
      // Show the most significant changes first, up to the visible limit
      const visibleChanges = importantChanges.slice(0, visibleLimit);
      markdownContent += `${visibleChanges.join('\n')}\n\n`;

      // If there are more changes, add them in a collapsible details section
      if (hiddenChanges.length > 0) {
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
