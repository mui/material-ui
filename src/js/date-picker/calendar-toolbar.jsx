var React = require('react');
var DateTime = require('../utils/date-time.js');

var CalendarToolbar = React.createClass({

  propTypes: {
    date: React.PropTypes.object.isRequired
  },

  render: function() {
    var month = DateTime.getFullMonth(this.props.date);
    var year = this.props.date.getFullYear();

    return (
      <div className="mui-date-picker-calendar-toolbar">
        <span className="mui-date-picker-calendar-toolbar-title">{month} {year}</span>
      </div>
    );
  }

});

module.exports = CalendarToolbar;