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
    enableColorScheme = false,
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
      // DO NOT EDIT HERE, auto-generated from `packages/mui-system/scripts/minify-color-scheme-script.js`
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function(){try{const t=localStorage.getItem,o=t('${modeStorageKey}'),r='${colorSchemeStorageKey}',l=t(r+"-light")||'${defaultLightColorScheme}',c=t(r+"-dark")||'${defaultDarkColorScheme}';let m=o,a="";if("system"===o||!o&&${enableSystem}){window.matchMedia("(prefers-color-scheme: dark)").matches?(m="dark",a=c):(m="light",a=l)}"light"===o&&(a=l),"dark"===o&&(a=c),a&&${colorSchemeNode}.setAttribute('${attribute}',a),${enableColorScheme}&&m&&${colorSchemeNode}.style.setProperty("color-scheme",m)}catch(e){}})();`,
      }}
    />
  );
}
