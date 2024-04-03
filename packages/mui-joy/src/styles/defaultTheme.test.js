import { expect } from 'chai';
import defaultTheme from './defaultTheme';

describe('defaultTheme', () => {
  it('the output contains required fields', () => {
    Object.keys(defaultTheme).forEach((field) => {
      expect([
        'attribute',
        'colorSchemeSelector',
        'defaultColorScheme',
        'breakpoints',
        'cq',
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
        'shadowOpacity',
        'getCssVar',
        'spacing',
        'radius',
        'shadow',
        'zIndex',
        'typography',
        'variants',
        'vars',
        'cssVarPrefix',
        'getColorSchemeSelector',
        'unstable_sxConfig',
        'unstable_sx',
        'shouldSkipGeneratingVar',
        'generateStyleSheets',
        'generateThemeVars',
        'generateSpacing',
        'applyStyles',
      ]).to.includes(field);
    });
  });

  it('the generated palette always has mode and color scheme as `light`', () => {
    expect(defaultTheme.palette.mode).to.equal('light');
    expect(defaultTheme.palette.colorScheme).to.equal('light');
  });

  it('has `cq` in the theme', () => {
    expect(defaultTheme.cq('sidebar').up('sm')).to.equal('@container sidebar (min-width:600px)');
    expect(defaultTheme.cq.up(300)).to.equal('@container (min-width:300px)');
  });
});
