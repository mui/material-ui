import React, { Fragment, Component } from 'react';
import { DateTimePicker } from 'material-ui-pickers';
import { IconButton, Typography, Icon, InputAdornment } from 'material-ui';

export default class BasicDateTimePicker extends Component {
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <DateTimePicker
            value={selectedDate}
            disablePast
            onChange={this.handleDateChange}
            label="DateTimePicker"
          />
        </div>

        <div className="picker">
          <DateTimePicker
            autoOk
            ampm={false}
            disableFuture
            value={selectedDate}
            onChange={this.handleDateChange}
            label="24h clock"
          />
        </div>
      </Fragment>
    );
  }
}
