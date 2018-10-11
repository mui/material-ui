import { assert } from 'chai';
import PropTypes from 'prop-types';
import chainPropType from './chainPropType';

describe('chainPropType', () => {
  const props = {};
  const propName = 'children';
  const componentName = 'ComponentName';
  const location = 'prop';
  const propFullName = null;

  it('should have the right shape', () => {
    assert.strictEqual(typeof chainPropType, 'function');
  });

  it('should return null for supported properties', () => {
    const result = chainPropType(PropTypes.string, () => null)(
      props,
      propName,
      componentName,
      location,
      propFullName,
    );
    assert.strictEqual(result, null);
  });

  it('should return an error for unsupported properties', () => {
    const result = chainPropType(PropTypes.string, () => new Error('something is wrong'))(
      props,
      propName,
      componentName,
      location,
      propFullName,
    );
    assert.match(result.message, /something is wrong/);
  });
});
