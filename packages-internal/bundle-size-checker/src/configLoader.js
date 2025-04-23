/**
 * Utility to load the bundle-size-checker configuration
 */

import fs from 'fs';
import path from 'path';

/**
 * Attempts to load and parse a single config file
 * @param {string} configPath - Path to the configuration file
 * @returns {Promise<BundleSizeCheckerConfig | null>} The parsed config or null if file doesn't exist
 * @throws {Error} If the file exists but has invalid format
 */
async function loadConfigFile(configPath) {
  try {
    if (!fs.existsSync(configPath)) {
      return null;
    }

    // Dynamic import for ESM
    const configUrl = new URL(`file://${configPath}`);
    const configModule = await import(configUrl.href);
    let config = configModule.default;

    // Handle configs that might be Promise-returning functions
    if (config instanceof Promise) {
      config = await config;
    } else if (typeof config === 'function') {
      config = await config();
    }

    if (!config.entrypoints || !Array.isArray(config.entrypoints)) {
      throw new Error('Configuration must include an entrypoints array');
    }

    return config;
  } catch (error) {
    console.error(`Error loading config from ${configPath}:`, error);
    throw error; // Re-throw to indicate failure
  }
}

/**
 * Attempts to load the config file from the given directory
 * @param {string} rootDir - The directory to search for the config file
 * @returns {Promise<BundleSizeCheckerConfig>} A promise that resolves to the config object
 */
export async function loadConfig(rootDir) {
  const configPaths = [
    path.join(rootDir, 'bundle-size-checker.config.js'),
    path.join(rootDir, 'bundle-size-checker.config.mjs'),
  ];

  for (const configPath of configPaths) {
    // eslint-disable-next-line no-await-in-loop
    const config = await loadConfigFile(configPath);
    if (config) {
      return config;
    }
  }

  // Error out if no config file exists
  throw new Error(
    'No bundle-size-checker configuration file found. Please create a bundle-size-checker.config.js or bundle-size-checker.config.mjs file in your project root.',
  );
}
