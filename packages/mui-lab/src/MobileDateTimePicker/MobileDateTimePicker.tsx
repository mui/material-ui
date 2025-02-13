'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MobileDateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { MobileDateTimePicker } from '@mui/x-date-pickers'`",
        "or `import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type MobileDateTimePickerComponent = (<TDate>(
  props: MobileDateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The MobileDateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const MobileDateTimePicker = React.forwardRef(function DeprecatedMobileDateTimePicker() {
  warn();

  return null;
}) as MobileDateTimePickerComponent;

export default MobileDateTimePicker;

export type MobileDateTimePickerProps<TDate> = Record<any, any>;
