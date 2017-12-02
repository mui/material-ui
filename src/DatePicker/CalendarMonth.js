import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isBetweenDates, isEqualDate} from './dateUtils';
import DayButton from './DayButton';

const styles = {
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

class CalendarMonth extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    displayDate: PropTypes.object.isRequired,
    firstDayOfWeek: PropTypes.number,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onClickDay: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    shouldDisableDate: PropTypes.func,
    utils: PropTypes.object.isRequired,
  };

  isSelectedDateDisabled() {
    return this.selectedDateDisabled;
  }

  handleClickDay = (event, date) => {
    if (this.props.onClickDay) {
      this.props.onClickDay(event, date);
    }
  };

  shouldDisableDate(day) {
    if (day === null) return false;
    let disabled = !isBetweenDates(day, this.props.minDate, this.props.maxDate);
    if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

    return disabled;
  }

  getWeekElements() {
    const weekArray = this.props.utils.getWeekArray(this.props.displayDate, this.props.firstDayOfWeek);

    return weekArray.map((week, i) => {
      return (
        <div key={i} style={styles.week}>
          {this.getDayElements(week, i)}
        </div>
      );
    }, this);
  }

  getDayElements(week, i) {
    const {
      DateTimeFormat,
      locale,
      selectedDate,
    } = this.props;

    return week.map((day, j) => {
      const isSameDate = isEqualDate(selectedDate, day);
      const disabled = this.shouldDisableDate(day);
      const selected = !disabled && isSameDate;

      if (isSameDate) {
        this.selectedDateDisabled = disabled;
      }

      return (
        <DayButton
          DateTimeFormat={DateTimeFormat}
          locale={locale}
          date={day}
          disabled={disabled}
          key={`db${(i + j)}`}
          onClick={this.handleClickDay}
          selected={selected}
        />
      );
    }, this);
  }

  render() {
    return (
      <div style={styles.root}>
        {this.getWeekElements()}
      </div>
    );
  }
}

export default CalendarMonth;
