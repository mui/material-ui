/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import glob from 'fast-glob';
import fs from 'fs';
import * as MaterialUI from './index';

describe('@mui/base', () => {
  it('should have exports', () => {
    expect(typeof MaterialUI).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(MaterialUI).forEach((exportKey) =>
      expect(Boolean(MaterialUI[exportKey])).to.equal(true),
    );
  });
  it('should contain all exports from sub folders', async () => {
    const files = await glob('packages/mui-base/src/*/index.{ts,js}');
    const muiBaseIndexFile = fs.readFileSync('packages/mui-base/src/index.js', 'utf-8');
    files.forEach((file) => {
      const content = fs.readFileSync(file, 'utf-8');
      const hasDefaultExport = /export { default }/.test(content);
      const hasNamedExport = /export \* from /.test(content);
      const [, , , folder] = file.split('/');

      if (hasDefaultExport) {
        const line = `export { default as ${folder} } from './${folder}'`;
        expect(muiBaseIndexFile).to.include(line, `${line} is missing from index file`);
      }
      if (hasNamedExport) {
        const line = `export * from './${folder}'`;
        expect(muiBaseIndexFile).to.include(line, `${line} is missing from index file`);
      }
    });
  });
});
