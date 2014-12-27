var React = require('react');
var Classable = require('./mixins/classable.js');
var EnhancedButton = require('./enhanced-button.jsx');
var Icon = require('./icon.jsx');
var Ripple = require('./ripple.jsx');
var TouchRipple = require('./ripples/touch-ripple.jsx');
var Tooltip = require('./tooltip.jsx');

var IconButton = React.createClass({

  mixins: [Classable],

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
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
      icon,
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
        onTouchStart={this._handleTouchStart}
        onTouchEnd={this._handleTouchEnd}
        onMouseDown={this._handleMouseDown}
        onMouseUp={this._handleMouseUp}>

        {tooltip}

        <div
          className="mui-icon-button-target"
          onMouseOut={this._handleMouseOut}
          onMouseOver={this._handleMouseOver}>

          <TouchRipple
            rippleClassName="mui-icon-button-ripple"
            ref="touchRipple" />
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

  _handleMouseDown: function(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.refs.touchRipple.start();
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp: function(e) {
    this.refs.touchRipple.end();
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleTouchStart: function(e) {
    this.refs.touchRipple.start();
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd: function(e) {
    this.refs.touchRipple.end();
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  }

});

module.exports = IconButton;