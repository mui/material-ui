import * as React from 'react';
import PropTypes from 'prop-types';
import {
  LocalizationProvider as XLocalizationProvider,
  LocalizationProviderProps,
} from '@mui/x-date-pickers/LocalizationProvider';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The LocalizationProvider component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        'The component will no longer be exported from `@mui/lab` in the first release of July 2022.',
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
  ref: React.Ref<any>,
) {
  warn();

  return <XLocalizationProvider ref={ref} {...props} />;
}) as LocalizationProviderComponent;

LocalizationProvider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export default LocalizationProvider;
