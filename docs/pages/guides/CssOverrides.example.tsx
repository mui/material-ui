import React, { useState } from 'react';
import lightBlue from '@material-ui/core/colors/lightBlue';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: lightBlue.A200,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: lightBlue.A200,
        // color: 'white',
      },
    },
    MuiPickersDay: {
      day: {
        color: lightBlue.A700,
      },
      daySelected: {
        backgroundColor: lightBlue['400'],
      },
      dayDisabled: {
        color: lightBlue['100'],
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

function CssOverrides() {
  const [selectedDate, handleDateChange] = useState<DatePickerProps['value']>(new Date());

  return (
    <ThemeProvider theme={materialTheme}>
      <DatePicker
        renderInput={props => <TextField {...props} />}
        label="Light blue picker"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        // @ts-ignore
        shouldDisableDate={day => day && day.getDay() === 0}
      />
    </ThemeProvider>
  );
}

export default CssOverrides;
