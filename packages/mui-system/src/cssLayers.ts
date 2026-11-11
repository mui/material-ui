export type CssLayer = 'global' | 'components' | 'theme' | 'custom' | 'sx';

/**
 * The order of Material UI's sub-layers, from lowest to highest precedence.
 */
export const CSS_LAYER_ORDER = 'mui.global, mui.components, mui.theme, mui.custom, mui.sx';

/**
 * Whether the theme puts Material UI's styles in CSS layers.
 * `createTheme()` always does: it sets `modularCssLayers` to `true`, `false` or a string.
 * A theme object made by hand, without `modularCssLayers`, has no layers.
 */
export function hasCssLayers(theme: any): boolean {
  return theme?.modularCssLayers != null;
}

/**
 * Whether the theme puts all of Material UI's styles in the `mui` layer, without sub-layers.
 */
export function isSingleCssLayer(theme: any): boolean {
  return theme?.modularCssLayers === false;
}

/**
 * Returns the full name of the layer for a kind of styles, such as `mui.sx`, `mui` with
 * `modularCssLayers: false`, or `undefined` when the theme has no layers.
 * Full names work without an Emotion cache that wraps the styles in `@layer mui`.
 */
export function getCssLayer(theme: any, layer: CssLayer): string | undefined {
  if (!hasCssLayers(theme)) {
    return undefined;
  }
  return isSingleCssLayer(theme) ? 'mui' : `mui.${layer}`;
}

/**
 * Returns the sub-layer that one part of a component's styles goes in, such as its theme overrides
 * or its `sx`, or `undefined` when the parts aren't layered one by one. With
 * `modularCssLayers: false`, the component's styles are wrapped in `@layer mui` as a whole, so that
 * they keep v9's order: the declarations of every part come first, and the media queries after them.
 */
export function getCssSubLayer(theme: any, layer: CssLayer): string | undefined {
  return isSingleCssLayer(theme) ? undefined : getCssLayer(theme, layer);
}

/**
 * Opens the `mui` layer around a component's styles with `modularCssLayers: false`, as v9's
 * `enableCssLayer` did, so that the declarations of every part come first and the media queries
 * after them. With sub-layers, each part goes in its own sub-layer instead.
 */
export function styleCssLayerStart(props: { theme?: any }) {
  return isSingleCssLayer(props.theme) ? '@layer mui{' : null;
}

/**
 * Closes the layer that `styleCssLayerStart` opens.
 */
export function styleCssLayerEnd(props: { theme?: any }) {
  return isSingleCssLayer(props.theme) ? '}' : null;
}

/**
 * Returns the statement that declares the order of the theme's layers, or `''` if there's none.
 * A `modularCssLayers` string sets where `mui` goes among the app's layers.
 * With `modularCssLayers: false`, nothing is declared: as with v9's `enableCssLayer`, `mui` takes
 * its place among the app's layers when its first style is inserted. Declaring it at the start of
 * `<head>` would make it the lowest layer.
 */
export function getCssLayerOrderStatement(theme: any): string {
  if (!hasCssLayers(theme) || isSingleCssLayer(theme)) {
    return '';
  }
  const { modularCssLayers } = theme;
  if (typeof modularCssLayers === 'string') {
    return modularCssLayers.replace(/mui(?!\.)/g, CSS_LAYER_ORDER);
  }
  return `@layer ${CSS_LAYER_ORDER};`;
}

/**
 * Whether CSS is already in Material UI's layer or one of its sub-layers, such as `@layer mui{…}`
 * or `@layer mui.sx{…}`.
 */
export function isInMuiCssLayer(css: string): boolean {
  return /^@layer mui[.{]/.test(css);
}

/**
 * Returns the `modularCssLayers` value of a theme created with `createTheme()`. CSS layers can't be
 * turned off, so it's `true` (sub-layers), `false` (a single `mui` layer) or a string (sub-layers
 * in a custom order).
 */
export function resolveModularCssLayers(modularCssLayers: unknown): boolean | string {
  return modularCssLayers === false || typeof modularCssLayers === 'string'
    ? modularCssLayers
    : true;
}

// Splits CSS into its top-level rules: statements such as `@import …;` and blocks such as `a {…}`.
// Skips braces and semicolons in strings, comments and escapes.
function splitTopLevelRules(css: string): string[] {
  const rules: string[] = [];
  let depth = 0;
  let start = 0;
  let quote: string | null = null;
  for (let index = 0; index < css.length; index += 1) {
    const char = css[index];
    if (char === '\\') {
      index += 1;
    } else if (quote) {
      if (char === quote) {
        quote = null;
      }
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '/' && css[index + 1] === '*') {
      const end = css.indexOf('*/', index + 2);
      index = end === -1 ? css.length : end + 1;
    } else if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        rules.push(css.slice(start, index + 1));
        start = index + 1;
      }
    } else if (char === ';' && depth === 0) {
      rules.push(css.slice(start, index + 1));
      start = index + 1;
    }
  }
  if (start < css.length) {
    rules.push(css.slice(start));
  }
  return rules;
}

// Rules that stay at the top level: the app's own layers and layer order statements, and at-rules
// that are invalid inside a layer block.
const TOP_LEVEL_RULE = /^@(layer|import|charset|namespace)\b/i;

/**
 * Wraps CSS in a layer block, such as `@layer mui.global{…}`, but keeps the app's own `@layer`
 * blocks and statements, `@import`, `@charset` and `@namespace` at the top level. The rules in
 * between are wrapped in runs, so their order doesn't change.
 */
export function wrapInCssLayer(css: string, layerName: string): string {
  let result = '';
  let run = '';
  const flush = () => {
    if (run.trim()) {
      result += `@layer ${layerName}{${run}}`;
    }
    run = '';
  };
  splitTopLevelRules(css).forEach((rule) => {
    if (TOP_LEVEL_RULE.test(rule.trim())) {
      flush();
      result += rule;
    } else {
      run += rule;
    }
  });
  flush();
  return result;
}

/**
 * Creates a style function that declares the order of the sub-layers ahead of a component's
 * layered styles, for apps without a `ThemeProvider`: that's when the component gets the default
 * theme. A `ThemeProvider` declares the order once instead (see `useLayerOrder`).
 * Repeating the statement is harmless, it only costs a few bytes per component.
 */
export function createStyleCssLayerOrder(defaultTheme: unknown) {
  return function styleCssLayerOrder(props: { theme?: any }) {
    return (props.theme === defaultTheme && getCssLayerOrderStatement(props.theme)) || null;
  };
}
