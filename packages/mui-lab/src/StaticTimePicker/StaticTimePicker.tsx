'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The StaticTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { StaticTimePicker } from '@mui/x-date-pickers'`",
        "or `import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type StaticTimePickerComponent = (<TDate>(
  props: StaticTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The StaticTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const StaticTimePicker = React.forwardRef(function DeprecatedStaticTimePicker() {
  warn();

  return null;
}) as StaticTimePickerComponent;

export default StaticTimePicker;

export type StaticTimePickerProps<TDate> = Record<any, any>;
