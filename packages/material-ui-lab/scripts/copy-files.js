/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';
import glob from 'glob';

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
  await fse.copy(file, buildPath);
  console.log(`Copied ${file} to ${buildPath}`);
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Typography from '@material-ui/core/Typography' are tree-shakeable.
 *
 * It also tests that an this import can be used in typescript by checking
 * if an index.d.ts is present at that path.
 *
 * @param {string} rootDir
 */
function createModulePackages(srcDir, outDir) {
  const directoryPackages = glob.sync('*/index.js', { cwd: srcDir }).map(path.dirname);
  return Promise.all(
    directoryPackages.map(directoryPackage => {
      const packageJson = {
        sideEffects: false,
        module: path.join('..', 'esm', directoryPackage, 'index.js'),
      };
      const packageJsonPath = path.join(outDir, directoryPackage, 'package.json');

      return Promise.all([
        fse.exists(path.join(outDir, directoryPackage, 'index.d.ts')),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)),
      ]).then(([typingsExist]) => {
        if (!typingsExist) {
          return Promise.reject(new Error(`index.d.ts for ${directoryPackage} is missing`));
        }
        return Promise.resolve(packageJsonPath);
      });
    }),
  );
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
    typings: './index.d.ts',
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
    ['../build/index.js', '../build/esm/index.js'].map(file =>
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

  await createModulePackages(
    path.resolve(__dirname, '../src'),
    path.resolve(__dirname, '../build'),
  );
}

run();
