/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`',
        '',
        "You should use `import { DateRangePicker } from '@mui/x-date-pickers-pro'`",
        "or `import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DateRangePickerComponent = (<TDate>(
  props: DateRangePickerProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The DateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const DateRangePicker = React.forwardRef(function DeprecatedDateRangePicker() {
  warn();

  return null;
}) as DateRangePickerComponent;

export default DateRangePicker;

export type DateRangePickerProps = Record<any, any>;
export type DateRange<TDate> = [TDate | null, TDate | null];
