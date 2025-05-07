'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The ClockPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
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
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The ClockPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const ClockPicker = React.forwardRef(function DeprecatedClockPicker() {
  warn();

  return null;
}) as ClockPickerComponent;

export default ClockPicker;

export const clockPickerClasses = {};

export type ClockPickerProps<TDate> = Record<any, any>;
export type ClockPickerView = 'hours' | 'minutes' | 'seconds';
export type ClockPickerClasses = any;
export type ClockPickerClassKey = any;
