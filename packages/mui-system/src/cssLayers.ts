export type CssLayer = 'global' | 'components' | 'theme' | 'custom' | 'sx';

/**
 * The order of Material UI's sub-layers, from lowest to highest precedence.
 */
export const CSS_LAYER_ORDER = 'mui.global, mui.components, mui.theme, mui.custom, mui.sx';

// jsdom and happy-dom don't implement cascade layers: they ignore the rules inside `@layer` blocks.
// The styles stay unlayered there, so that the style assertions of apps' tests keep working.
const isCssLayerSupported =
  typeof navigator === 'undefined' || !/jsdom|HappyDOM/.test(navigator.userAgent);

/**
 * Whether the theme puts Material UI's styles in CSS layers.
 * `createTheme()` always does: it sets `modularCssLayers` to `false`, `true` or a string.
 * A theme object made by hand, without `modularCssLayers`, has no layers, and neither has any theme
 * in jsdom or happy-dom.
 */
export function hasCssLayers(theme: any): boolean {
  return isCssLayerSupported && theme?.modularCssLayers != null;
}

/**
 * Whether the theme puts all of Material UI's styles in the `mui` layer, without sub-layers.
 */
export function isSingleCssLayer(theme: any): boolean {
  return hasCssLayers(theme) && theme.modularCssLayers === false;
}

/**
 * Returns the full name of the layer for a kind of styles, such as `mui.sx`, `mui` without
 * sub-layers, or `undefined` when the theme has no layers.
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
 * or its `sx`, or `undefined` when the parts aren't layered one by one. Without sub-layers, the
 * component's styles are wrapped in `@layer mui` as a whole, so that they keep v9's order: the
 * declarations of every part come first, and the media queries after them.
 */
export function getCssSubLayer(theme: any, layer: CssLayer): string | undefined {
  return isSingleCssLayer(theme) ? undefined : getCssLayer(theme, layer);
}

/**
 * Opens the `mui` layer around a component's styles without sub-layers, as v9's `enableCssLayer`
 * did, so that the declarations of every part come first and the media queries after them.
 * With sub-layers, each part goes in its own sub-layer instead.
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
 * Without sub-layers, nothing is declared: as with v9's `enableCssLayer`, `mui` takes
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
 * turned off, so it's `false` (a single `mui` layer, the default), `true` (sub-layers) or a string
 * (sub-layers in a custom order).
 */
export function resolveModularCssLayers(modularCssLayers: unknown): boolean | string {
  return modularCssLayers === true || typeof modularCssLayers === 'string'
    ? modularCssLayers
    : false;
}

interface TopLevelToken {
  // A rule, such as `@import …;` or `a {…}`, or the comments and whitespace between two rules.
  kind: 'rule' | 'trivia';
  text: string;
}

// Splits CSS into its top-level rules and the comments and whitespace between them. A comment
// between two rules isn't part of the next one. Skips braces and semicolons in strings, comments
// and escapes.
function tokenizeTopLevel(css: string): TopLevelToken[] {
  const tokens: TopLevelToken[] = [];
  let depth = 0;
  let start = 0;
  let quote: string | null = null;
  const push = (end: number, kind: TopLevelToken['kind']) => {
    tokens.push({ kind, text: css.slice(start, end) });
    start = end;
  };
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
      const close = css.indexOf('*/', index + 2);
      const end = close === -1 ? css.length : close + 2;
      if (depth === 0 && css.slice(start, index).trim() === '') {
        push(end, 'trivia');
      }
      index = end - 1;
    } else if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        push(index + 1, 'rule');
      }
    } else if (char === ';' && depth === 0) {
      push(index + 1, 'rule');
    }
  }
  if (start < css.length) {
    push(css.length, css.slice(start).trim() ? 'rule' : 'trivia');
  }
  return tokens;
}

// Rules that stay at the top level: the app's own layers and layer order statements, and at-rules
// that are invalid inside a layer block.
const TOP_LEVEL_RULE = /^@(layer|import|charset|namespace)\b/i;

/**
 * Wraps CSS in a layer block, such as `@layer mui.global{…}`, but keeps the app's own `@layer`
 * blocks and statements, `@import`, `@charset` and `@namespace` at the top level. The rules in
 * between are wrapped in runs, so their order doesn't change. Comments stay with the rule that
 * follows them.
 */
export function wrapInCssLayer(css: string, layerName: string): string {
  let result = '';
  let run = '';
  let trivia = '';
  const flush = () => {
    if (run) {
      result += `@layer ${layerName}{${run}}`;
    }
    run = '';
  };
  tokenizeTopLevel(css).forEach((token) => {
    if (token.kind === 'trivia') {
      trivia += token.text;
    } else if (TOP_LEVEL_RULE.test(token.text.trim())) {
      flush();
      result += trivia + token.text;
      trivia = '';
    } else {
      run += trivia + token.text;
      trivia = '';
    }
  });
  if (run && !trivia.trim()) {
    // Trailing whitespace stays in the layer block.
    run += trivia;
    trivia = '';
  }
  flush();
  return result + trivia;
}
