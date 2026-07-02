import { expect } from 'chai';
import toPx from './toPx';

describe('toPx', () => {
  it('appends px to a number', () => {
    expect(toPx(2)).to.equal('2px');
    expect(toPx(0)).to.equal('0px');
  });

  it('passes strings through unchanged (already-unit values, CSS vars, calc)', () => {
    expect(toPx('2px')).to.equal('2px');
    expect(toPx('var(--mui-focusVisible-outlineWidth)')).to.equal(
      'var(--mui-focusVisible-outlineWidth)',
    );
    expect(toPx('calc(1px + 1px)')).to.equal('calc(1px + 1px)');
  });
});
