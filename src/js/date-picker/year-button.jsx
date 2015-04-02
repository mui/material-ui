var React = require('react');
var Classable = require('../mixins/classable');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');

var YearButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    year: React.PropTypes.number,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      selected: false
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
    var classes = this.getClasses('mui-date-picker-year-button', { 
      'mui-is-current-year': this.props.year === new Date().getFullYear(),
      'mui-is-selected': this.props.selected
    });

    return (
      <EnhancedButton {...other}
        className={classes}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onTouchTap={this._handleTouchTap}>
        <div className="mui-date-picker-year-button-select" />
        <span className="mui-date-picker-year-button-label">{this.props.year}</span>
      </EnhancedButton>
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.year);
  }

});

module.exports = YearButton;
