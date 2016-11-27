/* eslint-env mocha */
import {assert} from 'chai';
import * as Utils from './menuUtils';

describe('Menu Utils', () => {
  describe('HotKeyHolder', () => {
    let hotKeyHolder;
    beforeEach(() => {
      hotKeyHolder = new Utils.HotKeyHolder();
    });
    afterEach(() => {
      hotKeyHolder = null;
    });
    it('returns the key appended', () => {
      assert.strictEqual(hotKeyHolder.append('k'), 'k');
    });
    it('holds keys within 500ms and dispose these afterwards', () => {
      hotKeyHolder.append('k');
      return timeout(100)
        .then(() => {
          assert.strictEqual(hotKeyHolder.append('o'), 'ko');
          assert.strictEqual(hotKeyHolder.append('k'), 'kok');
          assert.strictEqual(hotKeyHolder.append('o'), 'koko');
          assert.strictEqual(hotKeyHolder.append('s'), 'kokos');
        })
        .then(() => timeout(400))
        .then(() => {
          assert.strictEqual(hotKeyHolder.append('a'), 'kokosa');
          assert.strictEqual(hotKeyHolder.append('k'), 'kokosak');
          assert.strictEqual(hotKeyHolder.append('e'), 'kokosake');
        })
        .then(() => timeout(600))
        .then(() => {
          assert.isNull(hotKeyHolder.lastKeys);
          assert.strictEqual(hotKeyHolder.append('k'), 'k');
        });
    });
    function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  });
});
