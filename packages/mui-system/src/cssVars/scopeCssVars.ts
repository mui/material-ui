type CssDeclarations = Record<string, string | number>;

export interface CssVarsByColorScheme {
  root: CssDeclarations;
  colorSchemes: Array<[string, CssDeclarations]>;
}

/**
 * The attribute that holds the id of an isolated provider on its element and on its portal roots.
 */
export const ISOLATED_ATTRIBUTE = 'data-mui-isolated';
/**
 * The attribute that holds the color scheme of an isolated provider on its element and on its portal roots.
 */
export const SCHEME_ATTRIBUTE = 'data-mui-scheme';

/**
 * Turns `theme.colorSchemeSelector` into a color scheme rule: a selector with a `%s` placeholder
 * for the color scheme and a `&` placeholder for the element it applies to, e.g. `.%s &`,
 * or `'media'`. Returns `undefined` when there's no selector.
 */
export function getColorSchemeRule(selector: string | undefined): string | undefined {
  if (!selector) {
    return undefined;
  }
  if (selector === 'media') {
    return 'media';
  }
  if (selector === 'class') {
    return '.%s &';
  }
  if (selector === 'data') {
    return '[data-%s] &';
  }
  if (selector.startsWith('data-') && !selector.includes('%s')) {
    // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"] &'
    return `[${selector}="%s"] &`;
  }
  return `${selector} &`;
}

/**
 * The color scheme rule of an isolated provider. It matches the provider's element, which holds the marker,
 * its descendants, and the portal roots that hold the same marker. The id keeps nested and sibling
 * isolated providers apart, and the page's own color scheme selector never matches it.
 */
export function getIsolatedColorSchemeRule(id: string) {
  const marker = `[${ISOLATED_ATTRIBUTE}="${id.replace(/["\\]/g, '\\$&')}"][${SCHEME_ATTRIBUTE}="%s"]`;
  return `&:where(${marker}, ${marker} *)`;
}

/**
 * Creates `theme.getColorSchemeSelector` from a color scheme rule.
 * With `onlyColorScheme`, that color scheme always applies and the other ones never do.
 */
export function createColorSchemeSelectorGetter(
  rule: string | undefined,
  onlyColorScheme?: string,
) {
  return function getColorSchemeSelector(colorScheme: string) {
    if (onlyColorScheme) {
      return colorScheme === onlyColorScheme ? '&' : '&:not(*)';
    }
    if (!rule) {
      return '&';
    }
    if (rule === 'media') {
      return `@media (prefers-color-scheme: ${colorScheme})`;
    }
    return rule.replace(/%s/g, colorScheme);
  };
}

// FNV-1a, enough to give each set of declarations a short and stable class name.
/* eslint-disable no-bitwise */
function hash(value: string) {
  let result = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    result ^= value.charCodeAt(i);
    result = Math.imul(result, 0x01000193);
  }
  return (result >>> 0).toString(36);
}
/* eslint-enable no-bitwise */

function pickChanged(css: CssDeclarations, upperCss: CssDeclarations | undefined) {
  if (!upperCss) {
    return { ...css };
  }
  const result: CssDeclarations = {};
  Object.keys(css).forEach((key) => {
    if (css[key] !== upperCss[key]) {
      result[key] = css[key];
    }
  });
  return result;
}

const VAR_REFERENCE = /var\(\s*(--[^\s,)]+)/g;

/**
 * A variable that references another one through `var()` is computed where it's declared,
 * so when the other one changes on the scope, it has to be declared again there.
 * Adds the declarations that reference the changed ones in `root` and `scheme`, transitively,
 * to `root` or `scheme`, depending on where they're declared.
 */
function addDependents(
  root: CssDeclarations,
  scheme: CssDeclarations,
  allRoot: CssDeclarations,
  allScheme: CssDeclarations,
) {
  const all = { ...allRoot, ...allScheme };
  const dependents: Record<string, string[]> = {};
  Object.keys(all).forEach((key) => {
    const value = all[key];
    if (typeof value === 'string' && value.includes('var(')) {
      value.replace(VAR_REFERENCE, (match, name: string) => {
        (dependents[name] ??= []).push(key);
        return match;
      });
    }
  });
  const queue = [...Object.keys(root), ...Object.keys(scheme)];
  while (queue.length > 0) {
    const name = queue.pop()!;
    dependents[name]?.forEach((key) => {
      const target = key in allScheme ? scheme : root;
      if (!(key in target)) {
        target[key] = all[key];
        queue.push(key);
      }
    });
  }
}

function isEmpty(root: CssDeclarations, schemes: Array<[string, CssDeclarations]>) {
  return (
    Object.keys(root).length === 0 &&
    schemes.every(([, declarations]) => Object.keys(declarations).length === 0)
  );
}

function getClassName(prefix: string, content: unknown) {
  return `${prefix ? `${prefix}-` : ''}theme-${hash(JSON.stringify(content))}`;
}

function pickColorScheme(
  css: CssVarsByColorScheme,
  colorScheme: string | undefined,
): CssVarsByColorScheme {
  if (!colorScheme) {
    return css;
  }
  return { root: css.root, colorSchemes: css.colorSchemes.filter(([key]) => key === colorScheme) };
}

function getMode(css: CssVarsByColorScheme, colorScheme: string) {
  const declarations = Object.fromEntries(css.colorSchemes)[colorScheme];
  return (declarations?.colorScheme as string | undefined) || colorScheme;
}

