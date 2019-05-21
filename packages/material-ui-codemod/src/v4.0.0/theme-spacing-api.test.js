import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './theme-spacing-api';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('theme-spacing', () => {
      it('update theme spacing API', () => {
        const actual = transform(
          { source: read('./theme-spacing-api.test/actual.js') },
          { jscodeshift: jscodeshift },
        );

        const expected = read('./theme-spacing-api.test/expected.js');

        assert.strictEqual(
          trim(actual),
          trim(expected),
          'The transformed version should be correct',
        );
      });
    });
  });
});
