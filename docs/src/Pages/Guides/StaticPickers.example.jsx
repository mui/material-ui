import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';

import DateFnsUtils from '@date-io/date-fns';
import { BasePicker, MuiPickersUtilsProvider, TimePickerView, Calendar } from 'material-ui-pickers';

class StaticPickers extends PureComponent {
  state = {
    selectedDate: new Date(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BasePicker value={selectedDate} onChange={this.handleDateChange}>
          {({
            date,
            handleAccept,
            handleChange,
            handleClear,
            handleDismiss,
            handleSetTodayDate,
            handleTextFieldChange,
            pick12hOr24hFormat,
          }) => (
            <div>
              <div className="picker">
                <Paper style={{ overflow: 'hidden' }}>
                  <Calendar date={date} onChange={handleChange} />
                </Paper>
              </div>

              <TimePickerView date={date} ampm={false} onHourChange={handleChange} type="hours" />
            </div>
          )}
        </BasePicker>
      </MuiPickersUtilsProvider>
    );
  }
}

export default StaticPickers;
