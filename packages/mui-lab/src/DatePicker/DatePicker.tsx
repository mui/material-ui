import * as React from 'react';
import { DatePicker as XDatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { DatePicker } from '@mui/x-date-pickers'`",
        "or `import { DatePicker } from '@mui/x-date-pickers/DatePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DatePickerComponent = (<TDate>(
  props: DatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const DatePicker = React.forwardRef(function DeprecatedDatePicker<TDate>(
  props: DatePickerProps<TDate>,
) {
  warn();

  return <XDatePicker {...props} />;
}) as DatePickerComponent;

export default DatePicker;
