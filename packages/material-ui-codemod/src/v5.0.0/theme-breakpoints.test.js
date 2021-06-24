import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './theme-breakpoints';

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('theme-breakpoints', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./theme-breakpoints.test/actual.js'),
            path: require.resolve('./theme-breakpoints.test/actual.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./theme-breakpoints.test/expected.js');
        expect(actual.replace(/\r\n/g, '\n')).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
