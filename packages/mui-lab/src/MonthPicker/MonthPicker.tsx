'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MonthPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { MonthPicker } from '@mui/x-date-pickers'`",
        "or `import { MonthPicker } from '@mui/x-date-pickers/MonthPicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type MonthPickerComponent = (<TDate>(
  props: MonthPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The MonthPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const MonthPicker = React.forwardRef(function DeprecatedMonthPicker() {
  warn();

  return null;
}) as MonthPickerComponent;

export default MonthPicker;

export const monthPickerClasses = {};

export const getMonthPickerUtilityClass = (slot: string): string => {
  warn();
  return '';
};

export type MonthPickerProps<TDate> = Record<any, any>;
export type MonthPickerClassKey = any;
