import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './utils-imports';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('utils-imports', () => {
      it('convert path as needed', () => {
        const actual = transform(
          { source: read('./utils-imports.test/actual.js'), path: require.resolve('./utils-imports.test/actual.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./utils-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./utils-imports.test/expected.js'), path: require.resolve('./utils-imports.test/expected.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./utils-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
