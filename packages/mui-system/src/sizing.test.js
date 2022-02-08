import { expect } from 'chai';
import sizing from './sizing';

describe('sizing', () => {
  it('sizing', () => {
    const output = sizing({
      height: 10,
    });
    expect(output).to.deep.equal({
      height: 10,
    });
  });

  it('should work with 0', () => {
    const output = sizing({
      maxWidth: 0,
    });
    expect(output).to.deep.equal({
      maxWidth: 0,
    });
  });
});
