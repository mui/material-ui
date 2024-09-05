// Only use built-in modules because this script runs pre-install.
import { promises as fs } from 'fs';
import { URL } from 'url';

/**
 * node 12 compatible implementation of cp -r
 * @param {URL} sourceDirectory
 * @param {URL} targetDirectory
 */
async function copyDirectory(sourceDirectory, targetDirectory) {
  await fs.mkdir(targetDirectory, { recursive: true });

  const sourceFiles = await fs.readdir(sourceDirectory, { withFileTypes: true });
  await Promise.all(
    sourceFiles.map(async (sourceFileEntry) => {
      let copyMethod;
      let sourceFileUrlInput;
      if (sourceFileEntry.isDirectory()) {
        sourceFileUrlInput = `./${sourceFileEntry.name}/`;
        copyMethod = copyDirectory;
      } else {
        sourceFileUrlInput = `./${sourceFileEntry.name}`;
        copyMethod = fs.copyFile;
      }
      await copyMethod(
        new URL(sourceFileUrlInput, sourceDirectory),
        new URL(sourceFileUrlInput, targetDirectory),
      );
    }),
  );
}

/**
 * node 12 compatible implementation of rm -rf
 * @param {string} directory
 */
async function rmRecursiveForce(directory) {
  const files = await fs.readdir(directory);
  await Promise.all(
    files.map(async (fileBasename) => {
      const fileName = new URL(fileBasename, directory);

      const fileStats = await fs.stat(fileName);
      if (fileStats.isDirectory()) {
        await rmRecursiveForce(fileName);
      } else {
        await fs.unlink(fileName, { force: true });
      }
    }),
  );

  await fs.rmdir(directory);
}

async function run(context) {
  const { fixturePath } = context;
  if (fixturePath === undefined) {
    throw new Error(
      `Usage: ${process.argv[1]} <fixturePath> [distTag]\n  distTag: An npm tag e.g. 'npm:next' or 'npm:latest'. Omit the use the built packages from source.`,
    );
  }
  const cwdUrl = new URL(`${process.cwd()}/`, 'file://');
  const fixtureUrl = new URL(`./${fixturePath}/`, cwdUrl);

  const workspaceRoot = new URL('../../../', import.meta.url);
  await Promise.all(
    [
      'material',
      'icons-material',
      'lab',
      'private-theming',
      'styled-engine',
      'styles',
      'system',
      'types',
      'base',
      'utils',
    ].map(async (muiPackageName) => {
      // clean copy
      try {
        await rmRecursiveForce(new URL(`./node_modules/@mui/${muiPackageName}/`, fixtureUrl));
      } catch (error) {
        // already exists
      }
      await copyDirectory(
        new URL(`./packages/mui${`-${muiPackageName}`}/build/`, workspaceRoot),
        new URL(`./node_modules/@mui/${muiPackageName}/`, fixtureUrl),
      );
    }),
  );
}

run({ fixturePath: process.argv[2] }).catch((error) => {
  console.error(error);
  process.exit(1);
});
