import * as React from 'react'
import { Fragment, Component } from 'react';
import { IconButton, Typography, Icon } from '@material-ui/core';
import InputAdornment  from '@material-ui/core/InputAdornment';
import DateTimePickerWrapper  from '../../src/DateTimePicker';
import * as classNames from 'classnames'
import { Moment } from 'moment'
import * as PropTypes from 'prop-types'
import { DayComponent } from '../../src/DatePicker/components/Calendar'
import { utilsToUse } from '../test-utils';
import MuiUtilsProvider from '../../src/utils/MuiPickersUtilsProvider'

export default class BasicUsage extends Component<{}, {selectedDate: Date}> {
  state = {
    selectedDate: new Date(),
  }

  handleChange = (date: Moment | Date) => {
    this.setState({ selectedDate: date as Date });
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


class CustomElements extends Component<{classes: any}, {selectedDate: Date}> {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  state = {
    selectedDate: new Date(),
  }

  handleDateChange = (date: Moment | Date) => {
    this.setState({ selectedDate: (date as Moment).toDate() });
  }

  renderCustomDayForDateTime = (day: Moment, selectedDate: Moment, dayInCurrentMonth: boolean, dayComponent: DayComponent) => {
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