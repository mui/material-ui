/**
 * Split this component for RSC import
 */
import * as React from 'react';

export const DEFAULT_MODE_STORAGE_KEY = 'mode';
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-color-scheme';

export interface InitColorSchemeScriptProps {
  /**
   * The default color scheme to be used on the light mode
   * @default 'light'
   */
  defaultLightColorScheme?: string;
  /**
   * The default color scheme to be used on the dark mode
   * * @default 'dark'
   */
  defaultDarkColorScheme?: string;
  /**
   * The node (provided as string) used to attach the color-scheme attribute
   * @default 'document.documentElement'
   */
  colorSchemeNode?: string;
  /**
   * localStorage key used to store `mode`
   * @default 'mode'
   */
  modeStorageKey?: string;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'color-scheme'
   */
  colorSchemeStorageKey?: string;
  /**
   * DOM attribute for applying color scheme
   * @default 'data-color-scheme'
   *
   * @example '.mode-%s' // for class based color scheme
   * @example '[data-mode-%s]' // for data-attribute without '='
   */
  attribute?: 'class' | 'data' | string;
  /**
   * Nonce string to pass to the inline script for CSP headers
   */
  nonce?: string | undefined;
}

export default function InitColorSchemeScript(options?: InitColorSchemeScriptProps) {
  const {
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
  const matches = attribute.match(/\[([^\]]+)\]/); // case [data-color-scheme=%s] or [data-color-scheme]
  if (matches) {
    const [attr, value] = matches[1].split('=');
    if (!value) {
      setter += `${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', light));
      ${colorSchemeNode}.removeAttribute('${attr}'.replace('%s', dark));`;
    }
    setter += `
      ${colorSchemeNode}.setAttribute('${attr}'.replace('%s', colorScheme), ${value ? `${value}.replace('%s', colorScheme)` : '""'});`;
  } else {
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
  var mode = localStorage.getItem('${modeStorageKey}') || 'system';
  var colorScheme = '';
  var dark = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
  var light = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
  if (mode === 'system') {
    // handle system mode
    var mql = window.matchMedia('(prefers-color-scheme: dark)');
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
