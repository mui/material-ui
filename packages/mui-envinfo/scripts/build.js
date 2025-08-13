const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const fs = require('fs/promises');

const packageRoot = path.resolve(__dirname, '../');
const buildDirectory = path.join(packageRoot, 'build');

const exec = promisify(childProcess.exec);

/**
 * Moves published files to `/build`.
 * We publish from `/build` by convention.
 */
async function main() {
  // clean
  try {
    await fs.rm(buildDirectory, { recursive: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const { stdout: filenames } = await exec('npm pack', { cwd: packageRoot });
  const packageTgzPath = path.join(
    packageRoot,
    // https://docs.npmjs.com/cli/v6/commands/npm-pack
    // "and then write the filenames out to stdout"
    // which means they're separated by a newline
    filenames.split(/\r?\n/)[0],
  );
  // hardcoded by npm
  const untarDestination = path.join(packageRoot, 'package');
  try {
    await exec(
      [
        'tar',
        '-xzf',
        // absolute paths are not interpreted as local files
        // `--force-local` is not available in BSD tar (macOS)
        path.relative(packageRoot, packageTgzPath),
      ].join(' '),
      {
        cwd: packageRoot,
      },
    );
    await fs.rename(untarDestination, buildDirectory);
  } finally {
    await fs.rm(untarDestination, { recursive: true }).catch((error) => {
      if (error.code !== 'ENOENT') {
        Promise.reject(error);
      }
    });
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
