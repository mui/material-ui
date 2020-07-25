import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@material-ui/core/TextField';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { DatePicker } from '@material-ui/pickers';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      root: {
        backgroundColor: lightBlue.A200,
      },
    },
    MuiPickersCalendarHeader: {
      root: {
        // backgroundColor: lightBlue.A200,
        // color: 'white',
      },
    },
    MuiPickersDay: {
      root: {
        color: lightBlue.A700,
        '&$disabled': {
          color: lightBlue['100'],
        },
        '&$selected': {
          backgroundColor: lightBlue['400'],
        },
      },
      today: {
        color: lightBlue['900'],
      },
    },
    MuiPickersModalDialog: {
      dialogAction: {
        color: lightBlue['400'],
      },
    },
  },
});

export default function CssOverrides() {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

  return (
    <ThemeProvider theme={materialTheme}>
      <DatePicker
        label="Light blue picker"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        renderInput={(props) => <TextField {...props} />}
        // @ts-ignore
        shouldDisableDate={isWeekend}
      />
    </ThemeProvider>
  );
}
