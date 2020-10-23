import React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils';
import createMuiTheme from './createMuiTheme';
import styled from './experimentalStyled';
import ThemeProvider from './ThemeProvider';

describe('experimentalStyled', () => {
  const render = createClientRender();

  it('should work', () => {
    const Div = styled('div')({
      width: '200px',
    });

    const { container } = render(<Div>Test</Div>);

    expect(container.firstChild).toHaveComputedStyle({
      width: '200px',
    });
  });

  it('should use defaultTheme if no theme is provided', () => {
    const Div = styled('div')((props) => ({
      width: props.theme.spacing(1),
    }));

    const { container } = render(<Div>Test</Div>);

    expect(container.firstChild).toHaveComputedStyle({
      width: '8px',
    });
  });

  it('should use theme from context if available', () => {
    const Div = styled('div')((props) => ({
      width: props.theme.spacing(1),
    }));

    const theme = createMuiTheme({
      spacing: 10,
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Div>Test</Div>
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      width: '10px',
    });
  });

  describe('muiOptions', () => {
    /**
     * @type {ReturnType<typeof createMuiTheme>}
     */
    let theme;
    /**
     * @type {ReturnType<typeof styled>}
     */
    let Test;

    before(() => {
      theme = createMuiTheme({
        palette: {
          primary: {
            main: 'rgb(0, 0, 255)',
          },
        },
        components: {
          MuiTest: {
            variants: [
              {
                props: { variant: 'rect', size: 'large' },
                style: {
                  width: '400px',
                  height: '400px',
                },
              },
            ],
            styleOverrides: {
              root: {
                width: '250px',
              },
              rect: {
                height: '250px',
              },
            },
          },
        },
      });

      const testOverridesResolver = (props, styles) => ({
        ...styles.root,
        ...(props.variant && styles[props.variant]),
      });

      Test = styled(
        'div',
        { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' && prop !== 'sx' },
        { muiName: 'MuiTest', overridesResolver: testOverridesResolver },
      )`
        width: 200px;
        height: 300px;
      `;
    });

    it('should work with specified muiOptions', () => {
      const { container } = render(<Test>Test</Test>);

      expect(container.firstChild).toHaveComputedStyle({
        width: '200px',
        height: '300px',
      });
    });

    it('overrides should be respected', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test>Test</Test>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '250px',
        height: '300px',
      });
    });

    it('overrides should be respected when prop is specified', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test variant="rect">Test</Test>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '250px',
        height: '250px',
      });
    });

    it('variants should win over overrides', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test variant="rect" size="large">
            Test
          </Test>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '400px',
        height: '400px',
      });
    });

    it('styled wrapper should win over variants', () => {
      const CustomTest = styled(Test)`
        width: 500px;
      `;

      const { container } = render(
        <ThemeProvider theme={theme}>
          <CustomTest variant="rect" size="large">
            Test
          </CustomTest>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        width: '500px',
        height: '400px',
      });
    });

    it('should resolve the sx prop', () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test sx={{ color: 'primary.main' }}>Test</Test>
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
      });
    });
  });
});
