import path from 'path';
import { expect } from 'chai';
import { jscodeshift } from '../../../testUtils';
import transform from './step-label-props';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('step-label-props', () => {
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

    describe('[theme] step-label-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/theme.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
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
  });
});
