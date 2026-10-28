export type CssLayer = 'global' | 'components' | 'theme' | 'custom' | 'sx';

/**
 * The order of Material UI's sub-layers, from lowest to highest precedence.
 */
export const CSS_LAYER_ORDER = 'mui.global, mui.components, mui.theme, mui.custom, mui.sx';

/**
 * Declares the order of Material UI's sub-layers.
 */
export const CSS_LAYER_ORDER_STATEMENT = `@layer ${CSS_LAYER_ORDER};`;

/**
 * Whether the theme puts Material UI's styles in CSS layers.
 * `createTheme()` turns them on by default, and `cssLayers: false` opts out.
 * A theme object made by hand opts in with `modularCssLayers`, as in v9.
 */
export function hasCssLayers(theme: any): boolean {
  return theme?.cssLayers ?? Boolean(theme?.modularCssLayers);
}

/**
 * Returns the full name of a sub-layer, such as `mui.sx`, or `undefined` when layers are off.
 * Full names work without an Emotion cache that wraps the styles in `@layer mui`.
 */
export function getCssLayer(theme: any, layer: CssLayer): string | undefined {
  return hasCssLayers(theme) ? `mui.${layer}` : undefined;
}

/**
 * Creates a style function that declares the order of the sub-layers ahead of a component's
 * layered styles, for apps without a `ThemeProvider`: that's when the component gets the default
 * theme. A `ThemeProvider` declares the order once instead (see `useLayerOrder`).
 * Repeating the statement is harmless, it only costs a few bytes per component.
 */
export function createStyleCssLayerOrder(defaultTheme: unknown) {
  return function styleCssLayerOrder(props: { theme?: any }) {
    return props.theme === defaultTheme && hasCssLayers(props.theme)
      ? CSS_LAYER_ORDER_STATEMENT
      : null;
  };
}
