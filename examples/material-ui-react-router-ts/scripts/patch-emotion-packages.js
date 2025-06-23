#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);

// Get the project root directory
const projectRoot = path.resolve(DIRNAME, '..');
const nodeModulesPath = path.join(projectRoot, 'node_modules');

// Detect package manager
function detectPackageManager() {
  if (fs.existsSync(path.join(projectRoot, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (fs.existsSync(path.join(projectRoot, 'yarn.lock'))) {
    // Check for Yarn 2+ with PnP
    if (
      fs.existsSync(path.join(projectRoot, '.pnp.cjs')) ||
      fs.existsSync(path.join(projectRoot, '.pnp.js'))
    ) {
      return 'yarn-pnp';
    }
    return 'yarn';
  }
  if (fs.existsSync(path.join(projectRoot, 'package-lock.json'))) {
    return 'npm';
  }
  return 'unknown';
}

const packageManager = detectPackageManager();

if (packageManager === 'yarn-pnp') {
  console.error('\x1b[31m⚠️  Yarn PnP is not supported by this script.\x1b[0m');
  process.exit(1);
}

// Find all @emotion packages
const emotionPath = path.join(nodeModulesPath, '@emotion');

if (!fs.existsSync(emotionPath)) {
  process.exit(0);
}

// Get all @emotion package directories
const emotionPackages = fs.readdirSync(emotionPath).filter((name) => {
  const packagePath = path.join(emotionPath, name);
  return fs.statSync(packagePath).isDirectory();
});

let patchedCount = 0;

// Add "type": "module" to each package.json
emotionPackages.forEach((packageName) => {
  const packageJsonPath = path.join(emotionPath, packageName, 'package.json');

  try {
    // Read the current package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Check if type is already set
    if (packageJson.type === 'module') {
      return;
    }

    // Add type: module
    packageJson.type = 'module';

    // Write back the modified package.json
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);
    patchedCount += 1;
  } catch (error) {
    // Silent error handling
  }
});

if (patchedCount > 0) {
  console.log(`\x1b[32m⚙️ Added "type": "module" to @emotion/* package.json files\x1b[0m`);
}
