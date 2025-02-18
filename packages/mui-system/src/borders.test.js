import { expect } from 'chai';
import borders from './borders';

describe('borders', () => {
  it('should work', () => {
    const output = borders({
      border: 1,
      borderRadius: 1,
      outline: 1,
    });
    expect(output).to.deep.equal({
      border: '1px solid',
      borderRadius: 4,
      outline: '1px solid',
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
