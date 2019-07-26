// @ts-nocheck
import React, { useState } from 'react';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { DatePicker } from '@material-ui/pickers';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

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
      current: {
        color: lightBlue['900'],
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: lightBlue['400'],
      },
    },
  },
});

function CssOverrides() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <ThemeProvider theme={materialTheme}>
      <DatePicker
        label="Light blue picker"
        value={selectedDate}
        onChange={handleDateChange}
        shouldDisableDate={day => day.getDay() === 0}
        animateYearScrolling={false}
      />
    </ThemeProvider>
  );
}

export default CssOverrides;
