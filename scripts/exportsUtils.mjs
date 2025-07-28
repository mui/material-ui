import * as fs from 'fs/promises';
import * as path from 'path';
import { resolveExports } from 'resolve-pkg-maps';
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
      console.log(regex.source);
      throw new Error(`File ${matchedFile} does not match pattern ${filePattern}`);
    }

    const capturedValue = match[1];
    const exportPath = exportPattern.replace('*', capturedValue);
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
 * Create regex with capturing group for the * in file pattern
 */
function createCaptureRegex(filePattern) {
  // Remove leading ./ if present
  const pattern = filePattern.startsWith('./') ? filePattern.slice(2) : filePattern;

  // Escape regex special characters except *
  const escaped = RegExp.escape(pattern);

  // Replace * with capturing group (.+)
  const regexPattern = escaped.replace('\\*', '(.+)');

  // Always make leading ./ optional
  return new RegExp(`^(?:\\.\/)?${regexPattern}$`);
}

/**
 * Converts a path relative to package root to a path relative to shim location
 * @param {string} packageRoot - Absolute path to package root
 * @param {string} shimLocation - Absolute path to shim directory
 * @param {string} resolvedPath - Path relative to package root (e.g., "./index.js")
 * @returns {string|null} Path relative to shim location with "./" prefix
 */
function makeRelativeToShim(packageRoot, shimLocation, resolvedPath) {
  if (!resolvedPath) {
    return null;
  }

  const absoluteResolvedPath = path.resolve(packageRoot, resolvedPath);
  const relativePath = path.relative(shimLocation, absoluteResolvedPath);
  return `./${relativePath}`;
}

/**
 * Creates package.json shim files for all exported paths
 *
 * @param {string} cwd - Working directory to create shims in
 * @param {Object} exports - Exports object from package.json
 * @returns {Promise<void>}
 */
export async function shimPackageExports(cwd, exports) {
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

    let esmPath = null;
    let cjsPath = null;

    // Try to resolve with import conditions
    try {
      const esmResults = resolveExports(exports, exportPath, ['import']);
      if (esmResults && esmResults.length > 0) {
        esmPath = esmResults[0];
      }
    } catch (error) {
      // Ignore resolution errors
    }

    // Try to resolve with require conditions
    try {
      const cjsResults = resolveExports(exports, exportPath, ['require']);
      if (cjsResults && cjsResults.length > 0) {
        cjsPath = cjsResults[0];
      }
    } catch (error) {
      // Ignore resolution errors
    }

    // Skip if neither ESM nor CJS resolved
    if (!esmPath && !cjsPath) {
      return;
    }

    // Create the shim directory
    const shimDir = path.resolve(cwd, exportPath);

    await fs.mkdir(shimDir, { recursive: true });

    // Convert resolved paths to be relative to shim location
    const absoluteCwd = path.resolve(cwd);
    const relativeCjsPath = makeRelativeToShim(absoluteCwd, shimDir, cjsPath);
    const relativeEsmPath = makeRelativeToShim(absoluteCwd, shimDir, esmPath);

    // Create package.json content
    const packageJsonContent = {};
    if (relativeCjsPath) {
      packageJsonContent.main = relativeCjsPath;
    }
    if (relativeEsmPath) {
      packageJsonContent.module = relativeEsmPath;
    }

    // Write the shim package.json
    const shimPackageJsonPath = path.join(shimDir, 'package.json');
    await fs.writeFile(shimPackageJsonPath, JSON.stringify(packageJsonContent, null, 2));
  });

  await Promise.all(shimPromises);
}
