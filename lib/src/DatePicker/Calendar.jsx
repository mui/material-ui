import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import EventListener from 'react-event-listener';
import keycode from 'keycode';
import CalendarHeader from './CalendarHeader';
import DomainPropTypes from '../constants/prop-types';
import DayWrapper from './DayWrapper';
import Day from './Day';
import withUtils from '../_shared/WithUtils';
import { findClosestEnabledDate } from '../_helpers/date-utils';

/* eslint-disable no-unused-expressions */
export class Calendar extends Component {
  static propTypes = {
    date: PropTypes.object.isRequired,
    minDate: DomainPropTypes.date,
    maxDate: DomainPropTypes.date,
    classes: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disablePast: PropTypes.bool,
    disableFuture: PropTypes.bool,
    leftArrowIcon: PropTypes.node,
    rightArrowIcon: PropTypes.node,
    renderDay: PropTypes.func,
    theme: PropTypes.object.isRequired,
    shouldDisableDate: PropTypes.func,
    utils: PropTypes.object.isRequired,
    allowKeyboardControl: PropTypes.bool,
  };

  static defaultProps = {
    minDate: '1900-01-01',
    maxDate: '2100-01-01',
    disablePast: false,
    disableFuture: false,
    leftArrowIcon: undefined,
    rightArrowIcon: undefined,
    renderDay: undefined,
    allowKeyboardControl: false,
    shouldDisableDate: () => false,
  };

  static getDerivedStateFromProps(nextProps, state) {
    if (!nextProps.utils.isEqual(nextProps.date, state.lastDate)) {
      return {
        lastDate: nextProps.date,
        currentMonth: nextProps.utils.getStartOfMonth(nextProps.date),
      };
    }

    return null;
  }

  state = {
    currentMonth: this.props.utils.getStartOfMonth(this.props.date),
  };

  componentDidMount() {
    const {
      date, minDate, maxDate, utils, disableFuture, disablePast,
    } = this.props;

    if (this.shouldDisableDate(date)) {
      this.onDateSelect(findClosestEnabledDate({
        date,
        utils,
        minDate,
        maxDate,
        disablePast,
        disableFuture,
        shouldDisableDate: this.shouldDisableDate,
      }));
    }
  }

  onDateSelect = (day) => {
    const { date, utils } = this.props;

    const withHours = utils.setHours(day, utils.getHours(date));
    const withMinutes = utils.setMinutes(withHours, utils.getMinutes(date));

    this.props.onChange(withMinutes);
  };

  handleChangeMonth = (newMonth) => {
    this.setState({ currentMonth: newMonth });
  };

  validateMinMaxDate = (day) => {
    const { minDate, maxDate, utils } = this.props;

    return (
      (minDate && utils.isBeforeDay(day, utils.date(minDate))) ||
      (maxDate && utils.isAfterDay(day, utils.date(maxDate)))
    );
  };

  shouldDisablePrevMonth = () => {
    const { utils, disablePast, minDate } = this.props;
    const now = utils.date();
    return !utils.isBefore(
      utils.getStartOfMonth(disablePast && utils.isAfter(now, minDate)
        ? now
        : utils.date(minDate)),
      this.state.currentMonth,
    );
  };

  shouldDisableNextMonth = () => {
    const { utils, disableFuture, maxDate } = this.props;
    const now = utils.date();
    return !utils.isAfter(
      utils.getStartOfMonth(disableFuture && utils.isBefore(now, maxDate)
        ? now
        : utils.date(maxDate)),
      this.state.currentMonth,
    );
  };

  shouldDisableDate = (day) => {
    const {
      disablePast, disableFuture, shouldDisableDate, utils,
    } = this.props;

    return (
      (disableFuture && utils.isAfterDay(day, utils.date())) ||
      (disablePast && utils.isBeforeDay(day, utils.date())) ||
      this.validateMinMaxDate(day) ||
      shouldDisableDate(day)
    );
  };

  moveToDay = (day) => {
    if (day && !this.shouldDisableDate(day)) {
      this.props.onChange(day);
    }
  }

  handleKeyDown = (event) => {
    const { theme, date, utils } = this.props;

    switch (keycode(event)) {
      case 'up':
        this.moveToDay(utils.addDays(date, -7));
        break;
      case 'down':
        this.moveToDay(utils.addDays(date, 7));
        break;
      case 'left':
        theme.direction === 'ltr'
          ? this.moveToDay(utils.addDays(date, -1))
          : this.moveToDay(utils.addDays(date, 1));
        break;
      case 'right':
        theme.direction === 'ltr'
          ? this.moveToDay(utils.addDays(date, 1))
          : this.moveToDay(utils.addDays(date, -1));
        break;
      default:
        // if keycode is not handled, stop execution
        return;
    }

    // if event was handled prevent other side effects (e.g. page scroll)
    event.preventDefault();
  };

  renderWeeks = () => {
    const { utils } = this.props;
    const { currentMonth } = this.state;
    const weeks = utils.getWeekArray(currentMonth);

    return weeks.map(week => (
      <div
        key={`week-${week[0].toString()}`}
        className={this.props.classes.week}
      >
        {this.renderDays(week)}
      </div>
    ));
  }

  renderDays = (week) => {
    const { date, renderDay, utils } = this.props;

    const selectedDate = utils.startOfDay(date);
    const currentMonthNumber = utils.getMonth(this.state.currentMonth);
    const now = utils.date();

    return week.map((day) => {
      const disabled = this.shouldDisableDate(day);
      const dayInCurrentMonth = utils.getMonth(day) === currentMonthNumber;

      let dayComponent = (
        <Day
          current={utils.isSameDay(day, now)}
          hidden={!dayInCurrentMonth}
          disabled={disabled}
          selected={utils.isSameDay(selectedDate, day)}
        >
          {utils.getDayText(day)}
        </Day>
      );

      if (renderDay) {
        dayComponent = renderDay(day, selectedDate, dayInCurrentMonth, dayComponent);
      }

      return (
        <DayWrapper
          key={day.toString()}
          value={day}
          dayInCurrentMonth={dayInCurrentMonth}
          disabled={disabled}
          onSelect={this.onDateSelect}
        >
          {dayComponent}
        </DayWrapper>
      );
    });
  };

  render() {
    const { currentMonth } = this.state;
    const { classes, utils, allowKeyboardControl } = this.props;

    return (
      <Fragment>
        {
          allowKeyboardControl &&
            <EventListener target="window" onKeyDown={this.handleKeyDown} />
        }

        <CalendarHeader
          currentMonth={currentMonth}
          onMonthChange={this.handleChangeMonth}
          leftArrowIcon={this.props.leftArrowIcon}
          rightArrowIcon={this.props.rightArrowIcon}
          disablePrevMonth={this.shouldDisablePrevMonth()}
          disableNextMonth={this.shouldDisableNextMonth()}
          utils={utils}
        />

        <div
          autoFocus /* eslint-disable-line */ // Autofocus required for getting work keyboard navigation feature
          className={classes.calendar}
        >
          {this.renderWeeks()}
        </div>
      </Fragment>
    );
  }
}

const styles = theme => ({
  calendar: {
    height: 36 * 6,
    marginTop: theme.spacing.unit * 1.5,
  },
  week: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default withStyles(styles, {
  name: 'MuiPickersCalendar',
  withTheme: true,
})(withUtils()(Calendar));
