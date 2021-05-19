// Only use built-in modules because this script runs pre-install.
const { promises: fs } = require('fs');
const path = require('path');

/**
 * node 12 compatible implementation of cp -r
 * @param {string} directory
 */
async function copyRecursive(sourceDirectory, targetDirectory) {
  await fs.mkdir(targetDirectory, { recursive: true });

  const sourceFiles = await fs.readdir(sourceDirectory);
  await Promise.all(
    sourceFiles.map(async (sourceFileBaseName) => {
      const sourceFileName = path.join(sourceDirectory, sourceFileBaseName);
      const targetFileName = path.join(targetDirectory, sourceFileBaseName);

      const sourceFileStats = await fs.stat(sourceFileName);
      if (sourceFileStats.isDirectory()) {
        await copyRecursive(sourceFileName, targetFileName);
      } else {
        await fs.copyFile(sourceFileName, targetFileName);
      }
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
      const fileName = path.join(directory, fileBasename);

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
      `Usage: ${path.basename(
        process.argv[1],
      )} <fixturePath> <distTag>\n  distTag: An npm tag e.g. 'npm:next' or 'npm:latest'. Omit the use the built packages from source.`,
    );
  }

  const workspaceRoot = path.resolve(__dirname, '../../../');
  await Promise.all(
    [].map(async (muiPackageName) => {
      // clean coyp
      try {
        await rmRecursiveForce(
          path.resolve(fixturePath, `node_modules/@material-ui/${muiPackageName}`),
        );
      } catch (error) {
        // already exists
      }
      await copyRecursive(
        path.join(
          workspaceRoot,
          `packages/material-ui${muiPackageName === 'core' ? '' : `-${muiPackageName}`}/build`,
        ),
        path.resolve(fixturePath, `node_modules/@material-ui/${muiPackageName}`),
      );
    }),
  );
}

run({ fixturePath: process.argv[2] }).catch((error) => {
  console.error(error);
  process.exit(1);
});
