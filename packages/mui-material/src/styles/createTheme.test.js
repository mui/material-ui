import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { deepOrange, green } from '@mui/material/colors';
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

  describe('CSS variables', () => {
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

    describe('spacing', () => {
      it('should provide the default spacing', () => {
        const theme = createTheme({ cssVariables: true });
        expect(theme.spacing(1)).to.equal(`calc(1 * var(--mui-spacing, 8px))`);
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

  it('Throw an informative error when the key `vars` is passed as part of `options` passed', () => {
    try {
      createTheme({
        vars: {
          primary: '#EF14E2',
        },
      });
    } catch (e) {
      expect(e.message).to.equal(
        'MUI: `vars` is a private field used for CSS variables support.\n' +
          'Please use another name.',
      );
    }
  });
});
