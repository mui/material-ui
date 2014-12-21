var React = require('react');
var CalendarToolbar = require('./calendar-toolbar.jsx');

var Calendar = React.createClass({

  propTypes: {
    date: React.PropTypes.object.isRequired
  },

  render: function() {
    //var month = DateTime.getShortMonth(this.props.date);

    return (
      <div className="mui-date-picker-calendar">
        <CalendarToolbar date={this.props.date} />
        <ul className="mui-date-picker-calendar-week-title">
          <li className="mui-date-picker-calendar-week-title-day">S</li>
          <li className="mui-date-picker-calendar-week-title-day">M</li>
          <li className="mui-date-picker-calendar-week-title-day">T</li>
          <li className="mui-date-picker-calendar-week-title-day">W</li>
          <li className="mui-date-picker-calendar-week-title-day">T</li>
          <li className="mui-date-picker-calendar-week-title-day">F</li>
          <li className="mui-date-picker-calendar-week-title-day">S</li>
        </ul>
      </div>
    );
  }

});

module.exports = Calendar;