var React = require('react');
var DateTime = require('../utils/date-time.js');

var DateDisplay = React.createClass({

  propTypes: {
    selectedDate: React.PropTypes.object.isRequired
  },

  render: function() {
    var dayOfWeek = DateTime.getDayOfWeek(this.props.selectedDate);
    var month = DateTime.getShortMonth(this.props.selectedDate);
    var day = this.props.selectedDate.getDate();
    var year = this.props.selectedDate.getFullYear();

    return (
      <div className="mui-date-picker-date-display">
        <div className="mui-date-picker-date-display-dow">{dayOfWeek}</div>
        <div className="mui-date-picker-date-display-date">
          <div className="mui-date-picker-date-display-month">{month}</div>
          <div className="mui-date-picker-date-display-day">{day}</div>
          <div className="mui-date-picker-date-display-year">{year}</div>
        </div>
      </div>
    );
  }

});

module.exports = DateDisplay;