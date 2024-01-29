import path from 'path';
import { expect } from 'chai';
import { jscodeshift } from '../../../testUtils';
import transform from './mui-utils-import';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('mui-utils-import', () => {
      describe('utils', () => {
        it('transforms props as needed', () => {
          const actual = transform(
            { source: read('./test-cases/utils.actual.js') },
            { jscodeshift },
            {},
          );

          const expected = read('./test-cases/utils.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            { source: read('./test-cases/utils.expected.js') },
            { jscodeshift },
            {},
          );

          const expected = read('./test-cases/utils.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('base', () => {
        it('transforms props as needed', () => {
          const actual = transform(
            { source: read('./test-cases/base.actual.js') },
            { jscodeshift },
            {},
          );

          const expected = read('./test-cases/base.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            { source: read('./test-cases/base.expected.js') },
            { jscodeshift },
            {},
          );

          const expected = read('./test-cases/base.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('system', () => {
        it('transforms props as needed', () => {
          const actual = transform(
            { source: read('./test-cases/system.actual.js') },
            { jscodeshift },
            {},
          );

          const expected = read('./test-cases/system.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            { source: read('./test-cases/system.expected.js') },
            { jscodeshift },
            {},
          );

          const expected = read('./test-cases/system.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });
    });
  });
});
