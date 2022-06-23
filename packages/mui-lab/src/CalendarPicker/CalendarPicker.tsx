import * as React from 'react';
import {
  CalendarPicker as XCalendarPicker,
  CalendarPickerProps,
} from '@mui/x-date-pickers/CalendarPicker';

let warnedOnce = false;

const warn = () => {
  if (!warnedOnce) {
    console.warn(
      [
        'MUI: The CalendarPicker component was moved from `@mui/lab` to `@mui/x-date-pickers`.',
        'The component will no longer be exported from `@mui/lab` in the first release of July 2022.',
        '',
        "You should use `import { CalendarPicker } from '@mui/x-date-pickers'`",
        "or `import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker'`",
        '',
        'More information about this migration on our blog: https://mui.com/blog/lab-date-pickers-to-mui-x/.',
      ].join('\n'),
    );

    warnedOnce = true;
  }
};

type CalendarPickerComponent = (<TDate>(
  props: CalendarPickerProps<TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 * @ignore - do not document.
 */
const CalendarPicker = React.forwardRef(function DeprecatedCalendarPicker<TDate>(
  props: CalendarPickerProps<TDate>,
  ref: React.Ref<any>,
) {
  warn();

  return <XCalendarPicker ref={ref} {...props} />;
}) as CalendarPickerComponent;

export default CalendarPicker;
