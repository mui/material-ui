import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { extendTheme, useTheme, CssVarsProvider } from '@mui/joy/styles';

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
        'zIndex',
        'typography',
        'colorInversionConfig',
        'variants',
        'cssVarPrefix',
        'palette',
        'vars',
        'getColorSchemeSelector',
        'colorInversion',
        'unstable_sxConfig',
        'unstable_sx',
        'shouldSkipGeneratingVar',
        'generateCssVars',
      ]).to.includes(field);
    });
  });

  it('should have the vars object', () => {
    const theme = extendTheme();
    const keys = [
      'radius',
      'shadow',
      'focus',
      'fontFamily',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'letterSpacing',
      'palette',
      'shadowRing',
      'shadowChannel',
    ];

    Object.keys(keys).forEach((key) => {
      expect(theme[key]).to.deep.equal(theme.vars[key]);
    });
  });

  it('should have joy default css var prefix', () => {
    const theme = extendTheme();
    expect(theme.cssVarPrefix).to.equal('joy');
    expect(theme.typography.body1.fontSize).to.equal('var(--joy-fontSize-md, 1rem)');
  });

  it('should have custom css var prefix', () => {
    const theme = extendTheme({ cssVarPrefix: 'foo' });
    expect(theme.cssVarPrefix).to.equal('foo');
    expect(theme.typography.body1.fontSize).to.equal('var(--foo-fontSize-md, 1rem)');
  });

  it('should have no css var prefix', () => {
    const theme = extendTheme({ cssVarPrefix: '' });
    expect(theme.cssVarPrefix).to.equal('');
    expect(theme.typography.body1.fontSize).to.equal('var(--fontSize-md, 1rem)');
  });

  it('should accept custom fontSize value', () => {
    const theme = extendTheme({ fontSize: { md: '2rem' } });
    expect(theme.cssVarPrefix).to.equal('joy');
    expect(theme.typography.body1.fontSize).to.equal('var(--joy-fontSize-md, 2rem)');
  });

  it('should have custom --variant-borderWidth', () => {
    const theme = extendTheme({
      variants: { outlined: { primary: { '--variant-borderWidth': '3px' } } },
    });
    expect(theme.variants.outlined.primary).to.contain({
      '--variant-borderWidth': '3px',
    });
  });

  describe('theme.unstable_sx', () => {
    const { render } = createRenderer();

    let originalMatchmedia;
    const storage = {};
    beforeEach(() => {
      originalMatchmedia = window.matchMedia;
      // Create mocks of localStorage getItem and setItem functions
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: (key) => storage[key],
          setItem: (key, value) => {
            storage[key] = value;
          },
        },
        configurable: true,
      });
      window.matchMedia = () => ({
        addListener: () => {},
        removeListener: () => {},
      });
    });
    afterEach(() => {
      window.matchMedia = originalMatchmedia;
    });

    const customTheme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            primary: {
              500: 'rgb(0, 0, 255)',
            },
          },
        },
      },
    });

    it('bgcolor', () => {
      let styles = {};

      function Test() {
        const theme = useTheme();
        styles = theme.unstable_sx({ bgcolor: 'primary.500' });
        return null;
      }

      render(
        <CssVarsProvider theme={customTheme}>
          <Test />
        </CssVarsProvider>,
      );

      expect(styles).to.deep.equal({
        backgroundColor: 'var(--joy-palette-primary-500)',
      });
    });

    it('borderRadius', () => {
      let styles = {};

      function Test() {
        const theme = useTheme();
        styles = theme.unstable_sx({ borderRadius: 'md' });
        return null;
      }

      render(
        <CssVarsProvider theme={customTheme}>
          <Test />
        </CssVarsProvider>,
      );

      expect(styles).to.deep.equal({
        // No default value as the CssVarsProvider is used
        borderRadius: 'var(--joy-radius-md)',
      });
    });
  });
});
