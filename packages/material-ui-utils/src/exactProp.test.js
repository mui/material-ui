import { expect } from 'chai';
import exactProp, { specialProperty } from './exactProp';

describe('exactProp()', () => {
  let exactPropTypes;

  before(() => {
    exactPropTypes = exactProp({
      bar: {},
    });
  });

  it('should have the right shape', () => {
    expect(typeof exactProp).to.equal('function');
    expect(typeof exactPropTypes).to.equal('object');
  });

  describe('exactPropTypes', () => {
    it('should return null for supported props', () => {
      const props = {
        bar: false,
      };
      const result = exactPropTypes[specialProperty](props);
      expect(result).to.equal(null);
    });

    it('should return an error for unsupported props', () => {
      const props = {
        foo: true,
      };
      const result = exactPropTypes[specialProperty](props);
      expect(result.message).to.match(
        /The following props are not supported: `foo`. Please remove them/,
      );
    });
  });
});
