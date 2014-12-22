var React = require('react');
var DateTime = require('../utils/date-time.js');
var CalendarMonth = require('./calendar-month.jsx');
var CalendarToolbar = require('./calendar-toolbar.jsx');

var Calendar = React.createClass({

  propTypes: {
    focusDate: React.PropTypes.object.isRequired,
    keyboardFocusDate: React.PropTypes.object,
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func,
    onSelectedDateChange: React.PropTypes.func,
    selectedDate: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="mui-date-picker-calendar">
        <CalendarToolbar
          focusDate={this.props.focusDate}
          onLeftTouchTap={this.props.onLeftTouchTap}
          onRightTouchTap={this.props.onRightTouchTap} />
        <ul className="mui-date-picker-calendar-week-title">
          <li className="mui-date-picker-calendar-week-title-day">S</li>
          <li className="mui-date-picker-calendar-week-title-day">M</li>
          <li className="mui-date-picker-calendar-week-title-day">T</li>
          <li className="mui-date-picker-calendar-week-title-day">W</li>
          <li className="mui-date-picker-calendar-week-title-day">T</li>
          <li className="mui-date-picker-calendar-week-title-day">F</li>
          <li className="mui-date-picker-calendar-week-title-day">S</li>
        </ul>
        <CalendarMonth
          focusDate={this.props.focusDate}
          onDayTouchTap={this._handleDayTouchTap}
          selectedDate={this.props.selectedDate} />
      </div>
    );
  },

  _handleDayTouchTap: function(e, date) {
    if (this.props.onSelectedDateChange &&
      (!DateTime.isEqualDate(this.props.selectedDate, date))) {
      this.props.onSelectedDateChange(e, date);
    }
  }

});

module.exports = Calendar;