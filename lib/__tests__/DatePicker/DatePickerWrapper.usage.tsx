import * as React from 'react'
import * as PropTypes from 'prop-types';
import { Fragment, Component } from 'react';
import DatePickerWrapper  from '../../src/DatePicker';
import { IconButton } from '@material-ui/core'
import * as classNames from 'classnames';
import { Moment } from 'moment'
import { DayComponent } from '../../src/DatePicker/Calendar'
import { utilsToUse } from '../test-utils';
import MuiUtilsProvider from '../../src/utils/MuiPickersUtilsProvider'

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
      <MuiUtilsProvider utils={utilsToUse}>
        <DatePickerWrapper
          keyboard
          clearable
          value={selectedDate}
          onChange={this.handleChange}
          animateYearScrolling={false}
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

  formatWeekSelectLabel = (date: Moment, invalidLabel: string) => {
    if (date === null) {
      return '';
    }

    return date && date.isValid() ?
      `Week of ${date.clone().startOf('week').format('MMM Do')}`
      :
      invalidLabel;
  }

  renderWrappedDefaultDay = (day: Moment, selectedDate: Moment, dayInCurrentMonth: boolean, dayComponent: DayComponent) => {
    const { classes } = this.props;

    const startDate = selectedDate.clone().day(0).startOf('day');
    const endDate = selectedDate.clone().day(6).endOf('day');

    const dayIsBetween = (
      day.isSame(startDate) ||
      day.isSame(endDate) ||
      (day.isAfter(startDate) && day.isBefore(endDate))
    );

    const firstDay = day.isSame(startDate, 'day');
    const lastDay = day.isSame(endDate, 'day');

    const wrapperClassName = classNames({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: firstDay,
      [classes.endHighlight]: lastDay,
    });

    const dayClassName = classNames(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween,
    });

    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> { day.format('DD')} </span>
        </IconButton>
      </div>
    );
  }

  render() {
    const { selectedDate } = this.state;

    return (
      <Fragment>
        <DatePickerWrapper
          value={selectedDate}
          onChange={this.handleDateChange}
          renderDay={this.renderWrappedDefaultDay}
          labelFunc={this.formatWeekSelectLabel}
        />
      </Fragment>
    );
  }
}