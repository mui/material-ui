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
 * Whether the theme splits the `mui` layer into sub-layers, with `modularCssLayers: true` or a
 * string.
 */
function hasCssSubLayers(theme: any): boolean {
  const modularCssLayers = theme?.modularCssLayers;
  return isCssLayerSupported && (modularCssLayers === true || typeof modularCssLayers === 'string');
}

/**
 * Whether all of Material UI's styles go in the `mui` layer, without sub-layers. That's the default.
 */
export function isSingleCssLayer(theme: any): boolean {
  return isCssLayerSupported && !hasCssSubLayers(theme);
}

/**
 * Returns the full name of the layer for a kind of styles: `mui`, or a sub-layer such as `mui.sx`.
 * Returns `undefined` in jsdom and happy-dom, where the styles aren't layered.
 */
export function getCssLayer(theme: any, layer: CssLayer): string | undefined {
  if (!isCssLayerSupported) {
    return undefined;
  }
  return hasCssSubLayers(theme) ? `mui.${layer}` : 'mui';
}

/**
 * Returns the sub-layer that one part of a component's styles goes in, such as its theme overrides
 * or its `sx`, or `undefined` when the parts aren't layered one by one. Without sub-layers, the
 * component's styles are wrapped in `@layer mui` as a whole, so that they keep v9's order: the
 * declarations of every part come first, and the media queries after them.
 */
export function getCssSubLayer(theme: any, layer: CssLayer): string | undefined {
  return hasCssSubLayers(theme) ? `mui.${layer}` : undefined;
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
  if (!hasCssSubLayers(theme)) {
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
