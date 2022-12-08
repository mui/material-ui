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

  it('should allow newClasses to be partial', () => {
    const output = mergeClasses({
      baseClasses: {
        root: 'foo',
        child: 'baz',
      },
      newClasses: {
        root: 'bar',
      },
    });
    expect(output).to.deep.equal({
      root: 'foo bar',
      child: 'baz',
    });
  });

  it('should allow newClasses to be optional', () => {
    const baseClasses = {
      root: 'foo',
    };
    expect(mergeClasses({ baseClasses })).to.equal(baseClasses);
    expect(mergeClasses({ baseClasses, newClasses: null })).to.equal(baseClasses);
  });
});
