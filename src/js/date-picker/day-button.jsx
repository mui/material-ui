var React = require('react');
var Classable = require('../mixins/classable.js');
var DateTime = require('../utils/date-time.js');
var EnhancedButton = require('../enhanced-button.jsx');

var DayButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    date: React.PropTypes.object
  },

  render: function() {
    var classes = this.getClasses('mui-date-picker-day-button', { 
      'mui-is-current-date': DateTime.isEqualDate(this.props.date, new Date())
    });

    return this.props.date ? (
      <EnhancedButton className={classes}>
        {this.props.date.getDate()}
      </EnhancedButton>
    ) : (
      <span className={classes} />
    );
  }

});

module.exports = DayButton;