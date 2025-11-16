import path from 'path';
import { expect } from 'chai';
import { jscodeshift } from '../../../testUtils';
import jsTransform from './index';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('speed-dial-classes', () => {
      describe('js-transform', () => {
        it('transforms classes as needed', () => {
          const actual = jsTransform(
            { source: read('./test-cases/actual.js') },
            { jscodeshift },
            { printOptions: { quote: 'single', trailingComma: true } },
          );

          const expected = read('./test-cases/expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', () => {
          const actual = jsTransform(
            { source: read('./test-cases/expected.js') },
            { jscodeshift },
            {},
          );

          const expected = read('./test-cases/expected.js');
          expect(actual).to.equal(expected, 'The transformed version should be correct');
        });
      });
    });
  });
});
