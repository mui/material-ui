let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let ColorManipulator = require('./utils/color-manipulator');
let Typography = require('./styles/typography');
let EnhancedButton = require('./enhanced-button');


function validateLabel (props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' +
      'specified in ' + componentName + '.');
  }
}


let FlatButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    hoverColor: React.PropTypes.string,
    label: validateLabel,
    labelStyle: React.PropTypes.object,
    onKeyboardFocus: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    rippleColor: React.PropTypes.string,
    secondary: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      labelStyle: {},
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
    };
  },

  render() {
    let {
      disabled,
      hoverColor,
      label,
      labelStyle,
      onKeyboardFocus,
      onMouseLeave,
      onMouseEnter,
      onTouchStart,
      primary,
      rippleColor,
      secondary,
      style,
      ...other,
      } = this.props;

    let theme = this.context.muiTheme;
    let buttonTheme = theme.component.button;
    let flatButtonTheme = theme.component.flatButton;

    let defaultColor = disabled ? flatButtonTheme.disabledTextColor :
      primary ? flatButtonTheme.primaryTextColor :
      secondary ? flatButtonTheme.secondaryTextColor :
      flatButtonTheme.textColor;

    let defaultHoverColor = ColorManipulator.fade(ColorManipulator.lighten(defaultColor, 0.4), 0.15);
    let defaultRippleColor = ColorManipulator.fade(defaultColor, 0.8);
    let buttonHoverColor = hoverColor || defaultHoverColor;
    let buttonRippleColor = rippleColor || defaultRippleColor;
    let hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

    let mergedRootStyles = this.mergeStyles({
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
      transform: 'translate3d(0, 0, 0)',
    }, this.props.style);

    let mergedLabelStyles = this.mergeAndPrefix({
      position: 'relative',
      padding: '0 ' + theme.spacing.desktopGutterLess + 'px',
    }, labelStyle);

    let labelElement = label ? <span style={mergedLabelStyles}>{label}</span> : null;

    return (
      <EnhancedButton
        {...other}
        disabled={disabled}
        focusRippleColor={buttonRippleColor}
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onTouchStart={this._handleTouchStart}
        style={mergedRootStyles}
        touchRippleColor={buttonRippleColor}>
        {labelElement}
        {this.props.children}
      </EnhancedButton>
    );
  },

  _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    if (this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(e, isKeyboardFocused);
    }
  },

  _handleMouseEnter(e) {
    //Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({hovered: true});
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

});

module.exports = FlatButton;
