import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './root-ref';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('root-ref', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./root-ref.test/actual.js'),
            path: require.resolve('./root-ref.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./root-ref.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./root-ref.test/expected.js'),
            path: require.resolve('./root-ref.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./root-ref.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      let str = '';
      for (let i = 0; i < 100000; i += 1) {
        str += '<RootRef';
      }
      str += '\u0000';

      it('should complete within 10 seconds1', () => {
        const start = Date.now();
        transform({ source: str });
        const end = Date.now();
        const duration = (end - start) / 1000; // turn to seconds
        expect(duration).to.be.lessThan(10);
      });

      str = '';
      for (let i = 0; i < 100000; i += 1) {
        str += 'import';
      }
      str += '\u0000';

      it('should complete within 10 seconds2', () => {
        const start = Date.now();
        transform({ source: str });
        const end = Date.now();
        const duration = (end - start) / 1000; // turn to seconds
        expect(duration).to.be.lessThan(10);
      });
    });
  });
});
