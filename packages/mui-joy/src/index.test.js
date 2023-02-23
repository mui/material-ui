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

  it('should contain all exports from sub folders', async () => {
    const files = await glob('packages/mui-joy/src/*/index.{ts,js}');
    const muiJoyIndexFile = fs.readFileSync('packages/mui-joy/src/index.ts', 'utf-8');

    files.forEach((file) => {
      const content = fs.readFileSync(file, 'utf-8');

      const [, , , folder] = file.split('/');

      const hasDefaultExport =
        new RegExp(`export { default } from './${folder}'`).test(content) ||
        /^export { \b\w+\b as default } from/.test(content) ||
        new RegExp(`export default ${folder}`).test(content);

      const hasNamedExport =
        /export \* from /.test(content) ||
        /export { default as /.test(content) ||
        /export { (?!default\b)\w+\b } from/.test(content) ||
        /export {\n {2}default as /.test(content) ||
        /export type {/.test(content);

      const exportStatement = /export { default as \b\w+\b } /;
      const filePath = new RegExp(`from './${folder}'`);
      const defaultExportStatement = new RegExp(`${exportStatement.source}${filePath.source}`);

      if (hasDefaultExport) {
        expect(muiJoyIndexFile).to.match(
          defaultExportStatement,
          `default export for file ${folder} is missing`,
        );
      } else {
        expect(muiJoyIndexFile).to.not.match(
          defaultExportStatement,
          `Invalid export statement is found for ${folder} file in index file`,
        );
      }
      const namedExportStatement = `export * from './${folder}'`;
      if (hasNamedExport) {
        expect(muiJoyIndexFile).to.include(
          namedExportStatement,
          `${namedExportStatement} is missing from index file`,
        );
      } else {
        expect(muiJoyIndexFile).to.not.include(
          namedExportStatement,
          `Invalid named export is found for ${folder} in index file`,
        );
      }
    });
  });
});
