import * as React from 'react';

export const DEFAULT_STORAGE_KEY = 'mui-color-scheme';
export const DEFAULT_ATTRIBUTE = 'data-mui-color-scheme';

export default function getInitColorSchemeScript(options?: {
  storageKey?: string;
  attribute?: string;
}) {
  const { storageKey = DEFAULT_STORAGE_KEY, attribute = DEFAULT_ATTRIBUTE } = options || {};
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() { try {
        var colorScheme = localStorage.getItem('${storageKey}');
        if (colorScheme) {
          document.body.setAttribute('${attribute}', colorScheme);
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
