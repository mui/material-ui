import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './styled-engine-provider';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('new style-engine-provider import', () => {
      it('import StyleEngineProvider', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/unexists-import.actual.js'),
            path: require.resolve('./styled-engine-provider.test/unexists-import.actual.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/unexists-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/unexists-import.expected.js'),
            path: require.resolve('./styled-engine-provider.test/unexists-import.expected.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/unexists-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('append style-engine-provider import', () => {
      it('append StyleEngineProvider to core/styles', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/exists-import.actual.js'),
            path: require.resolve('./styled-engine-provider.test/exists-import.actual.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/exists-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/exists-import.expected.js'),
            path: require.resolve('./styled-engine-provider.test/exists-import.expected.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/exists-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('[const declaration] render style-engine-provider as first child', () => {
      it('append StyleEngineProvider to core/styles', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/const-first-child-render.actual.js'),
            path: require.resolve(
              './styled-engine-provider.test/const-first-child-render.actual.js',
            ),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/const-first-child-render.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/const-first-child-render.expected.js'),
            path: require.resolve(
              './styled-engine-provider.test/const-first-child-render.expected.js',
            ),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/const-first-child-render.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('[fn declaration] render style-engine-provider as first child', () => {
      it.only('append StyleEngineProvider to core/styles', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/fn-first-child-render.actual.js'),
            path: require.resolve('./styled-engine-provider.test/fn-first-child-render.actual.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/fn-first-child-render.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./styled-engine-provider.test/fn-first-child-render.expected.js'),
            path: require.resolve(
              './styled-engine-provider.test/fn-first-child-render.expected.js',
            ),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./styled-engine-provider.test/fn-first-child-render.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
