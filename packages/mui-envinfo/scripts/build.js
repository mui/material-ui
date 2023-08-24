const childProcess = require('child_process');
const path = require('path');
const { promisify } = require('util');
const fse = require('fs-extra');

const packageRoot = path.resolve(__dirname, '../');
const buildDirectory = path.join(packageRoot, 'build');

const exec = promisify(childProcess.exec);

/**
 * Moves published files to `/build`.
 * We publish from `/build` by convention.
 */
async function main() {
  // clean
  await fse.remove(buildDirectory);

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
    await fse.move(untarDestination, buildDirectory);
  } finally {
    await fse.remove(untarDestination);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
