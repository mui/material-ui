var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');

var DayButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      selected: false,
      disabled: false
    };
  },

  render: function() {
    var {
      className,
      date,
      onTouchTap,
      selected,
      ...other
    } = this.props;
    var classes = this.getClasses('mui-date-picker-day-button', { 
      'mui-is-current-date': DateTime.isEqualDate(this.props.date, new Date()),
      'mui-is-selected': this.props.selected,
      'mui-is-disabled': this.props.disabled
    });

    return this.props.date ? (
      <EnhancedButton {...other}
        key={this.props.date.getTime()}
        className={classes}
        disabled={this.props.disabled}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={this._handleTouchTap}>
        <div className="mui-date-picker-day-button-select" />
        <span className="mui-date-picker-day-button-label">{this.props.date.getDate()}</span>
      </EnhancedButton>
    ) : (
      <span className={classes} />
    );
  },

  _handleTouchTap: function(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  }

});

module.exports = DayButton;