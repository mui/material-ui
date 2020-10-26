import { expect } from 'chai';
import capitalize from './capitalize';

describe('capitalize', () => {
  it('should work', () => {
    expect(capitalize('foo')).to.equal('Foo');
  });

  it('should throw when not used correctly', () => {
    expect(() => {
      capitalize();
    }).to.throw(/expects a string argument/);
  });
});
