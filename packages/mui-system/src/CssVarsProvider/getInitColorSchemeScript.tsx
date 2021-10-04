import * as React from 'react';
import { STORAGE_KEY } from './CssVarsProvider';

export default function getInitColorSchemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `(function() { try {
        var colorScheme = localStorage.getItem('${STORAGE_KEY}');
        if (colorScheme) {
          document.body.dataset.colorScheme = colorScheme;
        }
      } catch (e) {} })();`,
      }}
    />
  );
}
