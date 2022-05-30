import * as React from 'react';
import {
  DesktopTimePicker as XDesktopTimePicker,
  DesktopTimePickerProps,
} from '@mui/x-date-pickers/DesktopTimePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DesktopTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { DesktopTimePicker } from '@mui/x-date-pickers'`",
        "or `import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DesktopTimePickerComponent = (<TDate>(
  props: DesktopTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const DesktopTimePicker = React.forwardRef(function DeprecatedDesktopTimePicker<TDate>(
  props: DesktopTimePickerProps<TDate>,
) {
  warn();

  return <XDesktopTimePicker {...props} />;
}) as DesktopTimePickerComponent;

export default DesktopTimePicker;
