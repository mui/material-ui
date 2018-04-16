// @flow

import { assert } from 'chai';
import { capitalize, contains, find } from './helpers';

describe('utils/helpers.js', () => {
  describe('capitalize', () => {
    it('should work', () => {
      assert.strictEqual(capitalize('foo'), 'Foo');
    });

    it('should throw when not used correctly', () => {
      assert.throw(() => {
        capitalize();
      }, /expects a string argument/);
    });
  });

  describe('find(arr, pred)', () => {
    it('should search for an item in an array containing the predicate', () => {
      const array = ['woofHelpers', 'meow', { foo: 'bar' }, { woofHelpers: 'meow' }];
      assert.strictEqual(find(array, 'lol'), undefined, 'should work for primitives');
      assert.strictEqual(find(array, 'woofHelpers'), array[0], 'should work for primitives');
      assert.strictEqual(find(array, { foo: 'bar' }), array[2], 'should work for objects');
      assert.strictEqual(
        find(array, n => n && n.woofHelpers === 'meow'),
        array[3],
        'should work for functions',
      );
    });
  });

  describe('contains(obj, pred)', () => {
    it('should check if an object contains the partial object', () => {
      const obj = { woofHelpers: 'meow', cat: 'dog' };
      const pred = { cat: 'dog' };
      const failPred = { cat: 'meow' };
      assert.strictEqual(contains(obj, pred), true);
      assert.strictEqual(contains(obj, failPred), false);
    });
  });
});
