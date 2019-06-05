import { assert } from 'chai';
import mergeClasses from './mergeClasses';

describe('mergeClasses', () => {
  it('should mergeClasses', () => {
    const output = mergeClasses({
      baseClasses: {
        root: 'foo',
      },
      newClasses: {
        root: 'bar',
      },
    });
    assert.deepEqual(output, {
      root: 'foo bar',
    });
  });
});
