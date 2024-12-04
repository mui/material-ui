'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DesktopTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { DesktopTimePicker } from '@mui/x-date-pickers'`",
        "or `import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DesktopTimePickerComponent = (<TDate>(
  props: DesktopTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The DesktopTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const DesktopTimePicker = React.forwardRef(function DeprecatedDesktopTimePicker() {
  warn();

  return null;
}) as DesktopTimePickerComponent;

export default DesktopTimePicker;

export type DesktopTimePickerProps<TDate> = Record<any, any>;
