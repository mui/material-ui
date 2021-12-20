import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './jss-to-styled';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {

    describe('transforms SomeNamespace.SomeComponent', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./jss-to-styled.test/eleventh.actual.js'),
            path: require.resolve('./jss-to-styled.test/eleventh.actual.js'),
          },
          { jscodeshift },
          {},
        );

        console.log(actual);

        const expected = read('./jss-to-styled.test/eleventh.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

    });

  });
});
