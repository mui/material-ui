/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The DesktopDateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`',
        '',
        "You should use `import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro'`",
        "or `import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type DesktopDateRangePickerComponent = (<TDate>(
  props: DesktopDateRangePickerProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The DesktopDateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const DesktopDateRangePicker = React.forwardRef(function DeprecatedDesktopDateRangePicker() {
  warn();

  return null;
}) as DesktopDateRangePickerComponent;

export default DesktopDateRangePicker;

export type DesktopDateRangePickerProps = Record<any, any>;
