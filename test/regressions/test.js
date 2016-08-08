/* eslint-disable flowtype/require-valid-file-annotation,no-console */
const path = require('path');
const glob = require('glob');
const pngCrop = require('png-crop');
const BlinkDiff = require('blink-diff');

module.exports = glob.sync(path.resolve(__dirname, 'site/src/tests/**/*.js'))
  .reduce(reduceTests, {
    beforeEach(browser) {
      browser
        .setWindowPosition(0, 0)
        .resizeWindow(1200, 1000);
    },
    after(browser) {
      browser.end();
    },
  });

function reduceTests(res, n) {
  const testPath = n.replace(/^.*?tests\/(.*).js$/i, '$1');
  res[testPath] = createTest(testPath);
  return res;
}

function createTest(testPath) {
  return function regressions(browser) {
    browser
      .url(`${browser.launch_url}/#/${testPath}`)
      .waitForElementVisible('[data-reactroot]', 6000)
      .perform(performRegressionTest);

    function performRegressionTest(client, done) {
      client.session(({ value }) => {
        const profile = `${value.browserName.toLowerCase()}-${value.version}-${value.platform.toLowerCase()}`;
        const screenshotPath = path.resolve(__dirname, `screenshots/output/${testPath}/${profile}.png`);
        const baselinePath = path.resolve(__dirname, `screenshots/baseline/${testPath}/${profile}.png`);
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
      });
    }

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

    function screenshotElement(client, screenshotPath, windowSize, done) {
      client.element('css selector', '[data-reactroot] > *:first-child', (element) => {
        client.elementIdLocationInView(element.value.ELEMENT, (location) => {
          client.elementIdSize(element.value.ELEMENT, (size) => {
            client.saveScreenshot(screenshotPath, () => {
              const cropWidth = size.value.width < windowSize.width - 30;
              const cropHeight = size.value.height < windowSize.height - 30;

              if (cropWidth || cropHeight) {
                const config = {
                  width: cropWidth ? size.value.width + 30 : windowSize.width,
                  height: cropHeight ? size.value.height + 30 : windowSize.height,
                  top: cropHeight && location.value.y >= 15 ? location.value.y - 15 : location.value.y,
                  left: cropWidth && location.value.x >= 15 ? location.value.x - 15 : location.value.x,
                };
                pngCrop.crop(screenshotPath, screenshotPath, config, (err) => {
                  if (err) throw err;
                  done();
                });
              } else {
                done();
              }
            });
          });
        });
      });
    }
  };
}
