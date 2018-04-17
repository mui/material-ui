// @flow

import { assert } from 'chai';
import exactProp, { specialProperty } from './exactProp';

describe('exactProp()', () => {
  const componentNameInError = 'componentNameInError';
  let exactPropTypes;

  before(() => {
    exactPropTypes = exactProp(
      {
        bar: {},
      },
      componentNameInError,
    );
  });

  it('should have the right shape', () => {
    assert.strictEqual(typeof exactProp, 'function', 'should be a function');
    assert.strictEqual(typeof exactPropTypes, 'object', 'should be a function');
  });

  describe('exactPropTypes', () => {
    let props;

    it('should return null for supported properties', () => {
      props = {
        bar: false,
      };
      const result = exactPropTypes[specialProperty](props);
      assert.strictEqual(result, null);
    });

    it('should return an error for unknown properties', () => {
      props = {
        foo: true,
      };
      const result = exactPropTypes[specialProperty](props);
      assert.match(result.message, /componentNameInError: unknown props found: foo/);
    });
  });
});
