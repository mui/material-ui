/* eslint-disable no-console */
import path from 'path';
import yargs from 'yargs';
import {
  createModulePackages,
  createPackageFile,
  includeFileInBuild,
  prepend,
  typescriptCopy,
} from './copyFilesUtils.mjs';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './build');
const srcPath = path.join(packagePath, './src');

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
    [
      './index.mjs',
      './legacy/index.mjs',
      './modern/index.mjs',
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

async function run(argv) {
  const { extraFiles, addExportsField } = argv;

  try {
    // TypeScript
    await typescriptCopy({ from: srcPath, to: buildPath });

    const packageData = await createPackageFile(addExportsField);

    await Promise.all(
      ['./README.md', '../../CHANGELOG.md', '../../LICENSE', ...extraFiles].map(async (file) => {
        const [sourcePath, targetPath] = file.split(':');
        await includeFileInBuild(sourcePath, targetPath);
      }),
    );

    await addLicense(packageData);

    await createModulePackages({ from: srcPath, to: buildPath });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

yargs(process.argv.slice(2))
  .command({
    command: '$0 [extraFiles..]',
    description: 'copy files',
    builder: (command) => {
      return command
        .positional('extraFiles', {
          type: 'array',
          default: [],
        })
        .option('addExportsField', {
          type: 'boolean',
          default: false,
          describe:
            'Set to `true` if you wish to add the exports field. Only supports top level ESM packages.',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
