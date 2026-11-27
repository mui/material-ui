import { describe, it, expect, vi } from 'vitest';
import memoize from './memoize';

describe('memoize', () => {
  it('memoizes keys that collide with Object.prototype', () => {
    const fn = vi.fn((key: string) => `result:${key}`);
    const memoized = memoize(fn);

    expect(memoized('toString')).to.equal('result:toString');
    expect(memoized('__proto__')).to.equal('result:__proto__');
    expect(memoized('toString')).to.equal('result:toString');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
