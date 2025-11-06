import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './index';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v7.0.0', () => {
    describe('styles-optimized', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./actual.js'),
            path: require.resolve('./actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./expected.js'),
            path: require.resolve('./expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
