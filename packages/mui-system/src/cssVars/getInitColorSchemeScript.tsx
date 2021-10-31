import * as React from 'react';

export const DEFAULT_MODE_STORAGE_KEY = 'mui-mode';
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'mui-color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-mui-color-scheme';

export default function getInitColorSchemeScript(options?: {
  defaultMode?: 'day' | 'night' | 'system';
  defaultDayColorScheme?: string;
  defaultNightColorScheme?: string;
  modeStorageKey?: string;
  colorSchemeStorageKey?: string;
  attribute?: string;
}) {
  const {
    defaultMode = 'day',
    defaultDayColorScheme = 'light',
    defaultNightColorScheme = 'dark',
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    attribute = DEFAULT_ATTRIBUTE,
  } = options || {};
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() { try {
        var mode = localStorage.getItem('${modeStorageKey}');
        var colorScheme = '';
        if (mode === 'system' || (!mode && ${defaultMode} === 'system')) {
          // handle system mode
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (mql.matches) {
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-night') || ${defaultDayColorScheme};
          } else {
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-day') || ${defaultNightColorScheme};
          }
        }
        if (mode === 'day') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-day') || ${defaultDayColorScheme};
        }
        if (mode === 'night') {
          colorScheme = localStorage.getItem('${colorSchemeStorageKey}-night') || ${defaultNightColorScheme};
        }
        if (colorScheme) {
          document.body.setAttribute('${attribute}', colorScheme);
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
