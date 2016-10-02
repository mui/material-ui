/* eslint-disable flowtype/require-valid-file-annotation,no-console */

const fs = require('fs');
const path = require('path');
const BlinkDiff = require('blink-diff');
const runTest = require('./runTest');
const screenshotElement = require('./screenshotElement');

function compareScreenshots(client, baselinePath, screenshotPath, done) {
  const diffPath = screenshotPath.replace('.png', '-diff.png');

  const diff = new BlinkDiff({
    imageAPath: baselinePath,
    imageBPath: screenshotPath,
    imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT,
    thresholdType: BlinkDiff.THRESHOLD_PERCENT,
    threshold: 0.001,
    delta: 20,
    composition: false,
    hideShift: false,
    hShift: 0,
    vShift: 0,
    imageOutputPath: diffPath,
  });

  diff.run((error, result) => {
    if (error) {
      throw error;
    } else {
      const passed = diff.hasPassed(result.code);
      client.assert.strictEqual(passed, true, 'should have passed the diff test');

      if (!passed) {
        if (process.env.TRAVIS) {
          const { TRAVIS_BUILD_NUMBER, TRAVIS_JOB_NUMBER } = process.env;
          const s3Path = `${TRAVIS_BUILD_NUMBER}/${TRAVIS_JOB_NUMBER}/${diffPath.replace(/^.*output\//, '')}`;
          console.error(
            'Diff Screenshot:',
            `https://s3.amazonaws.com/mui-test-artifacts/callemall/material-ui/${s3Path}`
          );
        } else {
          console.error('Diff Screenshot:', diffPath);
        }
      }
      /**
       * Could include this... but feels like added noise.
       */
      // const max = Math.ceil(result.dimension * 0.001);
      // client.assert.strictEqual(
      //   result.differences < max,
      //   true,
      //   `should have less than ${max}/${result.dimension} differences, found ${result.differences}.`
      // );
      done();
    }
  });
}

function performRegressionTest(client, testPath, done) {
  client.session(({ value }) => {
    const profile = `${value.browserName.toLowerCase()}-${value.version}-${value.platform.toLowerCase()}`;
    const screenshotPath = path.resolve(__dirname, `screenshots/output/${testPath}/${profile}.png`);
    const baselinePath = path.resolve(__dirname, `screenshots/baseline/${testPath}/${profile}.png`);

    // Makes sure the path is visible to the calling process.
    fs.access(baselinePath, fs.F_OK, (err) => {
      client.assert.strictEqual(!err, true, `should have a baseline image: ${baselinePath}`);

      if (!err) {
        client.windowHandle((handle) => {
          client.windowSize(handle.value, (size) => {
            return screenshotElement(
              client,
              screenshotPath,
              size.value,
              () => compareScreenshots(client, baselinePath, screenshotPath, done)
            );
          });
        });
      } else {
        done();
      }
    });
  });
}

module.exports = runTest(performRegressionTest);
