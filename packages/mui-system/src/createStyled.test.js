import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
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

  describe('composition', () => {
    it('should call styleFunctionSx once', () => {
      const styled = createStyled();
      const spySx = spy();
      const Child = styled('div')({});

      render(<Child sx={spySx} />);

      expect(spySx.callCount).to.equal(2); // React 18 renders twice in strict mode.
    });

    it('should still call styleFunctionSx once', () => {
      const styled = createStyled();
      const spySx = spy();
      const Child = styled('div')({});
      const Parent = styled(Child)({});

      render(<Parent sx={spySx} />);

      expect(spySx.callCount).to.equal(2); // React 18 renders twice in strict mode.
    });

    it('both child and parent still accept `sx` prop', () => {
      const styled = createStyled();
      const Child = styled('div')({});
      const Parent = styled(Child)({});

      const { container } = render(
        <React.Fragment>
          <Parent sx={{ color: 'rgb(0, 0, 255)' }} />
          <Child sx={{ color: 'rgb(255, 0, 0)' }} />
        </React.Fragment>,
      );
      expect(container.firstChild).toHaveComputedStyle({ color: 'rgb(0, 0, 255)' });
      expect(container.lastChild).toHaveComputedStyle({ color: 'rgb(255, 0, 0)' });
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
    const styled = createStyled({});
    const ButtonRoot = styled('button', {
      name: 'MuiButton',
      slot: 'Root',
      overridesResolver: (props, styles) => [
        styles.root,
        { [`& .MuiButton-avatar`]: styles.avatar },
      ],
    })({});
    const ButtonIcon = styled('span', {
      name: 'MuiButton',
      slot: 'Icon',
      overridesResolver: (props, styles) => styles.icon,
    })({});
    function Button({ children, startIcon, endIcon, color = 'primary', ...props }) {
      const ownerState = { startIcon, endIcon, color, ...props };
      return (
        <ButtonRoot ownerState={ownerState}>
          {startIcon && <ButtonIcon ownerState={ownerState}>{startIcon}</ButtonIcon>}
          {children}
          {endIcon && <ButtonIcon ownerState={ownerState}>{endIcon}</ButtonIcon>}
        </ButtonRoot>
      );
    }

    it('spread ownerState as props to the slot styleOverrides', () => {
      const finalTheme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              avatar: () => {
                return {
                  width: '100px',
                };
              },
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button>
            <div className="MuiButton-avatar" data-testid="button-avatar" />
            Hello
          </Button>
        </ThemeProvider>,
      );
      expect(container.firstChild.firstChild).toHaveComputedStyle({
        width: '100px',
      });
    });

    it('support slot as nested class', () => {
      const finalTheme = createTheme({
        typography: {
          button: {
            fontSize: '20px',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState, theme }) => {
                const { color, variant } = ownerState;
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
              icon: ({ ownerState }) => [
                ownerState.startIcon && { marginRight: 8 },
                ownerState.endIcon && { marginLeft: 8 },
              ],
            },
          },
        },
      });
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

    it('support object return from the callback', () => {
      const finalTheme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: () => ({
                width: '300px',
              }),
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button>Hello</Button>
        </ThemeProvider>,
      );
      expect(container.firstChild).toHaveComputedStyle({
        width: '300px',
      });
    });

    it('support template string return from the callback', () => {
      const finalTheme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: () => `
                width: 300px;
              `,
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button>Hello</Button>
        </ThemeProvider>,
      );
      expect(container.firstChild).toHaveComputedStyle({
        width: '300px',
      });
    });

    it('works with sx', () => {
      const finalTheme = createTheme({
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ theme }) =>
                theme.unstable_sx({
                  pt: 10,
                }),
              icon: ({ ownerState, theme }) => [
                ownerState.color === 'primary' &&
                  theme.unstable_sx({
                    mr: 10,
                  }),
              ],
            },
          },
        },
      });
      const { container } = render(
        <ThemeProvider theme={finalTheme}>
          <Button startIcon="✅">Hello</Button>
        </ThemeProvider>,
      );
      expect(container.firstChild).toHaveComputedStyle({
        paddingTop: '80px',
      });
      expect(container.firstChild.firstChild).toHaveComputedStyle({
        marginRight: '80px',
      });
    });
  });

  it('does not spread `sx` prop to DOM', () => {
    const styled = createStyled({});
    const Button = styled('button')({});

    const { container } = render(<Button sx={{ bgcolor: 'red' }}>Link</Button>);
    expect(container.firstChild).not.to.have.attribute('sx');
  });

  it('does not forward `ownerState` prop to DOM', () => {
    const styled = createStyled({});
    const Button = styled('button')({});

    const { container } = render(<Button ownerState={{}} />);
    expect(container.firstChild).not.to.have.attribute('ownerState');
  });

  describe('default behaviors', () => {
    it('does not forward invalid props to DOM if no `slot` specified', () => {
      // This scenario is usually used by library consumers
      const styled = createStyled({});
      const Button = styled('button')({});

      const { container } = render(
        <Button color="red" shouldBeRemoved data-foo="bar">
          Link
        </Button>,
      );
      expect(container.firstChild.getAttribute('data-foo')).to.equal('bar');
      expect(container.firstChild.getAttribute('color')).to.equal('red'); // color is for Safari mask-icon link
      expect(container.firstChild.getAttribute('shouldBeRemoved')).not.to.equal('true');
    });

    it('can use `as` prop', () => {
      const styled = createStyled({});
      const Button = styled('button')({});

      const { container } = render(<Button as="a" href="/" />);

      expect(container.firstChild).to.have.tagName('a');
      expect(container.firstChild).to.have.attribute('href', '/');
    });

    it('able to pass props to `as` styled component', () => {
      const styled = createStyled({});
      const ChildRoot = styled('div')({});
      function Child({ component }) {
        return <ChildRoot as={component}>content</ChildRoot>;
      }
      const Button = styled('button')({});
      const { container } = render(<Button as={Child} component="span" />);

      expect(container.firstChild).to.have.tagName('span');
    });
  });
});
