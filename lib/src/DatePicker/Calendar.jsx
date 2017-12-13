import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from 'material-ui';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import classnames from 'classnames';
import CalendarHeader from './CalendarHeader';
import DomainPropTypes from '../constants/prop-types';
import * as defaultUtils from '../utils/utils';

const moment = extendMoment(Moment);

export class Calendar extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disableFuture: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    utils: PropTypes.object,
    shouldDisableDate: PropTypes.func,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disableFuture: false,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    utils: defaultUtils,
    shouldDisableDate: () => false,
  }

  state = {
    currentMonth: this.props.utils.getStartOfMonth(this.props.date),
  }

  onDateSelect = (day) => {
    const { date } = this.props;
    const updatedDate = day.clone()
      .hours(date.hours())
      .minutes(date.minutes());

    this.props.onChange(updatedDate);
  }

  handleChangeMonth = (newMonth) => {
    this.setState({ currentMonth: newMonth });
  }

  validateMinMaxDate = (day) => {
    const { minDate, maxDate } = this.props;
    const startOfDay = date => moment(date).startOf('day');

    return (
      (minDate && day.isBefore(startOfDay(minDate))) ||
      (maxDate && day.isAfter(startOfDay(maxDate)))
    );
  }

  shouldDisableDate = (day) => {
    const { disableFuture, shouldDisableDate } = this.props;
    return (
      (disableFuture && day.isAfter(moment())) || this.validateMinMaxDate(day) ||
      shouldDisableDate(day)
    );
  }

  renderWeeks = () => {
    const { utils } = this.props;
    const { currentMonth } = this.state;
    const weeks = utils.getWeekArray(currentMonth);

    return weeks.map(week => (
      <div key={`week-${week[0].toString()}`} className={this.props.classes.week}>
        {this.renderDays(week)}
      </div>
    ));
  }

  renderDays = (week) => {
    const {
      classes, date, renderDay, utils,
    } = this.props;

    const selectedDate = date.clone().startOf('day');
    const currentMonthNumber = utils.getMonthNumber(this.state.currentMonth);

    return week.map((day) => {
      // should be applied both for wrapper and button
      const disabledClass = classnames({ [classes.disabled]: this.shouldDisableDate(day) });

      const dayInCurrentMonth = utils.getMonthNumber(day) === currentMonthNumber;
      const dayClass = classnames(classes.day, disabledClass, {
        [classes.hidden]: !dayInCurrentMonth,
        [classes.selected]: selectedDate.isSame(day, 'day'),
      });

      let dayComponent = (
        <IconButton className={dayClass}>
          <span> {utils.getDayText(day)} </span>
        </IconButton>
      );

      if (renderDay) {
        dayComponent = renderDay(day, selectedDate, dayInCurrentMonth, dayComponent);
      }

      return (
        <div
          key={day.toString()}
          onClick={() => dayInCurrentMonth && this.onDateSelect(day)}
          onKeyPress={() => dayInCurrentMonth && this.onDateSelect(day)}
          className={disabledClass}
          role="presentation"
        >
          {dayComponent}
        </div>
      );
    });
  }

  render() {
    const { currentMonth } = this.state;
    const { classes, utils } = this.props;

    return (
      <div className={classes.container}>
        <CalendarHeader
          currentMonth={currentMonth}
          onMonthChange={this.handleChangeMonth}
          leftArrowIcon={this.props.leftArrowIcon}
          rightArrowIcon={this.props.rightArrowIcon}
          utils={utils}
        />

        <div className={classes.calendar}>
          {this.renderWeeks()}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  calendar: {
    marginTop: 5,
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
  day: {
    width: 36,
    height: 36,
    fontSize: 14,
    margin: '0 2px',
    color: theme.palette.text.primary,
  },
  selected: {
    color: theme.palette.primary[700],
    backgroundColor: theme.palette.primary[200],
  },
  disabled: {
    pointerEvents: 'none',
    color: theme.palette.text.hint,
  },
  week: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default withStyles(styles, { name: 'MuiPickersCalendar' })(Calendar);
