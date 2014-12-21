var React = require('react');
var DateTime = require('../utils/date-time.js');
var DayButton = require('./day-button.jsx');

var CalendarMonth = React.createClass({

  propTypes: {
    focusDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="mui-date-picker-calendar-month">
        {this._getWeekElements()}
      </div>
    );
  },

  _getWeekElements: function() {
    var weekArray = this._getWeekArray();

    return weekArray.map(function(week) {
      return (
        <div className="mui-date-picker-calendar-month-week">
          {this._getDayElements(week)}
        </div>
      );
    }, this);
  },

  _getDayElements: function(week) {
    return week.map(function(day) {
      var selected = DateTime.isEqualDate(this.props.selectedDate, day);
      return (
        <DayButton
          date={day}
          onTouchTap={this._handleDayTouchTap}
          selected={selected} />
      );
    }, this);
  },

  _getWeekArray: function() {
    var d = this.props.focusDate;
    var dayArray = [];
    var daysInMonth = DateTime.getDaysInMonth(d);
    var daysInWeek;
    var emptyDays;
    var firstDayOfWeek;
    var week;
    var weekArray = [];

    for (var i = 1; i <= daysInMonth; i++) {
      dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    };

    while (dayArray.length) {
      firstDayOfWeek = dayArray[0].getDay();
      daysInWeek = 7 - firstDayOfWeek;
      emptyDays = 7 - daysInWeek;
      week = dayArray.splice(0, daysInWeek);

      for (var i = 0; i < emptyDays; i++) {
        week.unshift(null);
      };

      weekArray.push(week);
    }

    return weekArray;
  },

  _handleDayTouchTap: function(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  }

});

module.exports = CalendarMonth;