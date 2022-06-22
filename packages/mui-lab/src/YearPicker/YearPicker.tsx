import * as React from 'react';
import { YearPicker as XYearPicker, YearPickerProps } from '@mui/x-date-pickers/YearPicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The YearPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        'The component will no longer be exported from `@mui/lab` in the first release of July 2022.',
        '',
        "You should use `import { YearPicker } from '@mui/x-date-pickers'`",
        "or `import { YearPicker } from '@mui/x-date-pickers/YearPicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type YearPickerComponent = (<TDate>(
  props: YearPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const YearPicker = function DeprecatedYearPicker<TDate>(props: YearPickerProps<TDate>) {
  warn();

  return <XYearPicker {...props} />;
} as YearPickerComponent;

export default YearPicker;
