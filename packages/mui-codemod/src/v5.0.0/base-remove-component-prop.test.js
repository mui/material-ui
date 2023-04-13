import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './base-remove-component-prop';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('base-remove-component-prop', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./base-remove-component-prop.test/actual.tsx'),
            path: require.resolve('./base-remove-component-prop.test/actual.tsx'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./base-remove-component-prop.test/expected.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
