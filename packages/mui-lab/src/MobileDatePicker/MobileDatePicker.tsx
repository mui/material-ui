import * as React from 'react';
import {
  MobileDatePicker as XMobileDatePicker,
  MobileDatePickerProps,
} from '@mui/x-date-pickers/MobileDatePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MobileDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
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
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const MobileDatePicker = React.forwardRef(function DeprecatedMobileDatePicker<TDate>(
  props: MobileDatePickerProps<TDate>,
) {
  warn();

  return <XMobileDatePicker {...props} />;
}) as MobileDatePickerComponent;

export default MobileDatePicker;
