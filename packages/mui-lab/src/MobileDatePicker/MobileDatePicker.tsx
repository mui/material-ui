'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MobileDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        '',
        "You should use `import { MobileDatePicker } from '@mui/x-date-pickers'`",
        "or `import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type MobileDatePickerComponent = (<TDate>(
  props: MobileDatePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The MobileDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const MobileDatePicker = React.forwardRef(function DeprecatedMobileDatePicker<TDate>(
  props: MobileDatePickerProps<TDate>,
  ref: React.Ref<any>,
) {
  warn();

  return null;
}) as MobileDatePickerComponent;

export default MobileDatePicker;

export type MobileDatePickerProps<TDate> = Record<any, any>;
