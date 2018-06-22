import { assert } from 'chai';
import unsupportedProp from './unsupportedProp';

describe('unsupportedProp', () => {
  const propName = 'children';
  const componentName = 'ComponentName';
  const location = 'prop';
  const propFullName = null;

  it('should return null for supported properties', () => {
    const props = {};
    const result = unsupportedProp(props, propName, componentName, location, propFullName);
    assert.strictEqual(result, null);
  });

  it('should return an error for unsupported properties', () => {
    const props = {
      children: null,
    };
    const result = unsupportedProp(props, propName, componentName, location, propFullName);
    assert.match(result.message, /The property `children` is not supported. Please remove it/);
  });
});
