import * as React from 'react';

export const DEFAULT_MODE_STORAGE_KEY = 'mode';
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-color-scheme';

export interface GetInitColorSchemeScriptOptions {
  /**
   * The mode to be used for the first visit
   * @default 'light'
   */
  defaultMode?: 'light' | 'dark' | 'system';
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
   */
  attribute?: string;
}

export default function getInitColorSchemeScript(options?: GetInitColorSchemeScriptOptions) {
  const {
    defaultMode = 'light',
    defaultLightColorScheme = 'light',
    defaultDarkColorScheme = 'dark',
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = 'document.documentElement',
  } = options || {};
  return (
    <script
      key="mui-color-scheme-init"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() { try {
        var mode = localStorage.getItem('${modeStorageKey}') || '${defaultMode}';
        var cssColorScheme = mode;
        var colorScheme = '';
        if (mode === 'system') {
          // handle system mode
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (mql.matches) {
            cssColorScheme = 'dark';
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
          } else {
            cssColorScheme = 'light';
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
          }
        }
        if (mode === 'light') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-light') || '${defaultLightColorScheme}';
        }
        if (mode === 'dark') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-dark') || '${defaultDarkColorScheme}';
        }
        if (colorScheme) {
          ${colorSchemeNode}.setAttribute('${attribute}', colorScheme);
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
