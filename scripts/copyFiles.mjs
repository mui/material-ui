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

async function addLicense(packageData, exportFormat = 'legacy') {
  const esmExtension = exportFormat === 'exports' ? 'mjs' : 'js';
  const license = `/**
 * ${packageData.name} v${packageData.version}
 *
 * @license ${packageData.license}
 * This source code is licensed under the ${packageData.license} license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  await Promise.all(
    [`./index.${esmExtension}`, `./modern/index.${esmExtension}`, './node/index.js'].map(
      async (file) => {
        try {
          await prepend(path.resolve(buildPath, file), license);
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log(`Skipped license for ${file}`);
          } else {
            throw err;
          }
        }
      },
    ),
  );
}

async function run(argv) {
  const { extraFiles, exportFormat } = argv;

  try {
    // TypeScript
    await typescriptCopy({ from: srcPath, to: buildPath });

    const packageData = await createPackageFile(exportFormat);

    await Promise.all(
      ['./README.md', '../../CHANGELOG.md', '../../LICENSE', ...extraFiles].map(async (file) => {
        const [sourcePath, targetPath] = file.split(':');
        await includeFileInBuild(sourcePath, targetPath);
      }),
    );

    await addLicense(packageData, exportFormat);

    // await createModulePackages({ from: srcPath, to: buildPath, exportFormat });
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
        .option('exportFormat', {
          type: 'string',
          options: ['exports', 'legacy'],
          default: 'legacy',
          describe: 'Set to `exports` to build the package with the `exports` field.',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