/**
 * Builds the stylesheets that set the CSS theme variables of a nested theme on a class,
 * so that only the elements under that class use them. Only the declarations that differ from `upper`
 * are written, with the ones that reference them through `var()`,
 * and the color schemes follow the outer provider through `colorSchemeRule`:
 * `.dark .scope` under the top-level provider, the marker of the closest isolated provider under one.
 *
 * With `onlyColorScheme`, the themes are compared as if they only had that color scheme,
 * and it's written without any rule.
 *
 * Returns `null` when there's nothing to write.
 */
export function createScopedStyleSheets(options: {
  css: CssVarsByColorScheme;
  upper: CssVarsByColorScheme;
  colorSchemeRule: string | undefined;
  prefix: string;
  onlyColorScheme?: string | undefined;
}) {
  const { prefix, onlyColorScheme } = options;
  const css = pickColorScheme(options.css, onlyColorScheme);
  const upper = pickColorScheme(options.upper, onlyColorScheme);
  const rule = onlyColorScheme ? undefined : options.colorSchemeRule;
  const [defaultScheme, ...otherSchemes] = css.colorSchemes;
  const upperSchemes = Object.fromEntries(upper.colorSchemes);
  // A theme with a single color scheme uses it whatever the outer color scheme is,
  // so unless the outer theme has a single color scheme too, it's written in full.
  const isForcedScheme = css.colorSchemes.length === 1 && upper.colorSchemes.length > 1;

  const root = pickChanged(css.root, upper.root);
  const schemes: Array<[string, CssDeclarations]> = [];
  if (!defaultScheme) {
    addDependents(root, {}, css.root, {});
  } else {
    const [key, declarations] = defaultScheme;
    const changed = pickChanged(declarations, isForcedScheme ? undefined : upperSchemes[key]);
    addDependents(root, changed, css.root, declarations);
    schemes.push([key, changed]);
    // Without a color scheme rule, nothing selects the other color schemes,
    // and writing them on the scope would override the default one.
    (rule ? otherSchemes : []).forEach(([otherKey, otherDeclarations]) => {
      const otherChanged = pickChanged(otherDeclarations, upperSchemes[otherKey]);
      // The default color scheme's rule applies in every color scheme, so each declaration
      // it writes has to be written again for the other color schemes.
      Object.keys(changed).forEach((declaration) => {
        if (declaration in otherDeclarations) {
          otherChanged[declaration] = otherDeclarations[declaration];
        }
      });
      addDependents(root, otherChanged, css.root, otherDeclarations);
      schemes.push([otherKey, otherChanged]);
    });
  }

  if (isEmpty(root, schemes)) {
    return null;
  }

  const className = getClassName(prefix, [root, schemes, rule]);
  const scope = `.${className}`;

  const styles: Array<Record<string, any>> = [];
  if (Object.keys(root).length) {
    styles.push({ [scope]: root });
  }
  schemes.forEach(([key, declarations], index) => {
    if (!Object.keys(declarations).length) {
      return;
    }
    if (index === 0) {
      styles.push({ [scope]: declarations });
    } else if (rule === 'media') {
      styles.push({
        [`@media (prefers-color-scheme: ${getMode(css, key)})`]: { [scope]: declarations },
      });
    } else {
      styles.push({ [rule!.replace(/%s/g, key).replace(/&/g, scope)]: declarations });
    }
  });

  return { className, styles };
}

/**
 * Builds the stylesheets that set all the CSS theme variables of a theme on a class, for an isolated provider.
 * The color schemes follow the marker on the scoped element itself (`.scope[data-mui-scheme="dark"]`),
 * so the page's color scheme never applies. Until the marker is set, during the server render of a provider
 * in `system` mode, the default light and dark color schemes follow the media query.
 */
export function createIsolatedStyleSheets(options: {
  css: CssVarsByColorScheme;
  prefix: string;
  lightColorScheme: string;
  darkColorScheme: string;
}) {
  const { css, prefix, lightColorScheme, darkColorScheme } = options;
  const [defaultScheme, ...otherSchemes] = css.colorSchemes;
  if (!defaultScheme || isEmpty(css.root, css.colorSchemes)) {
    return null;
  }
  const className = getClassName(prefix, [css, 'isolated', lightColorScheme, darkColorScheme]);
  const scope = `.${className}`;

  const styles: Array<Record<string, any>> = [];
  if (Object.keys(css.root).length) {
    styles.push({ [scope]: css.root });
  }
  styles.push({ [scope]: defaultScheme[1] });
  otherSchemes.forEach(([key, declarations]) => {
    styles.push({ [`${scope}[${SCHEME_ATTRIBUTE}="${key}"]`]: declarations });
  });
  const [defaultKey] = defaultScheme;
  if (defaultKey === lightColorScheme || defaultKey === darkColorScheme) {
    const systemKey = defaultKey === lightColorScheme ? darkColorScheme : lightColorScheme;
    const systemDeclarations = otherSchemes.find(([key]) => key === systemKey)?.[1];
    if (systemDeclarations) {
      styles.push({
        [`@media (prefers-color-scheme: ${getMode(css, systemKey)})`]: {
          [`${scope}:not([${SCHEME_ATTRIBUTE}])`]: systemDeclarations,
        },
      });
    }
  }

  return { className, styles };
}
