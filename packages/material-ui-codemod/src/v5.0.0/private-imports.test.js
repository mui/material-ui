import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './private-imports';
import readFile from '../util/readFile';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('private-imports', () => {
      it('convert path as needed', () => {
        const actual = transform(
          { source: read('./private-imports.test/actual.js'), path: require.resolve('./private-imports.test/actual.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./private-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./private-imports.test/expected.js'), path: require.resolve('./private-imports.test/expected.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./private-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
