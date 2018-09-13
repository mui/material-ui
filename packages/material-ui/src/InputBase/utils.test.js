import { assert } from 'chai';
import { hasValue, isFilled } from './utils';

describe('Input/utils.js', () => {
  describe('hasValue', () => {
    ['', 0].forEach(value => {
      it(`is true for ${value}`, () => {
        assert.strictEqual(hasValue(value), true);
      });
    });

    [null, undefined].forEach(value => {
      it(`is false for ${value}`, () => {
        assert.strictEqual(hasValue(value), false);
      });
    });
  });

  describe('isFilled', () => {
    [' ', 0].forEach(value => {
      it(`is true for value ${value}`, () => {
        assert.strictEqual(isFilled({ value }), true);
      });

      it(`is true for SSR defaultValue ${value}`, () => {
        assert.strictEqual(isFilled({ defaultValue: value }, true), true);
      });
    });
    [null, undefined, ''].forEach(value => {
      it(`is false for value ${value}`, () => {
        assert.strictEqual(isFilled({ value }), false);
      });

      it(`is false for SSR defaultValue ${value}`, () => {
        assert.strictEqual(isFilled({ defaultValue: value }, true), false);
      });
    });
  });
});
