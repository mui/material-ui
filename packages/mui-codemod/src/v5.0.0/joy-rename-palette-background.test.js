import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './joy-rename-palette-background';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('joy-rename-palette-background', () => {
      it('transforms classname prefix from Joy to Mui', () => {
        const actual = transform(
          {
            source: read('./joy-rename-palette-background.test/actual.js'),
            path: require.resolve('./joy-rename-palette-background.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./joy-rename-palette-background.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
