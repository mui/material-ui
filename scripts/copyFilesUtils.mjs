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
 * @param {object} param0
 * @param {string} param0.from
 * @param {string} param0.to
 */
export async function createModulePackages({ from, to, exportFormat = 'legacy' }) {
  const esmExtension = exportFormat === 'exports' ? 'mjs' : 'js';
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
          ? path.posix.join('../esm', directoryPackage, `index.${esmExtension}`)
          : `./index.${esmExtension}`,
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

/**
 * Returns the Core exports field.
 * @returns {object}
 */
function getCoreExportsField() {
  const coreExportsField = {};

  const hasIndexMjs = fse.existsSync(path.resolve(buildPath, './index.mjs'));
  if (hasIndexMjs) {
    // Asumes the types file and node build are set up correctly
    coreExportsField['.'] = {
      types: './index.d.ts',
      'mui-modern': './modern/index.mjs',
      import: './index.mjs',
      default: './node/index.js',
    };
  }

  const hasNestedIndexFiles = glob.sync('*/index.mjs', { cwd: buildPath }).length > 0;
  if (hasNestedIndexFiles) {
    // Asumes the types files and node build are set up correctly
    coreExportsField['./*'] = {
      types: './*/index.d.ts',
      'mui-modern': './modern/*/index.mjs',
      import: './*/index.mjs',
      default: './node/*/index.js',
    };
  }

  return coreExportsField;
}

/**
 * Creates a package.json in the build directory.
 * @param {boolean} skipExportsField Whether to skip the exports field in the package.json. Only top level ESM packages are supported.
 * @returns {Promise<object>}
 */
export async function createPackageFile(exportFormat = 'legacy') {
  const esmExtension = exportFormat === 'exports' ? 'mjs' : 'js';
  const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } =
    JSON.parse(packageData);

  const newPackageData = {
    ...packageDataOther,
    private: false,
    ...(packageDataOther.main
      ? {
          main: fse.existsSync(path.resolve(buildPath, './node/index.js'))
            ? './node/index.js'
            : './index.js',
          module: fse.existsSync(path.resolve(buildPath, `./esm/index.${esmExtension}`))
            ? `./esm/index.${esmExtension}`
            : `./index.${esmExtension}`,
        }
      : {}),
  };

  const typeDefinitionsFilePath = path.resolve(buildPath, './index.d.ts');
  if (await fse.pathExists(typeDefinitionsFilePath)) {
    newPackageData.types = './index.d.ts';
  }

  if (exportFormat === 'exports') {
    newPackageData.exports = {
      ...packageDataOther.exports,
      ...getCoreExportsField(),
    };
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
