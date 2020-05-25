// Related: ../../__tests__/typings.d.ts

import { createMuiTheme } from '@material-ui/core';

createMuiTheme({
  overrides: {
    MuiPickersClock: {
      clock: {
        display: 'flex',
      },
    },
    MuiPickersMonth: {
      root: {
        color: 'red',
      },
    },
  },
});

// Allows to mix overrides for both pickers and core components
createMuiTheme({
  overrides: {
    MuiPickersClock: {
      clock: {
        display: 'flex',
      },
    },
    MuiButton: {
      root: {
        color: 'red',
      },
    },
  },
});

// Throws error if class key is invalid
createMuiTheme({
  overrides: {
    MuiPickersClock: {
      // @ts-expect-error: Throws error if class key is invalid
      click: {
        display: 'flex',
      },
    },
    MuiPickersCalendarView: {
      viewTransitionContainer: {
        marginRight: 15,
      },
      // @ts-expect-error: Throws error if class key is invalid
      somethingInvalid: {
        color: 'blacl',
      },
    },
  },
});
