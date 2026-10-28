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
    return props.theme === defaultTheme && hasCssLayers(props.theme)
      ? CSS_LAYER_ORDER_STATEMENT
      : null;
  };
}
