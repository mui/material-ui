/* eslint-disable no-console */
import path from 'path';
import { stat } from 'fs/promises';
import { createPackageFile, includeFileInBuild, prepend } from './copyFilesUtils.mjs';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');

async function addLicense(packageData) {
  const license = `/**
 * ${packageData.name} v${packageData.version}
 *
 * @license ${packageData.license}
 * This source code is licensed under the ${packageData.license} license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  await Promise.all(
    ['./index.js', './esm/index.js', './modern/index.js', './node/index.js'].map(async (file) => {
      try {
        await prepend(path.resolve(buildPath, file), license);
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log(`Skipped license for ${file}`);
        } else {
          throw err;
        }
      }
    }),
  );
}

async function run() {
  const extraFiles = process.argv.slice(2);
  try {
    const packageData = await createPackageFile(true);

    let changlogPath;
    if (await fileExists(path.join(packagePath, './CHANGELOG.md'))) {
      changlogPath = './CHANGELOG.md';
    } else {
      changlogPath = '../../CHANGELOG.md';
    }

    await Promise.all(
      ['./README.md', changlogPath, '../../LICENSE', ...extraFiles].map(async (file) => {
        const [sourcePath, targetPath] = file.split(':');
        await includeFileInBuild(sourcePath, targetPath);
      }),
    );

    await addLicense(packageData);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

run();
