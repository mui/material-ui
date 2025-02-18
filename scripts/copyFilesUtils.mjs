/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';
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
      const topLevelPathImportsAreCommonJSModules = await fse.pathExists(
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

      return packageJsonPath;
    }),
  );
}

export async function typescriptCopy({ from, to }) {
  if (!(await fse.pathExists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = await glob('**/*.d.ts', { cwd: from });
  const cmds = files.map((file) => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

export async function cjsCopy({ from, to }) {
  if (!(await fse.pathExists(to))) {
    console.warn(`path ${to} does not exists`);
    return [];
  }

  const files = await glob('**/*.cjs', { cwd: from });
  const cmds = files.map((file) => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

const srcCondition = 'mui-src';
const modernCondition = 'mui-modern';
const polyfillLegacyModern = false;
const legacyModernPrefix = './modern';

function createExportFor(exportName, conditions) {
  if (typeof conditions === 'object' && conditions) {
    const { [srcCondition]: src, ...rest } = conditions;
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
          [modernCondition]: {
            types: `./modern/${baseName}.d.ts`,
            default: `./modern/${baseName}.js`,
          },
          ...rest,
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

// TODO: remove useEsmExports paramater once X is on the ESM-exports package layout (default to true)
export async function createPackageFile(useEsmExports = false) {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } =
    JSON.parse(packageData);

  const packageExports = {};

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

  if (polyfillLegacyModern) {
    const exportedNames = new Set(Object.keys(packageExports));
    for (const exportedName of exportedNames) {
      const modernName = exportedName.replace(/^\./, legacyModernPrefix);
      const modernExport = packageExports[exportedName][modernCondition] ?? null;
      if (modernExport && !exportedNames.has(modernName)) {
        packageExports[modernName] = modernExport;
      }
    }
  }

  const newPackageData = useEsmExports
    ? {
        ...packageDataOther,
        private: false,
        ...(packageDataOther.main
          ? {
              main: './index.js',
              module: './esm/index.js',
            }
          : {}),
        exports: packageExports,
      }
    : {
        ...packageDataOther,
        private: false,
        ...(packageDataOther.main
          ? {
              main: fse.existsSync(path.resolve(buildPath, './node/index.js'))
                ? './node/index.js'
                : './index.js',
              module: fse.existsSync(path.resolve(buildPath, './esm/index.js'))
                ? './esm/index.js'
                : './index.js',
            }
          : {}),
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

export async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}
