'use client';
import * as React from 'react';

export const DEFAULT_MODE_STORAGE_KEY = 'mode';
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-color-scheme';

export interface InitColorSchemeScriptProps {
  /**
   * The default mode when the storage is empty (user's first visit).
   * @default 'system'
   */
  defaultMode?: 'system' | 'light' | 'dark' | undefined;
  /**
   * The default color scheme to be used on the light mode.
   * @default 'light'
   */
  defaultLightColorScheme?: string | undefined;
  /**
   * The default color scheme to be used on the dark mode.
   * * @default 'dark'
   */
  defaultDarkColorScheme?: string | undefined;
  /**
   * The node (provided as string) used to attach the color-scheme attribute.
   *
   * Requires a static value, do not derive from user input.
   * @default 'document.documentElement'
   */
  colorSchemeNode?: string | undefined;
  /**
   * localStorage key used to store `mode`.
   * @default 'mode'
   */
  modeStorageKey?: string | undefined;
  /**
   * localStorage key used to store `colorScheme`.
   * @default 'color-scheme'
   */
  colorSchemeStorageKey?: string | undefined;
  /**
   * DOM attribute for applying color scheme.
   *
   * Requires a static value, do not derive from user input.
   * @default 'data-color-scheme'
   * @example '.mode-%s' // for class based color scheme
   * @example '[data-mode-%s]' // for data-attribute without '='
   */
  attribute?: 'class' | 'data' | string | undefined;
  /**
   * Nonce string to pass to the inline script for CSP headers.
   */
  nonce?: string | undefined;
}

// React 17 has no `useSyncExternalStore`; spread into a plain object so reading the
// missing property returns `undefined` instead of throwing under strict ESM. See #41190 (comment).
const safeReact = { ...React };
const maybeReactUseSyncExternalStore: undefined | any = safeReact.useSyncExternalStore;

const subscribe = () => () => {};

// Serialize a configuration string into a JS string literal for the inline script. The storage
// keys and default scheme names are the values an app is most likely to derive from
// user/tenant-controlled config, so treat them as data: `JSON.stringify` handles quotes and
// backslashes, and the extra escapes cover what it leaves intact but the HTML/JS parser does
// not — `<` (so `</script>` can't break out of the element) and the U+2028/U+2029 line
// separators (invalid raw inside a JS string).
function serializeScriptValue(value: string) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/**
 * `true` during the server render and the matching hydration render, `false`
 * on every client render afterwards. React warns when a `<script>` is
 * created during a client render (such scripts never execute), so the inline
 * script is only emitted on the server pass and dropped after hydration — the
 * attribute it already set on the document persists. React <18 has no
 * `useSyncExternalStore` and no such warning, so the script is always emitted.
 */
function useIsServerRender() {
  if (maybeReactUseSyncExternalStore === undefined) {
    return true;
  }
  return maybeReactUseSyncExternalStore(
    subscribe,
    () => false,
    () => true,
  );
}

export function buildInitColorSchemeScript(options?: InitColorSchemeScriptProps) {
  const {
    defaultMode = 'system',
    defaultLightColorScheme = 'light',
    defaultDarkColorScheme = 'dark',
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute: initialAttribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = 'document.documentElement',
    nonce,
  } = options || {};
  let setter = '';
  let attribute = initialAttribute;
  if (initialAttribute === 'class') {
    attribute = '.%s';
  }
  if (initialAttribute === 'data') {
    attribute = '[data-%s]';
  }
  if (attribute.startsWith('.')) {
    const selector = attribute.substring(1);
    setter += `${colorSchemeNode}.classList.remove('${selector}'.replace('%s', light), '${selector}'.replace('%s', dark));
      ${colorSchemeNode}.classList.add('${selector}'.replace('%s', colorScheme));`;
  }
  const matches = attribute.match(/\[([^[\]]+)\]/); // case [data-color-scheme='%s'] or [data-color-scheme]
  if (matches) {
    const [attr, value] = matches[1].split('=');
    if (!value) {
      setter += `${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', light));
      ${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', dark));`;
    }
    setter += `
      ${colorSchemeNode}.setAttribute('${attr}'.replace('%s', colorScheme), ${value ? `${value}.replace('%s', colorScheme)` : '""'});`;
  } else if (attribute !== '.%s') {
    setter += `${colorSchemeNode}.setAttribute('${attribute}', colorScheme);`;
  }

  return (
    <script
      key="mui-color-scheme-init"
      suppressHydrationWarning
      nonce={typeof window === 'undefined' ? nonce : ''}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem(${serializeScriptValue(modeStorageKey)}) || ${serializeScriptValue(defaultMode)};
  const dark = localStorage.getItem(${serializeScriptValue(`${colorSchemeStorageKey}-dark`)}) || ${serializeScriptValue(defaultDarkColorScheme)};
  const light = localStorage.getItem(${serializeScriptValue(`${colorSchemeStorageKey}-light`)}) || ${serializeScriptValue(defaultLightColorScheme)};
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${setter}
  }
} catch(e){}})();`,
      }}
    />
  );
}

export default function InitColorSchemeScript(options?: InitColorSchemeScriptProps) {
  const isServerRender = useIsServerRender();
  if (!isServerRender) {
    return null;
  }
  return buildInitColorSchemeScript(options);
}
