var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/mixins/transitions');
var CustomVariables = require('./styles/variables/custom-variables');
var EnhancedButton = require('./enhanced-button');
var FontIcon = require('./font-icon');
var Tooltip = require('./tooltip');

var IconButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    theme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    touch: React.PropTypes.bool,
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

    if (process.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        var warning = 'You have set both an iconClassName and a child icon. ' +
                      'It is recommended you use only one method when adding ' +
                      'icons to IconButtons.';
        console.warn(warning);
      }
    }
  },

  /** Styles */
  _main: function() {
    var style = {
      height: 48,
      width: 48,
      position: 'relative',
      boxSizing: 'border-box',
      transition: Transitions.easeOut(),
      padding: (CustomVariables.spacing.iconSize / 2),
      width: CustomVariables.spacing.iconSize*2,
      height: CustomVariables.spacing.iconSize*2,
    };

    if (this.props.disabled) {
      style = this.mergeAndPrefix(style, {
        color: CustomVariables.disabledColor,
        fill: CustomVariables.disabledColor,
      });
    }

    return this.mergeAndPrefix(style);
  },

  _tooltip: function() {
    return {
      boxSizing: 'border-box',
      marginTop: CustomVariables.iconButtonSize + 4,
    };
  },

  _icon: function() {
    var style = {
        color: this.context.theme.textColor,
        fill: this.context.theme.textColor,
    };

    if (this.props.disabled) {
      style = {
        color: CustomVariables.disabledColor,
        fill: CustomVariables.disabledColor,
      };
    }

    if (this.props.iconStyle) {
      style = this.mergeAndPrefix(style, this.props.iconStyle);
    }

    return style;
  },

  /**
   * If the user has children icon and is disabled, we have no way of knowing 
   * how to override children styles to apply disabled styles. Instead, we 
   * add a color overlay with disabled styles above the children. This can be 
   * removed by the user if he/she has his/her own custom disabled styles.
   */
  _overlay: function() {
    return {
      position: 'relative',
      top: 0,
      width: '100%',
      height: '100%',
      background: CustomVariables.disabledColor,

    }
  },

  render: function() {
    var {
      tooltip,
      touch,
      ...other } = this.props;
    var tooltip;
    var fonticon;

    if (this.props.tooltip) {
      tooltip = (
        <Tooltip
          ref="tooltip"
          label={tooltip}
          show={this.state.tooltipShown}
          touch={touch}
          style={this._tooltip()}/>
      );
    }

    if (this.props.iconClassName) {
      fonticon = (
        <FontIcon 
          className={this.props.iconClassName} 
          style={this._icon()}/>
      );
    }

    if (this.props.children && this.props.disabled) {
      React.Children.forEach(this.props.children, function(child) {
        child.props.style = {
          color: CustomVariables.disabledColor,
          fill: CustomVariables.disabledColor,
        }
      });
    } 

    return (
      <EnhancedButton {...other}
        ref="button"
        centerRipple={true}
        style={this._main()}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        onKeyboardFocus={this._handleKeyboardFocus}>

        {tooltip}
        {fonticon}
        {this.props.children}

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

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this._showTooltip();
      if (this.props.onFocus) this.props.onFocus(e);
    } else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(e);
    }
  }

});

module.exports = IconButton;
