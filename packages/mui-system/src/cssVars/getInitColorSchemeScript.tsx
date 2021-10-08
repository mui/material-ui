import * as React from 'react';
import getDataset from './getDataset';

export const DEFAULT_STORAGE_KEY = 'mui-color-scheme';
export const DEFAULT_DATA_ATTRIBUTE = 'color-scheme';

export default function getInitColorSchemeScript(options?: {
  storageKey?: string;
  dataAttribute?: string;
}) {
  const { storageKey = DEFAULT_STORAGE_KEY, dataAttribute = DEFAULT_DATA_ATTRIBUTE } =
    options || {};
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() { try {
        var colorScheme = localStorage.getItem('${storageKey}');
        if (colorScheme) {
          document.body.dataset.${getDataset(dataAttribute)} = colorScheme;
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
