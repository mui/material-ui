/* eslint-disable flowtype/require-valid-file-annotation,no-console */
const path = require('path');
const runTest = require('./runTest');
const screenshotElement = require('./screenshotElement');

function createBaseline(client, testPath, done) {
  client.session(({ value }) => {
    const profile = `${value.browserName.toLowerCase()}-${value.version}-${value.platform.toLowerCase()}`;
    const baselinePath = path.resolve(__dirname, `screenshots/baseline/${testPath}/${profile}.png`);
    client.windowHandle((handle) => {
      client.windowSize(handle.value, (size) => {
        return screenshotElement(client, baselinePath, size.value, done);
      });
    });
  });
}

module.exports = runTest(createBaseline);
