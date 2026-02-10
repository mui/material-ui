'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The PickersDay component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { PickersDay } from '@mui/x-date-pickers'`",
        "or `import { PickersDay } from '@mui/x-date-pickers/PickersDay'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type PickersDayComponent = (<TDate>(
  props: PickersDayProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The PickersDay component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const PickersDay = React.forwardRef(function DeprecatedPickersDay<TDate>() {
  warn();

  return null;
}) as PickersDayComponent;

export default PickersDay;

export const pickersDayClasses = {};

export const getPickersDayUtilityClass = (slot: string): string => {
  warn();
  return '';
};

export type PickersDayProps<TDate> = Record<any, any>;
export type PickersDayClassKey = any;
