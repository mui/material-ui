import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { createTheme } from '@mui/material/styles';
import CssThemeProvider from './CssThemeProvider';
import useTheme from './useTheme';

describe('CssThemeProvider', () => {
  const { render } = createRenderer();

  afterEach(() => {
    document.querySelectorAll('[id$="-css-vars"]').forEach((el) => el.remove());
  });

  it('throws when the theme was not created with cssVariables: true', () => {
    const theme = createTheme();
    expect(() => render(<CssThemeProvider theme={theme}>{null}</CssThemeProvider>)).toErrorDev([
      'MUI: CssThemeProvider requires a theme created with `cssVariables: true`',
    ]);
  });

  it('throws when passed a theme function', () => {
    const themeFn = () => createTheme({ cssVariables: true });
    expect(() => render(<CssThemeProvider theme={themeFn}>{null}</CssThemeProvider>)).toErrorDev([
      'MUI: CssThemeProvider does not accept a theme function',
    ]);
  });

  it('injects CSS variables into <head>', () => {
    const theme = createTheme({ cssVariables: true });
    render(
      <CssThemeProvider theme={theme}>
        <div />
      </CssThemeProvider>,
    );
    const style = document.getElementById('mui-css-vars');
    expect(style).not.to.equal(null);
    expect(style!.textContent).to.include('--mui-palette-primary-main');
  });

  it('makes the theme available via useTheme()', () => {
    const theme = createTheme({
      cssVariables: true,
      palette: { primary: { main: '#ff0000' } },
    });
    let observed: any;
    function Probe() {
      observed = useTheme();
      return null;
    }
    render(
      <CssThemeProvider theme={theme}>
        <Probe />
      </CssThemeProvider>,
    );
    // Theme is wrapped in CSS-vars mode — palette values are var() strings,
    // but transitions/breakpoints/spacing/etc. remain plain JS values.
    expect(observed).not.to.equal(undefined);
    expect(observed.breakpoints).to.be.an('object');
    expect(observed.spacing(2)).to.equal('16px');
    expect(observed.transitions.duration.shortest).to.equal(150);
  });

  it('uses the cssVarPrefix to namespace the injected <style> id', () => {
    const theme = createTheme({ cssVariables: { cssVarPrefix: 'demo' } });
    render(
      <CssThemeProvider theme={theme}>
        <div />
      </CssThemeProvider>,
    );
    expect(document.getElementById('demo-css-vars')).not.to.equal(null);
    expect(document.getElementById('mui-css-vars')).to.equal(null);
  });
});
