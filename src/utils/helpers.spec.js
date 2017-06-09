// @flow

import { assert } from 'chai';
import { capitalizeFirstLetter, contains, find } from './helpers';

describe('utils/helpers.js', () => {
  describe('capitalizeFirstLetter', () => {
    it('should work', () => {
      assert.strictEqual(capitalizeFirstLetter('foo'), 'Foo');
    });
  });

  describe('find(arr, pred)', () => {
    it('should search for an item in an array containing the predicate', () => {
      const array = ['woof', 'meow', { foo: 'bar' }, { woof: 'meow' }];
      assert.strictEqual(find(array, 'lol'), undefined, 'should work for primitives');
      assert.strictEqual(find(array, 'woof'), array[0], 'should work for primitives');
      assert.strictEqual(find(array, { foo: 'bar' }), array[2], 'should work for objects');
      assert.strictEqual(
        find(array, n => n && n.woof === 'meow'),
        array[3],
        'should work for functions',
      );
    });
  });

  describe('contains(obj, pred)', () => {
    it('should check if an object contains the partial object', () => {
      const obj = {
        woof: 'meow',
        cat: 'dog',
      };
      const pred = { cat: 'dog' };
      const failPred = { cat: 'meow' };
      assert.strictEqual(contains(obj, pred), true);
      assert.strictEqual(contains(obj, failPred), false);
    });
  });
});
