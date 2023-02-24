/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import glob from 'fast-glob';
import fs from 'fs';
import { getExports } from '@mui/utils';
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

    files.forEach((fileName) => {
      const [, , , folder] = fileName.split('/');

      const exports = getExports(fs.readFileSync(fileName, 'utf-8'), fileName);

      const allExportsCount = exports.all.length;
      let namedExportsCount = exports.named.length;
      let defaultExportsCount = exports.default.length;

      exports.named.forEach((namedExport) => {
        const defaultIndex = namedExport
          .get('specifiers')
          // exports such as "export { default } from './Tooltip';" is also considered as default export
          .findIndex((specifier) => specifier.get('exported').node.name === 'default');
        if (defaultIndex > -1) {
          defaultExportsCount += 1;
          namedExportsCount -= 1;
        }
      });

      // below regex is to support exports like "export { default as unstable_composeClasses } from './composeClasses';"
      const exportStatement = /export { default as \b\w+\b } /;
      const filePath = new RegExp(`from './${folder}'`);
      const defaultExportStatement = new RegExp(`${exportStatement.source}${filePath.source}`);

      if (defaultExportsCount > 0) {
        expect(muiBaseIndexFile).to.match(
          defaultExportStatement,
          `default export for file ${folder} is missing`,
        );
      }
      const allExportStatement = `export * from './${folder}'`;
      if (namedExportsCount > 0 || allExportsCount > 0) {
        expect(muiBaseIndexFile).to.include(
          allExportStatement,
          `${allExportStatement} is missing from index file`,
        );
      }
    });
  });
});
