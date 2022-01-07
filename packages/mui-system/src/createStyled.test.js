import * as React from 'react';
import { expect } from 'chai';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createRenderer } from 'test/utils';
import createStyled from './createStyled';

describe('createStyled', () => {
  const { render } = createRenderer();

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
  });

  describe('styleOverrides callback', () => {
    const finalTheme = createTheme({
      typography: {
        button: {
          fontSize: '20px',
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: (props) => {
              const { color, variant, theme } = props;
              const styles = [];
              if (color === 'primary') {
                styles.push({
                  width: 120,
                  height: 48,
                });
              }
              if (variant === 'contained') {
                styles.push(theme.typography.button);
              }
              return styles;
            },
            icon: ({ startIcon, endIcon }) => [
              startIcon && { marginRight: 8 },
              endIcon && { marginLeft: 8 },
            ],
          },
        },
      },
    });
    const styled = createStyled({});
    const ButtonRoot = styled('button', {
      name: 'MuiButton',
      slot: 'Root',
      overridesResolver: (props, styles) => styles.root,
    })({});
    const ButtonIcon = styled('span', {
      name: 'MuiButton',
      slot: 'Icon',
      overridesResolver: (props, styles) => styles.icon,
    })({});
    const Button = ({ children, startIcon, endIcon, color = 'primary', ...props }) => {
      const ownerState = { startIcon, endIcon, color, ...props };
      return (
        <ButtonRoot ownerState={ownerState}>
          {startIcon && <ButtonIcon ownerState={ownerState}>{startIcon}</ButtonIcon>}
          {children}
          {endIcon && <ButtonIcon ownerState={ownerState}>{endIcon}</ButtonIcon>}
        </ButtonRoot>
      );
    };

    it('spread ownerState as props to the slot styleOverrides', () => {
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button color="primary" variant="contained" startIcon="foo">
            Hello
          </Button>
        </ThemeProvider>,
      );
      expect(container.firstChild).toHaveComputedStyle({
        width: '120px',
        height: '48px',
        fontSize: '20px',
      });
      expect(
        container.firstChild.firstChild, // startIcon
      ).toHaveComputedStyle({
        marginRight: '8px',
      });
    });
  });
});
