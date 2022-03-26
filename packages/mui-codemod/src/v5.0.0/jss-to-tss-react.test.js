import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './jss-to-tss-react';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('jss-to-tss-react', () => {
      it('transforms @material-ui/core/styles makeStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-from-material-ui-core-styles.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-from-material-ui-core-styles.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-material-ui-core-styles.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/expected-from-material-ui-core-styles.js'),
            path: require.resolve(
              './jss-to-tss-react.test/expected-from-material-ui-core-styles.js',
            ),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-material-ui-core-styles.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
      it('transforms @material-ui/core makeStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-from-material-ui-core.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-from-material-ui-core.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-material-ui-core.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
      it('transforms @mui/styles makeStyles to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-from-mui-styles.js'),
            path: require.resolve('./jss-to-tss-react.test/actual-from-mui-styles.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-from-mui-styles.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
      it('transforms typescript makeStyles with nested selectors to use tss-react', () => {
        const actual = transform(
          {
            source: read('./jss-to-tss-react.test/actual-typescript.tsx'),
            path: require.resolve('./jss-to-tss-react.test/actual-typescript.tsx'),
          },
          { jscodeshift: jscodeshift.withParser('tsx') },
          {},
        );

        const expected = read('./jss-to-tss-react.test/expected-typescript.tsx');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
