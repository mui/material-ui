import * as React from 'react';
import getDataset from './getDataset';

export const DEFAULT_STORAGE_KEY = 'mui-mode';
export const DEFAULT_DATA_ATTRIBUTE = 'mui-mode';

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
        var mode = localStorage.getItem('${storageKey}');
        if (mode) {
          document.body.dataset.${getDataset(dataAttribute)} = mode;
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
