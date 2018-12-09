import { assert } from 'chai';
import exactProp, { specialProperty } from './exactProp';

describe('exactProp()', () => {
  let exactPropTypes;

  before(() => {
    exactPropTypes = exactProp({
      bar: {},
    });
  });

  it('should have the right shape', () => {
    assert.strictEqual(typeof exactProp, 'function');
    assert.strictEqual(typeof exactPropTypes, 'object');
  });

  describe('exactPropTypes', () => {
    it('should return null for supported properties', () => {
      const props = {
        bar: false,
      };
      const result = exactPropTypes[specialProperty](props);
      assert.strictEqual(result, null);
    });

    it('should return an error for unsupported properties', () => {
      const props = {
        foo: true,
      };
      const result = exactPropTypes[specialProperty](props);
      assert.match(
        result.message,
        /The following properties are not supported: `foo`. Please remove them/,
      );
    });
  });
});
