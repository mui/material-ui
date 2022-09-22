import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './date-pickers-moved-to-locale';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('date-pickers-moved-to-locale', () => {
      it('transforms expression props as needed', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-locale.test/actual-expression-values.js'),
            path: require.resolve(
              './date-pickers-moved-to-locale.test/actual-expression-values.js',
            ),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-locale.test/expected-expression-values.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent for expression', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-locale.test/expected-expression-values.js'),
            path: require.resolve(
              './date-pickers-moved-to-locale.test/expected-expression-values.js',
            ),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-locale.test/expected-expression-values.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms string props as needed', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-locale.test/actual-string-values.js'),
            path: require.resolve('./date-pickers-moved-to-locale.test/actual-string-values.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-locale.test/expected-string-values.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent for string', () => {
        const actual = transform(
          {
            source: read('./date-pickers-moved-to-locale.test/expected-string-values.js'),
            path: require.resolve('./date-pickers-moved-to-locale.test/expected-string-values.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./date-pickers-moved-to-locale.test/expected-string-values.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
