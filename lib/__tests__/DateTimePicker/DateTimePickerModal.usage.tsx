import * as React from 'react'
import { Component } from 'react';
import { IconButton, Icon } from '@material-ui/core';
import InputAdornment  from '@material-ui/core/InputAdornment';
import DateTimePickerWrapper  from '../../src/DateTimePicker';
import * as classNames from 'classnames'
import * as PropTypes from 'prop-types'
import * as moment from 'moment'
import { DayComponent } from '../../src/DatePicker/components/Calendar'
import { utilsToUse } from '../test-utils';
import MuiUtilsProvider from '../../src/utils/MuiPickersUtilsProvider'

export default class BasicUsage extends Component {
  state = {
    selectedDate: new Date(),
  }

  handleChange = (date: Date) => {
    this.setState({ selectedDate: date });
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiUtilsProvider utils={utilsToUse}>
        <DateTimePickerWrapper
          value={null}
          onChange={this.handleChange}
          leftArrowIcon={<Icon> keyboard_arrow_left </Icon>}
          rightArrowIcon={<Icon> keyboard_arrow_right </Icon>}
        />

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
          initialFocusedDate={new Date()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><Icon>add_alarm</Icon></IconButton>
              </InputAdornment>
            ),
          }}
        />
      </MuiUtilsProvider>
    );
  }
}


class CustomElements extends Component<{ classes: any }> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  state = {
    selectedDate: moment()
  }

  handleDateChange = (date: moment.Moment) => {
    this.setState({ selectedDate: date });
  }

  renderCustomDayForDateTime = (day: moment.Moment, selectedDate: moment.Moment, dayInCurrentMonth: boolean, dayComponent: DayComponent) => {
    const { classes } = this.props;

    const dayClassName = classNames({
      [classes.customDayHighlight]: day.isSame(selectedDate, 'day'),
    });

    return (
      <div className={classes.dayWrapper}>
        {dayComponent}
        <div className={dayClassName} />
      </div>
    );
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <MuiUtilsProvider utils={utilsToUse}>
        <DateTimePickerWrapper
          autoSubmit={false}
          value={selectedDate}
          onChange={this.handleDateChange}
          renderDay={this.renderCustomDayForDateTime}
        />
      </MuiUtilsProvider>
    );
  }
}
