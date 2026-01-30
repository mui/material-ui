import { expect } from 'chai';
import { ThemeContext } from '@mui/styled-engine';
import { createRenderer } from '@mui/internal-test-utils';
import useLayerOrder from './useLayerOrder';

function TestComponent({ theme }: { theme: any }) {
  const LayerOrder = useLayerOrder(theme);
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
});
