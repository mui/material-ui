import * as React from 'react';
import {
  DateTimePicker as XDateTimePicker,
  DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { DateTimePicker } from '@mui/x-date-pickers'`",
        "or `import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DateTimePickerComponent = (<TDate>(
  props: DateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const DateTimePicker = React.forwardRef(function DeprecatedDateTimePicker<TDate>(
  props: DateTimePickerProps<TDate>,
) {
  warn();

  return <XDateTimePicker {...props} />;
}) as DateTimePickerComponent;

export default DateTimePicker;
