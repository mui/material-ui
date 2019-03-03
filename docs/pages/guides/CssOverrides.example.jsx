import React, { useState } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import lightBlue from '@material-ui/core/colors/lightBlue';

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
      isSelected: {
        backgroundColor: lightBlue['400'],
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
    <MuiThemeProvider theme={materialTheme}>
      <div className="picker">
        <DatePicker
          label="Light blue picker"
          value={selectedDate}
          onChange={handleDateChange}
          animateYearScrolling={false}
        />
      </div>
    </MuiThemeProvider>
  );
}

export default CssOverrides;
