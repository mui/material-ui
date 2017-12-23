import { assert } from 'chai';
import { isBody } from './isOverflowing';

describe('isOverflowing', () => {
  describe('isBody', () => {
    it('work as expected', () => {
      assert.strictEqual(isBody(document.body), true);
      assert.strictEqual(isBody(document.createElement('div')), false);
    });
  });
});
