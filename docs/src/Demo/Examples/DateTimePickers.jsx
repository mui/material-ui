import React, { Component } from 'react';
import moment from 'moment';
import { DateTimePicker } from 'material-ui-pickers';
import { IconButton, Typography, Icon, InputAdornment } from 'material-ui';

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
      <div key="datetime_default" className="picker">
        <Typography type="headline" align="center" gutterBottom>
          Default
        </Typography>

        <DateTimePicker
          value={selectedDate}
          onChange={this.handleDateChange}
          leftArrowIcon={<Icon> keyboard_arrow_left </Icon>}
          rightArrowIcon={<Icon> keyboard_arrow_right </Icon>}
        />
      </div>,

      <div key="datetime_custom" className="picker">
        <Typography type="headline" align="center" gutterBottom>
          Custom
        </Typography>

        <DateTimePicker
          error
          helperText="Required"
          showTabs={false}
          autoOk
          disableFuture
          autoSubmit={false}
          value={selectedDate}
          onChange={this.handleDateChange}
          leftArrowIcon={<Icon>add_alarm</Icon>}
          rightArrowIcon={<Icon>snooze</Icon>}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>  add_alarm  </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>,
    ];
  }
}
