'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DesktopDateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { DesktopDateTimePicker } from '@mui/x-date-pickers'`",
        "or `import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DesktopDateTimePickerComponent = (<TDate>(
  props: DesktopDateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The DesktopDateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const DesktopDateTimePicker = React.forwardRef(function DeprecatedDesktopDateTimePicker() {
  warn();

  return null;
}) as DesktopDateTimePickerComponent;

export default DesktopDateTimePicker;

export type DesktopDateTimePickerProps<TDate> = Record<any, any>;
