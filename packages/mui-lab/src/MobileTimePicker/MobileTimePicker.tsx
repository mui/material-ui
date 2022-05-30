import * as React from 'react';
import {
  MobileTimePicker as XMobileTimePicker,
  MobileTimePickerProps,
} from '@mui/x-date-pickers/MobileTimePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MobileTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { MobileTimePicker } from '@mui/x-date-pickers'`",
        "or `import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type MobileTimePickerComponent = (<TDate>(
  props: MobileTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const MobileTimePicker = React.forwardRef(function DeprecatedMobileTimePicker<TDate>(
  props: MobileTimePickerProps<TDate>,
) {
  warn();

  return <XMobileTimePicker {...props} />;
}) as MobileTimePickerComponent;

export default MobileTimePicker;
