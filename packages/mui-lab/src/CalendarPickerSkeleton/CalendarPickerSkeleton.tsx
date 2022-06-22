import * as React from 'react';
import PropTypes from 'prop-types';
import {
  CalendarPickerSkeleton as XCalendarPickerSkeleton,
  CalendarPickerSkeletonProps,
} from '@mui/x-date-pickers/CalendarPickerSkeleton';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The CalendarPickerSkeleton component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        'The component will no longer be exported from `@mui/lab` in the first release of July 2022.',
        '',
        "You should use `import { CalendarPickerSkeleton } from '@mui/x-date-pickers'`",
        "or `import { CalendarPickerSkeleton } from '@mui/x-date-pickers/CalendarPickerSkeleton'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type CalendarPickerSkeletonComponent = ((
  props: CalendarPickerSkeletonProps & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const CalendarPickerSkeleton = React.forwardRef(function DeprecatedCalendarPickerSkeleton(
  props: CalendarPickerSkeletonProps,
  ref: React.Ref<any>,
) {
  warn();

  return <XCalendarPickerSkeleton ref={ref} {...props} />;
}) as CalendarPickerSkeletonComponent;

CalendarPickerSkeleton.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
} as any;

export default CalendarPickerSkeleton;
