/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DateRangePickerDay component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`',
        '',
        "You should use `import { DateRangePickerDay } from '@mui/x-date-pickers-pro'`",
        "or `import { DateRangePickerDay } from '@mui/x-date-pickers-pro/DateRangePickerDay'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DateRangePickerDayComponent = (<TDate>(
  props: DateRangePickerDayProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The DateRangePickerDay component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const DateRangePickerDay = React.forwardRef(function DeprecatedDateRangePickerDay() {
  warn();

  return null;
}) as DateRangePickerDayComponent;

export default DateRangePickerDay;

export const getDateRangePickerDayUtilityClass = (slot: string): string => {
  warn();
  return '';
};

export type DateRangePickerDayProps = Record<any, any>;
export type DateRangePickerDayClasses = any;
export type DateRangePickerDayClassKey = any;
