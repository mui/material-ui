/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import * as joy from './index';
import fs from 'fs';
import glob from 'fast-glob';

describe('@mui/joy', () => {
  it('should have exports', () => {
    expect(typeof joy).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(joy).forEach((exportKey) =>
      expect(`${exportKey}-${Boolean(joy[exportKey])}`).to.equal(`${exportKey}-true`),
    );
  });

  describe('r', () => {
    it('ds', async () => {
      const files = await glob('packages/mui-joy/src/*/index.ts'); // use fast-glob to get all 'index.js' files recursively
      const mainIndexFile = fs.readFileSync('packages/mui-joy/src/index.ts', 'utf-8');
      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8'); // read file content synchronously
        const hasDefaultExport = /export { default }/.test(content); // check if file has default export
        const hasAll = /export \* from /.test(content); // check if file has default export
        const [, , , folder] = file.split('/');

        if (hasDefaultExport) {
          expect(mainIndexFile).to.include(`export { default as ${folder} } from './${folder}'`);
        }
        if (hasAll) {
          expect(mainIndexFile).to.include(`export * from './${folder}'`);
        }
      }
    });
  });
});
