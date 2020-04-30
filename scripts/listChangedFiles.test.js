const listChangedFiles = require('./listChangedFiles');
const fs = require('fs');
const rimraf = require('rimraf');
const { promisify } = require('util');
const { expect } = require('chai');

const writeFileAsync = promisify(fs.writeFile);
const rimrafAsync = promisify(rimraf);

describe('listChangedFiles', () => {
  it('should detect changes', async () => {
    const changesBefore = await listChangedFiles();
    const testFile = 'someTestFile.js';
    try {
      await writeFileAsync(testFile, 'console.log("hello");');
      const changesAfterAdd = await listChangedFiles();
      const addedFiles = Array.from(changesAfterAdd).filter((file) => !changesBefore.has(file));
      expect(addedFiles).to.deep.equal([testFile]);
    } finally {
      await rimrafAsync(testFile);
    }
  });
});
