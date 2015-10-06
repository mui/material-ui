const React = require('react');
const ContextPure = require('./mixins/context-pure');
const Transitions = require('./styles/transitions');
const Children = require('./utils/children');
const ColorManipulator = require('./utils/color-manipulator');
const ImmutabilityHelper = require('./utils/immutability-helper');
const Typography = require('./styles/typography');
const EnhancedButton = require('./enhanced-button');
const FlatButtonLabel = require('./buttons/flat-button-label');
const DefaultRawTheme = require('./styles/raw-themes/light-raw-theme');
const ThemeManager = require('./styles/theme-manager');

function validateLabel (props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' +
      'specified in ' + componentName + '.');
  }
}

const FlatButton = React.createClass({

  mixins: [
    ContextPure,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      const buttonTheme = muiTheme.button;
      const flatButtonTheme = muiTheme.flatButton;

      return {
        buttonColor: flatButtonTheme.color,
        buttonHeight: buttonTheme.height,
        buttonMinWidth: buttonTheme.minWidth,
        disabledTextColor: flatButtonTheme.disabledTextColor,
        primaryTextColor: flatButtonTheme.primaryTextColor,
        secondaryTextColor: flatButtonTheme.secondaryTextColor,
        textColor: flatButtonTheme.textColor,
        textTransform: flatButtonTheme.textTransform ? flatButtonTheme.textTransform :
                      (buttonTheme.textTransform ? buttonTheme.textTransform : 'uppercase'),
      };
    },
    getChildrenClasses() {
      return [
        EnhancedButton,
        FlatButtonLabel,
      ];
    },
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    hoverColor: React.PropTypes.string,
    label: validateLabel,
    labelPosition: React.PropTypes.oneOf([
      'before',
      'after',
    ]),
    labelStyle: React.PropTypes.object,
    onKeyboardFocus: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
    rippleColor: React.PropTypes.string,
    secondary: React.PropTypes.bool,
    style: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      labelStyle: {},
      labelPosition: 'before', // Should be after but we keep it like for now (prevent breaking changes)
      onKeyboardFocus: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onTouchStart: () => {},
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  render() {
    const {
      children,
      disabled,
      hoverColor,
      backgroundColor,
      label,
      labelStyle,
      labelPosition,
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

    const {
      buttonColor,
      buttonHeight,
      buttonMinWidth,
      disabledTextColor,
      primaryTextColor,
      secondaryTextColor,
      textColor,
      textTransform,
    } = this.constructor.getRelevantContextKeys(this.state.muiTheme);

    const defaultColor = disabled ? disabledTextColor :
      primary ? primaryTextColor :
      secondary ? secondaryTextColor :
      textColor;

    const defaultHoverColor = ColorManipulator.fade(ColorManipulator.lighten(defaultColor, 0.4), 0.15);
    const defaultRippleColor = ColorManipulator.fade(defaultColor, 0.8);
    const buttonHoverColor = hoverColor || defaultHoverColor;
    const buttonRippleColor = rippleColor || defaultRippleColor;
    const hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;
    const buttonBackgroundColor = backgroundColor || buttonColor;

    const mergedRootStyles = ImmutabilityHelper.merge({
      color: defaultColor,
      transition: Transitions.easeOut(),
      fontSize: Typography.fontStyleButtonFontSize,
      letterSpacing: 0,
      textTransform: textTransform,
      fontWeight: Typography.fontWeightMedium,
      borderRadius: 2,
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: hovered ? buttonHoverColor : buttonBackgroundColor,
      lineHeight: buttonHeight + 'px',
      minWidth: buttonMinWidth,
      padding: 0,
      margin: 0,
      //This is need so that ripples do not bleed past border radius.
      //See: http://stackoverflow.com/questions/17298739
      transform: 'translate3d(0, 0, 0)',
    }, style);

    const labelElement = label ? (
      <FlatButtonLabel label={label} style={labelStyle} />
    ) : undefined;

    // Place label before or after children.
    const childrenFragment = labelPosition === 'before' ?
      { labelElement, children }
      :
      { children, labelElement };
    const enhancedButtonChildren = Children.create(childrenFragment);

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
        {enhancedButtonChildren}
      </EnhancedButton>
    );
  },

  _handleKeyboardFocus(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(e, isKeyboardFocused);
  },

  _handleMouseEnter(e) {
    //Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(e);
  },

  _handleMouseLeave(e) {
    this.setState({hovered: false});
    this.props.onMouseLeave(e);
  },

  _handleTouchStart(e) {
    this.setState({touch: true});
    this.props.onTouchStart(e);
  },

});

module.exports = FlatButton;
