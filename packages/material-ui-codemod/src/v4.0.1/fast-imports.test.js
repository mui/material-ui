import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './fast-imports';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v4.0.1', () => {
    describe('fast-imports', () => {
      it('convert path as needed', () => {
        const actual = transform(
          { source: read('./fast-imports.test/actual.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./fast-imports.test/expected.js');

        assert.strictEqual(
          trim(actual),
          trim(expected),
          'The transformed version should be correct',
        );
      });

    });
  });
});
