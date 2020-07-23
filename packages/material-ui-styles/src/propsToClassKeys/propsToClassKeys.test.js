import { expect } from 'chai';
import propsToClassKeys from './propsToClassKeys';

describe('propsToClassKeys', () => {
  it('should return the variant value as string', () => {
    expect(propsToClassKeys({ variant: 'custom' })).to.equal('custom');
  });

  it('should combine the variant with other props', () => {
    expect(propsToClassKeys({ variant: 'custom', size: 'large' })).to.equal('customSizeLarge');
  });

  it('should append the props after the variant in alphabetical order', () => {
    expect(propsToClassKeys({ variant: 'custom', size: 'large', mode: 'static' })).to.equal(
      'customModeStaticSizeLarge',
    );
  });

  it('should not prefix the color prop', () => {
    expect(propsToClassKeys({ variant: 'custom', color: 'primary' })).to.equal('customPrimary');
  });

  it('should work without variant in props', () => {
    expect(propsToClassKeys({ color: 'primary', size: 'large', mode: 'static' })).to.equal(
      'primaryModeStaticSizeLarge',
    );
  });

  it('should not capitalize the first prop ', () => {
    expect(propsToClassKeys({ size: 'large', zIndex: 'toolbar' })).to.equal(
      'sizeLargeZIndexToolbar',
    );
  });
});
