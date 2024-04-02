import path from 'path';
import { expect } from 'chai';
import { jscodeshift } from '../../../testUtils';
import transform from './styled-v6';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v6.0.0', () => {
    describe('styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/BasicStyled.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/BasicStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/BasicStyled.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/BasicStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('[theme] styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/BasicStyled.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/BasicStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/BasicStyled.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/BasicStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
