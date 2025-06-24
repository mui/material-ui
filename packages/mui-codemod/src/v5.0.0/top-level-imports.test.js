import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './top-level-imports';
import readFile from '../util/readFile';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('top-level-imports', () => {
      it('convert path as needed', () => {
        const actual = transform(
          {
            source: read('./top-level-imports.test/actual.js'),
            path: require.resolve('./top-level-imports.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./top-level-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./top-level-imports.test/expected.js'),
            path: require.resolve('./top-level-imports.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./top-level-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });

      it('should preserve color imports and styles imports', () => {
        const input = read('./top-level-imports.test/actual.js');
        const expected = read('./top-level-imports.test/expected.js');
        const actual = transform({ source: input, path: 'test.js' }, { jscodeshift }, {});
        expect(trim(actual)).to.equal(
          trim(expected),
          'Color imports and styles imports should be preserved',
        );
      });

      it('should not transform individual color imports', () => {
        const input = read('./top-level-imports.test/actual.js');
        const expected = read('./top-level-imports.test/expected.js');
        const actual = transform({ source: input, path: 'test.js' }, { jscodeshift }, {});
        expect(trim(actual)).to.equal(
          trim(expected),
          'Individual color imports should not be transformed',
        );
      });
    });
  });
});
