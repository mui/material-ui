import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './temp';
import readFile from '../util/readFile';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('temp', () => {
  it('convert path as needed', () => {
    const actual = transform(
      {
        source: read('./temp.actual.js'),
        path: require.resolve('./temp.actual.js'),
      },
      { jscodeshift },
      {},
    );

    const expected = read('./temp.expected.js');
    expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
  });

  it('should be idempotent', () => {
    const actual = transform(
      {
        source: read('./temp.expected.js'),
        path: require.resolve('./temp.expected.js'),
      },
      { jscodeshift },
      {},
    );

    const expected = read('./temp.expected.js');
    expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
  });
});
