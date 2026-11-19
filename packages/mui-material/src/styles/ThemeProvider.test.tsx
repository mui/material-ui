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
  const { render, renderToString } = createRenderer();
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
      it('renders a div with the scope class when the variables differ', () => {
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
        const element = inner.parentElement!;
        expect(element.tagName).to.equal('DIV');
        expect(element.parentElement).to.equal(screen.getByTestId('outer'));
        expect(element.className).to.match(/^MuiThemeProvider-root mui-theme-[a-z0-9]+$/);
        expect(inner.className).to.equal('inner');
      });

      it.skipIf(isJsdom())('gives the div display: contents', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <div data-testid="inner" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(getComputedStyle(screen.getByTestId('inner').parentElement!).display).to.equal(
          'contents',
        );
      });

      it('renders a div without a scope class when the theme is the same', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <div data-testid="outer">
              <ThemeProvider theme={blueTheme}>
                <div data-testid="inner" />
              </ThemeProvider>
            </div>
          </ThemeProvider>,
        );
        const element = screen.getByTestId('inner').parentElement!;
        expect(element.parentElement).to.equal(screen.getByTestId('outer'));
        expect(element.className).to.equal('MuiThemeProvider-root');
      });

      it('renders a div without a scope class when the theme only changes component defaults', () => {
        const theme = createTheme({
          cssVariables: true,
          palette: { primary: { main: '#0000ff' } },
          components: { MuiButton: { defaultProps: { disableRipple: true } } },
        });
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={theme}>
              <div data-testid="inner" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(screen.getByTestId('inner').parentElement!.className).to.equal(
          'MuiThemeProvider-root',
        );
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

      it('applies any children', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <div data-testid="first" />
              text
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(screen.getByTestId('first').parentElement!.className).to.match(/ mui-theme-/);
      });

      it('applies the theme to children that drop the className they receive', () => {
        const Context = React.createContext(0);
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <Context.Provider value={1}>
                <div data-testid="inner" />
              </Context.Provider>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(screen.getByTestId('inner').parentElement!.className).to.match(/ mui-theme-/);
      });

      it('writes the variables that reference a changed one', () => {
        const linkTheme = (main: string) =>
          createTheme({
            cssVariables: true,
            palette: {
              primary: { main },
              text: { link: 'var(--mui-palette-primary-main)' } as any,
            },
          });
        render(
          <ThemeProvider theme={linkTheme('#0000ff')}>
            <ThemeProvider theme={linkTheme('#ff0000')}>
              <div data-testid="inner" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        const element = screen.getByTestId('inner').parentElement!;
        const scope = `.${element.classList[1]}`;
        const css = Array.from(document.querySelectorAll('style'))
          .map((style) => style.textContent)
          .join('');
        const scopeRule = css.slice(css.indexOf(`${scope}{`));
        expect(scopeRule).to.include('--mui-palette-text-link:var(--mui-palette-primary-main)');
        if (!isJsdom()) {
          expect(getVar(screen.getByTestId('inner'), '--mui-palette-text-link')).to.equal(
            '#ff0000',
          );
        }
      });

      describe('function theme', () => {
        // The rules of the scope class of a provider's element.
        function getScopeCss(element: Element) {
          const scope = `.${element.classList[1]}`;
          return Array.from(document.querySelectorAll('style'))
            .map((style) => style.textContent)
            .join('')
            .split('}')
            .filter((rule) => rule.includes(scope))
            .join('}');
        }

        function Inner() {
          const theme = useTheme();
          return <div data-testid="inner" data-primary={theme.palette.primary.main} />;
        }

        it('scopes the variables of a copy of the outer theme with changes', () => {
          render(
            <ThemeProvider theme={blueTheme}>
              <ThemeProvider
                theme={(outer: any) => ({
                  ...outer,
                  palette: { ...outer.palette, primary: { main: '#ff0000' } },
                })}
              >
                <Inner />
              </ThemeProvider>
            </ThemeProvider>,
          );
          const inner = screen.getByTestId('inner');
          expect(inner.dataset.primary).to.equal('#ff0000');
          expect(inner.parentElement!.className).to.match(
            /^MuiThemeProvider-root mui-theme-[a-z0-9]+$/,
          );
          const css = getScopeCss(inner.parentElement!);
          expect(css).to.include('--mui-palette-primary-main:#ff0000');
          // The tokens derived from the primary color follow it.
          expect(css).to.include('--mui-palette-primary-mainChannel:255 0 0');
          if (!isJsdom()) {
            expect(getVar(inner, '--mui-palette-primary-main')).to.equal('#ff0000');
          }
        });

        it('scopes the variables of a theme created from the outer theme', () => {
          render(
            <ThemeProvider theme={blueTheme}>
              <ThemeProvider
                theme={(outer: any) =>
                  createTheme(outer, { palette: { primary: { main: '#ff0000' } } })
                }
              >
                <Inner />
              </ThemeProvider>
            </ThemeProvider>,
          );
          const inner = screen.getByTestId('inner');
          expect(inner.dataset.primary).to.equal('#ff0000');
          expect(getScopeCss(inner.parentElement!)).to.include(
            '--mui-palette-primary-main:#ff0000',
          );
          if (!isJsdom()) {
            expect(getVar(inner, '--mui-palette-primary-main')).to.equal('#ff0000');
          }
        });

        it('only writes the variables that a copy of the outer theme changes', () => {
          const outerTheme = createTheme({
            cssVariables: { colorSchemeSelector: 'class' },
            colorSchemes: { light: true, dark: true },
            defaultColorScheme: 'dark',
          });
          render(
            <ThemeProvider theme={outerTheme}>
              <ThemeProvider
                theme={(outer: any) => ({
                  ...outer,
                  palette: { ...outer.palette, primary: { main: '#ff0000' } },
                })}
              >
                <Inner />
              </ThemeProvider>
            </ThemeProvider>,
          );
          const css = getScopeCss(screen.getByTestId('inner').parentElement!);
          expect(css).to.include('--mui-palette-primary-main:#ff0000');
          // The values of the default color scheme that the copy keeps aren't written again.
          expect(css).not.to.include('--mui-opacity-');
          expect(css).not.to.include('--mui-overlays-');
          expect(css).not.to.include('--mui-palette-background-');
        });

        it('renders a div without a scope class when it returns the outer theme', () => {
          render(
            <ThemeProvider theme={blueTheme}>
              <ThemeProvider theme={(outer: any) => outer}>
                <Inner />
              </ThemeProvider>
            </ThemeProvider>,
          );
          const inner = screen.getByTestId('inner');
          expect(inner.dataset.primary).to.equal('#0000ff');
          expect(inner.parentElement!.className).to.equal('MuiThemeProvider-root');
        });

        it('keeps the outer variables when only the components change', () => {
          let theme: any;
          function Component() {
            theme = useTheme();
            return <div data-testid="inner" />;
          }
          const components = { MuiButton: { defaultProps: { disableRipple: true } } };
          render(
            <ThemeProvider theme={blueTheme}>
              <ThemeProvider theme={(outer: any) => ({ ...outer, components })}>
                <Component />
              </ThemeProvider>
            </ThemeProvider>,
          );
          expect(screen.getByTestId('inner').parentElement!.className).to.equal(
            'MuiThemeProvider-root',
          );
          expect(theme.components).to.equal(components);
          expect(theme.palette.primary.main).to.equal('#0000ff');
        });

        it('calls the function once for many providers with the same outer theme', () => {
          let calls = 0;
          const theme = (outer: any) => {
            calls += 1;
            return { ...outer, palette: { ...outer.palette, primary: { main: '#ff0000' } } };
          };
          render(
            <ThemeProvider theme={blueTheme}>
              {[0, 1, 2].map((index) => (
                <ThemeProvider key={index} theme={theme}>
                  <Inner />
                </ThemeProvider>
              ))}
            </ThemeProvider>,
          );
          expect(calls).to.equal(1);
          const classNames = screen
            .getAllByTestId('inner')
            .map((inner) => inner.parentElement!.className);
          expect(new Set(classNames).size).to.equal(1);
        });

        it('replaces an outer theme without CSS theme variables', () => {
          const outerTheme = createTheme({ palette: { primary: { main: '#0000ff' } } });
          render(
            <ThemeProvider theme={outerTheme}>
              <ThemeProvider
                theme={(outer: any) => ({
                  ...outer,
                  palette: {
                    ...outer.palette,
                    primary: { ...outer.palette.primary, main: '#ff0000' },
                  },
                })}
              >
                <Inner />
              </ThemeProvider>
            </ThemeProvider>,
          );
          const inner = screen.getByTestId('inner');
          expect(inner.dataset.primary).to.equal('#ff0000');
          expect(document.querySelector('.MuiThemeProvider-root')).to.equal(null);
        });
      });

      it('inserts the stylesheet of a scope once for many providers with the same theme', () => {
        function countRules(className: string) {
          return (
            Array.from(document.querySelectorAll('style'))
              .map((style) => style.textContent ?? '')
              .join('')
              .split(`.${className}{`).length - 1
          );
        }
        const { setProps } = render(
          <ThemeProvider theme={blueTheme}>
            {[0, 1, 2].map((index) => (
              <ThemeProvider key={index} theme={redTheme}>
                <div data-testid={`card-${index}`} />
              </ThemeProvider>
            ))}
          </ThemeProvider>,
        );
        const className = screen.getByTestId('card-0').parentElement!.classList[1];
        expect(countRules(className)).to.equal(1);
        expect(countRules('MuiThemeProvider-root')).to.equal(1);
        // The stylesheet stays when the provider that inserted it unmounts.
        setProps({
          children: [1, 2].map((index) => (
            <ThemeProvider key={index} theme={redTheme}>
              <div data-testid={`card-${index}`} />
            </ThemeProvider>
          )),
        });
        expect(countRules(className)).to.equal(1);
        setProps({ children: null });
        expect(countRules(className)).to.equal(0);
      });

      it('renders many providers with the same theme once', () => {
        let commits = 0;
        render(
          <React.Profiler
            id="providers"
            onRender={() => {
              commits += 1;
            }}
          >
            <ThemeProvider theme={blueTheme}>
              {[0, 1, 2].map((index) => (
                <ThemeProvider key={index} theme={redTheme}>
                  <div />
                </ThemeProvider>
              ))}
            </ThemeProvider>
          </React.Profiler>,
          { strict: false },
        );
        expect(commits).to.equal(1);
      });

      it('inserts the stylesheet of a scope when the provider that rendered it first suspends', () => {
        function Suspends(): React.ReactNode {
          throw new Promise(() => {});
        }
        render(
          <ThemeProvider theme={blueTheme}>
            <React.Suspense fallback={null}>
              <ThemeProvider theme={redTheme}>
                <div />
              </ThemeProvider>
              <Suspends />
            </React.Suspense>
            <ThemeProvider theme={redTheme}>
              <div data-testid="inner" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        const inner = screen.getByTestId('inner');
        const className = inner.parentElement!.classList[1];
        const css = Array.from(document.querySelectorAll('style'))
          .map((style) => style.textContent ?? '')
          .join('');
        expect(css.split(`.${className}{`).length - 1).to.equal(1);
        if (!isJsdom()) {
          expect(getVar(inner, '--mui-palette-primary-main')).to.equal('#ff0000');
        }
      });

      it('inserts the stylesheet of a scope once after hydration', () => {
        const { container, hydrate } = renderToString(
          <ThemeProvider theme={blueTheme}>
            {[0, 1, 2].map((index) => (
              <ThemeProvider key={index} theme={redTheme}>
                <div data-testid={`card-${index}`} />
              </ThemeProvider>
            ))}
          </ThemeProvider>,
        );
        const className =
          container.querySelector('[data-testid="card-0"]')!.parentElement!.classList[1];
        hydrate();
        const css = Array.from(document.querySelectorAll('style'))
          .map((style) => style.textContent ?? '')
          .join('');
        expect(css.split(`.${className}{`).length - 1).to.equal(1);
      });

      it.skipIf(isJsdom())('gives each level of a chain its own variables', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <div data-testid="middle" />
              <ThemeProvider theme={blueTheme}>
                <div data-testid="inner" />
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(getVar(screen.getByTestId('middle'), '--mui-palette-primary-main')).to.equal(
          '#ff0000',
        );
        expect(getVar(screen.getByTestId('inner'), '--mui-palette-primary-main')).to.equal(
          '#0000ff',
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

      it('gives portaled elements one class with the variables of the closest theme', () => {
        const greenTheme = createTheme({
          cssVariables: true,
          palette: { primary: { main: '#00ff00' } },
        });
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <ThemeProvider theme={greenTheme}>
                <Popper open anchorEl={document.body} data-testid="popper">
                  popper
                </Popper>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>,
        );
        const popper = screen.getByTestId('popper');
        const scopeClasses = Array.from(popper.classList).filter((name) =>
          name.startsWith('mui-theme-'),
        );
        expect(scopeClasses.length).to.equal(1);
        if (!isJsdom()) {
          expect(getVar(popper, '--mui-palette-primary-main')).to.equal('#00ff00');
        }
      });

      it.skipIf(isJsdom())('gives portaled elements the variables of a chain', () => {
        const greenSecondaryTheme = createTheme({
          cssVariables: true,
          palette: { primary: { main: '#ff0000' }, secondary: { main: '#00ff00' } },
        });
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme}>
              <ThemeProvider theme={greenSecondaryTheme}>
                <Dialog open>
                  <div data-testid="dialog-content" />
                </Dialog>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>,
        );
        const content = screen.getByTestId('dialog-content');
        expect(getVar(content, '--mui-palette-primary-main')).to.equal('#ff0000');
        expect(getVar(content, '--mui-palette-secondary-main')).to.equal('#00ff00');
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
    });

    describe('isolated prop', () => {
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
            <ThemeProvider theme={darkTheme} isolated>
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

      it('marks its element with its own id and color scheme', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'data' },
          colorSchemes: { light: true, dark: true },
        });
        render(
          <ThemeProvider theme={theme} isolated defaultMode="dark">
            <div data-testid="widget" />
          </ThemeProvider>,
        );
        const element = screen.getByTestId('widget').parentElement!;
        expect(element).to.have.attribute('data-mui-isolated');
        expect(element).to.have.attribute('data-mui-scheme', 'dark');
        expect(element).not.to.have.attribute('data-dark');
        expect(document.documentElement).not.to.have.attribute('data-dark');
      });

      it('renders its marker on the server when the mode is not stored', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        const { container } = renderToString(
          <ThemeProvider theme={theme} isolated defaultMode="dark">
            <div data-testid="widget" />
          </ThemeProvider>,
        );
        const element = container.querySelector('[data-testid="widget"]')!.parentElement!;
        expect(element).to.have.attribute('data-mui-scheme', 'dark');
        expect(container.querySelector('script')).to.equal(null);
      });

      it('follows the media query in system mode without a stored mode', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        let selector = '';
        function Selector() {
          selector = useTheme().getColorSchemeSelector('dark');
          return null;
        }
        render(
          <ThemeProvider theme={theme} isolated>
            <Selector />
          </ThemeProvider>,
        );
        expect(selector).to.equal('@media (prefers-color-scheme: dark)');
        expect(document.querySelector('[data-mui-isolated]')).to.equal(null);
      });

      it('gives its nested providers a color scheme selector on its marker', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        const selectors: string[] = [];
        function Selector() {
          selectors.push(useTheme().getColorSchemeSelector('dark'));
          return null;
        }
        render(
          <ThemeProvider theme={theme} isolated defaultMode="light">
            <Selector />
            <ThemeProvider theme={redTheme}>
              <Selector />
            </ThemeProvider>
          </ThemeProvider>,
        );
        const id = document.querySelector('[data-mui-isolated]')!.getAttribute('data-mui-isolated');
        const marker = `[data-mui-isolated="${id}"][data-mui-scheme="dark"]`;
        expect(selectors[0]).to.equal(`&:where(${marker}, ${marker} *)`);
        expect(selectors[1]).to.equal(selectors[0]);
      });

      it('renders a script that sets the stored mode before hydration', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        const element = (
          <ThemeProvider
            theme={theme}
            isolated
            defaultMode="light"
            modeStorageKey="widget-mode"
            colorSchemeStorageKey="widget-color-scheme"
          >
            <div data-testid="widget" />
          </ThemeProvider>
        );
        const storage: Record<string, string> = { 'widget-mode': 'dark' };
        const localStorage = {
          getItem: (key: string) => storage[key] ?? null,
          setItem: (key: string, value: string) => {
            storage[key] = value;
          },
        };
        const { container, hydrate } = renderToString(element);
        const widget = container.querySelector('[data-testid="widget"]')!.parentElement!;
        const script = widget.querySelector('script')!;
        expect(widget).not.to.have.attribute('data-mui-scheme');
        // Runs the script with the element as `document.currentScript`, as the browser does while it parses the page.
        // eslint-disable-next-line no-new-func
        new Function('document', 'localStorage', script.textContent!)(
          { currentScript: script },
          localStorage,
        );
        expect(widget).to.have.attribute('data-mui-scheme', 'dark');
        const original = Object.getOwnPropertyDescriptor(window, 'localStorage');
        Object.defineProperty(window, 'localStorage', { value: localStorage, configurable: true });
        try {
          hydrate();
        } finally {
          if (original) {
            Object.defineProperty(window, 'localStorage', original);
          }
        }
        expect(widget).to.have.attribute('data-mui-scheme', 'dark');
      });

      it.skipIf(isJsdom())('keeps the color scheme of the page out of its nested providers', () => {
        const theme = createTheme({
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
          <ThemeProvider theme={theme} defaultMode="dark" storageManager={null}>
            <ThemeProvider theme={theme} isolated defaultMode="light">
              <ThemeProvider theme={inner}>
                <div data-testid="inner" />
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(document.documentElement.classList.contains('dark')).to.equal(true);
        expect(getVar(screen.getByTestId('inner'), '--mui-palette-primary-main')).to.equal(
          '#ff0000',
        );
      });

      it.skipIf(isJsdom())('keeps the dark styles of the page out of a light section', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
          components: {
            MuiButton: {
              styleOverrides: {
                root: ({ theme: buttonTheme }) =>
                  buttonTheme.applyStyles('dark', { outlineColor: 'rgb(0, 255, 0)' }),
              },
            },
          },
        });
        render(
          <ThemeProvider theme={theme} defaultMode="dark" storageManager={null}>
            <Button data-testid="page">Page</Button>
            <ThemeProvider theme={theme} isolated defaultMode="light">
              <Button data-testid="section">Section</Button>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(getComputedStyle(screen.getByTestId('page')).outlineColor).to.equal(
          'rgb(0, 255, 0)',
        );
        expect(getComputedStyle(screen.getByTestId('section')).outlineColor).not.to.equal(
          'rgb(0, 255, 0)',
        );
      });

      it.skipIf(isJsdom())('has its own mode under the media selector', () => {
        const theme = createTheme({
          colorSchemes: { light: true, dark: true },
          cssVariables: true,
          components: {
            MuiButton: {
              styleOverrides: {
                root: ({ theme: buttonTheme }) =>
                  buttonTheme.applyStyles('dark', { outlineColor: 'rgb(0, 255, 0)' }),
              },
            },
          },
        });
        expect(theme.colorSchemeSelector).to.equal('media');
        function Toggle() {
          const { setMode } = useColorScheme();
          return (
            <button type="button" data-testid="toggle" onClick={() => setMode('light')}>
              light
            </button>
          );
        }
        render(
          <ThemeProvider theme={theme} isolated defaultMode="dark">
            <Button data-testid="section">Section</Button>
            <Toggle />
          </ThemeProvider>,
        );
        const section = screen.getByTestId('section');
        expect(getVar(section, '--mui-palette-background-default')).to.equal('#121212');
        expect(getComputedStyle(section).outlineColor).to.equal('rgb(0, 255, 0)');
        fireEvent.click(screen.getByTestId('toggle'));
        expect(getVar(section, '--mui-palette-background-default')).to.equal('#fff');
        expect(getComputedStyle(section).outlineColor).not.to.equal('rgb(0, 255, 0)');
      });

      it('only uses the storage for an isolated provider with storage keys', () => {
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
            <ThemeProvider theme={theme} isolated storageWindow={storageWindow}>
              <div />
            </ThemeProvider>
            <ThemeProvider
              theme={theme}
              isolated
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

      it.skipIf(isJsdom())('applies its theme and mode to portaled elements', () => {
        const theme = createTheme({
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
          <ThemeProvider theme={theme} defaultMode="light" storageManager={null}>
            <ThemeProvider theme={theme} isolated defaultMode="dark">
              <Dialog open>
                <div data-testid="section-dialog" />
              </Dialog>
              <ThemeProvider theme={inner}>
                <Dialog open>
                  <div data-testid="nested-dialog" />
                </Dialog>
              </ThemeProvider>
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(
          getVar(screen.getByTestId('section-dialog'), '--mui-palette-background-default'),
        ).to.equal('#121212');
        expect(getVar(screen.getByTestId('nested-dialog'), '--mui-palette-primary-main')).to.equal(
          '#00ff00',
        );
      });

      it('has its own mode when it is nested', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        function Mode(props: { 'data-testid': string }) {
          const { mode, setMode } = useColorScheme();
          return (
            <button type="button" onClick={() => setMode('light')} {...props}>
              {mode}
            </button>
          );
        }
        render(
          <ThemeProvider theme={theme} defaultMode="dark" storageManager={null}>
            <Mode data-testid="page" />
            <ThemeProvider theme={theme} isolated defaultMode="dark">
              <Mode data-testid="section" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        fireEvent.click(screen.getByTestId('section'));
        expect(screen.getByTestId('section')).to.have.text('light');
        expect(screen.getByTestId('page')).to.have.text('dark');
        expect(document.documentElement.classList.contains('dark')).to.equal(true);
        expect(document.documentElement.classList.contains('light')).to.equal(false);
      });

      it('keeps the mode of its nested providers off <html>', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'data' },
          colorSchemes: { light: true, dark: true },
        });
        render(
          <ThemeProvider theme={theme} isolated defaultMode="dark">
            <ThemeProvider theme={redTheme}>
              <div />
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(document.documentElement).not.to.have.attribute('data-dark');
      });

      it('replaces the deprecated disableNestedContext prop', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'data' },
          colorSchemes: { light: true, dark: true },
        });
        expect(() =>
          render(
            <ThemeProvider theme={blueTheme}>
              <ThemeProvider theme={theme} disableNestedContext defaultMode="dark">
                <div data-testid="section" />
              </ThemeProvider>
            </ThemeProvider>,
          ),
        ).toWarnDev('MUI: The `disableNestedContext` prop is deprecated. Use `isolated` instead.');
        expect(screen.getByTestId('section').parentElement).to.have.attribute(
          'data-mui-scheme',
          'dark',
        );
        expect(document.documentElement).not.to.have.attribute('data-dark');
      });

      it('warns when a nested provider gets defaultMode without isolated', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        expect(() =>
          render(
            <ThemeProvider theme={theme} storageManager={null}>
              <ThemeProvider theme={theme} defaultMode="dark">
                <div />
              </ThemeProvider>
            </ThemeProvider>,
          ),
        ).toWarnDev('MUI: The `defaultMode` prop of a nested ThemeProvider has no effect');
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

    it('renders no element for the top-level provider', () => {
      const { container } = render(
        <ThemeProvider theme={redTheme}>
          <div data-testid="first" />
          <div />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('first').parentElement).to.equal(container);
    });

    it('exposes the scope class to elements that are portaled by other libraries', () => {
      function Scope() {
        const props = useThemeScope();
        return <div data-testid="scope" {...props} />;
      }
      render(
        <ThemeProvider theme={blueTheme}>
          <ThemeProvider theme={redTheme}>
            <Scope />
          </ThemeProvider>
        </ThemeProvider>,
      );
      const scope = screen.getByTestId('scope');
      expect(scope.className).to.match(/^mui-theme-[a-z0-9]+$/);
      expect(scope.parentElement!.classList.contains(scope.className)).to.equal(true);
    });

    describe('render prop', () => {
      it('renders the element with its props and the scope class', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <table>
              <ThemeProvider
                theme={redTheme}
                render={<tbody className="body" data-testid="body" />}
              >
                <tr>
                  <td data-testid="cell" />
                </tr>
              </ThemeProvider>
            </table>
          </ThemeProvider>,
        );
        const body = screen.getByTestId('body');
        expect(body.tagName).to.equal('TBODY');
        expect(body.className).to.match(/^body mui-theme-[a-z0-9]+$/);
        expect(screen.getByTestId('cell').parentElement!.parentElement).to.equal(body);
      });

      it('keeps the ref of the element', () => {
        const ref = React.createRef<HTMLElement>();
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={redTheme} render={<section ref={ref} />}>
              <div data-testid="inner" />
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(ref.current).to.equal(screen.getByTestId('inner').parentElement);
        expect(ref.current!.tagName).to.equal('SECTION');
      });

      it('calls the function with the props and the state', () => {
        const theme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        });
        const redSchemesTheme = createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: { palette: { primary: { main: '#ff0000' } } }, dark: true },
        });
        let received: any;
        render(
          <ThemeProvider theme={theme} defaultMode="dark" storageManager={null}>
            <ThemeProvider
              theme={redSchemesTheme}
              render={(props, state) => {
                received = { props, state };
                return <li {...props} data-testid="item" />;
              }}
            >
              text
            </ThemeProvider>
          </ThemeProvider>,
        );
        expect(received.props.className).to.match(/^mui-theme-[a-z0-9]+$/);
        expect(received.props.children).to.equal('text');
        expect(received.state).to.deep.equal({ mode: 'dark', colorScheme: 'dark' });
        expect(screen.getByTestId('item').className).to.equal(received.props.className);
      });

      it('logs an error when the element does not get the props', () => {
        expect(() =>
          render(
            <ThemeProvider theme={blueTheme}>
              <ThemeProvider theme={redTheme} render={(props) => <div>{props.children}</div>}>
                <div />
              </ThemeProvider>
            </ThemeProvider>,
          ),
        ).toErrorDev("the element of its `render` prop didn't receive its props");
      });

      it('does not log an error when the variables are the same', () => {
        render(
          <ThemeProvider theme={blueTheme}>
            <ThemeProvider theme={blueTheme} render={(props) => <div>{props.children}</div>}>
              <div />
            </ThemeProvider>
          </ThemeProvider>,
        );
      });

      it('renders the element of the top-level provider and keeps its variables on :root', () => {
        const { container } = render(
          <ThemeProvider theme={redTheme} render={<main data-testid="main" />}>
            <div />
          </ThemeProvider>,
        );
        const main = screen.getByTestId('main');
        expect(main.parentElement).to.equal(container);
        expect(main).not.to.have.attribute('class');
      });

      it('renders the element of a provider whose theme has no CSS theme variables', () => {
        render(
          <ThemeProvider theme={createTheme()} render={<section data-testid="section" />}>
            <div data-testid="inner" />
          </ThemeProvider>,
        );
        expect(screen.getByTestId('inner').parentElement).to.equal(screen.getByTestId('section'));
      });
    });
  });
});
