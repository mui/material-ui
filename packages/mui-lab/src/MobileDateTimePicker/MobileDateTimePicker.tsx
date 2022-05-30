import * as React from 'react';
import {
  MobileDateTimePicker as XMobileDateTimePicker,
  MobileDateTimePickerProps,
} from '@mui/x-date-pickers/MobileDateTimePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MobileDateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
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
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const MobileDateTimePicker = React.forwardRef(function DeprecatedMobileDateTimePicker<TDate>(
  props: MobileDateTimePickerProps<TDate>,
) {
  warn();

  return <XMobileDateTimePicker {...props} />;
}) as MobileDateTimePickerComponent;

export default MobileDateTimePicker;
