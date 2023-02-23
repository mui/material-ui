import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './base-rename-components-to-slots';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('base-rename-components-to-slots', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./base-rename-components-to-slots.test/actual.js'),
            path: require.resolve('./base-rename-components-to-slots.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./base-rename-components-to-slots.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
