import * as React from 'react';
import {
  LocalizationProvider as XLocalizationProvider,
  LocalizationProviderProps,
} from '@mui/x-date-pickers/LocalizationProvider';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The LocalizationProvider component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
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
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const LocalizationProvider = React.forwardRef(function DeprecatedLocalizationProvider(
  props: LocalizationProviderProps,
) {
  warn();

  return <XLocalizationProvider {...props} />;
}) as LocalizationProviderComponent;

export default LocalizationProvider;
