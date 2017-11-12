import React, { Component } from 'react';
import moment from 'moment';
import { Typography } from 'material-ui';
import { TimePicker, DatePicker } from 'material-ui-pickers';

export default class BasicUsage extends Component {
  state = {
    selectedDate: moment(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return [
      <div key="basic_day" className="picker">
        <Typography type="headline" align="center" gutterBottom>
          Date picker
        </Typography>

        <DatePicker
          value={selectedDate}
          onChange={this.handleDateChange}
          animateYearScrolling={false}
        />
      </div>,

      <div key="basic_time" className="picker">
        <Typography type="headline" align="center" gutterBottom>
          Time picker
        </Typography>

        <TimePicker
          value={this.state.selectedDate}
          onChange={this.handleDateChange}
        />
      </div>,
    ];
  }
}
