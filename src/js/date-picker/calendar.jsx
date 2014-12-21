var React = require('react');
var CalendarMonth = require('./calendar-month.jsx');
var CalendarToolbar = require('./calendar-toolbar.jsx');

var Calendar = React.createClass({

  propTypes: {
    focusDate: React.PropTypes.object.isRequired,
    keyboardFocusDate: React.PropTypes.object,
    selectedDate: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="mui-date-picker-calendar">
        <CalendarToolbar focusDate={this.props.focusDate} />
        <ul className="mui-date-picker-calendar-week-title">
          <li className="mui-date-picker-calendar-week-title-day">S</li>
          <li className="mui-date-picker-calendar-week-title-day">M</li>
          <li className="mui-date-picker-calendar-week-title-day">T</li>
          <li className="mui-date-picker-calendar-week-title-day">W</li>
          <li className="mui-date-picker-calendar-week-title-day">T</li>
          <li className="mui-date-picker-calendar-week-title-day">F</li>
          <li className="mui-date-picker-calendar-week-title-day">S</li>
        </ul>
        <CalendarMonth focusDate={this.props.focusDate} />
      </div>
    );
  }

});

module.exports = Calendar;