'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The CalendarPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { CalendarPicker } from '@mui/x-date-pickers'`",
        "or `import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type CalendarPickerComponent = (<TDate>(
  props: CalendarPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The CalendarPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const CalendarPicker = React.forwardRef(function DeprecatedCalendarPicker() {
  warn();

  return null;
}) as CalendarPickerComponent;

export default CalendarPicker;

export const calendarPickerClasses = {};

export type CalendarPickerClassKey = any;
export type CalendarPickerClasses = any;
export type CalendarPickerProps<TDate> = Record<any, any>;
export type CalendarPickerView = 'year' | 'day' | 'month';
