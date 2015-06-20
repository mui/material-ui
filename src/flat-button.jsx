var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ColorManipulator = require('./utils/color-manipulator');
var Typography = require('./styles/typography');
var EnhancedButton = require('./enhanced-button');

function validateLabel (props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' +
      'specified in ' + componentName + '.');
  }
}

var FlatButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    hoverColor: React.PropTypes.string,
    label: validateLabel,
    labelStyle: React.PropTypes.object,
    onKeyboardFocus: React.PropTypes.func,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    rippleColor: React.PropTypes.string,
    secondary: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      labelStyle: {}
    }
  },

  getInitialState: function() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false
    };
  },

  render: function() {
    var {
      disabled,
      hoverColor,
      label,
      labelStyle,
      onKeyboardFocus,
      onMouseOut,
      onMouseOver,
      onTouchStart,
      primary,
      rippleColor,
      secondary,
      style,
      ...other
      } = this.props;

    var theme = this.context.muiTheme;
    var buttonTheme = theme.component.button;
    var flatButtonTheme = theme.component.flatButton;

    var defaultColor = disabled ? flatButtonTheme.disabledTextColor :
      primary ? flatButtonTheme.primaryTextColor :
      secondary ? flatButtonTheme.secondaryTextColor :
      flatButtonTheme.textColor;

    var defaultHoverColor = ColorManipulator.fade(ColorManipulator.lighten(defaultColor, 0.4), 0.15);
    var defaultRippleColor = ColorManipulator.fade(defaultColor, 0.8);
    var buttonHoverColor = hoverColor || defaultHoverColor;
    var buttonRippleColor = rippleColor || defaultRippleColor;
    var hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

    var mergedRootStyles = this.mergeStyles({
      color: defaultColor,
      transition: Transitions.easeOut(),
      fontSize: Typography.fontStyleButtonFontSize,
      letterSpacing: 0,
      textTransform: 'uppercase',
      fontWeight: Typography.fontWeightMedium,
      borderRadius: 2,
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: hovered ? buttonHoverColor : flatButtonTheme.color,
      lineHeight: buttonTheme.height + 'px',
      minWidth: buttonTheme.minWidth,
      padding: 0,
      margin: 0,
      //This is need so that ripples do not bleed past border radius.
      //See: http://stackoverflow.com/questions/17298739
      transform: 'translate3d(0, 0, 0)'
    }, this.props.style);

    var mergedLabelStyles = this.mergeAndPrefix({
      position: 'relative',
      padding: '0 ' + theme.spacing.desktopGutterLess + 'px'
    }, labelStyle);

    var labelElement = label ? <span style={mergedLabelStyles}>{label}</span> : null;

    return (
      <EnhancedButton
        {...other}
        disabled={disabled}
        focusRippleColor={buttonRippleColor}
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseOut={this._handleMouseOut}
        onMouseOver={this._handleMouseOver}
        onTouchStart={this._handleTouchStart}
        style={mergedRootStyles}
        touchRippleColor={buttonRippleColor}>
        {labelElement}
        {this.props.children}
      </EnhancedButton>
    );
  },

  _handleKeyboardFocus: function(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseOver: function(e) {
    //Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({hovered: true});
    if (this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) this.props.onMouseOut(e);
  },

  _handleTouchStart: function(e) {
     this.setState({touch: true});
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  }

});

module.exports = FlatButton;
