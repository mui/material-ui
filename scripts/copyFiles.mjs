/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';
import glob from 'fast-glob';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');
const srcPath = path.join(packagePath, './src');

async function includeFileInBuild(file) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Typography from '@mui/material/Typography' are tree-shakeable.
 *
 * It also tests that an this import can be used in TypeScript by checking
 * if an index.d.ts is present at that path.
 * @param {object} param0
 * @param {string} param0.from
 * @param {string} param0.to
 */
async function createModulePackages({ from, to }) {
  const directoryPackages = glob.sync('*/index.{js,ts,tsx}', { cwd: from }).map(path.dirname);

  const modulePackages = await Promise.all(
    directoryPackages.map(async (directoryPackage) => {
      const packageJsonPath = path.join(to, directoryPackage, 'package.json');
      const packageDir = path.dirname(packageJsonPath);
      const topLevelPathImportsAreCommonJSModules = await fse.pathExists(
        path.resolve(packageDir, '../esm'),
      );

      const esm = topLevelPathImportsAreCommonJSModules
        ? path.posix.join('../esm', directoryPackage, 'index.js')
        : './index.js';

      const cjs = topLevelPathImportsAreCommonJSModules
        ? './index.js'
        : path.posix.join('../node', directoryPackage, 'index.js');

      const packageJson = {
        sideEffects: false,
        module: esm,
        main: cjs,
        type: 'module',
        exports: {
          '.': {
            import: esm,
            require: cjs,
          },
        },
        types: './index.d.ts',
      };

      const [typingsEntryExist, moduleEntryExists, mainEntryExists] = await Promise.all([
        fse.pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.types)),
        fse.pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.module)),
        fse.pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.main)),
        fse.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)),
      ]);

      const manifestErrorMessages = [];
      if (!typingsEntryExist) {
        manifestErrorMessages.push(`'types' entry '${packageJson.types}' does not exist`);
      }
      if (!moduleEntryExists) {
        manifestErrorMessages.push(`'module' entry '${packageJson.module}' does not exist`);
      }
      if (!mainEntryExists) {
        manifestErrorMessages.push(`'main' entry '${packageJson.main}' does not exist`);
      }
      if (manifestErrorMessages.length > 0) {
        // TODO: AggregateError
        throw new Error(`${packageJsonPath}:\n${manifestErrorMessages.join('\n')}`);
      }

      return {
        [`./${path.basename(packageDir)}`]: {
          import: `./${path.relative(to, path.resolve(packageDir, esm))}`,
          require: `./${path.relative(to, path.resolve(packageDir, cjs))}`,
        },
      };
    }),
  );

  return modulePackages;
}

async function typescriptCopy({ from, to }) {
  if (!(await fse.pathExists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = await glob('**/*.d.ts', { cwd: from });
  const cmds = files.map((file) => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function createPackageFile({ innerModules }) {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } =
    JSON.parse(packageData);

  const cjs = fse.existsSync(path.resolve(buildPath, './node/index.js'))
    ? './node/index.js'
    : './index.js';

  const esm = fse.existsSync(path.resolve(buildPath, './esm/index.js'))
    ? './esm/index.js'
    : './index.js';

  const newPackageData = {
    ...packageDataOther,
    private: false,
    ...(packageDataOther.main
      ? {
          main: cjs,
          module: esm,
        }
      : {}),
    type: 'module',
    exports: {
      '.': {
        import: esm,
        require: cjs,
      },
      ...Object.assign({}, ...innerModules),
    },
    types: './index.d.ts',
  };

  const typeDefinitionsFilePath = path.resolve(buildPath, './index.d.ts');
  if (await fse.pathExists(typeDefinitionsFilePath)) {
    newPackageData.types = './index.d.ts';
  }

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
  const license = `/** @license MUI v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  await Promise.all(
    [
      './index.js',
      './legacy/index.js',
      './modern/index.js',
      './node/index.js',
      './umd/material-ui.development.js',
      './umd/material-ui.production.min.js',
    ].map(async (file) => {
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
  try {
    // TypeScript
    await typescriptCopy({ from: srcPath, to: buildPath });

    const innerModules = await createModulePackages({ from: srcPath, to: buildPath });

    const packageData = await createPackageFile({ innerModules });

    await Promise.all(
      [
        // use enhanced readme from workspace root for `@mui/material`
        packageData.name === '@mui/material' ? '../../README.md' : './README.md',
        '../../CHANGELOG.md',
        '../../LICENSE',
      ].map((file) => includeFileInBuild(file)),
    );

    await addLicense(packageData);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
