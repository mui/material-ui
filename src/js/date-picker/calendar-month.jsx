var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/date-time');
var DayButton = require('./day-button');

var CalendarMonth = React.createClass({

  mixins: [Classable],

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onDayTouchTap: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    autoOk: React.PropTypes.bool
  },

  render: function() {
    var classes = this.getClasses('mui-date-picker-calendar-month');

    return (
      <div className={classes}>
        {this._getWeekElements()}
      </div>
    );
  },

  _getWeekElements: function() {
    var weekArray = DateTime.getWeekArray(this.props.displayDate);

    return weekArray.map(function(week, i) {
      return (
        <div
          key={i}
          className="mui-date-picker-calendar-month-week">
          {this._getDayElements(week)}
        </div>
      );
    }, this);
  },
  _isDisabled: function(day){
    var minDate = this.props.minDate;
    var maxDate = this.props.maxDate;

    if(minDate != null && day < minDate){
      return true;
    }

    if(maxDate != null && day > maxDate){
      return true;
    }

    return false;
  },
  _getDayElements: function(week) {
    return week.map(function(day, i) {
      var selected = DateTime.isEqualDate(this.props.selectedDate, day);
      var disabled = this._isDisabled(day);
      return (
        <DayButton
          key={i}
          date={day}
          disabled={disabled}
          onTouchTap={this._handleDayTouchTap}
          selected={selected} />
      );
    }, this);
  },

  _handleDayTouchTap: function(e, date) {
    if (this.props.onDayTouchTap) this.props.onDayTouchTap(e, date);
  }

});

module.exports = CalendarMonth;