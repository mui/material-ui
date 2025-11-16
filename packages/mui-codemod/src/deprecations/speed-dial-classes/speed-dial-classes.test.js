import path from 'path';
import { expect } from 'chai';
import postcss from 'postcss';
import { plugin as postcssPlugin } from './postcss-plugin';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

const postcssProcessor = postcss([postcssPlugin]);

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('speed-dial-classes', () => {
      describe('css-transform', () => {
        it('transforms classes as needed', async () => {
          const actual = await postcssProcessor.process(read('./test-cases/actual.css'), {
            from: undefined,
          });

          const expected = read('./test-cases/expected.css');
          expect(actual.css).to.equal(expected, 'The transformed version should be correct');
        });

        it('should be idempotent', async () => {
          const actual = await postcssProcessor.process(read('./test-cases/expected.css'), {
            from: undefined,
          });

          const expected = read('./test-cases/expected.css');
          expect(actual.css).to.equal(expected, 'The transformed version should be correct');
        });
      });

      describe('test-cases', () => {
        it('should not be the same', () => {
          const actualCSS = read('./test-cases/actual.css');
          const expectedCSS = read('./test-cases/expected.css');
          expect(actualCSS).not.to.equal(
            expectedCSS,
            'The actual and expected should be different',
          );
        });
      });
    });
  });
});
