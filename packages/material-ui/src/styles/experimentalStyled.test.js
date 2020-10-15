import React from 'react';
import { expect } from 'chai';
import { createClientRender, screen } from 'test/utils';
import createMuiTheme from './createMuiTheme';
import styled from './experimentalStyled';
import ThemeProvider from './ThemeProvider';

describe('experimentalStyled', () => {
  const render = createClientRender();

  it('should work', () => {
    const Div = styled('div')({
      width: '200px',
    });

    render(<Div data-testid="component">Test</Div>);

    expect(screen.getByTestId('component')).toHaveComputedStyle({
      width: '200px',
    });
  });

  it('should use defaultTheme if no theme is provided', () => {
    const Div = styled('div')((props) => ({
      width: props.theme.spacing(1),
    }));

    render(<Div data-testid="component">Test</Div>);

    expect(screen.getByTestId('component')).toHaveComputedStyle({
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

    render(
      <ThemeProvider theme={theme}>
        <Div data-testid="component">Test</Div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('component')).toHaveComputedStyle({
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

      // FIXME: Should not error in DEV
      expect(() => {
        Test = styled(
          'div',
          { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size' },
          { muiName: 'MuiTest', overridesResolver: testOverridesResolver },
        )`
          width: 200px;
          height: 300px;
        `;
      }).toErrorDev([
        'You have illegal escape sequence in your template literal',
        'You have illegal escape sequence in your template literal',
      ]);
    });

    it('should work with specified muiOptions', () => {
      render(<Test data-testid="component">Test</Test>);

      expect(screen.getByTestId('component')).toHaveComputedStyle({
        width: '200px',
        height: '300px',
      });
    });

    it('overrides should be respected', () => {
      render(
        <ThemeProvider theme={theme}>
          <Test data-testid="component">Test</Test>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('component')).toHaveComputedStyle({
        width: '250px',
        height: '300px',
      });
    });

    it('overrides should be respected when prop is specified', () => {
      render(
        <ThemeProvider theme={theme}>
          <Test variant="rect" data-testid="component">
            Test
          </Test>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('component')).toHaveComputedStyle({
        width: '250px',
        height: '250px',
      });
    });

    it('variants should win over overrides', () => {
      render(
        <ThemeProvider theme={theme}>
          <Test data-testid="component" variant="rect" size="large">
            Test
          </Test>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('component')).toHaveComputedStyle({
        width: '400px',
        height: '400px',
      });
    });

    it('styled wrapper should win over variants', () => {
      const CustomTest = styled(Test)`
        width: 500px;
      `;

      render(
        <ThemeProvider theme={theme}>
          <CustomTest data-testid="component" variant="rect" size="large">
            Test
          </CustomTest>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('component')).toHaveComputedStyle({
        width: '500px',
        height: '400px',
      });
    });
  });
});
