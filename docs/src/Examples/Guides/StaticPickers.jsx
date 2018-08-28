import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import BasePicker from 'material-ui-pickers/_shared/BasePicker';
import Calendar from 'material-ui-pickers/DatePicker/components/Calendar';
import TimePickerView from 'material-ui-pickers/TimePicker/components/TimePickerView';

/* eslint-disable no-unused-vars */
class StaticPickers extends PureComponent {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <BasePicker value={selectedDate} onChange={this.handleDateChange}>
        {
          ({
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

              <TimePickerView
                date={date}
                ampm={false}
                onHourChange={handleChange}
                type="hours"
              />
            </div>
          )
        }
      </BasePicker>
    );
  }
}


export default StaticPickers;

