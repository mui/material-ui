import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './accordion-props';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('accordion-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./test-cases/actual.js'),
            path: require.resolve('./test-cases/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./test-cases/expected.js'),
            path: require.resolve('./test-cases/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
