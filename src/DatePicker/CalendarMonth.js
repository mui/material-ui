import React, {Component, PropTypes} from 'react';
import {isBetweenDates, isEqualDate, getWeekArray} from './dateUtils';
import DayButton from './DayButton';
import ClearFix from '../internal/ClearFix';

class CalendarMonth extends Component {
  static propTypes = {
    autoOk: PropTypes.bool,
    displayDate: PropTypes.object.isRequired,
    firstDayOfWeek: PropTypes.number,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onDayTouchTap: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    shouldDisableDate: PropTypes.func,
  };

  isSelectedDateDisabled() {
    return this.selectedDateDisabled;
  }

  handleTouchTapDay = (event, date) => {
    if (this.props.onTouchTapDay) this.props.onTouchTapDay(event, date);
  };

  shouldDisableDate(day) {
    if (day === null) return false;
    let disabled = !isBetweenDates(day, this.props.minDate, this.props.maxDate);
    if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

    return disabled;
  }

  getWeekElements() {
    const weekArray = getWeekArray(this.props.displayDate, this.props.firstDayOfWeek);

    return weekArray.map((week, i) => {
      return (
        <ClearFix key={i} style={this.styles.week}>
          {this.getDayElements(week, i)}
        </ClearFix>
      );
    }, this);
  }

  getDayElements(week, i) {
    return week.map((day, j) => {
      const isSameDate = isEqualDate(this.props.selectedDate, day);
      const disabled = this.shouldDisableDate(day);
      const selected = !disabled && isSameDate;

      if (isSameDate) {
        this.selectedDateDisabled = disabled;
      }

      return (
        <DayButton
          key={`db${(i + j)}`}
          date={day}
          onTouchTap={this.handleTouchTapDay}
          selected={selected}
          disabled={disabled}
        />
      );
    }, this);
  }

  styles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      fontWeight: 400,
      height: 228,
      justifyContent: 'flex-start',
      lineHeight: 2,
      position: 'relative',
      textAlign: 'center',
      MozPaddingStart: 0,
      // backgroundColor: 'cyan',
    },
    week: {
      display: 'flex',
      flexDirection: 'row',
      height: 34,
      justifyContent: 'space-around',
      marginBottom: 2,
      // backgroundColor: 'yellow',
    },
  };

  render() {
    return (
      <div style={this.styles.root}>
        {this.getWeekElements()}
      </div>
    );
  }
}

export default CalendarMonth;
