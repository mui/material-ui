import { expect } from 'chai';
import borders from './borders';

describe('borders', () => {
  it('should work', () => {
    const output = borders({
      borderRadius: 1,
    });
    expect(output).to.deep.equal({
      borderRadius: 4,
    });
  });

  it('should work with 0', () => {
    const output = borders({
      borderRadius: 0,
    });
    expect(output).to.deep.equal({
      borderRadius: 0,
    });
  });
});
