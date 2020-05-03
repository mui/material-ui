import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './svg-icon-imports';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

function read(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), 'utf8').toString();
}

describe('@material-ui/codemod', () => {
  describe('v1.0.0', () => {
    describe('svg-icon-imports', () => {
      it('update svg-icon imports', () => {
        const actual = transform(
          { source: read('./svg-icon-imports.test/actual.js') },
          { jscodeshift: jscodeshift },
        );

        const expected = read('./svg-icon-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
