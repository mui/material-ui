'use client';
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The LocalizationProvider component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { LocalizationProvider } from '@mui/x-date-pickers'`",
        "or `import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type LocalizationProviderComponent = ((
  props: LocalizationProviderProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The LocalizationProvider component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const LocalizationProvider = React.forwardRef(function DeprecatedLocalizationProvider() {
  warn();

  return null;
}) as LocalizationProviderComponent;

export default LocalizationProvider;

export type LocalizationProviderProps = Record<any, any>;
