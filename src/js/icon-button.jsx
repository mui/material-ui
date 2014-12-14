var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedButton = require('./enhanced-button.jsx');
var Icon = require('./icon.jsx');
var Ripple = require('./ripple.jsx');
var Tooltip = require('./tooltip.jsx');

var IconButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    touch: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      tooltipShown: false 
    };
  },

  componentDidMount: function() {
    if (this.props.tooltip) {
      this._positionTooltip();
    }
  },

  render: function() {
    var {
      className,
      icon,
      onBlur,
      onFocus,
      onTouchTap,
      tooltip,
      touch,
      ...other } = this.props;
    var classes = this.getClasses('mui-icon-button');
    var tooltip;

    if (this.props.tooltip) {
      tooltip = (
        <Tooltip
          ref="tooltip"
          className="mui-icon-button-tooltip"
          label={this.props.tooltip}
          show={this.state.tooltipShown}
          touch={this.props.touch} />
      );
    }

    return (
      <EnhancedButton {...other}
        ref="button"
        className={classes}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onTouchTap={this._handleTouchTap}>

        {tooltip}
        <div
          className="mui-icon-button-target"
          onMouseOut={this._handleMouseOut}
          onMouseOver={this._handleMouseOver}>

          <Ripple ref="ripple" className="mui-icon-button-ripple" />
          <Ripple className="mui-icon-button-focus-ripple" />
          <Icon icon={icon} />

        </div>

      </EnhancedButton>
    );
  },

  _positionTooltip: function() {
    var tooltip = this.refs.tooltip.getDOMNode();
    var tooltipWidth = tooltip.offsetWidth;
    var buttonWidth = 48;

    tooltip.style.left = (tooltipWidth - buttonWidth) / 2 * -1 + 'px';
  },

  _showTooltip: function() {
    if (!this.props.disabled) this.setState({ tooltipShown: true });
  },

  _hideTooltip: function() {
    this.setState({ tooltipShown: false });
  },

  _handleBlur: function(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseOut: function(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleMouseOver: function(e) {
    this._showTooltip();
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleTouchTap: function(e) {
    if (!this.props.disabled) this.refs.ripple.animateFromCenter();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = IconButton;