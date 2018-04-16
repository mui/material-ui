import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './color-imports';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v1.0.0', () => {
    describe('color-imports', () => {
      it('update color module imports', () => {
        const actual = transform(
          { source: read('./color-imports.test/actual.js') },
          { jscodeshift: jscodeshift },
        );

        const expected = read('./color-imports.test/expected.js');

        assert.strictEqual(
          trim(actual),
          trim(expected),
          'The transformed version should be correct',
        );
      });
    });
  });
});
