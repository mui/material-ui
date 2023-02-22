/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import fs from 'fs';
import glob from 'fast-glob';
import * as joy from './index';

describe('@mui/joy', () => {
  it('should have exports', () => {
    expect(typeof joy).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(joy).forEach((exportKey) =>
      expect(`${exportKey}-${Boolean(joy[exportKey])}`).to.equal(`${exportKey}-true`),
    );
  });

  it('should export all exports from sub folders', async () => {
    const files = await glob('packages/mui-joy/src/*/index.ts');
    const joyUIIndexFile = fs.readFileSync('packages/mui-joy/src/index.ts', 'utf-8');

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const hasDefaultExport = /export { default }/.test(content);
      const hasNamedExport = /export \* from /.test(content);
      const [, , , folder] = file.split('/');

      if (hasDefaultExport) {
        expect(joyUIIndexFile).to.include(`export { default as ${folder} } from './${folder}'`);
      }
      if (hasNamedExport) {
        expect(joyUIIndexFile).to.include(`export * from './${folder}'`);
      }
    }
  });
});
