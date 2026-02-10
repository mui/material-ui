'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
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
) => React.JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const DatePicker = React.forwardRef(function DeprecatedDatePicker() {
  warn();

  return null;
}) as DatePickerComponent;

export default DatePicker;

export type DatePickerProps<TDate> = Record<any, any>;
