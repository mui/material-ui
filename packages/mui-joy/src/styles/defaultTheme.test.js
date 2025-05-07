import { expect } from 'chai';
import defaultTheme from './defaultTheme';

describe('defaultTheme', () => {
  it('the output contains required fields', () => {
    Object.keys(defaultTheme).forEach((field) => {
      expect([
        'colorSchemeSelector',
        'defaultColorScheme',
        'breakpoints',
        'containerQueries',
        'components',
        'colorSchemes',
        'focus',
        'font',
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

  it('has `containerQueries` in the theme', () => {
    expect(defaultTheme.containerQueries('sidebar').up('sm')).to.equal(
      '@container sidebar (min-width:600px)',
    );
    expect(defaultTheme.containerQueries.up(300)).to.equal('@container (min-width:300px)');
  });
});
