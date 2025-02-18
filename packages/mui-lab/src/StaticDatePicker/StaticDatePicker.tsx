'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The StaticDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { StaticDatePicker } from '@mui/x-date-pickers'`",
        "or `import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type StaticDatePickerComponent = (<TDate>(
  props: StaticDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The StaticDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const StaticDatePicker = React.forwardRef(function DeprecatedStaticDatePicker() {
  warn();

  return null;
}) as StaticDatePickerComponent;

export default StaticDatePicker;

export type StaticDatePickerProps<TDate> = Record<any, any>;
