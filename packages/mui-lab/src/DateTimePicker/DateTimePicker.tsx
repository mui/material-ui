'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
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
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The DateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const DateTimePicker = React.forwardRef(function DeprecatedDateTimePicker() {
  warn();

  return null;
}) as DateTimePickerComponent;

export default DateTimePicker;

export type DateTimePickerProps<TDate> = Record<any, any>;
