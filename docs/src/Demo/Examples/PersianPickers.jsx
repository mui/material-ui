import React, { Component, Fragment } from 'react';
import moment from 'moment';
import jMoment from 'moment-jalaali';
import { Typography } from 'material-ui';
import { TimePicker, DateTimePicker, DatePicker } from 'material-ui-pickers';
import jalaliUtils from 'material-ui-pickers-jalali-utils';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

function format(date, formatting) {
  if (date === null) {
    return '';
  }
  return jMoment(date).locale('fa').format(formatting);
}

export default class BasicUsage extends Component {
  state = {
    selectedDate: moment(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <Typography type="headline" align="center" gutterBottom>
            Date picker
          </Typography>

          <DatePicker
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            labelFunc={date => format(date, 'jYYYY/jMM/jDD')}
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
            utils={jalaliUtils}
          />
        </div>

        <div className="picker">
          <Typography type="headline" align="center" gutterBottom>
            Time picker
          </Typography>

          <TimePicker
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            labelFunc={date => format(date, 'hh:mm A')}
            value={selectedDate}
            onChange={this.handleDateChange}
            utils={jalaliUtils}
          />
        </div>

        <div className="picker">
          <Typography type="headline" align="center" gutterBottom>
            DateTime picker
          </Typography>

          <DateTimePicker
            okLabel="تأیید"
            cancelLabel="لغو"
            clearable={false}
            labelFunc={date => format(date, 'jYYYY/jMM/jDD hh:mm A')}
            value={selectedDate}
            onChange={this.handleDateChange}
            utils={jalaliUtils}
          />
        </div>
      </Fragment>
    );
  }
}
