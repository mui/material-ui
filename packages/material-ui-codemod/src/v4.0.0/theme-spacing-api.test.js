import fs from 'fs';
import path from 'path';
import { EOL } from 'os';
import { assert } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './theme-spacing-api';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '').replace(/\r*\n/g, EOL);
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v4.0.0', () => {
    describe('theme-spacing', () => {
      it('update theme spacing API', () => {
        const actual = transform(
          { source: read('./theme-spacing-api.test/actual.js') },
          { jscodeshift },
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
