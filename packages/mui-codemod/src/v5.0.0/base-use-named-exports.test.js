import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './base-use-named-exports';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('base-use-named-exports', () => {
      it('transforms exports as needed', () => {
        const actual = transform(
          {
            source: read('./base-use-named-exports.test/actual.js'),
            path: require.resolve('./base-use-named-exports.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./base-use-named-exports.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./base-use-named-exports.test/expected.js'),
            path: require.resolve('./base-use-named-exports.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./base-use-named-exports.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
