import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen, isJsdom } from '@mui/internal-test-utils';
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

  describe('nested', () => {
    it('wraps the children in a scoped element when the variables differ', () => {
      render(
        <ThemeProvider theme={blueTheme}>
          <div data-testid="outer">
            <ThemeProvider theme={redTheme}>
              <div data-testid="inner" />
            </ThemeProvider>
          </div>
        </ThemeProvider>,
      );
      const wrapper = screen.getByTestId('inner').parentElement!;
      expect(wrapper).not.to.equal(screen.getByTestId('outer'));
      expect(wrapper.className).to.match(/^mui-theme-[a-z0-9]+$/);
      expect(wrapper.style.display).to.equal('contents');
    });

    it('renders no element when the theme is the same', () => {
      render(
        <ThemeProvider theme={blueTheme}>
          <div data-testid="outer">
            <ThemeProvider theme={blueTheme}>
              <div data-testid="inner" />
            </ThemeProvider>
          </div>
        </ThemeProvider>,
      );
      expect(screen.getByTestId('inner').parentElement).to.equal(screen.getByTestId('outer'));
    });

    it('renders no element when the theme only changes component defaults', () => {
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
      expect(screen.getByTestId('inner').parentElement).to.equal(screen.getByTestId('outer'));
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
            <Dialog open>
              <div data-testid="dialog-content" />
            </Dialog>
            <Anchored />
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
      document.documentElement.classList.remove('dark');
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

    it('uses the name in the class name', () => {
      render(
        <ThemeProvider theme={redTheme} scoped="widget">
          <div data-testid="widget" />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('widget').parentElement!.className).to.match(
        /^mui-theme-widget-[a-z0-9]+$/,
      );
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

  it('renders the `component` with the scope class', () => {
    render(
      <ThemeProvider theme={blueTheme}>
        <ThemeProvider theme={redTheme} component="section" className="promo">
          <div data-testid="inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const section = screen.getByTestId('inner').parentElement!;
    expect(section.tagName).to.equal('SECTION');
    expect(section.className).to.match(/^mui-theme-[a-z0-9]+ promo$/);
    expect(section.style.display).to.equal('');
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
    expect(screen.getByTestId('scope').className).to.equal(
      screen.getByTestId('scope').parentElement!.className,
    );
  });
});
