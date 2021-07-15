import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './drop-jss-styles';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('drop-jss-styles', () => {
      describe('first', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./drop-jss-styles.test/first.actual.js'),
              path: require.resolve('./drop-jss-styles.test/first.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./drop-jss-styles.test/first.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./drop-jss-styles.test/first.expected.js'),
              path: require.resolve('./drop-jss-styles.test/first.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./drop-jss-styles.test/first.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('second', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./drop-jss-styles.test/second.actual.js'),
              path: require.resolve('./drop-jss-styles.test/second.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./drop-jss-styles.test/second.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./drop-jss-styles.test/second.expected.js'),
              path: require.resolve('./drop-jss-styles.test/second.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./drop-jss-styles.test/second.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('third', () => {
        it('transforms as needed', () => {
          const actual = transform(
            {
              source: read('./drop-jss-styles.test/third.actual.js'),
              path: require.resolve('./drop-jss-styles.test/third.actual.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./drop-jss-styles.test/third.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = transform(
            {
              source: read('./drop-jss-styles.test/third.expected.js'),
              path: require.resolve('./drop-jss-styles.test/third.expected.js'),
            },
            { jscodeshift: jscodeshift },
            {},
          );

          const expected = read('./drop-jss-styles.test/third.expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });
    });
  });
});
