import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, renderHook, screen, fireEvent, isJsdom } from '@mui/internal-test-utils';
import {
  ThemeProvider,
  createTheme,
  useColorScheme,
  useTheme,
  useThemeScope,
} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popper from '@mui/material/Popper';

describe('ThemeProvider', () => {
  const { render } = createRenderer();
  let originalMatchmedia: typeof window.matchMedia;
  let storage: Record<string, string> = {};

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // Create mocks of localStorage getItem and setItem functions
    storage = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => storage[key],
        setItem: (key: string, value: string) => {
          storage[key] = value;
        },
      },
      configurable: true,
    });
    window.matchMedia = () =>
      ({
        // Keep mocking legacy methods because @mui/material v5 still uses them
        addListener: () => {},
        addEventListener: () => {},
        removeListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList;
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  it('When theme is a function, it should not show warning', () => {
    expect(() =>
      render(
        <ThemeProvider theme={{}}>
          <ThemeProvider theme={() => ({})} />
        </ThemeProvider>,
      ),
    ).not.toWarnDev();
  });

  it('theme should be stable between renders if created outside of component', () => {
    const theme = createTheme();
    const { result, rerender } = renderHook(
      () => {
        return useTheme();
      },
      {
        wrapper: ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>,
      },
    );
    const firstRender = result.current;
    rerender();
    const secondRender = result.current;
    expect(firstRender).to.equal(secondRender);
  });

  describe('light & dark', () => {
    function ModeSwitcher() {
      const { mode, setMode } = useColorScheme();
      if (!mode) {
        return null;
      }
      return (
        <select
          data-testid="mode-switcher"
          value={mode}
          onChange={(event) => {
            setMode(event.target.value as 'light' | 'dark' | 'system');
          }}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      );
    }

    it('should be able to use `useColorScheme`', () => {
      const theme = createTheme({
        colorSchemes: { dark: true },
      });
      expect(() =>
        render(
          <ThemeProvider theme={theme}>
            <ModeSwitcher />
          </ThemeProvider>,
        ),
      ).not.toErrorDev();
    });

    it('should be able to switch between modes', async () => {
      const theme = createTheme({
        colorSchemes: { dark: true },
      });
      const { user } = render(
        <ThemeProvider theme={theme}>
          <ModeSwitcher />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('mode-switcher')).to.have.property('value', 'system');

      await user.selectOptions(screen.getByTestId('mode-switcher'), 'dark');

      expect(screen.getByTestId('mode-switcher')).to.have.property('value', 'dark');
    });

    it('allows default mode to be changed', () => {
      const theme = createTheme({
        colorSchemes: { dark: true },
      });

      render(
        <ThemeProvider theme={theme} defaultMode="dark">
          <ModeSwitcher />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('mode-switcher')).to.have.property('value', 'dark');
    });
  });

  describe('focus visible', () => {
    it('outline color follows the active scheme on mode change', async () => {
      function Probe() {
        const theme = useTheme();
        const { setMode } = useColorScheme();
        return (
          <button type="button" onClick={() => setMode('dark')}>
            {theme.focusVisible && theme.focusVisible.outlineColor}
          </button>
        );
      }
      const theme = createTheme({ focusVisible: true, colorSchemes: { light: true, dark: true } });
      const { user } = render(
        <ThemeProvider theme={theme}>
          <Probe />
        </ThemeProvider>,
      );

      const button = screen.getByRole('button');
      expect(button.textContent).to.equal(createTheme().palette.primary.main);

      await user.click(button);
      expect(button.textContent).to.equal(
        createTheme({ palette: { mode: 'dark' } }).palette.primary.main,
      );
    });
  });

  describe('nested ThemeProvider', () => {
    it('should have `vars` as null for nested non-vars theme', () => {
      const upperTheme = createTheme({
        cssVariables: true,
      });
      const nestedTheme = createTheme({
        palette: {
          // @ts-expect-error: This runtime test adds ochre without globally augmenting PaletteOptions.
          ochre: {
            main: '#E3D026',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
          },
        },
      });
      let theme: any;
      function Component() {
        theme = useTheme();
        return <Button>Button</Button>;
      }
      render(
        <ThemeProvider theme={upperTheme}>
          <ThemeProvider theme={nestedTheme}>
            <Component />
          </ThemeProvider>
        </ThemeProvider>,
      );

      expect(theme.vars).to.equal(null);
    });
  });
  describe('scoped CSS theme variables', () => {
    const blueTheme = createTheme({
      cssVariables: true,
      palette: { primary: { main: '#0000ff' } },
    });
    const redTheme = createTheme({ cssVariables: true, palette: { primary: { main: '#ff0000' } } });

    function getVar(element: Element, name: string) {
      return getComputedStyle(element).getPropertyValue(name).trim();
    }

    afterEach(() => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.removeAttribute('data-light');
      document.documentElement.removeAttribute('data-dark');
    });

    describe('nested provider', () => {
      it('adds the scope class to the child when the variables differ', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <div data-testid="outer">
              <ThemeProvider theme={redTheme}>
                <div data-testid="inner" className="inner" />
              </ThemeProvider>
            </div>
          </ThemeProvider>,
        );
        const inner = screen.getByTestId('inner');
        expect(inner.parentElement).to.equal(screen.getByTestId('outer'));
        expect(inner.className).to.match(/^inner mui-theme-[a-z0-9]+$/);
      });

      it('leaves any children untouched when the theme is the same', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <div data-testid="outer">
              <ThemeProvider theme={blueTheme}>
                <div data-testid="inner" />
              </ThemeProvider>
            </div>
          </ThemeProvider>,
        );
        expect(screen.getByTestId('inner').className).to.equal('');
      });

      it('leaves the child untouched when the theme only changes component defaults', () => {
        const theme = createTheme({
          cssVariables: true,
          palette: { primary: { main: '#0000ff' } },
          components: { MuiButton: { defaultProps: { disableRipple: true } } },
        });
        render(
          <ThemeProvider theme={blueTheme}>
            <div data-testid="outer">
              <ThemeProvider theme={theme}>
                <div data-testid="inner" />
              </ThemeProvider>
            </div>
          </ThemeProvider>,
        );
        expect(screen.getByTestId('inner').className).to.equal('');
      });

      it('keeps the state of the child when the variables start to differ', () => {
        function Counter() {
          const [count, setCount] = React.useState(0);
          return (
            <button type="button" data-testid="counter" onClick={() => setCount(count + 1)}>
              {count}
            </button>
          );
        }
        const { setProps } = render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={blueTheme}>
              <Counter />
            </ThemeProvider>
          </ThemeProvider>,
        );
        fireEvent.click(screen.getByTestId('counter'));
        setProps({
          children: (
            <ThemeProvider theme={redTheme}>
              <Counter />
            </ThemeProvider>
          ),
        });
        expect(screen.getByTestId('counter').textContent).to.equal('1');
      });

      it('logs an error and applies nothing when the children are not a single element', () => {
        expect(() =>
          render(
            <ThemeProvider theme={blueTheme}>
              <ThemeProvider theme={redTheme}>
                <div data-testid="first" />
                <div />
              </ThemeProvider>
            </ThemeProvider>,
          ),
        ).toErrorDev("MUI: The CSS theme variables of this ThemeProvider can't be applied");
        expect(screen.getByTestId('first').className).to.equal('');
      });

      it('logs an error when the child is a Fragment', () => {
        expect(() =>
          render(
            <ThemeProvider theme={blueTheme}>
              <ThemeProvider theme={redTheme}>
                <React.Fragment>
                  <div />
                  <div />
                </React.Fragment>
              </ThemeProvider>
            </ThemeProvider>,
          ),
        ).toErrorDev("MUI: The CSS theme variables of this ThemeProvider can't be applied");
      });

      it('does not log an error when there are no children', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>{false}</ThemeProvider>
            <ThemeProvider theme={redTheme}>{null}</ThemeProvider>
          </ThemeProvider>,
        );
      });

      it.skipIf(isJsdom())('applies the inner variables only to the children', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <Button variant="contained" data-testid="outer">
              Outer
            </Button>
            <ThemeProvider theme={redTheme}>
              <Button variant="contained" data-testid="inner">
                Inner
              </Button>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(getVar(screen.getByTestId('outer'), '--mui-palette-primary-main')).to.equal(
          '#0000ff',
        );
        expect(getVar(screen.getByTestId('inner'), '--mui-palette-primary-main')).to.equal(
          '#ff0000',
        );
        expect(getComputedStyle(screen.getByTestId('inner')).backgroundColor).to.equal(
          'rgb(255, 0, 0)',
        );
      });

      it.skipIf(isJsdom())('applies the inner variables to portaled dialogs and poppers', () => {
        function Anchored() {
          const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
          return (
            <React.Fragment>
              <div ref={setAnchorEl} />
              <Popper open={!!anchorEl} anchorEl={anchorEl} data-testid="popper">
                popper
              </Popper>
            </React.Fragment>
          );
        }
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <div>
                <Dialog open>
                  <div data-testid="dialog-content" />
                </Dialog>
                <Anchored />
              </div>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(getVar(screen.getByTestId('dialog-content'), '--mui-palette-primary-main')).to.equal(
          '#ff0000',
        );
        expect(getVar(screen.getByTestId('popper'), '--mui-palette-primary-main')).to.equal(
          '#ff0000',
        );
      });

      it.skipIf(isJsdom())('follows the outer color scheme', () => {
        const outer = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        const inner = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: {
            light: { palette: { primary: { main: '#ff0000' } } },
            dark: { palette: { primary: { main: '#00ff00' } } },
          },
        });
        render(
          <ThemeProvider theme={outer} defaultMode="dark" storageManager={null}>
            <ThemeProvider theme={inner}>
              <div data-testid="inner" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(document.documentElement.classList.contains('dark')).to.equal(true);
        expect(getVar(screen.getByTestId('inner'), '--mui-palette-primary-main')).to.equal(
          '#00ff00',
        );
      });

      it.skipIf(isJsdom())('follows the outer color scheme with a data attribute selector', () => {
        const outer = createTheme({
          cssVariables: { colorSchemeSelector: 'data' },
          colorSchemes: { light: true, dark: true },
        });
        const inner = createTheme({
          cssVariables: { colorSchemeSelector: 'data' },
          colorSchemes: {
            light: { palette: { primary: { main: '#ff0000' } } },
            dark: { palette: { primary: { main: '#00ff00' } } },
          },
        });
        render(
          <ThemeProvider theme={outer} defaultMode="dark" storageManager={null}>
            <ThemeProvider theme={inner}>
              <div data-testid="inner" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(document.documentElement).to.have.attribute('data-dark', '');
        expect(getVar(screen.getByTestId('inner'), '--mui-palette-primary-main')).to.equal(
          '#00ff00',
        );
      });

      it.skipIf(isJsdom())('passes the scope of a provider whose child is another provider', () => {
        const greenSecondaryTheme = createTheme({
          cssVariables: true,
          palette: { primary: { main: '#ff0000' }, secondary: { main: '#00ff00' } },
        });
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <ThemeProvider theme={greenSecondaryTheme}>
                <div data-testid="inner" />
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(getVar(screen.getByTestId('inner'), '--mui-palette-primary-main')).to.equal(
          '#ff0000',
        );
        expect(getVar(screen.getByTestId('inner'), '--mui-palette-secondary-main')).to.equal(
          '#00ff00',
        );
      });

      it('passes the scope through a provider with a function theme', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <ThemeProvider theme={(outer: object) => ({ ...outer })}>
                <div data-testid="inner" />
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(screen.getByTestId('inner').className).to.match(/^mui-theme-[a-z0-9]+$/);
      });

      it('passes the color scheme attribute of a scoped provider through a function theme', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'data' },
          colorSchemes: { light: true, dark: true },
        });
        render(
          <ThemeProvider theme={theme} scoped defaultMode="dark">
            <ThemeProvider theme={(outer: object) => ({ ...outer })}>
              <div data-testid="widget" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(screen.getByTestId('widget')).to.have.attribute('data-dark', '');
        expect(screen.getByTestId('widget').className).to.match(/^mui-theme-[a-z0-9]+$/);
      });
    });

    describe('scoped prop', () => {
      it.skipIf(isJsdom())('keeps a sibling provider off :root', () => {
        const darkTheme = createTheme({
          cssVariables: true,
          palette: { mode: 'dark', primary: { main: '#ff0000' } },
        });
        render(
          <React.Fragment>
            <ThemeProvider theme={blueTheme}>
              <div data-testid="app" />
            </ThemeProvider>
            <ThemeProvider theme={darkTheme} scoped>
              <div data-testid="widget" />
            </ThemeProvider>
          </React.Fragment>,
        );
        expect(getVar(document.documentElement, '--mui-palette-primary-main')).to.equal('#0000ff');
        expect(getComputedStyle(document.documentElement).colorScheme).not.to.equal('dark');
        expect(getVar(screen.getByTestId('app'), '--mui-palette-primary-main')).to.equal('#0000ff');
        expect(getVar(screen.getByTestId('widget'), '--mui-palette-primary-main')).to.equal(
          '#ff0000',
        );
        expect(getComputedStyle(screen.getByTestId('widget')).colorScheme).to.equal('dark');
      });

      it('adds the color scheme attribute to the child', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'data' },
          colorSchemes: { light: true, dark: true },
        });
        render(
          <ThemeProvider theme={theme} scoped defaultMode="dark">
            <div data-testid="widget" />
          </ThemeProvider>,
        );
        expect(screen.getByTestId('widget')).to.have.attribute('data-dark', '');
        expect(document.documentElement).not.to.have.attribute('data-dark');
      });

      it('only uses the storage for a scoped provider with storage keys', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        const readKeys: string[] = [];
        const storageWindow = {
          localStorage: {
            getItem: (key: string) => {
              readKeys.push(key);
              return null;
            },
            setItem: () => {},
          },
          addEventListener: () => {},
          removeEventListener: () => {},
        } as unknown as Window;
        render(
          <React.Fragment>
            <ThemeProvider theme={theme} scoped storageWindow={storageWindow}>
              <div />
            </ThemeProvider>
            <ThemeProvider
              theme={theme}
              scoped
              modeStorageKey="widget-mode"
              colorSchemeStorageKey="widget-color-scheme"
              storageWindow={storageWindow}
            >
              <div />
            </ThemeProvider>
          </React.Fragment>,
        );
        expect(readKeys.length).to.be.greaterThan(0);
        expect(readKeys.every((key) => key.startsWith('widget-'))).to.equal(true);
      });

      it('warns when two providers with different themes write to :root', () => {
        expect(() =>
          render(
            <React.Fragment>
              <ThemeProvider theme={blueTheme}>
                <div />
              </ThemeProvider>
              <ThemeProvider theme={redTheme}>
                <div />
              </ThemeProvider>
            </React.Fragment>,
          ),
        ).toWarnDev('MUI: Several ThemeProviders with different themes write');
      });
    });

    it('leaves the children of the top-level provider untouched', () => {
      render(
        <ThemeProvider theme={redTheme}>
          <div data-testid="first" />
          <div />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('first').className).to.equal('');
    });

    it('exposes the scope class to elements that are portaled by other libraries', () => {
      function Scope() {
        const props = useThemeScope();
        return <div data-testid="scope" {...props} />;
      }
      render(
        <ThemeProvider theme={blueTheme}>
          <ThemeProvider theme={redTheme}>
            <div>
              <Scope />
            </div>
          </ThemeProvider>
        </ThemeProvider>,
      );
      expect(screen.getByTestId('scope').className).to.equal(
        screen.getByTestId('scope').parentElement!.className,
      );
    });
  });
});
