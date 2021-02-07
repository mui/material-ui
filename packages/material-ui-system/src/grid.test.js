import { expect } from 'chai';
import grid from './grid';

describe('grid', () => {
  it('should work', () => {
    const output = grid({
      theme: {},
      gap: 1,
    });
    expect(output).to.deep.equal({
      gap: 8,
    });
  });
});
