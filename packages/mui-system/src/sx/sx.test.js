import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from 'test/utils';
import { experimental_sx as sx, styled, ThemeProvider } from '@mui/system';

describe('sx', () => {
  const { render } = createRenderer();
  const breakpointsValues = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  const round = (value) => Math.round(value * 1e5) / 1e5;

  const theme = {
    spacing: (val) => `${val * 10}px`,
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      values: breakpointsValues,
      up: (key) => {
        return `@media (min-width:${breakpointsValues[key]}px)`;
      },
    },
    unit: 'px',
    palette: {
      primary: {
        main: 'rgb(0, 0, 255)',
      },
      secondary: {
        main: 'rgb(0, 255, 0)',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightLight: 300,
      fontSize: 14,
      body1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '1rem',
        letterSpacing: `${round(0.15 / 16)}em`,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: `${14 / 16}rem`,
        letterSpacing: `${round(0.15 / 14)}em`,
        fontWeight: 400,
        lineHeight: 1.43,
      },
    },
  };

  describe('system', () => {
    it('resolves system when used inside styled()', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const Test = styled('div')(
        sx({
          color: 'primary.main',
          bgcolor: 'secondary.main',
          m: 2,
          p: 1,
          fontSize: 'fontSize',
          maxWidth: 'sm',
        }),
      );

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test />
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 255, 0)',
        marginTop: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        fontSize: '14px',
        maxWidth: '600px',
      });
    });

    it('resolves system when used inside variants', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const themeWithVariants = {
        ...theme,
        components: {
          MuiTest: {
            variants: [
              {
                props: {}, // all props
                style: sx({
                  color: 'primary.main',
                  bgcolor: 'secondary.main',
                  m: 2,
                  p: 1,
                  fontSize: 'fontSize',
                  maxWidth: 'sm',
                }),
              },
            ],
          },
        },
      };

      const Test = styled('div', { name: 'MuiTest', slot: 'Root' })(
        sx({
          color: 'primary.main',
          bgcolor: 'secondary.main',
          m: 2,
          p: 1,
          fontSize: 'fontSize',
          maxWidth: 'sm',
        }),
      );

      const { container } = render(
        <ThemeProvider theme={themeWithVariants}>
          <Test />
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 255, 0)',
        marginTop: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        fontSize: '14px',
        maxWidth: '600px',
      });
    });
  });

  it('does not throw if used without ThemeProvider', function test() {
    const Test = styled('div')(
      sx({
        color: 'primary.main',
        bgcolor: 'secondary.main',
        m: 2,
        p: 1,
        fontSize: 'fontSize',
        maxWidth: 'sm',
      }),
    );

    expect(() => render(<Test />)).not.to.throw();
  });
});
