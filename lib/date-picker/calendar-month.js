'use strict';

var React = require('react');
var DateTime = require('../utils/date-time');
var DayButton = require('./day-button');
var ClearFix = require('../clearfix');

var CalendarMonth = React.createClass({
  displayName: 'CalendarMonth',

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    minDate: React.PropTypes.object,
    maxDate: React.PropTypes.object,
    shouldDisableDate: React.PropTypes.func,
    autoOk: React.PropTypes.bool
  },

  render: function render() {
    var styles = {
      lineHeight: '32px',
      textAlign: 'center',
      padding: '8px 14px 0 14px'
    };

    return React.createElement(
      'div',
      { style: styles },
      this._getWeekElements()
    );
  },

  isSelectedDateDisabled: function isSelectedDateDisabled() {
    return this._selectedDateDisabled;
  },

  _getWeekElements: function _getWeekElements() {
    var _this = this;

    var weekArray = DateTime.getWeekArray(this.props.displayDate);

    return weekArray.map(function (week, i) {
      return React.createElement(
        ClearFix,
        { key: i },
        _this._getDayElements(week, i)
      );
    }, this);
  },

  _getDayElements: function _getDayElements(week, i) {
    var _this2 = this;

    return week.map(function (day, j) {
      var isSameDate = DateTime.isEqualDate(_this2.props.selectedDate, day);
      var disabled = _this2._shouldDisableDate(day);
      var selected = !disabled && isSameDate;

      if (isSameDate) {
        if (disabled) {
          _this2._selectedDateDisabled = true;
        } else {
          _this2._selectedDateDisabled = false;
        }
      }

      return React.createElement(DayButton, {
        key: 'db' + i + j,
        date: day,
        onTouchTap: _this2._handleDayTouchTap,
        selected: selected,
        disabled: disabled });
    }, this);
  },

  _handleDayTouchTap: function _handleDayTouchTap(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  },

  _shouldDisableDate: function _shouldDisableDate(day) {
    if (day === null) return false;
    var disabled = !DateTime.isBetweenDates(day, this.props.minDate, this.props.maxDate);
    if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

    return disabled;
  }

});

module.exports = CalendarMonth;