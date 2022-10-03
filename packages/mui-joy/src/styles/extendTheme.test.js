import { expect } from 'chai';
import extendTheme from './extendTheme';

describe('extendTheme', () => {
  it('the output contains required fields', () => {
    const result = extendTheme();
    Object.keys(result).forEach((field) => {
      expect([
        'breakpoints',
        'components',
        'colorSchemes',
        'focus',
        'fontSize',
        'fontFamily',
        'fontWeight',
        'letterSpacing',
        'lineHeight',
        'getCssVar',
        'spacing',
        'radius',
        'shadow',
        'typography',
        'variantInversionConfig',
        'variants',
        'cssVarPrefix',
      ]).to.includes(field);
    });
  });

  it('should have joy default css var prefix', () => {
    const theme = extendTheme();
    expect(theme.cssVarPrefix).to.equal('joy');
    expect(theme.typography.body1.fontSize).to.equal('var(--joy-fontSize-md)');
  });

  it('should have custom css var prefix', () => {
    const theme = extendTheme({ cssVarPrefix: 'foo' });
    expect(theme.cssVarPrefix).to.equal('foo');
    expect(theme.typography.body1.fontSize).to.equal('var(--foo-fontSize-md)');
  });

  it('should have no css var prefix', () => {
    const theme = extendTheme({ cssVarPrefix: '' });
    expect(theme.cssVarPrefix).to.equal('');
    expect(theme.typography.body1.fontSize).to.equal('var(--fontSize-md)');
  });
});
