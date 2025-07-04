import path from 'path';
import { expect } from 'chai';
import { jscodeshift } from '../../../testUtils';
import transform from './autocomplete-props';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('autocomplete-props', () => {
      it('transforms props as needed', () => {
        const actual = transform({ source: read('./test-cases/actual.js') }, { jscodeshift }, {});

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform({ source: read('./test-cases/expected.js') }, { jscodeshift }, {});

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('[theme] autocomplete-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/theme.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/theme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/theme.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/theme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('[package] autocomplete-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/package.actual.js') },
          { jscodeshift },
          { packageName: '@org/ui/material' },
        );

        const expected = read('./test-cases/package.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/package.expected.js') },
          { jscodeshift },
          { packageName: '@org/ui/material' },
        );

        const expected = read('./test-cases/package.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
