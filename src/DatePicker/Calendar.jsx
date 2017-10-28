import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton } from 'material-ui';

import Moment from 'moment';
import { extendMoment } from 'moment-range';
import classnames from 'classnames';
import CalendarHeader from './CalendarHeader';
import DomainPropTypes from '../constants/prop-types';

const moment = extendMoment(Moment);

class Calendar extends PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disableFuture: PropTypes.bool,
  }

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disableFuture: false,
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

  shouldDisableDate = (day) => {
    const { disableFuture, minDate, maxDate } = this.props;
    return (
      (disableFuture && day.isAfter(moment())) ||
      (minDate && day.isBefore(minDate)) ||
      (maxDate && day.isAfter(maxDate))
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
    const { classes, date } = this.props;

    const selectedDate = date.clone().startOf('day').format();
    const end = week.clone().endOf('week');
    const currentMonthNumber = this.state.currentMonth.get('month');

    return Array.from(moment.range(week, end).by('day'))
      .map((day) => {
        const dayClass = classnames(classes.day, {
          [classes.hidden]: day.get('month') !== currentMonthNumber,
          [classes.selected]: day.format() === selectedDate,
          [classes.disabled]: this.shouldDisableDate(day),
        });

        return (
          <IconButton
            key={day.toString()}
            className={dayClass}
            onClick={() => this.onDateSelect(day)}
          >
            <span> { day.format('DD')} </span>
          </IconButton>
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
    marginTop: 10,
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
