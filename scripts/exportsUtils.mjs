import * as fs from 'fs/promises';
import * as path from 'path';
import { resolveExports } from 'resolve-pkg-maps';
import fg from 'fast-glob';
import regexpEscape from 'regexp.escape';

const processedObjects = new WeakMap();

function ensurePrefix(str, prefix) {
  return str.startsWith(prefix) ? str : `${prefix}${str}`;
}

function ensureNoPrefix(str, prefix) {
  return str.startsWith(prefix) ? str.slice(prefix.length) : str;
}

/**
 * Finds all exported paths from a package.json exports field and resolves them to actual file paths.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.cwd=process.cwd()] - Working directory containing package.json
 * @param {Object} [options.exports] - Exports object to analyze (if not provided, reads from package.json)
 * @returns {Promise<Map<string, Array<{conditions: string[], path: string}>>>} Map of export paths to resolved files
 */

export async function findAllExportedPaths({ cwd = process.cwd(), exports } = {}) {
  let exportsObj = exports;

  // Read package.json if exports not provided
  if (!exportsObj) {
    try {
      const packageJsonPath = path.resolve(cwd, 'package.json');
      const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8');
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

  // Phase 2: Resolve patterns sequentially
  const results = new Map();

  for (const pattern of patterns) {
    if (pattern.filePattern === null) {
      // This is a blocking pattern - remove matching entries
      const blockingRegex = createBlockingRegex(pattern.exportPattern);
      // Remove all matching entries from results
      for (const exportPath of results.keys()) {
        if (blockingRegex.test(exportPath)) {
          results.delete(exportPath);
        }
      }
    } else {
      // Normal pattern - resolve and add to results
      // eslint-disable-next-line no-await-in-loop
      const resolvedResults = await resolvePattern(pattern, cwd);

      for (const result of resolvedResults) {
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
  if (exportsObj === null) {
    // Handle null exports (blocking patterns)
    patterns.push({
      exportPattern: exportPath,
      filePattern: null, // null indicates this blocks the path
      conditions: [...conditions],
    });
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
        if (key.startsWith('.')) {
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
 * Create regex to match paths that should be blocked by null exports
 */
function createBlockingRegex(exportPattern) {
  const escaped = regexpEscape(exportPattern);
  const regexPattern = escaped.replace('\\*', '.*');
  return new RegExp(`^${regexPattern}$`);
}

/**
 * Phase 2: Resolve a single pattern to actual file paths
 */
async function resolvePattern(pattern, cwd) {
  const { exportPattern, filePattern, conditions } = pattern;

  if (!filePattern.includes('*')) {
    // Non-wildcard pattern - return immediately
    const absolutePath = path.resolve(cwd, filePattern);
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

  const matchedFiles = await fg(globPattern, {
    cwd,
    absolute: false,
    onlyFiles: true,
    ignore: ['node_modules/**', '.git/**', '**/.DS_Store'],
  });

  const wildcardIndex = filePattern.indexOf('*');
  const leadingChars = wildcardIndex;
  const trailingChars = filePattern.length - wildcardIndex - 1;
  return matchedFiles.map((matchedFile) => {
    matchedFile = ensurePrefix(matchedFile, './');
    const expandedWildcard = matchedFile.slice(leadingChars, matchedFile.length - trailingChars);
    const exportPath = exportPattern.replace('*', expandedWildcard);
    const absolutePath = path.resolve(cwd, matchedFile);

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
function convertToGlob(pattern) {
  if (!pattern.includes('*')) {
    return pattern; // No wildcard
  }

  // Check for exactly one wildcard
  if (pattern.indexOf('*') !== pattern.lastIndexOf('*')) {
    throw new Error(`Export pattern can only contain one wildcard: ${pattern}`);
  }

  // Rule 1: * between two / slashes → convert to **
  if (pattern.includes('/*/')) {
    return pattern.replace('/*/', '/**/*/');
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
  throw new Error(`Invalid wildcard pattern: ${pattern}. Wildcard must be entire path segment.`);
}

/**
 * Resolves and converts export path to be relative to shim location
 * @param {Object} exports - Exports object from package.json
 * @param {string} exportPath - Export path to resolve (without leading "./")
 * @param {string[]} conditions - Conditions to resolve with
 * @param {string} packageRoot - Absolute path to package root
 * @param {string} shimLocation - Absolute path to shim directory
 * @returns {string|null} Path relative to shim location with "./" prefix, or null if resolution fails
 */
function resolveForShim(exports, exportPath, conditions, packageRoot, shimLocation) {
  try {
    const results = resolveExports(exports, exportPath, conditions);
    if (results && results.length > 0) {
      const resolvedPath = results[0];
      const absoluteResolvedPath = path.resolve(packageRoot, resolvedPath);
      const relativePath = path.relative(shimLocation, absoluteResolvedPath);
      return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
    }
  } catch (error) {
    // Ignore resolution errors
  }
  return null;
}

/**
 * Creates package.json shim files for all exported paths
 *
 * @param {string} cwd - Working directory to create shims in
 * @param {Object} exports - Exports object from package.json
 * @returns {Promise<void>}
 */
export async function shimPackageExports(cwd, exports, pkgJson = {}) {
  const exportedPaths = await findAllExportedPaths({ cwd, exports });

  const shimPromises = Array.from(exportedPaths.keys(), async (exportPath) => {
    if (exportPath === '.') {
      return; // Skip root export
    }

    // Skip package.json
    if (exportPath === './package.json') {
      return;
    }

    // Skip non-JavaScript files
    if (/\.[a-zA-Z0-9]+$/.test(exportPath) && !/\.(js|jsx|mjs|cjs|ts|tsx)$/.test(exportPath)) {
      return;
    }

    // Create the shim directory
    const shimDir = path.resolve(cwd, exportPath);
    const absoluteCwd = path.resolve(cwd);
    const pathToResolve = ensureNoPrefix(exportPath, './');

    // Resolve and convert paths to be relative to shim location
    const typesPath = resolveForShim(exports, pathToResolve, ['types'], absoluteCwd, shimDir);
    const cjsPath = resolveForShim(exports, pathToResolve, ['require'], absoluteCwd, shimDir);
    const esmPath = resolveForShim(exports, pathToResolve, ['import'], absoluteCwd, shimDir);

    // Skip if neither ESM nor CJS resolved
    if (!cjsPath && !esmPath) {
      return;
    }

    await fs.mkdir(shimDir, { recursive: true });

    // Create package.json content
    const packageJsonContent = { ...pkgJson };
    if (cjsPath) {
      packageJsonContent.main = cjsPath;
    }
    if (esmPath) {
      packageJsonContent.module = esmPath;
    }
    if (typesPath) {
      packageJsonContent.types = typesPath;
    }

    // Write the shim package.json
    const shimPackageJsonPath = path.join(shimDir, 'package.json');
    await fs.writeFile(shimPackageJsonPath, JSON.stringify(packageJsonContent, null, 2));
  });

  await Promise.all(shimPromises);
}
