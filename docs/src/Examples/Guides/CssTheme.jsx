import React, { PureComponent } from 'react';
import { DatePicker } from 'material-ui-pickers';
import { MuiThemeProvider, createMuiTheme } from 'material-ui';

import lightBlue from 'material-ui/colors/lightBlue';

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
      selected: {
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

export default class BasicDatePicker extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiThemeProvider theme={materialTheme}>
        <div className="picker">
          <DatePicker
            label="Light blue picker"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
