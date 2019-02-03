/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';
import glob from 'glob';

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
  await fse.copy(file, buildPath);
  console.log(`Copied ${file} to ${buildPath}`);
}

function typescriptCopy(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
  const { scripts, devDependencies, ...packageDataOther } = JSON.parse(packageData);
  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    module: './esm/index.js',
    private: false,
  };
  const buildPath = path.resolve(__dirname, '../build/package.json');

  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${buildPath}`);

  return newPackageData;
}

async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}

async function addLicense(packageData) {
  const license = `/** @license Material-UI v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  await Promise.all(
    ['../build/index.js', '../esm/index.js'].map(file =>
      prepend(path.resolve(__dirname, file), license),
    ),
  );
}

async function run() {
  await ['README.md', '../../LICENSE'].map(file => copyFile(file));
  const packageData = await createPackageFile();
  await addLicense(packageData);

  // TypeScript
  const from = path.resolve(__dirname, '../src');
  await Promise.all([
    typescriptCopy(from, path.resolve(__dirname, '../build')),
    typescriptCopy(from, path.resolve(__dirname, '../build/es')),
  ]);
}

run();
