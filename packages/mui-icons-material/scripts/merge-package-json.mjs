/* eslint-disable no-console */
import path from 'path';
import * as fs from 'fs/promises';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const packageDir = path.resolve(currentDirectory, '..');

/**
 * Reads `package.json` and `lib/package.json`, then creates a new package.json
 * where all fields come from the root `package.json` but the `exports` field
 * is copied over from `lib/package.json`.
 */
async function run() {
  const rootPackageJsonPath = path.resolve(packageDir, 'package.json');
  const libPackageJsonPath = path.resolve(packageDir, 'lib/package.json');
  const buildPackageJsonPath = path.resolve(packageDir, 'build/package.json');

  const [rootPackageJson, libPackageJson] = await Promise.all([
    fs.readFile(rootPackageJsonPath, 'utf8').then((content) => JSON.parse(content)),
    fs.readFile(libPackageJsonPath, 'utf8').then((content) => JSON.parse(content)),
  ]);

  const mergedPackageJson = {
    ...rootPackageJson,
    exports: libPackageJson.exports,
  };
  delete mergedPackageJson.publishConfig?.directory;
  // Remove fields that shouldn't be in the published package
  delete mergedPackageJson.devDependencies;
  delete mergedPackageJson.scripts;

  await fs.writeFile(
    buildPackageJsonPath,
    `${JSON.stringify(mergedPackageJson, null, 2)}\n`,
    'utf8',
  );

  console.log('✅ package.json created successfully.');
}

run().catch((error) => {
  console.error('Error creating package.json files:', error);
  process.exit(1);
});
