import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import CssVarsInjector from './CssVarsInjector';

const makeTheme = (sheets: Array<Record<string, any>> = [], cssVarPrefix?: string) => ({
  generateStyleSheets: () => sheets,
  cssVarPrefix,
});

const DEFAULT_STYLE_ID = 'mui-css-vars';
const STYLE_ID = DEFAULT_STYLE_ID;

function getStyleId(cssVarPrefix?: string) {
  return cssVarPrefix ? `${cssVarPrefix}-css-vars` : DEFAULT_STYLE_ID;
}

describe('CssVarsInjector', () => {
  const { render } = createRenderer();

  afterEach(() => {
    // Clean up any injected <style> tags between tests
    document.querySelectorAll('[id$="-css-vars"]').forEach((el) => el.remove());
  });

  it('injects a <style> tag into <head> on mount', () => {
    const theme = makeTheme([{ ':root': { '--mui-spacing': '8px' } }]);
    render(<CssVarsInjector theme={theme} />);

    const style = document.getElementById(STYLE_ID);
    expect(style).not.to.equal(null);
    expect(style!.parentNode).to.equal(document.head);
  });

  it('renders null into the React tree (no <style> inside the container)', () => {
    const theme = makeTheme([{ ':root': { '--mui-spacing': '8px' } }]);
    const { container } = render(<CssVarsInjector theme={theme} />);

    expect(container.querySelector(`#${STYLE_ID}`)).to.equal(null);
  });

  it('sets textContent to the serialized CSS', () => {
    const theme = makeTheme([
      { ':root': { '--mui-spacing': '8px', '--mui-zIndex-modal': '1300' } },
    ]);
    render(<CssVarsInjector theme={theme} />);

    const style = document.getElementById(STYLE_ID)!;
    expect(style.textContent).to.include('--mui-spacing: 8px');
    expect(style.textContent).to.include('--mui-zIndex-modal: 1300');
  });

  it('does not create a duplicate tag on re-render', () => {
    const theme = makeTheme([{ ':root': { '--mui-spacing': '8px' } }]);
    const { rerender } = render(<CssVarsInjector theme={theme} />);
    rerender(<CssVarsInjector theme={theme} />);

    const tags = document.head.querySelectorAll(`#${STYLE_ID}`);
    expect(tags.length).to.equal(1);
  });

  it('updates textContent when the theme changes', () => {
    const theme1 = makeTheme([{ ':root': { '--mui-spacing': '8px' } }]);
    const theme2 = makeTheme([{ ':root': { '--mui-spacing': '16px' } }]);

    const { rerender } = render(<CssVarsInjector theme={theme1} />);
    expect(document.getElementById(STYLE_ID)!.textContent).to.include('--mui-spacing: 8px');

    rerender(<CssVarsInjector theme={theme2} />);
    expect(document.getElementById(STYLE_ID)!.textContent).to.include('--mui-spacing: 16px');
  });

  it('moves an existing tag from the React tree into <head>', () => {
    // Simulate an SSR-rendered <style> that landed inside the document body
    // (as Next.js Pages Router places it inside #__next).
    const existingStyle = document.createElement('style');
    existingStyle.id = STYLE_ID;
    existingStyle.textContent = ':root { --mui-spacing: 8px; }';
    document.body.appendChild(existingStyle);

    const theme = makeTheme([{ ':root': { '--mui-spacing': '8px' } }]);
    render(<CssVarsInjector theme={theme} />);

    const style = document.getElementById(STYLE_ID);
    expect(style!.parentNode).to.equal(document.head);
    expect(document.body.querySelector(`#${STYLE_ID}`)).to.equal(null);
  });

  it('sets the nonce attribute when provided', () => {
    const theme = makeTheme([{ ':root': { '--mui-spacing': '8px' } }]);
    render(<CssVarsInjector theme={theme} nonce="abc123" />);

    const style = document.getElementById(STYLE_ID)!;
    expect(style.getAttribute('nonce')).to.equal('abc123');
  });

  it('handles an empty generateStyleSheets result without error', () => {
    const theme = makeTheme([]);
    render(<CssVarsInjector theme={theme} />);

    const style = document.getElementById(STYLE_ID);
    expect(style).not.to.equal(null);
    expect(style!.textContent).to.equal('');
  });

  it('handles a theme without generateStyleSheets without error', () => {
    render(<CssVarsInjector theme={{}} />);

    const style = document.getElementById(STYLE_ID);
    expect(style).not.to.equal(null);
    expect(style!.textContent).to.equal('');
  });

  it('uses a per-prefix style ID to avoid collisions between multiple demos', () => {
    const themeA = makeTheme([{ ':root': { '--a-spacing': '8px' } }], 'a');
    const themeB = makeTheme([{ ':root': { '--b-spacing': '16px' } }], 'b');

    render(<CssVarsInjector theme={themeA} />);
    render(<CssVarsInjector theme={themeB} />);

    const styleA = document.getElementById(getStyleId('a'))!;
    const styleB = document.getElementById(getStyleId('b'))!;
    expect(styleA).not.to.equal(null);
    expect(styleB).not.to.equal(null);
    expect(styleA.textContent).to.include('--a-spacing: 8px');
    expect(styleB.textContent).to.include('--b-spacing: 16px');
    // Neither should have overwritten the other
    expect(styleA.textContent).not.to.include('--b-spacing');
    expect(styleB.textContent).not.to.include('--a-spacing');
  });

  it('injects into the provided documentNode (iframe scenario)', () => {
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument!;

    const theme = makeTheme([{ ':root': { '--mui-spacing': '8px' } }]);
    render(<CssVarsInjector theme={theme} documentNode={iframeDoc} />);

    expect(iframeDoc.getElementById(STYLE_ID)).not.to.equal(null);
    expect(iframeDoc.getElementById(STYLE_ID)!.parentNode).to.equal(iframeDoc.head);
    // Top-level document must not have it
    expect(document.getElementById(STYLE_ID)).to.equal(null);

    document.body.removeChild(iframe);
  });
});
