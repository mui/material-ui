import { readFile } from 'fs/promises';
import { resolve } from 'path';
import fg from 'fast-glob';

const processedObjects = new WeakMap();

/**
 * Finds all exported paths from a package.json exports field and resolves them to actual file paths.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.cwd=process.cwd()] - Working directory containing package.json
 * @param {Object} [options.exports] - Exports object to analyze (if not provided, reads from package.json)
 * @returns {Promise<Map<string, Array<{conditions: string[], path: string}>>>} Map of export paths to resolved files
 */
// eslint-disable-next-line import/prefer-default-export
export async function findAllExportedPaths({ cwd = process.cwd(), exports } = {}) {
  let exportsObj = exports;

  // Read package.json if exports not provided
  if (!exportsObj) {
    try {
      const packageJsonPath = resolve(cwd, 'package.json');
      const packageJsonContent = await readFile(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(packageJsonContent);
      exportsObj = packageJson.exports;
    } catch (error) {
      throw new Error(`Failed to read package.json from ${cwd}: ${error.message}`);
    }
  }

  if (!exportsObj) {
    return new Map();
  }

  // Phase 1: Collect all patterns
  const patterns = [];
  collectPatterns(exportsObj, [], patterns);

  // Phase 2: Resolve patterns
  const resolvePromises = patterns.map((pattern) => resolvePattern(pattern, cwd));
  const resolvedResults = await Promise.all(resolvePromises);

  // Flatten and organize results with deduplication
  const results = new Map();
  const seen = new Set();

  for (const resultList of resolvedResults) {
    for (const result of resultList) {
      // Create unique key: path + conditions (preserve order)
      const uniqueKey = `${result.filePath}|${result.conditions.join(',')}`;

      if (!seen.has(uniqueKey)) {
        seen.add(uniqueKey);

        if (!results.has(result.exportPath)) {
          results.set(result.exportPath, []);
        }

        results.get(result.exportPath).push({
          conditions: result.conditions,
          path: result.filePath,
        });
      }
    }
  }

  return results;
}

/**
 * Phase 1: Recursively collect all export patterns
 */
function collectPatterns(exportsObj, conditions, patterns, exportPath = '') {
  if (exportsObj == null) {
    return;
  }

  if (typeof exportsObj === 'string') {
    if (exportsObj.trim() === '') {
      throw new Error(`Empty export path found for ${exportPath}`);
    }

    // Validate path doesn't go outside package
    if (exportsObj.includes('..')) {
      throw new Error(
        `Export path ${exportsObj} attempts to access files outside package directory`,
      );
    }

    patterns.push({
      exportPattern: exportPath,
      filePattern: exportsObj,
      conditions: [...conditions],
    });
    return;
  }

  if (typeof exportsObj === 'object' && !Array.isArray(exportsObj)) {
    // Prevent circular references using WeakMap
    if (processedObjects.has(exportsObj)) {
      throw new Error(`Circular reference detected in exports at ${exportPath}`);
    }

    processedObjects.set(exportsObj, true);

    try {
      for (const [key, value] of Object.entries(exportsObj)) {
        if (key.startsWith('./') || key === '.') {
          // This is an export path
          collectPatterns(value, conditions, patterns, key);
        } else {
          // This is a condition
          const newConditions = [...conditions, key];
          collectPatterns(value, newConditions, patterns, exportPath);
        }
      }
    } finally {
      processedObjects.delete(exportsObj);
    }
  } else if (Array.isArray(exportsObj)) {
    throw new Error(`Arrays are not supported in exports field at ${exportPath}`);
  } else {
    throw new Error(`Invalid export value type: ${typeof exportsObj} at ${exportPath}`);
  }
}

/**
 * Phase 2: Resolve a single pattern to actual file paths
 */
async function resolvePattern(pattern, cwd) {
  const { exportPattern, filePattern, conditions } = pattern;

  if (!filePattern.includes('*')) {
    // Non-wildcard pattern - return immediately
    const absolutePath = resolve(cwd, filePattern);
    return [
      {
        exportPath: exportPattern,
        filePath: absolutePath,
        conditions,
      },
    ];
  }

  // Wildcard pattern - use glob and regex
  const globPattern = convertToGlob(filePattern);
  const regex = createCaptureRegex(filePattern);

  const matchedFiles = await fg(globPattern, {
    cwd,
    absolute: false,
    onlyFiles: true,
    ignore: ['node_modules/**', '.git/**', '**/.DS_Store'],
  });

  return matchedFiles.map((matchedFile) => {
    const match = regex.exec(matchedFile);
    if (!match || match[1] === undefined) {
      throw new Error(`File ${matchedFile} does not match pattern ${filePattern}`);
    }

    const capturedValue = match[1];
    const exportPath = exportPattern.replace('*', capturedValue);
    const absolutePath = resolve(cwd, matchedFile);

    return {
      exportPath,
      filePath: absolutePath,
      conditions,
    };
  });
}

/**
 * Convert file pattern with * to glob pattern
 */
function convertToGlob(filePattern) {
  const pattern = filePattern.startsWith('./') ? filePattern.slice(2) : filePattern;

  if (!pattern.includes('*')) {
    return pattern; // No wildcard
  }

  // Check for exactly one wildcard
  if (pattern.indexOf('*') !== pattern.lastIndexOf('*')) {
    throw new Error(`Export pattern can only contain one wildcard: ${filePattern}`);
  }

  // Rule 1: * between two / slashes → convert to **
  if (pattern.includes('/*/')) {
    return pattern.replace('/*/', '/**/');
  }

  // Rule 2: * between / and file extension → convert to **/*.
  if (pattern.includes('/*.')) {
    return pattern.replace('/*.', '/**/*.');
  }

  // Rule 3: * as final segment → convert to **/*
  if (pattern.endsWith('/*')) {
    return pattern.replace(/\/\*$/, '/**/*');
  }

  // If we reach here, it's an invalid wildcard usage
  throw new Error(
    `Invalid wildcard pattern: ${filePattern}. Wildcard must be entire path segment.`,
  );
}

/**
 * Create regex with capturing group for the * in file pattern
 */
function createCaptureRegex(filePattern) {
  // Remove leading ./ if present
  const pattern = filePattern.startsWith('./') ? filePattern.slice(2) : filePattern;

  // Escape regex special characters except *
  const escaped = pattern.replace(/[.+?^${}()|[\\]\\\\]/g, '\\\\$&');

  // Replace * with capturing group (.+)
  const regexPattern = `^${escaped.replace('\\\\*', '(.+)')}$`;

  return new RegExp(regexPattern);
}
