import * as React from 'react'
import { Fragment, Component } from 'react';
import { IconButton, Typography, Icon } from 'material-ui';
import InputAdornment  from 'material-ui/Input/InputAdornment';
import DateTimePickerWrapper  from '../../src/DateTimePicker/DateTimePickerWrapper';
import {DateTimePickerView} from '../../src/constants/date-picker-view'

// FIXME: src vs exported component names a source of confusion
// FIXME https://github.com/dmtrKovalenko/material-ui-pickers/issues/169

// initially from the docs site
export default class BasicUsage extends Component<{}, {selectedDate: Date}> {
  state = {
    selectedDate: new Date(),
  }

  handleChange = (date: Date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <div className="picker">
          <Typography type="headline" align="center" gutterBottom>
            Default
          </Typography>

          <DateTimePickerWrapper
            value={selectedDate}
            onChange={this.handleChange}
            leftArrowIcon={<Icon> keyboard_arrow_left </Icon>}
            rightArrowIcon={<Icon> keyboard_arrow_right </Icon>}
          />
        </div>

        <div className="picker">
          <Typography type="headline" align="center" gutterBottom>
            Custom
          </Typography>

          <DateTimePickerWrapper
            error
            autoOk
            ampm={false}
            showTabs={false}
            autoSubmit={false}
            disableFuture
            value={selectedDate}
            onChange={this.handleChange}
            helperText="Required"
            leftArrowIcon={<Icon> add_alarm </Icon>}
            rightArrowIcon={<Icon> snooze </Icon>}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>  add_alarm  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Fragment>
    );
  }
}