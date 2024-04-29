import path from 'path';
import { expect } from 'chai';
import { jscodeshift } from '../../../testUtils';
import transform from './theme-style-overrides';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v6.0.0', () => {
    describe('basic theme-style-overrides', () => {
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
  });
});
