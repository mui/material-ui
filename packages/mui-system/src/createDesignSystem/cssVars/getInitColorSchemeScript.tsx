import * as React from 'react';
import getDataset from './getDataset';

export default function getInitColorSchemeScript(options?: {
  storageKey?: string;
  dataAttribute?: string;
}) {
  const { storageKey = 'mui-color-scheme', dataAttribute = 'color-scheme' } = options || {};
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
