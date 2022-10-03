import { expect } from 'chai';
import { getThemeWithVars } from './defaultTheme';

describe('defaultTheme', () => {
  it('the output contains required fields', () => {
    const result = getThemeWithVars();
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
        'palette',
        'shadowRing',
        'shadowChannel',
        'getCssVar',
        'spacing',
        'radius',
        'shadow',
        'typography',
        'variants',
        'variantOverrides',
        'variantOverrideConfig',
        'vars',
        'cssVarPrefix',
      ]).to.includes(field);
    });
  });

  it('the generated palette has correct colorChannel', () => {
    const result = getThemeWithVars({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              mainChannel: '12 12 12',
            },
          },
        },
      },
    });
    expect(result.palette.primary.mainChannel).to.equal('12 12 12');
  });

  it('the generated palette always has mode and color scheme as `light`', () => {
    const result = getThemeWithVars();
    expect(result.palette.mode).to.equal('light');
    expect(result.palette.colorScheme).to.equal('light');
  });
});
