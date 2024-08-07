'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The CalendarPickerSkeleton component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
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
) => React.JSX.Element) & { propTypes?: any };

/**
 * @deprecated The CalendarPickerSkeleton component was moved from `@mui/lab` to `@mui/x-date-pickers`. More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.
 * @ignore - do not document.
 */
const CalendarPickerSkeleton = React.forwardRef(function DeprecatedCalendarPickerSkeleton() {
  warn();

  return null;
}) as CalendarPickerSkeletonComponent;

export default CalendarPickerSkeleton;

export const calendarPickerSkeletonClasses = {};

export const getCalendarPickerSkeletonUtilityClass = (slot: string): string => {
  warn();
  return '';
};

export type CalendarPickerSkeletonProps = Record<any, any>;
export type CalendarPickerSkeletonClassKey = any;
