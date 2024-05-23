/* eslint-env mocha */
import j from 'jscodeshift';
import path from 'path';
import { expect } from 'chai';
import readFile from '../src/util/readFile';

export const jscodeshift = j.withParser('tsx');

function read(dirname, fileName) {
  return readFile(path.join(dirname, fileName));
}

export function describeJscodeshiftTransform({ transformName, transform, testCases, dirname }) {
  describe(transformName, () => {
    testCases.forEach((testCase) => {
      it('transforms as needed', () => {
        const actual = transform({ source: read(dirname, testCase.actual) }, { jscodeshift }, {});

        const expected = read(dirname, testCase.expected);
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform({ source: read(dirname, testCase.expected) }, { jscodeshift }, {});

        const expected = read(dirname, testCase.expected);
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
}
