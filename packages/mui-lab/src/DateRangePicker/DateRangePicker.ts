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
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const DateRangePicker = React.forwardRef(function DeprecatedDateRangePicker() {
  warn();

  return null;
}) as DateRangePickerComponent;

DateRangePicker.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
} as any;

export default DateRangePicker;

export type DateRangePickerProps = Record<any, any>;
export type DateRange<TDate> = [TDate | null, TDate | null];
