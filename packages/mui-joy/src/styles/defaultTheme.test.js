import { expect } from 'chai';
import defaultTheme from './defaultTheme';

describe('defaultTheme', () => {
  it('the output contains required fields', () => {
    Object.keys(defaultTheme).forEach((field) => {
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
        'zIndex',
        'typography',
        'variants',
        'colorInversion',
        'colorInversionConfig',
        'vars',
        'cssVarPrefix',
        'getColorSchemeSelector',
        'unstable_sxConfig',
        'unstable_sx',
        'shouldSkipGeneratingVar',
        'generateCssVars',
      ]).to.includes(field);
    });
  });

  it('the generated palette always has mode and color scheme as `light`', () => {
    expect(defaultTheme.palette.mode).to.equal('light');
    expect(defaultTheme.palette.colorScheme).to.equal('light');
  });
});
