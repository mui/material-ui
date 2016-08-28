import React, {Component, PropTypes} from 'react';
import {isBetweenDates, isEqualDate, getWeekArray} from './dateUtils';
import DayButton from './DayButton';

class CalendarMonth extends Component {
  static propTypes = {
    autoOk: PropTypes.bool,
    displayDate: PropTypes.object.isRequired,
    firstDayOfWeek: PropTypes.number,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onTouchTapDay: PropTypes.func,
    range: PropTypes.bool,
    selectedDate: PropTypes.object.isRequired,
    shouldDisableDate: PropTypes.func,
  };
  componentWillMount() {
    if (this.props.range) {
      this.isSelected = (date) => {
        const {selectedDate} = this.props;
        if (date) {
          return isBetweenDates(date, selectedDate.start, selectedDate.end);
        }
      };
    } else {
      this.isSelected = (date) => {
        return isEqualDate(date, this.props.selectedDate);
      };
    }
  }

  isSelectedDateDisabled() {
    return this.selectedDateDisabled;
  }

  handleTouchTapDay = (event, date) => {
    if (this.props.onTouchTapDay) {
      this.props.onTouchTapDay(event, date);
    }
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
        <div key={i} style={this.styles.week}>
          {this.getDayElements(week, i)}
        </div>
      );
    }, this);
  }

  getDayElements(week, i) {
    return week.map((day, j) => {
      const isSelected = this.isSelected(day);
      const disabled = this.shouldDisableDate(day);
      const selected = !disabled && isSelected;

      if (isSelected) {
        this.selectedDateDisabled = disabled;
      }

      return (
        <DayButton
          date={day}
          disabled={disabled}
          key={`db${(i + j)}`}
          onTouchTap={this.handleTouchTapDay}
          selected={selected}
        />
      );
    }, this);
  }

  styles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      fontWeight: 400,
      height: 228,
      lineHeight: 2,
      position: 'relative',
      textAlign: 'center',
      MozPaddingStart: 0,
    },
    week: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      height: 34,
      marginBottom: 2,
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
