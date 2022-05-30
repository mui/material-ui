import * as React from 'react';
import {
  StaticDatePicker as XStaticDatePicker,
  StaticDatePickerProps,
} from '@mui/x-date-pickers/StaticDatePicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The StaticDatePicker component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
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
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const StaticDatePicker = React.forwardRef(function DeprecatedStaticDatePicker<TDate>(
  props: StaticDatePickerProps<TDate>,
) {
  warn();

  return <XStaticDatePicker {...props} />;
}) as StaticDatePickerComponent;

export default StaticDatePicker;
