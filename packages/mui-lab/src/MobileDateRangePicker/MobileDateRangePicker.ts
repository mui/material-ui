/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The MobileDateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`',
        '',
        "You should use `import { MobileDateRangePicker } from '@mui/x-date-pickers-pro'`",
        "or `import { MobileDateRangePicker } from '@mui/x-date-pickers-pro/MobileDateRangePicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type MobileDateRangePickerComponent = (<TDate>(
  props: MobileDateRangePickerProps & React.RefAttributes<HTMLDivElement>,
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The MobileDateRangePicker component was moved from `@mui/lab` to `@mui/x-date-pickers-pro`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const MobileDateRangePicker = React.forwardRef(function DeprecatedMobileDateRangePicker() {
  warn();

  return null;
}) as MobileDateRangePickerComponent;

export default MobileDateRangePicker;

export type MobileDateRangePickerProps = Record<any, any>;
