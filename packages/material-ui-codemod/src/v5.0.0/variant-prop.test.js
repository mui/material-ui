import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './variant-prop';

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('variant-prop', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./variant-prop.test/actual.js'),
            path: require.resolve('./variant-prop.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./variant-prop.test/expected.js');
        expect(actual.replace(/\r\n/g, '\n')).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
