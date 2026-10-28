import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useId from '@mui/utils/useId';
import GlobalStyles from '../GlobalStyles';
import useThemeWithoutDefault from '../useThemeWithoutDefault';
import { CSS_LAYER_ORDER, CSS_LAYER_ORDER_STATEMENT, hasCssLayers } from '../cssLayers';

/**
 * This hook returns a `GlobalStyles` component that sets the CSS layer order (for server-side rendering).
 * Then on client-side, it injects the CSS layer order into the document head to ensure that the layer order is always present first before other Emotion styles.
 */
export default function useLayerOrder(engineTheme: any, themeId?: string | undefined) {
  const upperTheme: any = useThemeWithoutDefault();
  const id = useId() || '';
  // With a `themeId`, the theme of the design system is a key of the engine theme.
  const theme = themeId ? (engineTheme[themeId] ?? engineTheme) : engineTheme;
  const { modularCssLayers } = theme;
  // An upper ThemeProvider whose theme has layers declared the order already, or one above it did.
  // When it can't be told, the order is declared again, which is harmless.
  const upperHasLayers =
    upperTheme !== null &&
    (hasCssLayers(upperTheme) || (themeId !== undefined && hasCssLayers(upperTheme[themeId])));

  let layerOrder = CSS_LAYER_ORDER;

  if (!hasCssLayers(theme) || upperHasLayers) {
    layerOrder = '';
  } else if (typeof modularCssLayers === 'string') {
    layerOrder = modularCssLayers.replace(/mui(?!\.)/g, layerOrder);
  } else {
    layerOrder = CSS_LAYER_ORDER_STATEMENT;
  }

  useEnhancedEffect(() => {
    const head = document.querySelector('head');
    if (!head) {
      return;
    }
    const firstChild = head.firstChild as HTMLElement | null;

    if (layerOrder) {
      // Only insert if first child doesn't have data-mui-layer-order attribute
      if (
        firstChild &&
        firstChild.hasAttribute?.('data-mui-layer-order') &&
        firstChild.getAttribute('data-mui-layer-order') === id
      ) {
        return;
      }
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-mui-layer-order', id);
      styleElement.textContent = layerOrder;

      head.prepend(styleElement);
    } else {
      head.querySelector(`style[data-mui-layer-order="${id}"]`)?.remove();
    }
  }, [layerOrder, id]);

  if (!layerOrder) {
    return null;
  }

  return <GlobalStyles styles={layerOrder} />;
}
