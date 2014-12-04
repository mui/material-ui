var React = require('react'),
  Classable = require('./mixins/classable.js'),
  EnhancedButton = require('./enhanced-button.jsx'),
  Icon = require('./icon.jsx'),
  Ripple = require('./ripple.jsx');

var IconButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    onTouchTap: React.PropTypes.func
  },

  render: function() {
    var {
      className,
      icon,
      onTouchTap,
      ...other } = this.props,
      classes = this.getClasses('mui-icon-button');

    return (
      <EnhancedButton {...other}
        className={classes}
        onTouchTap={this._onTouchTap}>

        <Ripple className="mui-icon-button-ripple" ref="ripple" />
        <Ripple className="mui-icon-button-focus-ripple" />
        <Icon icon={icon} />
      </EnhancedButton>
    );
  },

  _onTouchTap: function(e) {
    if (!this.props.disabled) this.refs.ripple.animateFromCenter();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = IconButton;