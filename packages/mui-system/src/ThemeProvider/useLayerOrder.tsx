import GlobalStyles from '../GlobalStyles';
import useThemeWithoutDefault from '../useThemeWithoutDefault';
import { getCssLayerOrderStatement } from '../cssLayers';

/**
 * Returns a `GlobalStyles` component that declares the order of the sub-layers.
 * The statement goes with Material UI's other styles, on the server and on the client, so `mui`
 * takes the same place among the app's layers before and after hydration, as with a single layer.
 */
export default function useLayerOrder(engineTheme: any, themeId?: string | undefined) {
  const upperTheme: any = useThemeWithoutDefault();
  // With a `themeId`, the theme of the design system is a key of the engine theme.
  const theme = themeId ? (engineTheme[themeId] ?? engineTheme) : engineTheme;
  // An upper ThemeProvider whose theme has an order declared it already, or one above it did.
  // When it can't be told, the order is declared again, which is harmless.
  const upperDeclaredOrder =
    upperTheme !== null &&
    (getCssLayerOrderStatement(upperTheme) !== '' ||
      (themeId !== undefined && getCssLayerOrderStatement(upperTheme[themeId]) !== ''));

  const layerOrder = upperDeclaredOrder ? '' : getCssLayerOrderStatement(theme);

  if (!layerOrder) {
    return null;
  }

  return <GlobalStyles styles={layerOrder} />;
}
