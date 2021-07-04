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
});
