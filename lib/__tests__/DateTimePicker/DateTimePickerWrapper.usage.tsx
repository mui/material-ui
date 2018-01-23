import * as React from 'react'
import { Fragment, Component } from 'react';
import { IconButton, Typography, Icon } from 'material-ui';
import InputAdornment  from 'material-ui/Input/InputAdornment';
import DateTimePickerWrapper  from '../../src/DateTimePicker/DateTimePickerWrapper';
import * as classNames from 'classnames'
import { Moment } from 'moment'
import * as PropTypes from 'prop-types'
import {DayComponent} from '../../src/DatePicker/Calendar'

// FIXME: src vs exported component names a source of confusion
// FIXME https://github.com/dmtrKovalenko/material-ui-pickers/issues/169

// initially from the docs site
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
      <Fragment>
        <DateTimePickerWrapper
          value={selectedDate}
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
                <IconButton>  add_alarm  </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Fragment>
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
      <Fragment>
        <DateTimePickerWrapper
          autoSubmit={false}
          value={selectedDate}
          onChange={this.handleDateChange}
          renderDay={this.renderCustomDayForDateTime}
          returnMoment
        />
      </Fragment>
    );
  }
}