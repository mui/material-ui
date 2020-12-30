const childProcess = require('child_process');
const fse = require('fs-extra');
const path = require('path');
const { promisify } = require('util');

const packageRoot = path.resolve(__dirname, '../');
const buildDirectory = path.join(packageRoot, 'build');

const execFile = promisify(childProcess.execFile);

/**
 * Moves published files to `/build`.
 * We publish from `/build` by convention.
 */
async function main() {
  // clean
  await fse.remove(buildDirectory);

  const { stdout: filenames } = await execFile('npm', ['pack'], { cwd: packageRoot });
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
    await execFile('tar', ['-xzf', packageTgzPath], { cwd: packageRoot });
    await fse.move(untarDestination, buildDirectory);
  } finally {
    await fse.remove(untarDestination);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
