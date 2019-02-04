/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const glob = require('glob');

const workspacePath = process.cwd();
const buildPath = path.join(workspacePath, './build');
const srcPath = path.join(workspacePath, './src');

async function includeFileInBuild(file) {
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(file, targetPath);
  console.log(`Copied ${file} to ${targetPath}`);
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

async function typescriptCopy(from, to) {
  if (!(await fse.exists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(workspacePath, './package.json'), 'utf8');
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } = JSON.parse(
    packageData,
  );
  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    module: './esm/index.js',
    private: false,
    typings: './index.d.ts',
  };
  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

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
    [
      './index.js',
      './esm/index.js',
      './umd/material-ui.development.js',
      './umd/material-ui.production.min.js',
    ].map(file =>
      prepend(path.resolve(buildPath, file), license).catch(() =>
        console.log(`Skipped license for ${file}`),
      ),
    ),
  );
}

async function run() {
  const packageData = await createPackageFile();

  // use enhanced readme from workspace root for `@material-ui/core`
  const readmePath = packageData.name === '@material-ui/core' ? '../../README.md' : './README.md';
  await Promise.all(
    [readmePath, '../../CHANGELOG.md', '../../LICENSE'].map(file => includeFileInBuild(file)),
  );

  await addLicense(packageData);

  // TypeScript
  const from = srcPath;
  await Promise.all([
    typescriptCopy(from, buildPath),
    typescriptCopy(from, path.resolve(buildPath, './es')),
  ]);

  await createModulePackages(srcPath, buildPath);
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
