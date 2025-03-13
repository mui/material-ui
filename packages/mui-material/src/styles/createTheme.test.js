import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { deepOrange, green, grey } from '@mui/material/colors';
import createPalette from './createPalette';

const lightPalette = createPalette({ mode: 'light' });
const darkPalette = createPalette({ mode: 'dark' });

describe('createTheme', () => {
  const { render } = createRenderer();

  it('should not create vars if cssVariables: false', () => {
    const theme = createTheme({ cssVariables: false });
    expect(theme.cssVariables).to.equal(false);
    expect('vars' in theme).to.equal(false);
  });

  it('color schemes dark: true', () => {
    const theme = createTheme({ cssVariables: false, colorSchemes: { dark: true } });
    const { light, dark } = theme.colorSchemes;
    expect(light.palette.primary.main).to.deep.equal(lightPalette.primary.main);
    expect(dark.palette.primary.main).to.deep.equal(darkPalette.primary.main);
  });

  it('color schemes light: true', () => {
    const theme = createTheme({
      cssVariables: false,
      colorSchemes: { light: true },
      palette: { mode: 'dark' },
    });
    const { light, dark } = theme.colorSchemes || {};
    expect(light?.palette.primary.main).to.deep.equal(lightPalette.primary.main);
    expect(dark?.palette.primary.main).to.deep.equal(darkPalette.primary.main);
  });

  it('should provide spacing in px', () => {
    const theme = createTheme({ cssVariables: false });
    expect(theme.spacing(1)).to.equal('8px');
  });

  it('should have a palette', () => {
    const theme = createTheme();
    expect(typeof createTheme).to.equal('function');
    expect(typeof theme.palette).to.equal('object');
  });

  it('should have the custom palette', () => {
    const theme = createTheme({
      palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
    });
    expect(theme.palette.primary.main).to.equal(deepOrange[500]);
    expect(theme.palette.secondary.main).to.equal(green.A400);
  });

  it('should be customizable through `colorSchemes` node', () => {
    const theme = createTheme({
      colorSchemes: {
        dark: {
          palette: {
            background: {
              default: grey[900],
            },
          },
        },
        light: {
          palette: {
            background: {
              default: grey[50],
            },
            bg: {
              main: grey[800],
              dark: grey[700],
            },
          },
        },
      },
    });
    expect(theme.colorSchemes.dark.palette.background.default).to.equal(grey[900]);
    expect(theme.colorSchemes.light.palette.background.default).to.equal(grey[50]);
    expect(theme.colorSchemes.light.palette.bg.main).to.equal(grey[800]);
    expect(theme.colorSchemes.light.palette.bg.dark).to.equal(grey[700]);
    expect(theme.palette.mode).to.equal('light');
    expect(theme.palette.background.default).to.equal(grey[50]);
  });

  it('should be customizable through `colorSchemes` node with non-existing fields', () => {
    const theme = createTheme({
      colorSchemes: {
        dark: {
          opacity: {
            disabled: 0.38,
          },
          palette: {
            gradient: 'linear-gradient(90deg, #000000 0%, #ffffff 100%)',
          },
        },
        light: {
          opacity: {
            disabled: 0.5,
          },
          palette: {
            gradient: 'linear-gradient(90deg, #ffffff 0%, #000000 100%)',
          },
        },
      },
    });
    expect(theme.colorSchemes.dark.opacity.disabled).to.equal(0.38);
    expect(theme.colorSchemes.light.opacity.disabled).to.equal(0.5);
    expect(theme.colorSchemes.dark.palette.gradient).to.equal(
      'linear-gradient(90deg, #000000 0%, #ffffff 100%)',
    );
    expect(theme.colorSchemes.light.palette.gradient).to.equal(
      'linear-gradient(90deg, #ffffff 0%, #000000 100%)',
    );
  });

  it('should work with `palette` and `colorSchemes`', () => {
    const theme = createTheme({
      palette: {
        primary: {
          main: '#27272a',
        },
        background: {
          default: '#f5f5f5',
        },
      },
      colorSchemes: {
        dark: true,
      },
    });
    expect(theme.palette.primary.main).to.equal('#27272a');
    expect(theme.palette.background.default).to.equal('#f5f5f5');
    expect(theme.colorSchemes.light.palette.primary.main).to.equal('#27272a');
    expect(theme.colorSchemes.light.palette.background.default).to.equal('#f5f5f5');
    expect(theme.colorSchemes.dark.palette.primary.main).to.equal(darkPalette.primary.main);
    expect(theme.colorSchemes.dark.palette.background.default).to.equal(
      darkPalette.background.default,
    );
  });

  it('should work with `palette` and a custom `colorSchemes.dark`', () => {
    const theme = createTheme({
      palette: {
        background: {
          default: '#f5f5f5',
        },
      },
      colorSchemes: {
        dark: {
          palette: {
            background: {
              default: 'red',
            },
          },
        },
      },
    });
    expect(theme.palette.background.default).to.equal('#f5f5f5');
    expect(theme.colorSchemes.light.palette.background.default).to.equal('#f5f5f5');
    expect(theme.colorSchemes.dark.palette.background.default).to.equal('red');
  });

  describe('CSS variables', () => {
    it('should have default light with media selector if no `palette` and colorSchemes.dark is provided ', () => {
      const theme = createTheme({
        cssVariables: true,
        colorSchemes: { dark: true },
      });
      expect(theme.defaultColorScheme).to.equal('light');
      expect(theme.colorSchemeSelector).to.equal('media');
      expect(theme.colorSchemes.light).not.to.equal(undefined);
      expect(theme.colorSchemes.dark).not.to.equal(undefined);
    });

    it('should have a light as a default colorScheme if only `palette` is provided', () => {
      const theme = createTheme({
        cssVariables: true,
        palette: { primary: { main: deepOrange[500] } },
      });
      expect(theme.defaultColorScheme).to.equal('light');
      expect(theme.vars.palette.primary.main).to.equal(
        `var(--mui-palette-primary-main, ${deepOrange[500]})`,
      );
    });

    it('should have a dark as a default colorScheme if only `palette` is provided', () => {
      const theme = createTheme({
        cssVariables: true,
        palette: {
          mode: 'dark',
          primary: { main: deepOrange[500] },
        },
      });
      expect(theme.defaultColorScheme).to.equal('dark');
      expect(theme.palette.primary.main).to.equal(deepOrange[500]);
      expect(theme.vars.palette.primary.main).to.equal(
        `var(--mui-palette-primary-main, ${deepOrange[500]})`,
      );
    });

    it('should have light and dark colorSchemes', () => {
      const theme = createTheme({
        cssVariables: true,
        colorSchemes: { dark: true },
      });
      expect(theme.colorSchemes.light).to.not.equal(undefined);
      expect(theme.colorSchemes.dark).to.not.equal(undefined);
    });

    it('should not have light if default color scheme is set to dark', () => {
      const theme = createTheme({
        cssVariables: true,
        colorSchemes: { dark: true },
        defaultColorScheme: 'dark',
      });
      expect(theme.colorSchemes.light).to.equal(undefined);
      expect(theme.colorSchemes.dark).to.not.equal(undefined);
    });

    it('should be able to customize tonal offset', () => {
      const theme = createTheme({
        cssVariables: true,
        palette: {
          primary: {
            main: green[500],
          },
          tonalOffset: {
            light: 0.1,
            dark: 0.9,
          },
        },
      });
      expect(theme.palette.primary.main).to.equal('#4caf50');
    });

    describe('spacing', () => {
      it('should provide the default spacing', () => {
        const theme = createTheme({ cssVariables: true });
        expect(theme.spacing(1)).to.equal(`var(--mui-spacing, 8px)`);
        expect(theme.spacing(2)).to.equal(`calc(2 * var(--mui-spacing, 8px))`);
      });
    });

    describe('spacing array', () => {
      it('should create spacing vars array', () => {
        const theme = createTheme({ cssVariables: true, spacing: [0, 4, 8] });
        expect(theme.vars.spacing).to.deep.equal([
          'var(--mui-spacing-0, 0px)',
          'var(--mui-spacing-1, 4px)',
          'var(--mui-spacing-2, 8px)',
        ]);
      });

      it('should work with positive input', () => {
        const theme = createTheme({ cssVariables: true, spacing: [0, 4, 8] });
        expect(theme.spacing(1)).to.equal(`var(--mui-spacing-1, 4px)`);
        expect(theme.spacing(2)).to.equal(`var(--mui-spacing-2, 8px)`);
      });

      it('should work with negative input', () => {
        const theme = createTheme({ cssVariables: true, spacing: [0, 4, 8] });
        expect(theme.spacing(-1)).to.equal(`calc(-1 * var(--mui-spacing-1, 4px))`);
        expect(theme.spacing(-2)).to.equal(`calc(-1 * var(--mui-spacing-2, 8px))`);
      });
    });
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
      <ThemeProvider theme={theme}>
        <Button />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ fontFamily: 'cursive' });
  });

  it('should apply the correct borderRadius styles via sx prop if theme values are 0', function test() {
    const isJSDOM = /jsdom/.test(window.navigator.userAgent);

    if (isJSDOM) {
      this.skip();
    }

    const theme = createTheme({
      shape: {
        borderRadius: 0,
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '2rem', height: '2rem', borderRadius: 4 }} />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      borderTopLeftRadius: '0px',
      borderBottomLeftRadius: '0px',
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px',
    });
  });

  it('should apply dark styles when using applyStyles if mode="dark"', function test() {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    const Test = styled('div')(({ theme }) => ({
      backgroundColor: 'rgb(255, 255, 255)',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgb(0, 0, 0)',
      }),
    }));

    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <Test />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      backgroundColor: 'rgb(0, 0, 0)',
    });
  });

  it('should not apply dark styles when using applyStyles if mode="light"', function test() {
    const lightTheme = createTheme();

    const Test = styled('div')(({ theme }) => ({
      backgroundColor: 'rgb(255, 255, 255)',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgb(0, 0, 0)',
      }),
    }));

    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Test />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      backgroundColor: 'rgb(255, 255, 255)',
    });
  });

  it('should return the styles directly when using applyStyles if the selector is `&`', function test() {
    const theme = createTheme({ cssVariables: true, palette: { mode: 'dark' } });

    expect(theme.applyStyles('dark', { color: 'red' })).to.deep.equal({ color: 'red' });
  });

  it('Throw an informative error when the key `vars` is passed as part of `options` passed', () => {
    try {
      createTheme({
        vars: {
          primary: '#EF14E2',
        },
      });
    } catch (error) {
      expect(error.message).to.equal(
        'MUI: `vars` is a private field used for CSS variables support.\n' +
          'Please use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature.',
      );
    }
  });

  it('should not throw for nested theme that includes `vars` node', () => {
    const outerTheme = createTheme({
      cssVariables: true,
      palette: {
        secondary: {
          main: deepOrange[500],
        },
      },
    });

    expect(() =>
      render(
        <ThemeProvider theme={outerTheme}>
          <ThemeProvider
            theme={(theme) => {
              return createTheme({
                ...theme,
                palette: {
                  ...theme.palette,
                  primary: {
                    main: green[500],
                  },
                },
              });
            }}
          />
        </ThemeProvider>,
      ),
    ).not.to.throw();
  });

  it('should create a new object', () => {
    const defaultTheme = createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
      },
      colorSchemes: { dark: true },
    });

    expect(
      defaultTheme.generateStyleSheets()[2]['[data-mui-color-scheme="dark"]'][
        '--mui-palette-background-defaultChannel'
      ],
    ).to.equal('18 18 18');

    const theme = createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      colorSchemes: {
        dark: {
          palette: {
            background: {
              default: 'hsl(220, 35%, 3%)',
              paper: 'hsl(220, 30%, 7%)',
            },
          },
        },
      },
    });

    expect(
      theme.generateStyleSheets()[2]['[data-mui-color-scheme="dark"]'][
        '--template-palette-background-defaultChannel'
      ],
    ).to.equal('5 7 10');
  });

  it('should have `toRuntimeSource` for integrating with Pigment CSS', () => {
    const theme = createTheme();
    expect(typeof theme.toRuntimeSource).to.equal('function');

    const themeCssVars = createTheme({ cssVariables: true });
    expect(typeof themeCssVars.toRuntimeSource).to.equal('function');
  });
});
