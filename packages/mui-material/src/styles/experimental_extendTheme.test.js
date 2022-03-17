import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import Button from '@mui/material/Button';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as createTheme,
} from '@mui/material/styles';
import { deepOrange, green } from '@mui/material/colors';

describe('experimental_extendTheme', () => {
  let originalMatchmedia;
  const { render } = createRenderer();
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

  it('should have a colorSchemes', () => {
    const theme = createTheme();
    expect(typeof createTheme).to.equal('function');
    expect(typeof theme.colorSchemes).to.equal('object');
  });

  it('should have the custom color schemes', () => {
    const theme = createTheme({
      colorSchemes: {
        light: {
          palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.primary.main).to.equal(deepOrange[500]);
    expect(theme.colorSchemes.light.palette.secondary.main).to.equal(green.A400);
  });

  it('should generate color channels', () => {
    const theme = createTheme();
    expect(theme.colorSchemes.dark.palette.primary.mainChannel).to.equal('144 202 249');
    expect(theme.colorSchemes.dark.palette.primary.darkChannel).to.equal('66 165 245');
    expect(theme.colorSchemes.dark.palette.primary.lightChannel).to.equal('227 242 253');

    expect(theme.colorSchemes.light.palette.primary.mainChannel).to.equal('25 118 210');
    expect(theme.colorSchemes.light.palette.primary.darkChannel).to.equal('21 101 192');
    expect(theme.colorSchemes.light.palette.primary.lightChannel).to.equal('66 165 245');

    expect(theme.colorSchemes.dark.palette.secondary.mainChannel).to.equal('206 147 216');
    expect(theme.colorSchemes.dark.palette.secondary.darkChannel).to.equal('171 71 188');
    expect(theme.colorSchemes.dark.palette.secondary.lightChannel).to.equal('243 229 245');

    expect(theme.colorSchemes.light.palette.secondary.mainChannel).to.equal('156 39 176');
    expect(theme.colorSchemes.light.palette.secondary.darkChannel).to.equal('123 31 162');
    expect(theme.colorSchemes.light.palette.secondary.lightChannel).to.equal('186 104 200');

    expect(theme.colorSchemes.dark.palette.text.primaryChannel).to.equal('255 255 255');
    expect(theme.colorSchemes.dark.palette.text.secondaryChannel).to.equal('255 255 255');
    expect(theme.colorSchemes.dark.palette.text.disabledChannel).to.equal('255 255 255');
    expect(theme.colorSchemes.dark.palette.action.disabledChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.light.palette.text.primaryChannel).to.equal('0 0 0');
    expect(theme.colorSchemes.light.palette.text.secondaryChannel).to.equal('0 0 0');
    expect(theme.colorSchemes.light.palette.text.disabledChannel).to.equal('0 0 0');
    expect(theme.colorSchemes.light.palette.action.disabledChannel).to.equal('0 0 0');
  });

  it('should generate color channels for custom colors', () => {
    const theme = createTheme({
      colorSchemes: {
        light: {
          palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.primary.mainChannel).to.equal('255 87 34');
    expect(theme.colorSchemes.light.palette.secondary.mainChannel).to.equal('0 230 118');
  });

  describe('transitions', () => {
    it('[`easing`]: should provide the default values', () => {
      const theme = createTheme();
      expect(theme.transitions.easing.easeInOut).to.equal('cubic-bezier(0.4, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeOut).to.equal('cubic-bezier(0.0, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeIn).to.equal('cubic-bezier(0.4, 0, 1, 1)');
      expect(theme.transitions.easing.sharp).to.equal('cubic-bezier(0.4, 0, 0.6, 1)');
    });

    it('[`duration`]: should provide the default values', () => {
      const theme = createTheme();
      expect(theme.transitions.duration.shortest).to.equal(150);
      expect(theme.transitions.duration.shorter).to.equal(200);
      expect(theme.transitions.duration.short).to.equal(250);
      expect(theme.transitions.duration.standard).to.equal(300);
      expect(theme.transitions.duration.complex).to.equal(375);
      expect(theme.transitions.duration.enteringScreen).to.equal(225);
      expect(theme.transitions.duration.leavingScreen).to.equal(195);
    });

    it('[`easing`]: should provide the custom values', () => {
      const theme = createTheme({
        transitions: {
          easing: {
            easeInOut: 'cubic-bezier(1, 1, 1, 1)',
            easeOut: 'cubic-bezier(1, 1, 1, 1)',
            easeIn: 'cubic-bezier(1, 1, 1, 1)',
            sharp: 'cubic-bezier(1, 1, 1, 1)',
          },
        },
      });
      expect(theme.transitions.easing.easeInOut).to.equal('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.easeOut).to.equal('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.easeIn).to.equal('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.sharp).to.equal('cubic-bezier(1, 1, 1, 1)');
    });

    it('[`duration`]: should provide the custom values', () => {
      const theme = createTheme({
        transitions: {
          duration: {
            shortest: 1,
            shorter: 1,
            short: 1,
            standard: 1,
            complex: 1,
            enteringScreen: 1,
            leavingScreen: 1,
          },
        },
      });
      expect(theme.transitions.duration.shortest).to.equal(1);
      expect(theme.transitions.duration.shorter).to.equal(1);
      expect(theme.transitions.duration.short).to.equal(1);
      expect(theme.transitions.duration.standard).to.equal(1);
      expect(theme.transitions.duration.complex).to.equal(1);
      expect(theme.transitions.duration.enteringScreen).to.equal(1);
      expect(theme.transitions.duration.leavingScreen).to.equal(1);
    });

    it('should allow providing a partial structure', () => {
      const theme = createTheme({ transitions: { duration: { shortest: 150 } } });
      expect(theme.transitions.duration.shorter).not.to.equal(undefined);
    });
  });

  describe('opacity', () => {
    it('should provide the default opacities', () => {
      const theme = createTheme();
      expect(theme.opacity).to.deep.equal({
        active: 0.54,
        hover: 0.04,
        selected: 0.08,
        disabled: 0.26,
        focus: 0.12,
      });
    });

    it('should allow overriding of the default opacities', () => {
      const theme = createTheme({
        opacity: {
          active: 0.4,
        },
      });
      expect(theme.opacity).to.deep.equal({
        active: 0.4,
        hover: 0.04,
        selected: 0.08,
        disabled: 0.26,
        focus: 0.12,
      });
    });
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const theme = createTheme();
      expect(theme.shadows[2]).to.equal(
        '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      );
    });

    it('should override the array as expected', () => {
      const shadows = [
        'none',
        1,
        1,
        1,
        2,
        3,
        3,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        7,
        8,
        8,
        8,
        9,
        9,
        10,
        10,
        10,
        11,
        11,
      ];
      const theme = createTheme({ shadows });
      expect(theme.shadows).to.equal(shadows);
    });
  });

  describe('components', () => {
    it('should have the components as expected', () => {
      const components = {
        MuiDialog: {
          defaultProps: {
            fullScreen: true,
            fullWidth: false,
          },
        },
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
        MuiPopover: {
          defaultProps: {
            container: document.createElement('div'),
          },
        },
      };
      const theme = createTheme({ components });
      expect(theme.components).to.deep.equal(components);
    });
  });

  describe('styleOverrides', () => {
    it('should warn when trying to override an internal state the wrong way', () => {
      let theme;

      expect(() => {
        theme = createTheme({
          components: { Button: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).not.toErrorDev();
      expect(Object.keys(theme.components.Button.styleOverrides.disabled).length).to.equal(1);

      expect(() => {
        theme = createTheme({
          components: { MuiButton: { styleOverrides: { root: { color: 'blue' } } } },
        });
      }).not.toErrorDev();

      expect(() => {
        theme = createTheme({
          components: { MuiButton: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).toErrorDev(
        'MUI: The `MuiButton` component increases the CSS specificity of the `disabled` internal state.',
      );
      expect(Object.keys(theme.components.MuiButton.styleOverrides.disabled).length).to.equal(0);
    });
  });

  it('shallow merges multiple arguments', () => {
    const theme = createTheme({ foo: 'I am foo' }, { bar: 'I am bar' });
    expect(theme.foo).to.equal('I am foo');
    expect(theme.bar).to.equal('I am bar');
  });

  it('deep merges multiple arguments', () => {
    const theme = createTheme({ custom: { foo: 'I am foo' } }, { custom: { bar: 'I am bar' } });
    expect(theme.custom.foo).to.equal('I am foo');
    expect(theme.custom.bar).to.equal('I am bar');
  });

  it('allows callbacks using theme in variants', () => {
    const theme = createTheme({
      typography: {
        fontFamily: 'cursive',
      },
      components: {
        MuiButton: {
          variants: [
            {
              props: {}, // match any props combination
              style: ({ theme: t }) => {
                return {
                  fontFamily: t.typography.fontFamily,
                };
              },
            },
          ],
        },
      },
    });

    const { container } = render(
      <CssVarsProvider theme={theme}>
        <Button />
      </CssVarsProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ fontFamily: 'cursive' });
  });
});
