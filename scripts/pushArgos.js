/* eslint-disable no-console */
const util = require('util');
const glob = require('fast-glob');
const fse = require('fs-extra');
const chunk = require('lodash/chunk');
const childProcess = require('child_process');

const execFileAsync = util.promisify(childProcess.execFile);

async function exec(command, args) {
  const options = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8',
  };

  const results = await execFileAsync(command, args, options);
  return results.stdout;
}

const screenshotsBase = 'test/regressions/screenshots/chrome';

async function run() {
  let screenshots = await glob(`${screenshotsBase}/**/*`);
  screenshots = chunk(screenshots, Math.ceil(screenshots.length / 2));

  await Promise.all(
    screenshots.map((chunks, chunkIndex) =>
      Promise.all(
        chunks.map((screenshot) => {
          return fse.move(
            screenshot,
            `${screenshotsBase}/${chunkIndex}/${screenshot.replace(screenshotsBase, '')}`,
          );
        }),
      ),
    ),
  );

  for (let i = 0; i < screenshots.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const stdout = await exec('argos', [
      'upload',
      `${screenshotsBase}/${i}`,
      '--token',
      process.env.ARGOS_TOKEN,
      '--batchCount',
      3,
      '--external-build-id',
      process.env.CIRCLE_SHA1,
    ]);
    console.log(stdout);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
