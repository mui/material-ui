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
console.log(`Detected package manager: ${packageManager}`);

if (packageManager === 'yarn-pnp') {
  console.error('⚠️  Yarn PnP is not supported by this script.');
  console.error('   Consider using nodeLinker: node-modules in .yarnrc.yml');
  process.exit(1);
}

// Find all @emotion packages
const emotionPath = path.join(nodeModulesPath, '@emotion');

if (!fs.existsSync(emotionPath)) {
  console.log('No @emotion packages found in node_modules');
  console.log('Make sure you have run your package manager install command first.');
  process.exit(0);
}

// Get all @emotion package directories
const emotionPackages = fs.readdirSync(emotionPath).filter((name) => {
  const packagePath = path.join(emotionPath, name);
  return fs.statSync(packagePath).isDirectory();
});

console.log(`Found ${emotionPackages.length} @emotion packages to unpatch`);

// Remove "type": "module" from each package.json
emotionPackages.forEach((packageName) => {
  const packageJsonPath = path.join(emotionPath, packageName, 'package.json');

  try {
    // Read the current package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Check if type is set to module
    if (!packageJson.type || packageJson.type !== 'module') {
      console.log(`✓ @emotion/${packageName} doesn't have "type": "module"`);
      return;
    }

    // Remove type: module
    delete packageJson.type;

    // Write back the modified package.json
    fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

    console.log(`✓ Unpatched @emotion/${packageName}`);
  } catch (error) {
    console.error(`✗ Failed to unpatch @emotion/${packageName}: ${error.message}`);
  }
});

console.log('Unpatching complete!');
