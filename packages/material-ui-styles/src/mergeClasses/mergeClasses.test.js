import { expect } from 'chai';
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
    expect(output).to.deep.equal({
      root: 'foo bar',
    });
  });
});
