import { describe, it, expect, afterEach } from 'vitest';
import * as React from 'react';
import { createRenderer, screen, isJsdom, fireEvent } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Popper from '@mui/material/Popper';
import { ThemeProvider, createTheme, useThemeScope } from '@mui/material/styles';

function getVar(element: Element, name: string) {
  return getComputedStyle(element).getPropertyValue(name).trim();
}

const blueTheme = createTheme({ cssVariables: true, palette: { primary: { main: '#0000ff' } } });
const redTheme = createTheme({ cssVariables: true, palette: { primary: { main: '#ff0000' } } });

describe('ThemeProvider with scoped CSS theme variables', () => {
  const { render } = createRenderer();

  afterEach(() => {
    document.documentElement.classList.remove('light', 'dark');
  });

  describe('nested', () => {
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
      expect(getVar(screen.getByTestId('outer'), '--mui-palette-primary-main')).to.equal('#0000ff');
      expect(getVar(screen.getByTestId('inner'), '--mui-palette-primary-main')).to.equal('#ff0000');
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
      expect(getVar(screen.getByTestId('inner'), '--mui-palette-primary-main')).to.equal('#00ff00');
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

    it('does not store the mode of an unnamed scoped provider', () => {
      const theme = createTheme({
        cssVariables: { colorSchemeSelector: 'class' },
        colorSchemes: { light: true, dark: true },
      });
      window.localStorage.removeItem('mui-mode');
      render(
        <ThemeProvider theme={theme} scoped defaultMode="dark">
          <div />
        </ThemeProvider>,
      );
      expect(window.localStorage.getItem('mui-mode')).to.equal(null);
    });

    it('uses the name in the class name', () => {
      render(
        <ThemeProvider theme={redTheme} scoped="widget">
          <div data-testid="widget" />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('widget').className).to.match(/^mui-theme-widget-[a-z0-9]+$/);
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
