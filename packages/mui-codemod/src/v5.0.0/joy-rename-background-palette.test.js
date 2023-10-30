import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './joy-rename-background-palette';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('joy-rename-background-palette', () => {
      it('transforms classname prefix from Joy to Mui', () => {
        const actual = transform(
          {
            source: read('./joy-rename-background-palette.test/actual.js'),
            path: require.resolve('./joy-rename-background-palette.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./joy-rename-background-palette.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
