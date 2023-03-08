import { expect } from 'chai';
import grid from './cssGrid';

describe('grid', () => {
  it('should use the spacing unit', () => {
    const output = grid({
      gap: 1,
    });
    expect(output).to.deep.equal({
      gap: 8,
    });
  });

  it('should accept 0', () => {
    const output = grid({
      gap: 0,
      columnGap: 0,
      rowGap: 0,
    });
    expect(output).to.deep.equal({
      gap: 0,
      columnGap: 0,
      rowGap: 0,
    });
  });

  it('should support breakpoints', () => {
    const output = grid({
      gap: [1, 2],
    });
    expect(output).to.deep.equal({
      '@media (min-width:0px)': {
        gap: 8,
      },
      '@media (min-width:600px)': {
        gap: 16,
      },
    });
  });
});
