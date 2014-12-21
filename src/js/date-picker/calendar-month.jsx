var React = require('react');
var DateTime = require('../utils/date-time.js');

var CalendarMonth = React.createClass({

  propTypes: {
    focusDate: React.PropTypes.object
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
      return <span className="mui-date-picker-calendar-month-day">{day ? day : ''}</span>;
    });
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
      dayArray.push(i);
    };

    while (dayArray.length) {
      firstDayOfWeek = new Date(d.getFullYear(), d.getMonth(), dayArray[0]).getDay();
      daysInWeek = 7 - firstDayOfWeek;
      emptyDays = 7 - daysInWeek;
      week = dayArray.splice(0, daysInWeek);

      for (var i = 0; i < emptyDays; i++) {
        week.unshift(0);
      };

      weekArray.push(week);
    }

    return weekArray;
  }

});

module.exports = CalendarMonth;