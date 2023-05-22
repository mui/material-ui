import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import Button from '@mui/material/Button';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
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
    const theme = extendTheme();
    expect(typeof extendTheme).to.equal('function');
    expect(typeof theme.colorSchemes).to.equal('object');
  });

  it('should have the custom color schemes', () => {
    const theme = extendTheme({
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
    const theme = extendTheme();
    expect(theme.colorSchemes.dark.palette.background.defaultChannel).to.equal('18 18 18');
    expect(theme.colorSchemes.light.palette.background.defaultChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.dark.palette.primary.mainChannel).to.equal('144 202 249');
    expect(theme.colorSchemes.dark.palette.primary.darkChannel).to.equal('66 165 245');
    expect(theme.colorSchemes.dark.palette.primary.lightChannel).to.equal('227 242 253');
    expect(theme.colorSchemes.dark.palette.primary.contrastTextChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.light.palette.primary.mainChannel).to.equal('25 118 210');
    expect(theme.colorSchemes.light.palette.primary.darkChannel).to.equal('21 101 192');
    expect(theme.colorSchemes.light.palette.primary.lightChannel).to.equal('66 165 245');
    expect(theme.colorSchemes.light.palette.primary.contrastTextChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.dark.palette.secondary.mainChannel).to.equal('206 147 216');
    expect(theme.colorSchemes.dark.palette.secondary.darkChannel).to.equal('171 71 188');
    expect(theme.colorSchemes.dark.palette.secondary.lightChannel).to.equal('243 229 245');
    expect(theme.colorSchemes.dark.palette.secondary.contrastTextChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.light.palette.secondary.mainChannel).to.equal('156 39 176');
    expect(theme.colorSchemes.light.palette.secondary.darkChannel).to.equal('123 31 162');
    expect(theme.colorSchemes.light.palette.secondary.lightChannel).to.equal('186 104 200');
    expect(theme.colorSchemes.light.palette.secondary.contrastTextChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.dark.palette.text.primaryChannel).to.equal('255 255 255');
    expect(theme.colorSchemes.dark.palette.text.secondaryChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.light.palette.text.primaryChannel).to.equal('0 0 0');
    expect(theme.colorSchemes.light.palette.text.secondaryChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.dark.palette.dividerChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.light.palette.dividerChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.dark.palette.action.activeChannel).to.equal('255 255 255');
    expect(theme.colorSchemes.light.palette.action.activeChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.dark.palette.action.selectedChannel).to.equal('255 255 255');
    expect(theme.colorSchemes.light.palette.action.selectedChannel).to.equal('0 0 0');
  });

  it('should generate common background, onBackground channels', () => {
    const theme = extendTheme({
      colorSchemes: {
        dark: {
          palette: {
            common: {
              onBackground: '#f9f9f9', // this should not be overridden
            },
          },
        },
        light: {
          palette: {
            common: {
              background: '#f9f9f9',
            },
          },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.common.background).to.equal('#f9f9f9');
    expect(theme.colorSchemes.light.palette.common.backgroundChannel).to.equal('249 249 249');
    expect(theme.colorSchemes.light.palette.common.onBackground).to.equal('#000');
    expect(theme.colorSchemes.light.palette.common.onBackgroundChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.dark.palette.common.background).to.equal('#000');
    expect(theme.colorSchemes.dark.palette.common.backgroundChannel).to.equal('0 0 0');
    expect(theme.colorSchemes.dark.palette.common.onBackground).to.equal('#f9f9f9');
    expect(theme.colorSchemes.dark.palette.common.onBackgroundChannel).to.equal('249 249 249');
  });

  it('should generate color channels for custom colors', () => {
    const theme = extendTheme({
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
      const theme = extendTheme();
      expect(theme.transitions.easing.easeInOut).to.equal('cubic-bezier(0.4, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeOut).to.equal('cubic-bezier(0.0, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeIn).to.equal('cubic-bezier(0.4, 0, 1, 1)');
      expect(theme.transitions.easing.sharp).to.equal('cubic-bezier(0.4, 0, 0.6, 1)');
    });

    it('[`duration`]: should provide the default values', () => {
      const theme = extendTheme();
      expect(theme.transitions.duration.shortest).to.equal(150);
      expect(theme.transitions.duration.shorter).to.equal(200);
      expect(theme.transitions.duration.short).to.equal(250);
      expect(theme.transitions.duration.standard).to.equal(300);
      expect(theme.transitions.duration.complex).to.equal(375);
      expect(theme.transitions.duration.enteringScreen).to.equal(225);
      expect(theme.transitions.duration.leavingScreen).to.equal(195);
    });

    it('[`easing`]: should provide the custom values', () => {
      const theme = extendTheme({
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
      const theme = extendTheme({
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
      const theme = extendTheme({ transitions: { duration: { shortest: 150 } } });
      expect(theme.transitions.duration.shorter).not.to.equal(undefined);
    });
  });

  describe('opacity', () => {
    it('should provide the default opacities', () => {
      const theme = extendTheme();
      expect(theme.colorSchemes.light.opacity).to.deep.equal({
        inputPlaceholder: 0.42,
        inputUnderline: 0.42,
        switchTrackDisabled: 0.12,
        switchTrack: 0.38,
      });
      expect(theme.colorSchemes.dark.opacity).to.deep.equal({
        inputPlaceholder: 0.5,
        inputUnderline: 0.7,
        switchTrackDisabled: 0.2,
        switchTrack: 0.3,
      });
    });

    it('should allow overriding of the default opacities', () => {
      const theme = extendTheme({
        colorSchemes: {
          light: {
            opacity: {
              inputPlaceholder: 1,
            },
          },
          dark: {
            opacity: {
              inputPlaceholder: 0.2,
            },
          },
        },
      });
      expect(theme.colorSchemes.light.opacity).to.deep.include({
        inputPlaceholder: 1,
        inputUnderline: 0.42,
      });
      expect(theme.colorSchemes.dark.opacity).to.deep.include({
        inputPlaceholder: 0.2,
        inputUnderline: 0.7,
      });
    });
  });

  describe('overlays', () => {
    it('should provide the default array', () => {
      const theme = extendTheme();
      expect(theme.colorSchemes.light.overlays).to.have.length(0);
      expect(theme.colorSchemes.dark.overlays).to.have.length(25);

      expect(theme.colorSchemes.dark.overlays[0]).to.equal(undefined);
      expect(theme.colorSchemes.dark.overlays[24]).to.equal(
        'linear-gradient(rgba(255 255 255 / 0.16), rgba(255 255 255 / 0.16))',
      );
    });

    it('should override the array as expected', () => {
      const overlays = Array(24).fill('none');
      const theme = extendTheme({ colorSchemes: { dark: { overlays } } });
      expect(theme.colorSchemes.dark.overlays).to.equal(overlays);
    });
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const theme = extendTheme();
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
      const theme = extendTheme({ shadows });
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
      const theme = extendTheme({ components });
      expect(theme.components).to.deep.equal(components);
    });
  });

  describe('styleOverrides', () => {
    it('should warn when trying to override an internal state the wrong way', () => {
      let theme;

      expect(() => {
        theme = extendTheme({
          components: { Button: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).not.toErrorDev();
      expect(Object.keys(theme.components.Button.styleOverrides.disabled).length).to.equal(1);

      expect(() => {
        theme = extendTheme({
          components: { MuiButton: { styleOverrides: { root: { color: 'blue' } } } },
        });
      }).not.toErrorDev();

      expect(() => {
        theme = extendTheme({
          components: { MuiButton: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).toErrorDev(
        'MUI: The `MuiButton` component increases the CSS specificity of the `disabled` internal state.',
      );
      expect(Object.keys(theme.components.MuiButton.styleOverrides.disabled).length).to.equal(0);
    });
  });

  it('shallow merges multiple arguments', () => {
    const theme = extendTheme({ foo: 'I am foo' }, { bar: 'I am bar' });
    expect(theme.foo).to.equal('I am foo');
    expect(theme.bar).to.equal('I am bar');
  });

  it('deep merges multiple arguments', () => {
    const theme = extendTheme({ custom: { foo: 'I am foo' } }, { custom: { bar: 'I am bar' } });
    expect(theme.custom.foo).to.equal('I am foo');
    expect(theme.custom.bar).to.equal('I am bar');
  });

  it('allows callbacks using theme in variants', () => {
    const theme = extendTheme({
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

  describe('css var prefix', () => {
    it('has mui as default css var prefix', () => {
      const theme = extendTheme();
      expect(theme.cssVarPrefix).to.equal('mui');
    });

    it('custom css var prefix', () => {
      const theme = extendTheme({ cssVarPrefix: 'foo' });
      expect(theme.cssVarPrefix).to.equal('foo');
    });
  });

  describe('warnings', () => {
    it('dependent token: should warn if the value cannot be parsed by color manipulators', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                divider: 'green',
              },
            },
          },
        }),
      ).toWarnDev(
        "MUI: Can't create `palette.dividerChannel` because `palette.divider` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()." +
          '\n' +
          'To suppress this warning, you need to explicitly provide the `palette.dividerChannel` as a string (in rgb format, e.g. "12 12 12") or undefined if you want to remove the channel token.',
      );
    });

    it('should not warn if channel token is provided', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                dividerChannel: '12 12 12',
              },
            },
          },
        }),
      ).not.toWarnDev();
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                dividerChannel: undefined,
              },
            },
          },
        }),
      ).not.toWarnDev();
    });

    it('independent token: should skip warning', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                Alert: {
                  errorColor: 'green',
                },
              },
            },
          },
        }),
      ).not.to.throw();
    });

    it('custom palette should not throw errors', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                gradient: {
                  primary: 'linear-gradient(#000, transparent)',
                },
              },
            },
          },
        }),
      ).not.to.throw();
    });
  });

  it('should have the vars object', () => {
    const theme = extendTheme();
    const keys = [
      // MD2 specific tokens
      'palette',
      'shadows',
      'zIndex',
      'opacity',
      'overlays',
      'shape',
    ];

    Object.keys(keys).forEach((key) => {
      expect(theme[key]).to.deep.equal(theme.vars[key]);
    });
  });
});
