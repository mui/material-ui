import * as React from 'react';

export const DEFAULT_MODE_STORAGE_KEY = 'mode';
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-color-scheme';

export interface GetInitColorSchemeScriptOptions {
  /**
   * Indicate to the browser which color scheme is used (light or dark) for rendering built-in UI
   * @default true
   */
  enableColorScheme?: boolean;
  /**
   * If `true`, the initial color scheme is set to the user's prefers-color-scheme mode
   * @default false
   */
  enableSystem?: boolean;
  /**
   * The default color scheme to be used on the light mode
   */
  defaultLightColorScheme?: string;
  /**
   * The default color scheme to be used on the dark mode
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
    enableColorScheme = true,
    enableSystem = false,
    defaultLightColorScheme = 'light',
    defaultDarkColorScheme = 'dark',
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
    colorSchemeNode = 'document.documentElement',
  } = options || {};
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() { try {
        var mode = localStorage.getItem('${modeStorageKey}');
        var cssColorScheme = mode;
        var colorScheme = '';
        if (mode === 'system' || (!mode && !!${enableSystem})) {
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
        if (${enableColorScheme} && !!cssColorScheme) {
          ${colorSchemeNode}.style.setProperty('color-scheme', cssColorScheme);
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
