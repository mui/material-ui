import { assert } from 'chai';
import { capitalize, contains } from './helpers';

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
