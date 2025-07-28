/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';
import glob from 'fast-glob';
import { shimPackageExports } from './exportsUtils.mjs';

// Use .mjs extension for ESM output files if the MUI_EXPERIMENTAL_MJS environment variable is set.
const EXPERIMENTAL_MJS = !!process.env.MUI_EXPERIMENTAL_MJS;

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
            types: `./esm/${baseName}.d.${EXPERIMENTAL_MJS ? 'mts' : 'ts'}`,
            default: `./esm/${baseName}.${EXPERIMENTAL_MJS ? 'mjs' : 'js'}`,
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
      ...createExportFor('./esm/*', null),
      ...createExportFor('./modern', null),
      ...createExportFor('./modern/*', null),
    });
  }

  if (packageDataOther.exports) {
    for (const [exportName, conditions] of Object.entries(packageDataOther.exports)) {
      Object.assign(packageExports, createExportFor(exportName, conditions));
    }
  }

  const newPackageData = useEsmExports
    ? {
        ...packageDataOther,
        private: false,
        ...(packageDataOther.main
          ? {
              main: './index.js',
              module: `./esm/index.${EXPERIMENTAL_MJS ? 'mjs' : 'js'}`,
            }
          : {}),
        exports: packageExports,
      }
    : {
        ...packageDataOther,
        private: false,
        ...(packageDataOther.main
          ? {
              main: './index.js',
              module: `./esm/index.${EXPERIMENTAL_MJS ? 'mjs' : 'js'}`,
            }
          : {}),
      };

  const typeDefinitionsFilePath = path.resolve(buildPath, './index.d.ts');
  if (await fse.pathExists(typeDefinitionsFilePath)) {
    newPackageData.types = './index.d.ts';
  }

  if (newPackageData.publishConfig?.directory) {
    delete newPackageData.publishConfig.directory;
  }

  const targetPath = path.resolve(buildPath, './package.json');

  await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${targetPath}`);

  // Create shim structure for package exports
  if (newPackageData.exports) {
    await shimPackageExports(buildPath, newPackageData.exports);
    console.log(`Created shim structure in ${buildPath}`);
  }

  return newPackageData;
}

export async function prepend(file, string) {
  const data = await fse.readFile(file, 'utf8');
  await fse.writeFile(file, string + data, 'utf8');
}
