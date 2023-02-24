/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import fs from 'fs';
import glob from 'fast-glob';
import { getExports } from '@mui/utils';
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
    const muiJoyIndexFile = fs.readFileSync('packages/mui-joy/src/index.js', 'utf-8');

    files.forEach((file) => {
      const [, , , folder] = file.split('/');

      const exports = getExports(file);

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
        expect(muiJoyIndexFile).to.match(
          defaultExportStatement,
          `default export for file ${folder} is missing`,
        );
      }
      const allExportStatement = `export * from './${folder}'`;
      if (namedExportsCount > 0 || allExportsCount > 0) {
        expect(muiJoyIndexFile).to.include(
          allExportStatement,
          `${allExportStatement} is missing from index file`,
        );
      }
    });
  });
});
