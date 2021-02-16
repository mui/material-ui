const fs = require('fs');
const rimraf = require('rimraf');
const { promisify } = require('util');
const { expect } = require('chai');
const listChangedFiles = require('./listChangedFiles');

const writeFileAsync = promisify(fs.writeFile);
const rimrafAsync = promisify(rimraf);

describe('listChangedFiles', function listChangedFilesSuite() {
  // This test oftentimes times out after 4s but it's unclear why considering `listChangedFiles` is used in CI tasks that only take <1s.
  this.timeout(10000);
  const noop = () => {};
  // eslint-disable-next-line no-console
  const time = process.env.CI ? console.time : noop;
  // eslint-disable-next-line no-console
  const timeLog = process.env.CI ? console.timeLog : noop;
  // eslint-disable-next-line no-console
  const timeEnd = process.env.CI ? console.timeEnd : noop;
  it('should detect changes', async () => {
    time();
    const changesBeforeAdd = await listChangedFiles({ branch: 'next' });
    timeLog();
    const testFile = 'someTestFile.yml';
    try {
      await writeFileAsync(testFile, 'console.log("hello");');
      timeLog();
      const changesAfterAdd = await listChangedFiles({ branch: 'next' });
      timeLog();
      expect(changesBeforeAdd).not.to.contain(testFile);
      expect(changesAfterAdd).to.contain(testFile);
      expect(changesAfterAdd.size - changesBeforeAdd.size).to.equal(1);
      timeLog();
    } finally {
      await rimrafAsync(testFile);
      timeEnd();
    }
  });
});
