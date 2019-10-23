/* eslint-disable no-console */
// WARNING: This script can only use built-in modules
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);

// packages published from the react monorepo using the same version
const reactPackageNames = ['react', 'react-dom', 'react-is', 'react-test-renderer', 'scheduler'];

async function main(distTag) {
  if (typeof distTag !== 'string') {
    throw new TypeError(`expected distTag: string but got '${distTag}'`);
  }

  if (distTag === 'stable') {
    console.log('nothing to do with stable');
    return;
  }

  const { stdout: versions } = await exec(`npm dist-tag ls react ${distTag}`);
  const tagMapping = versions.split('\n').find(mapping => {
    return mapping.startsWith(`${distTag}: `);
  });
  if (tagMapping === undefined) {
    throw new Error(`Could not find '${distTag}' in "${versions}"`);
  }

  const version = tagMapping.replace(`${distTag}: `, '');

  const packageJsonPath = path.resolve(__dirname, '../package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }));

  reactPackageNames.forEach(reactPackageName => {
    packageJson.resolutions[reactPackageName] = version;
  });

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log(`Applied version '${version}' via 'resolutions' field`);
}

main(process.env.REACT_DIST_TAG).catch(error => {
  console.error(error);
  process.exit(1);
});
