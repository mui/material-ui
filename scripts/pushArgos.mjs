/* eslint-disable no-console */
import glob from 'fast-glob';
import fse from 'fs-extra';
import lodashChunk from 'lodash/chunk.js';
import { upload } from '@argos-ci/core';
import yargs from 'yargs';
import path from 'path';

const BATCH_SIZE = 200;

const argv = yargs(process.argv.slice(2))
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .demandCommand(1, 'You need to specify the screenshots folder as a positional argument').argv;

async function run() {
  const tempDir = await fse.mkdtemp(path.resolve('argos-screenshots-'));

  try {
    const screenshotsFolder = argv._[0];
    const screenshots = await glob(`${screenshotsFolder}/**/*`);

    console.log(`Found ${screenshots.length} screenshots.`);
    if (argv.verbose) {
      console.log('Screenshots found:');
      screenshots.forEach((screenshot) => {
        console.log(`  - ${screenshot}`);
      });
    }

    const chunks = lodashChunk(screenshots, BATCH_SIZE);

    await Promise.all(
      chunks.map((chunk, chunkIndex) =>
        Promise.all(
          chunk.map((screenshot) => {
            const relativePath = path.relative(screenshotsFolder, screenshot);
            return fse.move(screenshot, path.join(tempDir, `${chunkIndex}`, relativePath));
          }),
        ),
      ),
    );

    for (let i = 0; i < chunks.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const result = await upload({
        root: `${tempDir}/${i}`,
        commit: process.env.CIRCLE_SHA1,
        branch: process.env.CIRCLE_BRANCH,
        token: process.env.ARGOS_TOKEN,
        parallel: {
          total: chunks.length,
          nonce: process.env.CIRCLE_BUILD_NUM,
        },
      });

      console.log(
        `Batch of ${chunks[i].length} screenshots uploaded. Build URL: ${result.build.url}`,
      );
    }
  } finally {
    await fse.remove(tempDir);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
