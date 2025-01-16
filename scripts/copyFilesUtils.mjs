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
  if (typeof conditions === 'object') {
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

export async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } =
    JSON.parse(packageData);

  const packageExports = {
    ...createExportFor('.', { [srcCondition]: './src/index.ts' }),
    ...createExportFor('./*', { [srcCondition]: './src/*/index.ts' }),
  };

  if (packageDataOther.exports) {
    for (const [exportName, conditions] of Object.entries(packageDataOther.exports)) {
      if (conditions) {
        Object.assign(packageExports, createExportFor(exportName, conditions));
      } else {
        delete packageExports[exportName];
      }
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

  const newPackageData = {
    ...packageDataOther,
    private: false,
    ...(packageDataOther.main
      ? {
          main: './index.js',
          module: './esm/index.js',
        }
      : {}),
    exports: packageExports,
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
