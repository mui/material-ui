import * as React from 'react';
import {
  StaticDateTimePicker as XStaticDateTimePicker,
  StaticDateTimePickerProps,
} from '@mui/x-date-pickers/StaticDateTimePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The StaticDateTimePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
        '',
        "You should use `import { StaticDateTimePicker } from '@mui/x-date-pickers'`",
        "or `import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type StaticDateTimePickerComponent = (<TDate>(
  props: StaticDateTimePickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const StaticDateTimePicker = React.forwardRef(function DeprecatedStaticDateTimePicker<TDate>(
  props: StaticDateTimePickerProps<TDate>,
) {
  warn();

  return <XStaticDateTimePicker {...props} />;
}) as StaticDateTimePickerComponent;

export default StaticDateTimePicker;
