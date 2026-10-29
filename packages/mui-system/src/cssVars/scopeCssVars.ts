import * as React from 'react';
import clsx from 'clsx';

type CssDeclarations = Record<string, string | number>;

export interface CssVarsByColorScheme {
  root: CssDeclarations;
  colorSchemes: Array<[string, CssDeclarations]>;
}

/**
 * Turns `theme.colorSchemeSelector` into a rule with a `%s` placeholder for the color scheme,
 * or `'media'`. Returns `undefined` when there's no selector.
 */
function getColorSchemeRule(selector: string | undefined) {
  if (selector === 'class') {
    return '.%s';
  }
  if (selector === 'data') {
    return '[data-%s]';
  }
  if (selector?.startsWith('data-') && !selector.includes('%s')) {
    // 'data-mui-color-scheme' -> '[data-mui-color-scheme="%s"]'
    return `[${selector}="%s"]`;
  }
  return selector;
}

/**
 * Returns the props that make an element match the color scheme rule,
 * e.g. `{ className: 'dark' }` for `.%s` or `{ 'data-mui-color-scheme': 'dark' }`.
 */
export function getColorSchemeProps(
  selector: string | undefined,
  colorScheme: string | undefined,
): Record<string, string> {
  const rule = getColorSchemeRule(selector);
  if (!rule || rule === 'media' || !colorScheme) {
    return {};
  }
  if (rule.startsWith('.')) {
    return { className: rule.substring(1).replace('%s', colorScheme) };
  }
  const matches = rule.replace('%s', colorScheme).match(/\[([^\]]+)\]/);
  if (!matches) {
    return {};
  }
  const [attr, value] = matches[1].split('=');
  return { [attr]: value ? value.replace(/"|'/g, '') : '' };
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

/**
 * Builds the stylesheets that set the CSS theme variables of a theme on a class instead of `:root`,
 * so that only the elements under that class use them.
 *
 * - With `upper`, the theme is nested: only the declarations that differ from `upper` are written,
 *   and the color scheme follows the outer provider, whose rule is on an ancestor (`.dark .scope`)
 *   or, for portaled elements, on the same element (`.scope.dark`).
 * - Without `upper`, all declarations are written, and the color scheme rule is on the scoped element
 *   itself (`.scope.dark`), since the provider manages its own color scheme.
 *
 * Returns `null` when there's nothing to write.
 */
export function createScopedStyleSheets(options: {
  css: CssVarsByColorScheme;
  upper?: CssVarsByColorScheme | undefined;
  colorSchemeSelector: string | undefined;
  prefix: string;
}) {
  const { css, upper, colorSchemeSelector, prefix } = options;
  const rule = getColorSchemeRule(colorSchemeSelector);
  const [defaultScheme, ...otherSchemes] = css.colorSchemes;
  const upperSchemes = upper ? Object.fromEntries(upper.colorSchemes) : {};
  // A theme with a single color scheme uses it whatever the outer color scheme is,
  // so unless the outer theme has a single color scheme too, it's written in full.
  const isForcedScheme = css.colorSchemes.length === 1 && (upper?.colorSchemes.length ?? 0) > 1;

  const root = pickChanged(css.root, upper?.root);
  const schemes: Array<[string, CssDeclarations]> = [];
  if (defaultScheme) {
    const [key, declarations] = defaultScheme;
    const changed = pickChanged(declarations, isForcedScheme ? undefined : upperSchemes[key]);
    schemes.push([key, changed]);
    otherSchemes.forEach(([otherKey, otherDeclarations]) => {
      const otherChanged = pickChanged(otherDeclarations, upperSchemes[otherKey]);
      // The default color scheme's rule applies in every color scheme, so each declaration
      // it writes has to be written again for the other color schemes.
      Object.keys(changed).forEach((declaration) => {
        if (declaration in otherDeclarations) {
          otherChanged[declaration] = otherDeclarations[declaration];
        }
      });
      schemes.push([otherKey, otherChanged]);
    });
  }

  const isEmpty =
    Object.keys(root).length === 0 &&
    schemes.every(([, declarations]) => Object.keys(declarations).length === 0);
  if (isEmpty) {
    return null;
  }

  const className = `${prefix ? `${prefix}-` : ''}theme-${hash(
    JSON.stringify([root, schemes, rule, !!upper]),
  )}`;
  const scope = `.${className}`;

  function getSelector(colorScheme: string) {
    if (!rule) {
      return scope;
    }
    const colorSchemeRule = rule.replace('%s', colorScheme);
    // A portaled element gets the outer scopes' classes too, so the color scheme rule
    // can also be on the scoped element itself.
    return upper
      ? `${colorSchemeRule} ${scope}, ${scope}${colorSchemeRule}`
      : `${scope}${colorSchemeRule}`;
  }

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
      const mode = Object.fromEntries(css.colorSchemes)[key].colorScheme || key;
      styles.push({ [`@media (prefers-color-scheme: ${mode})`]: { [scope]: declarations } });
    } else {
      styles.push({ [getSelector(key)]: declarations });
    }
  });

  return { className, styles };
}

/**
 * Adds the scope that an outer ThemeProvider passed in `props` (`className` and `data-*`),
 * and the provider's own scope, to its single child element.
 * Returns the children unchanged when there's nothing to add or they aren't a single element.
 */
export function applyScopeToChild(
  children: React.ReactNode,
  props: Record<string, any>,
  own?: { className?: string | undefined; attributes?: Record<string, string> | undefined },
): React.ReactNode {
  const forwardedClassName: string | undefined = props.className;
  if (!forwardedClassName && !own?.className) {
    return children;
  }
  if (!React.isValidElement(children) || children.type === React.Fragment) {
    return children;
  }
  const child = children as React.ReactElement<{ className?: string | undefined }>;
  const forwardedAttributes: Record<string, string> = {};
  if (forwardedClassName) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('data-')) {
        forwardedAttributes[key] = props[key];
      }
    });
  }
  return React.cloneElement(child, {
    ...forwardedAttributes,
    ...own?.attributes,
    className: clsx(child.props.className, forwardedClassName, own?.className),
  });
}
