/* eslint-disable no-console */
import path from 'path';
import fs from 'node:fs/promises';
import glob from 'fast-glob';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');

/**
 * Copies a file into the build directory. By default it copies it under the same
 * base name in the root, but you can provide a second argument to specify a
 * different subpath.
 * @param {string} file source file path
 * @param {string=} target target file path
 * @returns {Promise<void>}
 */
export async function includeFileInBuild(file, target = path.basename(file)) {
  const sourcePath = path.resolve(packagePath, file);
  const targetPath = path.resolve(buildPath, target);
  await fs.copyFile(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

function pathExists(pathToTest) {
  return fs
    .stat(pathToTest)
    .then(() => true)
    .catch(() => false);
}

/**
 * Puts a package.json into every immediate child directory of rootDir.
 * That package.json contains information about esm for bundlers so that imports
 * like import Typography from '@mui/material/Typography' are tree-shakeable.
 *
 * It also tests that an this import can be used in TypeScript by checking
 * if an index.d.ts is present at that path.
 * TODO: kept around for backwards compatibility, remove once X is on ESM-exports package layout
 * @param {object} param0
 * @param {string} param0.from
 * @param {string} param0.to
 */
export async function createModulePackages({ from, to }) {
  const directoryPackages = glob.sync('*/index.{js,ts,tsx}', { cwd: from }).map(path.dirname);

  await Promise.all(
    directoryPackages.map(async (directoryPackage) => {
      const packageJsonPath = path.join(to, directoryPackage, 'package.json');
      const topLevelPathImportsAreCommonJSModules = await pathExists(
        path.resolve(path.dirname(packageJsonPath), '../esm'),
      );

      const packageJson = {
        sideEffects: false,
        module: topLevelPathImportsAreCommonJSModules
          ? path.posix.join('../esm', directoryPackage, 'index.js')
          : './index.js',
        main: topLevelPathImportsAreCommonJSModules
          ? './index.js'
          : path.posix.join('../node', directoryPackage, 'index.js'),
        types: './index.d.ts',
      };

      const [typingsEntryExist, moduleEntryExists, mainEntryExists] = await Promise.all([
        pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.types)),
        pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.module)),
        pathExists(path.resolve(path.dirname(packageJsonPath), packageJson.main)),
        fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)),
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

      return packageJsonPath;
    }),
  );
}

export async function cjsCopy({ from, to }) {
  if (!(await pathExists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = await glob('**/*.cjs', { cwd: from });
  const cmds = files.map((file) => fs.copyFile(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

const srcCondition = 'mui-src';

function createExportFor(exportName, conditions) {
  if (typeof conditions === 'object' && conditions) {
    const { [srcCondition]: src, ...other } = conditions;
    if (typeof src === 'string') {
      if (!/\.tsx?$/.test(src)) {
        throw new Error(`Invalid src condition for ${exportName}: ${src}`);
      }
      const baseName = src.replace(/^\.\/src\//, '').replace(/\.tsx?$/, '');
      return {
        [exportName]: {
          require: {
            types: `./${baseName}.d.ts`,
            default: `./${baseName}.js`,
          },
          import: {
            types: `./esm/${baseName}.d.ts`,
            default: `./esm/${baseName}.js`,
          },
          ...other,
        },
      };
    }
  }

  if (typeof conditions === 'string' && /\.tsx?$/.test(conditions)) {
    return createExportFor(exportName, { [srcCondition]: conditions });
  }

  return {
    [exportName]: conditions,
  };
}

export async function createPackageFile() {
  const packageData = await fs.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } =
    JSON.parse(packageData);

  const packageExports = {
    './package.json': './package.json',
  };

  if (!packageDataOther.exports?.['.']) {
    Object.assign(packageExports, {
      ...createExportFor('.', { [srcCondition]: './src/index.ts' }),
    });
  }

  if (!packageDataOther.exports?.['./*']) {
    // The default behavior is to export all top-level folders with an index.ts file
    // except for the esm/modern targets.
    Object.assign(packageExports, {
      ...createExportFor('./*', { [srcCondition]: './src/*/index.ts' }),
      ...createExportFor('./esm', null),
      ...createExportFor('./modern', null),
    });
  }

  if (packageDataOther.exports) {
    for (const [exportName, conditions] of Object.entries(packageDataOther.exports)) {
      Object.assign(packageExports, createExportFor(exportName, conditions));
    }
  }

  const newPackageData = {
    ...packageDataOther,
    private: false,
    ...(packageDataOther.main ? { main: './index.js' } : {}),
    exports: packageExports,
  };

  const typeDefinitionsFilePath = path.resolve(buildPath, './index.d.ts');
  if (await pathExists(typeDefinitionsFilePath)) {
    newPackageData.types = './index.d.ts';
  }

  if (newPackageData.publishConfig?.directory) {
    delete newPackageData.publishConfig.directory;
  }

  const targetPath = path.resolve(buildPath, './package.json');

  await fs.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  return newPackageData;
}

export async function prepend(file, string) {
  const data = await fs.readFile(file, 'utf8');
  await fs.writeFile(file, string + data, 'utf8');
}
