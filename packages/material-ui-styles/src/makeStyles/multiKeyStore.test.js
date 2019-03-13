import { assert } from 'chai';
import multiKeyStore from './multiKeyStore';

describe('multiKeyStore', () => {
  it('should work as expected', () => {
    const cache = new Map();
    const key1 = {};
    const key2 = {};
    assert.strictEqual(multiKeyStore.get(cache, key1, key2), undefined);
    multiKeyStore.set(cache, key1, key2, 'foo');
    assert.strictEqual(multiKeyStore.get(cache, key1, key2), 'foo');
    multiKeyStore.delete(cache, key1, key2, 'foo');
    assert.strictEqual(multiKeyStore.get(cache, key1, key2), undefined);
  });
});
