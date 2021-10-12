import * as React from 'react';
import { expect } from 'chai';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createClientRender } from 'test/utils';
import createStyled from './createStyled';

describe('createStyled', () => {
  const render = createClientRender();

  describe('displayName', () => {
    // These tests rely on implementation details (namely `displayName`)
    // Ideally we'd just test if the proper name appears in a React warning.
    // But React warnings are deduplicated during module lifetime.
    // We would need to reset modules to make the tests work in watchmode.
    before(function beforeHook() {
      // display names are dev-only
      if (process.env.NODE_ENV === 'production') {
        this.skip();
      }
    });

    it('uses the `componentName` if set', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled('div', { name: 'SomeMuiComponent' })({});

      expect(SomeMuiComponent).to.have.property('displayName', 'SomeMuiComponent');
    });

    it('falls back to the decorated tag name', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled('div')({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(div)');
    });

    it('falls back to the decorated computed displayName', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled(function SomeMuiComponent() {
        return null;
      })({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(SomeMuiComponent)');
    });

    it('has a fallback name if the display name cannot be computed', () => {
      const styled = createStyled({});
      const SomeMuiComponent = styled(() => null)({});

      expect(SomeMuiComponent).to.have.property('displayName', 'Styled(Component)');
    });
  });

  describe('styles', () => {
    it('styles of pseudo classes of variants are merged', () => {
      const theme = createTheme({
        components: {
          MuiButton: {
            variants: [
              {
                props: { variant: 'contained' },
                style: {
                  '&.Mui-disabled': {
                    width: '300px',
                  },
                },
              },
              {
                props: { variant: 'contained', color: 'primary' },
                style: {
                  '&.Mui-disabled': {
                    height: '200px',
                  },
                },
              },
            ],
          },
        },
      });
      const styled = createStyled({});
      const Button = styled('button', {
        shouldForwardProp: (prop) => prop !== 'color' && prop !== 'contained',
        name: 'MuiButton',
        slot: 'Root',
        overridesResolver: (props, styles) => styles.root,
      })({
        display: 'flex',
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Button color="primary" variant="contained" className="Mui-disabled">
            Hello
          </Button>
        </ThemeProvider>,
      );

      expect(container.getElementsByTagName('button')[0]).toHaveComputedStyle({
        width: '300px',
        height: '200px',
      });
    });

    describe('styleOverrides', () => {
      it('accepts function as override', () => {
        const theme = createTheme({
          components: {
            MuiButton: {
              styleOverrides: {
                root: (props) => ({
                  ...(props.color !== 'primary' && { color: 'rgb(0, 0, 0)' }),
                  fontWeight: '800',
                }),
              },
            },
          },
        });

        const styled = createStyled({});
        const Button = styled('button', {
          shouldForwardProp: (prop) => prop !== 'ownerState',
          name: 'MuiButton',
          slot: 'Root',
          skipVariantsResolver: true,
          overridesResolver: (props, styles) => styles.root,
        })({
          color: 'yellow',
          fontWeight: 'normal',
        });

        const { container } = render(
          <ThemeProvider theme={theme}>
            <Button color="secondary">Hello</Button>
          </ThemeProvider>,
        );

        expect(container.getElementsByTagName('button')[0]).toHaveComputedStyle({
          color: 'rgb(0, 0, 0)',
          fontWeight: '800',
        });
      });

      it('accepts function and object as override', () => {
        const theme = createTheme({
          components: {
            MuiButton: {
              styleOverrides: {
                root: (props) => ({ ...(props.color === 'primary' && { color: 'rgb(1, 1, 1)' }) }),
                containedSecondary: {
                  fontWeight: 700,
                },
              },
            },
          },
        });

        const styled = createStyled({});
        const Button = styled('button', {
          shouldForwardProp: (prop) => prop !== 'ownerState',
          name: 'MuiButton',
          slot: 'Root',
          overridesResolver: (props, styles) => [styles.root, styles.containedSecondary],
        })({
          color: 'rgb(100, 100, 100)',
          fontWeight: 400,
        });

        const { container } = render(
          <ThemeProvider theme={theme}>
            <Button color="primary">Hello</Button>
          </ThemeProvider>,
        );

        expect(container.getElementsByTagName('button')[0]).toHaveComputedStyle({
          color: 'rgb(1, 1, 1)',
          fontWeight: '700',
        });
      });
    });
  });
});
