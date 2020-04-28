import { expect } from 'chai';
import unsupportedProp from './unsupportedProp';

describe('unsupportedProp', () => {
  const propName = 'children';
  const componentName = 'ComponentName';
  const location = 'prop';
  const propFullName = null;

  it('should return null for supported props', () => {
    const props = {};
    const result = unsupportedProp(props, propName, componentName, location, propFullName);
    expect(result).to.equal(null);
  });

  it('should return an error for unsupported props', () => {
    const props = {
      children: null,
    };
    const result = unsupportedProp(props, propName, componentName, location, propFullName);
    expect(result.message).to.match(/The prop `children` is not supported. Please remove it/);
  });
});
