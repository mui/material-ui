import * as React from 'react';

export const DEFAULT_MODE_STORAGE_KEY = 'mui-mode';
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = 'mui-color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-mui-color-scheme';

export default function getInitColorSchemeScript(options?: {
  defaultMode?: 'day' | 'night' | 'auto';
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
        if (mode === 'auto' || (!mode && ${defaultMode} === 'auto')) {
          // handle system mode
          var mql = window.matchMedia('(prefers-color-scheme: dark)');
          var colorScheme = '';
          if (mql.matches) {
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-night') || ${defaultDayColorScheme};
          } else {
            colorScheme = localStorage.getItem('${colorSchemeStorageKey}-day') || ${defaultNightColorScheme};
          }

          document.body.setAttribute('${attribute}', colorScheme);
        }
        if (mode === 'day') {
          var colorScheme = localStorage.getItem('${colorSchemeStorageKey}-day') || ${defaultDayColorScheme};
          document.body.setAttribute('${attribute}', colorScheme);
        }
        if (mode === 'night') {
          var colorScheme = localStorage.getItem('${colorSchemeStorageKey}-night') || ${defaultNightColorScheme};
          document.body.setAttribute('${attribute}', colorScheme);
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
