const fs = require('fs');
const rimraf = require('rimraf');
const { promisify } = require('util');
const { expect } = require('chai');
const listChangedFiles = require('./listChangedFiles');

const writeFileAsync = promisify(fs.writeFile);
const rimrafAsync = promisify(rimraf);

describe('listChangedFiles', () => {
  it('should detect changes', async function test() {
    // Heavy refactorization of the codebase can make this test go over
    // the default 2s timeout.
    this.timeout(4000);

    const changesBefore = await listChangedFiles({ branch: 'next' });
    const testFile = 'someTestFile.js';
    try {
      await writeFileAsync(testFile, 'console.log("hello");');
      const changesAfterAdd = await listChangedFiles({ branch: 'next' });
      const addedFiles = Array.from(changesAfterAdd).filter((file) => !changesBefore.has(file));
      expect(addedFiles).to.deep.equal([testFile]);
    } finally {
      await rimrafAsync(testFile);
    }
  });
});
