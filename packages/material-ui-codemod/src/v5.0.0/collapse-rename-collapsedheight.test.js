import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './collapse-rename-collapsedheight';

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('collapse-rename-collapsedheight', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./collapse-rename-collapsedheight.test/actual.js'),
            path: require.resolve('./collapse-rename-collapsedheight.test/actual.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./collapse-rename-collapsedheight.test/expected.js');
        expect(actual.replace(/\r\n/g, '\n')).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./collapse-rename-collapsedheight.test/expected.js'),
            path: require.resolve('./collapse-rename-collapsedheight.test/expected.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./collapse-rename-collapsedheight.test/expected.js');
        expect(actual.replace(/\r\n/g, '\n')).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
