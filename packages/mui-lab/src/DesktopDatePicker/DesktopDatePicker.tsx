'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DesktopDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { DesktopDatePicker } from '@mui/x-date-pickers'`",
        "or `import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DesktopDatePickerComponent = (<TDate>(
  props: DesktopDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The DesktopDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const DesktopDatePicker = React.forwardRef(function DeprecatedDesktopDatePicker<TDate>() {
  warn();

  return null;
}) as DesktopDatePickerComponent;

export default DesktopDatePicker;

export type DesktopDatePickerProps<TDate> = Record<any, any>;
