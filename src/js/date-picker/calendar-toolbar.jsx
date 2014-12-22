var React = require('react');
var DateTime = require('../utils/date-time.js');
var IconButton = require('../icon-button.jsx');

var CalendarToolbar = React.createClass({

  propTypes: {
    focusDate: React.PropTypes.object.isRequired,
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func
  },

  render: function() {
    var month = DateTime.getFullMonth(this.props.focusDate);
    var year = this.props.focusDate.getFullYear();

    return (
      <div className="mui-date-picker-calendar-toolbar">
        <IconButton
          className="mui-date-picker-calendar-toolbar-button-left"
          icon="navigation-chevron-left"
          onTouchTap={this.props.onLeftTouchTap} />
        <span className="mui-date-picker-calendar-toolbar-title">
          {month} {year}
        </span>
        <IconButton
          className="mui-date-picker-calendar-toolbar-button-right"
          icon="navigation-chevron-right"
          onTouchTap={this.props.onRightTouchTap} />
      </div>
    );
  }

});

module.exports = CalendarToolbar;