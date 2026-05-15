import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import CssVarsInjector from './CssVarsInjector';

const makeTheme = (sheets: Array<Record<string, any>> = []) => ({
  generateStyleSheets: () => sheets,
});

const STYLE_ID = 'mui-css-vars';

describe('CssVarsInjector', () => {
  const { render } = createRenderer();

  afterEach(() => {
    // Clean up any injected <style> tag between tests
    document.getElementById(STYLE_ID)?.remove();
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
});
