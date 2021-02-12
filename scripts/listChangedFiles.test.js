const fs = require('fs');
const rimraf = require('rimraf');
const { promisify } = require('util');
const { expect } = require('chai');
const listChangedFiles = require('./listChangedFiles');

const writeFileAsync = promisify(fs.writeFile);
const rimrafAsync = promisify(rimraf);

describe('listChangedFiles', () => {
  it('should detect changes', async () => {
    const changesBeforeAdd = await listChangedFiles({ branch: 'next' });
    const testFile = 'someTestFile.yml';
    try {
      await writeFileAsync(testFile, 'console.log("hello");');
      const changesAfterAdd = await listChangedFiles({ branch: 'next' });
      expect(changesBeforeAdd).not.to.contain(testFile);
      expect(changesAfterAdd).to.contain(testFile);
      expect(changesAfterAdd.size - changesBeforeAdd.size).to.equal(1);
    } finally {
      await rimrafAsync(testFile);
    }
  });
});
