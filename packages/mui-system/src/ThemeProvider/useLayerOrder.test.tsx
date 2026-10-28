import { describe, afterEach, it, expect } from 'vitest';
import { ThemeContext } from '@mui/styled-engine';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createRenderer } from '@mui/internal-test-utils';
import useLayerOrder from './useLayerOrder';

function TestComponent({ theme, themeId }: { theme: any; themeId?: string }) {
  const LayerOrder = useLayerOrder(theme, themeId);
  return LayerOrder;
}

describe('useLayerOrder', () => {
  const { render } = createRenderer();

  afterEach(() => {
    // Clean up any injected style tags
    document.querySelectorAll('style[data-mui-layer-order]').forEach((el) => el.remove());
  });

  it('attach layer order', () => {
    const theme = { modularCssLayers: true };
    render(<TestComponent theme={theme} />);
    expect(document.head.firstChild).not.to.equal(null);
    expect(document.head.firstChild?.textContent).to.contain(
      '@layer mui.global, mui.components, mui.theme, mui.custom, mui.sx;',
    );
  });

  it('custom layer order string', () => {
    const theme = { modularCssLayers: '@layer theme, base, mui, utilities;' };
    render(<TestComponent theme={theme} />);
    expect(document.head.firstChild?.textContent).to.contain(
      '@layer theme, base, mui.global, mui.components, mui.theme, mui.custom, mui.sx, utilities;',
    );
  });

  it('does not replace nested layer', () => {
    const theme = { modularCssLayers: '@layer theme, base, mui.unknown, utilities;' };
    render(<TestComponent theme={theme} />);
    expect(document.head.firstChild?.textContent).to.contain(
      '@layer theme, base, mui.unknown, utilities;',
    );
  });

  it('sets the nonce of the Emotion cache on the layer order style tag', () => {
    const cache = createCache({ key: 'nonce-test', nonce: 'test-nonce' });
    render(
      <CacheProvider value={cache}>
        <TestComponent theme={{ modularCssLayers: true }} />
      </CacheProvider>,
    );
    const styleElement = document.head.firstChild as HTMLStyleElement;
    expect(styleElement.hasAttribute('data-mui-layer-order')).to.equal(true);
    expect(styleElement.nonce).to.equal('test-nonce');
  });

  it('returns null if modularCssLayers is falsy', () => {
    render(<TestComponent theme={{}} />);
    expect(document.head.firstChild?.nodeName).not.to.equal('STYLE');
  });

  it('do nothing if upperTheme exists to avoid duplicate elements', () => {
    render(
      <ThemeContext.Provider value={{ modularCssLayers: true }}>
        <TestComponent theme={{}} />
      </ThemeContext.Provider>,
    );
    expect(document.head.firstChild?.nodeName).not.to.equal('STYLE');
  });

  it('does not declare the order again under an upper theme with layers', () => {
    render(
      <ThemeContext.Provider value={{ modularCssLayers: true }}>
        <TestComponent theme={{ modularCssLayers: true }} />
      </ThemeContext.Provider>,
    );
    expect(document.querySelectorAll('style[data-mui-layer-order]').length).to.equal(0);
  });

  it('declares the order under an upper theme without layers', () => {
    render(
      <ThemeContext.Provider value={{ cssLayers: false }}>
        <TestComponent theme={{ cssLayers: true }} />
      </ThemeContext.Provider>,
    );
    expect(document.head.firstChild?.textContent).to.contain(
      '@layer mui.global, mui.components, mui.theme, mui.custom, mui.sx;',
    );
  });

  it('reads the theme of the themeId', () => {
    render(<TestComponent theme={{ $$material: { cssLayers: true } }} themeId="$$material" />);
    expect(document.head.firstChild?.textContent).to.contain(
      '@layer mui.global, mui.components, mui.theme, mui.custom, mui.sx;',
    );
  });

  it('reads the upper theme of the themeId', () => {
    render(
      <ThemeContext.Provider value={{ $$material: { cssLayers: true } }}>
        <TestComponent theme={{ $$material: { cssLayers: true } }} themeId="$$material" />
      </ThemeContext.Provider>,
    );
    expect(document.querySelectorAll('style[data-mui-layer-order]').length).to.equal(0);
  });
});
