import * as React from 'react';
import {
  DesktopDatePicker as XDesktopDatePicker,
  DesktopDatePickerProps,
} from '@mui/x-date-pickers/DesktopDatePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DesktopDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { DesktopDatePicker } from '@mui/x-date-pickers'`",
        "or `import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DesktopDatePickerComponent = (<TDate>(
  props: DesktopDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const DesktopDatePicker = React.forwardRef(function DeprecatedDesktopDatePicker<TDate>(
  props: DesktopDatePickerProps<TDate>,
) {
  warn();

  return <XDesktopDatePicker {...props} />;
}) as DesktopDatePickerComponent;

export default DesktopDatePicker;
