/* eslint-env mocha */
import { assert } from 'chai';
import hashObject from './hashObject';

describe('utils/hashObject.js', () => {
  it('should create a unique, deterministic hash', () => {
    const hashes = Array(10);

    const compareA = hashObject({ foo: 'bar', woof: 'meow' });
    const compareB = hashObject({ foo: 'buzz', woof: 'roar' });
    const compareC = hashObject({ what: 'is', your: 'name' });

    assert.strictEqual(compareA !== compareB, true);
    assert.strictEqual(compareA !== compareC, true);
    assert.strictEqual(compareB !== compareC, true);

    const testA = hashes.map(() => hashObject({ foo: 'bar', woof: 'meow' }));
    testA.forEach((hash, i) => {
      if (i > 0) {
        assert.strictEqual(hash, compareA);
      }
    });

    const testB = hashes.map(() => hashObject({ foo: 'bar', woof: 'meow' }));
    testB.forEach((hash, i) => {
      if (i > 0) {
        assert.strictEqual(hash, compareB);
      }
    });

    const testC = hashes.map(() => hashObject({ foo: 'bar', woof: 'meow' }));
    testC.forEach((hash, i) => {
      if (i > 0) {
        assert.strictEqual(hash, compareC);
      }
    });
  });
});
