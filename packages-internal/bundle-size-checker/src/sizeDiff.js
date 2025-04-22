/**
 * @description Represents a single bundle size entry
 * @typedef {Object} SizeSnapshotEntry
 * @property {number} parsed
 * @property {number} gzip
 *
 * @description Represents a single bundle size snapshot
 * @typedef {Object.<string, SizeSnapshotEntry>} SizeSnapshot
 *
 * @description Represents a single bundle size comparison
 * @typedef {Object} Size
 * @property {string} id - Bundle identifier
 * @property {Object} parsed - Parsed size information
 * @property {number} parsed.previous - Previous parsed size
 * @property {number} parsed.current - Current parsed size
 * @property {number} parsed.absoluteDiff - Absolute difference in parsed size
 * @property {number|null} parsed.relativeDiff - Relative difference in parsed size
 * @property {Object} gzip - Gzipped size information
 * @property {number} gzip.previous - Previous gzipped size
 * @property {number} gzip.current - Current gzipped size
 * @property {number} gzip.absoluteDiff - Absolute difference in gzipped size
 * @property {number|null} gzip.relativeDiff - Relative difference in gzipped size
 *
 * @description Represents the comparison results
 * @typedef {Object} ComparisonResult
 * @property {Size[]} entries - Size entries for each bundle
 * @property {Object} totals - Total size information
 * @property {number} totals.totalParsed - Total parsed size difference
 * @property {number} totals.totalGzip - Total gzipped size difference
 * @property {number} totals.totalParsedPercent - Total parsed size percentage difference
 * @property {number} totals.totalGzipPercent - Total gzipped size percentage difference
 * @property {Object} fileCounts - File count information
 * @property {number} fileCounts.added - Number of added files
 * @property {number} fileCounts.removed - Number of removed files
 * @property {number} fileCounts.changed - Number of changed files
 * @property {number} fileCounts.total - Total number of files
 */

const nullSnapshot = { parsed: 0, gzip: 0 };

/**
 * Calculates size difference between two snapshots
 *
 * @param {SizeSnapshot} baseSnapshot - Base snapshot (previous)
 * @param {SizeSnapshot} targetSnapshot - Target snapshot (current)
 * @returns {ComparisonResult} Comparison result with entries, totals, and file counts
 */
export function calculateSizeDiff(baseSnapshot, targetSnapshot) {
  const bundleKeys = Object.keys({ ...baseSnapshot, ...targetSnapshot });
  /** @type {Size[]} */
  const results = [];

  // Track totals
  let totalParsed = 0;
  let totalGzip = 0;
  let totalParsedPrevious = 0;
  let totalGzipPrevious = 0;

  // Track file counts
  let addedFiles = 0;
  let removedFiles = 0;
  let changedFiles = 0;

  bundleKeys.forEach((bundle) => {
    const isNewBundle = !baseSnapshot[bundle];
    const isRemovedBundle = !targetSnapshot[bundle];
    const currentSize = targetSnapshot[bundle] || nullSnapshot;
    const previousSize = baseSnapshot[bundle] || nullSnapshot;

    // Update file counts
    if (isNewBundle) {
      addedFiles += 1;
    } else if (isRemovedBundle) {
      removedFiles += 1;
    } else if (
      currentSize.parsed !== previousSize.parsed ||
      currentSize.gzip !== previousSize.gzip
    ) {
      changedFiles += 1;
    }

    const parsedDiff = currentSize.parsed - previousSize.parsed;
    const gzipDiff = currentSize.gzip - previousSize.gzip;

    // Calculate relative diffs with appropriate handling of new/removed bundles
    let parsedRelativeDiff;
    if (isNewBundle) {
      parsedRelativeDiff = null;
    } else if (isRemovedBundle) {
      parsedRelativeDiff = -1;
    } else if (previousSize.parsed) {
      parsedRelativeDiff = currentSize.parsed / previousSize.parsed - 1;
    } else {
      parsedRelativeDiff = 0;
    }

    let gzipRelativeDiff;
    if (isNewBundle) {
      gzipRelativeDiff = null;
    } else if (isRemovedBundle) {
      gzipRelativeDiff = -1;
    } else if (previousSize.gzip) {
      gzipRelativeDiff = currentSize.gzip / previousSize.gzip - 1;
    } else {
      gzipRelativeDiff = 0;
    }

    const entry = {
      id: bundle,
      parsed: {
        previous: previousSize.parsed,
        current: currentSize.parsed,
        absoluteDiff: parsedDiff,
        relativeDiff: parsedRelativeDiff,
      },
      gzip: {
        previous: previousSize.gzip,
        current: currentSize.gzip,
        absoluteDiff: gzipDiff,
        relativeDiff: gzipRelativeDiff,
      },
    };

    results.push(entry);

    // Update totals
    totalParsed += parsedDiff;
    totalGzip += gzipDiff;
    totalParsedPrevious += previousSize.parsed;
    totalGzipPrevious += previousSize.gzip;
  });

  // Calculate percentage changes
  const totalParsedPercent = totalParsedPrevious > 0 ? totalParsed / totalParsedPrevious : 0;
  const totalGzipPercent = totalGzipPrevious > 0 ? totalGzip / totalGzipPrevious : 0;

  // Sort the results
  // Custom sorting:
  // 1. Existing bundles that increased in size (larger increases first)
  // 2. New bundles (larger sizes first)
  // 3. Existing bundles that decreased in size (larger decreases first)
  // 4. Removed bundles (larger sizes first)
  // 5. Unchanged bundles (alphabetically)
  results.sort((entryA, entryB) => {
    // Helper function to determine bundle category (for sorting)
    /** @type {(entry: Size) => number} */
    const getCategory = (entry) => {
      if (entry.parsed.relativeDiff === null) {
        return 2; // New bundle
      }
      if (entry.parsed.relativeDiff === -1) {
        return 4; // Removed bundle
      }
      if (entry.parsed.relativeDiff > 0) {
        return 1; // Increased
      }
      if (entry.parsed.relativeDiff < 0) {
        return 3; // Decreased
      }
      return 5; // Unchanged
    };

    // Get categories for both bundles
    const categoryA = getCategory(entryA);
    const categoryB = getCategory(entryB);

    // Sort by category first
    if (categoryA !== categoryB) {
      return categoryA - categoryB;
    }

    // Within the same category, sort by absolute diff (largest first)
    const diffA = Math.abs(entryA.parsed.absoluteDiff);
    const diffB = Math.abs(entryB.parsed.absoluteDiff);

    if (diffA !== diffB) {
      return diffB - diffA;
    }

    // If diffs are the same, sort by name
    return entryA.id.localeCompare(entryB.id);
  });

  return {
    entries: results,
    totals: {
      totalParsed,
      totalGzip,
      totalParsedPercent,
      totalGzipPercent,
    },
    fileCounts: {
      added: addedFiles,
      removed: removedFiles,
      changed: changedFiles,
      total: bundleKeys.length,
    },
  };
}
