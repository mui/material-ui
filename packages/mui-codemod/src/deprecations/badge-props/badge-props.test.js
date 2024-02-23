import path from 'path';
import { expect } from 'chai';
import transformer from './badge-props';
import { jscodeshift } from '../../../testUtils';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('badge-props', () => {
      it('transforms props as needed', () => {
        const actual = transformer({ source: read('./test-cases/actual.js') }, { jscodeshift }, {});
        const expected = read('./test-cases/excepted.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
      it('should be idempotent', () => {
        const actual = transformer({ source: read('./test-cases/actual.js') }, { jscodeshift }, {});
        const excepted = read('./test-cases/excepted.js');
        expect(actual).to.equal(excepted, 'The transformed version should be correct');
      });
    });
  });
});
