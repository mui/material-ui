import * as React from 'react';
import { MonthPicker as XMonthPicker, MonthPickerProps } from '@mui/x-date-pickers/MonthPicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MonthPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        'The component will no longer be exported from `@mui/lab` in the first release of July 2022.',
        '',
        "You should use `import { MonthPicker } from '@mui/x-date-pickers'`",
        "or `import { MonthPicker } from '@mui/x-date-pickers/MonthPicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type MonthPickerComponent = (<TDate>(
  props: MonthPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const MonthPicker = React.forwardRef(function DeprecatedMonthPicker<TDate>(
  props: MonthPickerProps<TDate>,
  ref: React.Ref<any>,
) {
  warn();

  return <XMonthPicker ref={ref} {...props} />;
}) as MonthPickerComponent;

export default MonthPicker;
