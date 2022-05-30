import * as React from 'react';
import {
  CalendarPickerSkeleton as XCalendarPickerSkeleton,
  CalendarPickerSkeletonProps,
} from '@mui/x-date-pickers/CalendarPickerSkeleton';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The CalendarPickerSkeleton component was moved from `@mui/lab` to `@mui/x-date-pickers`',
        'The import from `@mui/lab` will be removed in the first release of July 2022.',
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
) {
  warn();

  return <XCalendarPickerSkeleton {...props} />;
}) as CalendarPickerSkeletonComponent;

export default CalendarPickerSkeleton;
