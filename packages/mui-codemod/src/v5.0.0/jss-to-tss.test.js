import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './jss-to-tss';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('jss-to-tss', () => {
      it('falls back to the filename for naming', () => {

        const actual = transform(
          {
            source: read('./jss-to-tss.test/eleventh.actual.js'),
            path: require.resolve('./jss-to-styled.test/eleventh.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss.test/eleventh.expected.js');

        /*
        const actual = transform(
          {
            source: read('./jss-to-tss.test/multipleWithStyles.actual.js'),
            path: require.resolve('./jss-to-styled.test/multipleWithStyles.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss.test/multipleWithStyles.expected.js');
        */
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
