import * as React from 'react';
import { ClockPicker as XClockPicker, ClockPickerProps } from '@mui/x-date-pickers/ClockPicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The ClockPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        'The component will no longer be exported from `@mui/lab` in the first release of July 2022.',
        '',
        "You should use `import { ClockPicker } from '@mui/x-date-pickers'`",
        "or `import { ClockPicker } from '@mui/x-date-pickers/ClockPicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type ClockPickerComponent = (<TDate>(
  props: ClockPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const ClockPicker = React.forwardRef(function DeprecatedClockPicker<TDate>(
  props: ClockPickerProps<TDate>,
  ref: React.Ref<any>,
) {
  warn();

  return <XClockPicker ref={ref} {...props} />;
}) as ClockPickerComponent;

export default ClockPicker;
