// Related: ../../__tests__/typings.d.ts
import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
  props: {
    MuiPickersDatePicker: {
      disableMaskedInput: true,
    },
    MuiPickersTimePicker: {
      ampmInClock: true,
    },
    MuiPickersDay: {
      showDaysOutsideCurrentMonth: true,
    },
    MuiPickersCalendarView: {
      reduceAnimations: true,
    },
  },
});

// Allows to mix overrides for both pickers and core components
createMuiTheme({
  props: {
    MuiPickersCalendarView: {
      reduceAnimations: true,
    },
    MuiPopover: {
      open: false,
    },
  },
});

// Throws error if class key is invalid
createMuiTheme({
  props: {
    MuiPickersCalendarView: {
      // @ts-expect-error: Throws error if class key is invalid
      somethingInvalid: 123,
    },
    MuiPickersDay: {
      onSuspend: () => {},
      // @ts-expect-error: Throws error if class key is invalid
      showDaysOutsideCurrentMonthTypo: false,
    },
  },
});
