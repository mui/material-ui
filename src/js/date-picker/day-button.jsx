var React = require('react');
var EnhancedButton = require('../enhanced-button.jsx');

var DayButton = React.createClass({

  propTypes: {
    date: React.PropTypes.object
  },

  render: function() {

    return this.props.date ? (
      <EnhancedButton className="mui-date-picker-day-button">
        {this.props.date.getDate()}
      </EnhancedButton>
    ) : (
      <span className="mui-date-picker-day-button" />
    );
  }

});

module.exports = DayButton;