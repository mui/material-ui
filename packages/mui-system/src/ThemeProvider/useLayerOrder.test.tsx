import { describe, it, expect } from 'vitest';
import { ThemeContext } from '@mui/styled-engine';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import useLayerOrder from './useLayerOrder';

function TestComponent({ theme, themeId }: { theme: any; themeId?: string }) {
  const LayerOrder = useLayerOrder(theme, themeId);
  return LayerOrder;
}

const SUB_LAYERS = 'mui.global,mui.components,mui.theme,mui.custom,mui.sx';

// The layer order statements in the document, as Emotion serialized them.
function getLayerOrders() {
  return Array.from(document.querySelectorAll('style'))
    .map((element) => element.textContent?.trim() ?? '')
    .filter((css) => /^@layer [^{]*;$/.test(css));
}

// The styles aren't layered in jsdom.
describe.skipIf(isJsdom())('useLayerOrder', () => {
  const { render } = createRenderer();

  it('attach layer order', () => {
    const theme = { modularCssLayers: true };
    render(<TestComponent theme={theme} />);
    expect(getLayerOrders()).to.deep.equal([`@layer ${SUB_LAYERS};`]);
  });

  it("declares the order with the other styles, after the app's CSS", () => {
    const appStyles = document.createElement('style');
    appStyles.textContent = '@layer reset;';
    document.head.append(appStyles);
    try {
      render(<TestComponent theme={{ modularCssLayers: true }} />);
      // On the server, the statement also comes after the app's CSS, so the order doesn't change
      // at hydration.
      expect(getLayerOrders()).to.deep.equal(['@layer reset;', `@layer ${SUB_LAYERS};`]);
    } finally {
      appStyles.remove();
    }
  });

  it('custom layer order string', () => {
    const theme = { modularCssLayers: '@layer theme, base, mui, utilities;' };
    render(<TestComponent theme={theme} />);
    expect(getLayerOrders()).to.deep.equal([`@layer theme,base,${SUB_LAYERS},utilities;`]);
  });

  it('does not replace nested layer', () => {
    const theme = { modularCssLayers: '@layer theme, base, mui.unknown, utilities;' };
    render(<TestComponent theme={theme} />);
    expect(getLayerOrders()).to.deep.equal(['@layer theme,base,mui.unknown,utilities;']);
  });

  it('sets the nonce of the Emotion cache on the layer order style tag', () => {
    const cache = createCache({ key: 'nonce-test', nonce: 'test-nonce' });
    render(
      <CacheProvider value={cache}>
        <TestComponent theme={{ modularCssLayers: true }} />
      </CacheProvider>,
    );
    const styleElement = Array.from(document.querySelectorAll('style')).find(
      (element) => element.textContent === `@layer ${SUB_LAYERS};`,
    )!;
    expect(styleElement.nonce).to.equal('test-nonce');
  });

  it("declares the order in the Emotion cache's container, such as a shadow root", () => {
    const host = document.createElement('div');
    document.body.append(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const cache = createCache({ key: 'shadow', container: shadowRoot });
    try {
      render(
        <CacheProvider value={cache}>
          <TestComponent theme={{ modularCssLayers: true }} />
        </CacheProvider>,
      );
      const orders = Array.from(shadowRoot.querySelectorAll('style')).map(
        (element) => element.textContent,
      );
      expect(orders).to.deep.equal([`@layer ${SUB_LAYERS};`]);
      expect(getLayerOrders()).to.deep.equal([]);
    } finally {
      host.remove();
    }
  });

  it('returns null if modularCssLayers is falsy', () => {
    render(<TestComponent theme={{}} />);
    expect(getLayerOrders()).to.deep.equal([]);
  });

  it('do nothing if upperTheme exists to avoid duplicate elements', () => {
    render(
      <ThemeContext.Provider value={{ modularCssLayers: true }}>
        <TestComponent theme={{}} />
      </ThemeContext.Provider>,
    );
    expect(getLayerOrders()).to.deep.equal([]);
  });

  it('does not declare the order again under an upper theme with sub-layers', () => {
    render(
      <ThemeContext.Provider value={{ modularCssLayers: true }}>
        <TestComponent theme={{ modularCssLayers: true }} />
      </ThemeContext.Provider>,
    );
    expect(getLayerOrders()).to.deep.equal([]);
  });

  it('declares the order under an upper theme without modularCssLayers', () => {
    render(
      <ThemeContext.Provider value={{ direction: 'ltr' }}>
        <TestComponent theme={{ modularCssLayers: true }} />
      </ThemeContext.Provider>,
    );
    expect(getLayerOrders()).to.deep.equal([`@layer ${SUB_LAYERS};`]);
  });

  it('declares no order with a single layer', () => {
    render(<TestComponent theme={{ modularCssLayers: false }} />);
    expect(getLayerOrders()).to.deep.equal([]);
  });

  it('declares the sub-layers under an upper theme with a single layer', () => {
    render(
      <ThemeContext.Provider value={{ modularCssLayers: false }}>
        <TestComponent theme={{ modularCssLayers: true }} />
      </ThemeContext.Provider>,
    );
    expect(getLayerOrders()).to.deep.equal([`@layer ${SUB_LAYERS};`]);
  });

  it('declares no order with a single layer under an upper theme with sub-layers', () => {
    render(
      <ThemeContext.Provider value={{ modularCssLayers: true }}>
        <TestComponent theme={{ modularCssLayers: false }} />
      </ThemeContext.Provider>,
    );
    expect(getLayerOrders()).to.deep.equal([]);
  });

  it('reads the theme of the themeId', () => {
    render(
      <TestComponent theme={{ $$material: { modularCssLayers: true } }} themeId="$$material" />,
    );
    expect(getLayerOrders()).to.deep.equal([`@layer ${SUB_LAYERS};`]);
  });

  it('reads the upper theme of the themeId', () => {
    render(
      <ThemeContext.Provider value={{ $$material: { modularCssLayers: true } }}>
        <TestComponent theme={{ $$material: { modularCssLayers: true } }} themeId="$$material" />
      </ThemeContext.Provider>,
    );
    expect(getLayerOrders()).to.deep.equal([]);
  });
});
