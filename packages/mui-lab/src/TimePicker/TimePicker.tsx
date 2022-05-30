import * as React from 'react';
import { TimePicker as XTimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The TimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { TimePicker } from '@mui/x-date-pickers'`",
        "or `import { TimePicker } from '@mui/x-date-pickers/TimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type TimePickerComponent = (<TDate>(
  props: TimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const TimePicker = React.forwardRef(function DeprecatedTimePicker<TDate>(
  props: TimePickerProps<TDate>,
) {
  warn();

  return <XTimePicker {...props} />;
}) as TimePickerComponent;

export default TimePicker;
