import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './jss-to-tss-react';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('jss-to-tss-react', () => {
      it('transforms makeStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual.js'),
            path: require.resolve('./jss-to-tss-react.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/expected.js'),
            path: require.resolve('./jss-to-tss-react.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
