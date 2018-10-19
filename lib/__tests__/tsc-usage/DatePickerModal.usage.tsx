// tslint:disable max-classes-per-file
import { IconButton } from '@material-ui/core';
import classNames from 'classnames';
import { Moment } from 'moment';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import DatePickerWrapper from '../../src/DatePicker';
import { DayComponent } from '../../src/DatePicker/components/Calendar';
import MuiUtilsProvider from '../../src/MuiPickersUtilsProvider';
import { utilsToUse } from '../test-utils';

// initially from the docs site
export default class BasicUsage extends React.Component<
  {},
  { selectedDate: Date }
> {
  public state = {
    selectedDate: new Date(),
  };
  public handleChange = (date: Moment | Date) => {
    this.setState({ selectedDate: date as Date });
  };

  public render() {
    const { selectedDate } = this.state;

    return (
      <MuiUtilsProvider utils={utilsToUse}>
        <DatePickerWrapper
          keyboard
          clearable
          value={selectedDate}
          onChange={this.handleChange}
          animateYearScrolling={false}
          maxDateMessage={<div> Some component </div>}
        />
      </MuiUtilsProvider>
    );
  }
}

class CustomElements extends React.Component<
  { classes: any },
  { selectedDate: Date }
> {
  public static propTypes = {
    classes: PropTypes.object.isRequired,
  };
  public state = {
    selectedDate: new Date(),
  };

  public handleDateChange = (date: Moment | Date) => {
    this.setState({ selectedDate: (date as Moment).toDate() });
  };

  public formatWeekSelectLabel = (date: Moment, invalidLabel: string) => {
    if (date === null) {
      return '';
    }

    return date && date.isValid()
      ? `Week of ${date
          .clone()
          .startOf('week')
          .format('MMM Do')}`
      : invalidLabel;
  };

  public renderWrappedDefaultDay = (
    day: Moment,
    selectedDate: Moment,
    dayInCurrentMonth: boolean,
    dayComponent: DayComponent
  ) => {
    const { classes } = this.props;

    const startDate = selectedDate
      .clone()
      .day(0)
      .startOf('day');
    const endDate = selectedDate
      .clone()
      .day(6)
      .endOf('day');

    const dayIsBetween =
      day.isSame(startDate) ||
      day.isSame(endDate) ||
      (day.isAfter(startDate) && day.isBefore(endDate));

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
          <span> {day.format('DD')} </span>
        </IconButton>
      </div>
    );
  };

  public render() {
    const { selectedDate } = this.state;

    return (
      <React.Fragment>
        <DatePickerWrapper
          value={selectedDate}
          onChange={this.handleDateChange}
          renderDay={this.renderWrappedDefaultDay}
          labelFunc={this.formatWeekSelectLabel}
        />
      </React.Fragment>
    );
  }
}
