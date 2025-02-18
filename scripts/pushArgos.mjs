/* eslint-disable no-console */
import glob from 'fast-glob';
import fse from 'fs-extra';
import lodashChunk from 'lodash/chunk.js';
import { upload } from '@argos-ci/core';

const screenshotsBase = 'test/regressions/screenshots/chrome';
const screenshotsTmp = 'test/regressions/screenshots/argos';
const BATCH_SIZE = 200;

async function run() {
  const screenshots = await glob(`${screenshotsBase}/**/*`);
  const chunks = lodashChunk(screenshots, BATCH_SIZE);

  await Promise.all(
    chunks.map((chunk, chunkIndex) =>
      Promise.all(
        chunk.map((screenshot) => {
          return fse.move(
            screenshot,
            `${screenshotsTmp}/${chunkIndex}/${screenshot.replace(screenshotsBase, '')}`,
          );
        }),
      ),
    ),
  );

  for (let i = 0; i < chunks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const result = await upload({
      root: `${screenshotsTmp}/${i}`,
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
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
