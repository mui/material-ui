import React, { Component } from 'react';
import moment from 'moment';
import jMoment from 'moment-jalaali';
import { Typography } from '@material-ui/core';
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from 'material-ui-pickers';
import JalaliUtils from '@date-io/jalaali';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

export default class BasicUsage extends Component {
  state = {
    selectedDate: moment(),
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
        <div className="picker">
          <Typography variant="h5" align="center" gutterBottom>
            Date picker
          </Typography>

          <DatePicker
            clearable
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            labelFunc={date => (date ? date.format('jYYYY/jMM/jDD') : '')}
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
          />
        </div>

        <div className="picker">
          <Typography variant="h5" align="center" gutterBottom>
            Time picker
          </Typography>

          <TimePicker
            clearable
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            labelFunc={date => (date ? date.format('hh:mm A') : '')}
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="picker">
          <Typography variant="h5" align="center" gutterBottom>
            DateTime picker
          </Typography>

          <DateTimePicker
            okLabel="تأیید"
            cancelLabel="لغو"
            labelFunc={date => (date ? date.format('jYYYY/jMM/jDD hh:mm A') : '')}
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}
