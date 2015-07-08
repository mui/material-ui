let React = require('react');
let DateTime = require('../utils/date-time');
let DayButton = require('./day-button');
let ClearFix = require('../clearfix');


let CalendarMonth = React.createClass({

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    autoOk: React.PropTypes.bool,
  },

  render() {
    let styles = {
      lineHeight: '32px',
      textAlign: 'center',
      padding: '8px 14px 0 14px',
    };

    return (
      <div style={styles}>
        {this._getWeekElements()}
      </div>
    );
  },

  isSelectedDateDisabled() {
    return this._selectedDateDisabled;
  },

  _getWeekElements() {
    let weekArray = DateTime.getWeekArray(this.props.displayDate);

    return weekArray.map((week, i) => {
      return (
        <ClearFix key={i}>
          {this._getDayElements(week, i)}
        </ClearFix>
      );
    }, this);
  },

  _getDayElements(week, i) {
    return week.map((day, j) => {
      let isSameDate = DateTime.isEqualDate(this.props.selectedDate, day);
      let disabled = this._shouldDisableDate(day);
      let selected = !disabled && isSameDate;

      if (isSameDate) {
        if (disabled) {
          this._selectedDateDisabled = true;
        }
        else {
          this._selectedDateDisabled = false;
        }
      }

      return (
        <DayButton
          key={'db' + i + j}
          date={day}
          onTouchTap={this._handleDayTouchTap}
          selected={selected}
          disabled={disabled} />
      );
    }, this);
  },

  _handleDayTouchTap(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  },

  _shouldDisableDate(day) {
    if (day === null) return false;
    let disabled = !DateTime.isBetweenDates(day, this.props.minDate, this.props.maxDate);
    if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

    return disabled;
  },

});

module.exports = CalendarMonth;
