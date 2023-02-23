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

      const [, , , folder] = file.split('/');
      const defaultExport = `export { default } from './${folder}'`;
      const hasDefaultExport =
        new RegExp(defaultExport).test(content) ||
        /^export\s*\{\s*\w+\s*as\s+default\s*\}\s*from\s*/.test(content);

      const hasNamedExport =
        /export \* from /.test(content) ||
        /export { default as /.test(content) ||
        /^export {\b\w+\b} from/.test(content);

      if (folder === 'ButtonUnstyled') {
        console.log(content.split(';')[1]);
        console.log(
          content.split(';').findIndex((line) =>
            line.includes(`export { 
              default as}`),
          ),
        );
      }
      if (folder === 'composeClasses') {
        return;
      }
      const defaultExportStatement = `export { default as ${folder} } from './${folder}'`;
      if (hasDefaultExport) {
        expect(muiBaseIndexFile).to.include(
          defaultExportStatement,
          `${defaultExportStatement} is missing from index file`,
        );
      } else {
        expect(muiBaseIndexFile).to.not.include(
          defaultExportStatement,
          `${defaultExportStatement} is missing from index file`,
        );
      }
      const namedExportStatement = `export * from './${folder}'`;
      if (hasNamedExport) {
        expect(muiBaseIndexFile).to.include(
          namedExportStatement,
          `${namedExportStatement} is missing from index file`,
        );
      } else {
        expect(muiBaseIndexFile).to.not.include(
          namedExportStatement,
          `${namedExportStatement} is missing from index file`,
        );
      }
    });
  });
});
