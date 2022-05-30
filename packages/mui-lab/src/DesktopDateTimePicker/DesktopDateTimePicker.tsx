import * as React from 'react';
import {
  DesktopDateTimePicker as XDesktopDateTimePicker,
  DesktopDateTimePickerProps,
} from '@mui/x-date-pickers/DesktopDateTimePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DesktopDateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { DesktopDateTimePicker } from '@mui/x-date-pickers'`",
        "or `import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DesktopDateTimePickerComponent = (<TDate>(
  props: DesktopDateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const DesktopDateTimePicker = React.forwardRef(function DeprecatedDesktopDateTimePicker<TDate>(
  props: DesktopDateTimePickerProps<TDate>,
) {
  warn();

  return <XDesktopDateTimePicker {...props} />;
}) as DesktopDateTimePickerComponent;

export default DesktopDateTimePicker;
