import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from 'material-ui';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import classnames from 'classnames';
import CalendarHeader from './CalendarHeader';
import DomainPropTypes from '../constants/prop-types';

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
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disableFuture: false,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
  }

  state = {
    currentMonth: this.props.date.clone().startOf('month'),
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
    const { disableFuture } = this.props;
    return (
      (disableFuture && day.isAfter(moment())) || this.validateMinMaxDate(day)
    );
  }

  renderWeeks = () => {
    const { currentMonth } = this.state;
    const start = currentMonth.clone().startOf('week');
    const end = currentMonth.clone().endOf('month').endOf('week');

    return Array.from(moment.range(start, end).by('week'))
      .map(week => (
        <div key={`week-${week.toString()}`} className={this.props.classes.week}>
          { this.renderDays(week) }
        </div>
      ));
  }

  renderDays = (week) => {
    const { classes, date, renderDay } = this.props;

    const selectedDate = date.clone().startOf('day');
    const formattedSelectedDate = selectedDate.format();
    const end = week.clone().endOf('week');
    const currentMonthNumber = this.state.currentMonth.get('month');

    return Array.from(moment.range(week, end).by('day'))
      .map((day) => {
        const dayInCurrentMonth = day.get('month') === currentMonthNumber;

        const dayClass = classnames(classes.day, {
          [classes.hidden]: !dayInCurrentMonth,
          [classes.selected]: day.format() === formattedSelectedDate,
          [classes.disabled]: this.shouldDisableDate(day),
        });

        let dayComponent = (
          <IconButton className={dayClass}>
            <span> { day.format('DD')} </span>
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
            role="presentation"
          >
            {dayComponent}
          </div>
        );
      });
  }

  render() {
    const { currentMonth } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <CalendarHeader
          currentMonth={currentMonth}
          onMonthChange={this.handleChangeMonth}
          leftArrowIcon={this.props.leftArrowIcon}
          rightArrowIcon={this.props.rightArrowIcon}
        />

        <div className={classes.calendar}>
          { this.renderWeeks() }
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
