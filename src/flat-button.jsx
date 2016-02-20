import React from 'react';
import Transitions from './styles/transitions';
import Children from './utils/children';
import ColorManipulator from './utils/color-manipulator';
import EnhancedButton from './enhanced-button';
import FlatButtonLabel from './buttons/flat-button-label';
import getMuiTheme from './styles/getMuiTheme';

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error(`Required prop label or children was not specified in ${componentName}.`);
  }
}

const FlatButton = React.createClass({

  propTypes: {
    /**
     * Color of button when mouse is not hovering over it.
     */
    backgroundColor: React.PropTypes.string,

    /**
     * This is what will be displayed inside the button.
     * If a label is specified, the text within the label prop will
     * be displayed. Otherwise, the component will expect children
     * which will then be displayed. (In our example,
     * we are nesting an `<input type="file" />` and a `span`
     * that acts as our label to be displayed.) This only
     * applies to flat and raised buttons.
     */
    children: React.PropTypes.node,

    /**
     * Disables the button if set to true.
     */
    disabled: React.PropTypes.bool,

    /**
     * Color of button when mouse hovers over.
     */
    hoverColor: React.PropTypes.string,

    /**
     * URL to link to when button clicked if `linkButton` is set to true.
     */
    href: React.PropTypes.string,

    /**
     * Use this property to display an icon.
     */
    icon: React.PropTypes.node,

    /**
     * Label for the button.
     */
    label: validateLabel,

    /**
     * Place label before or after the passed children.
     */
    labelPosition: React.PropTypes.oneOf([
      'before',
      'after',
    ]),

    /**
     * Override the inline-styles of the button's label element.
     */
    labelStyle: React.PropTypes.object,

    /**
     * Enables use of `href` property to provide a URL to link to if set to true.
     */
    linkButton: React.PropTypes.bool,

    /**
     * Called when element is focused by the keyboard.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Called when the mouse enters the element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Called when the mouse leaves the element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Called when a touch event is started inside the element.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * If true, colors button according to
     * primaryTextColor from the Theme.
     */
    primary: React.PropTypes.bool,

    /**
     * Color for the ripple after button is clicked.
     */
    rippleColor: React.PropTypes.string,

    /**
     * If true, colors button according to secondaryTextColor from the theme.
     * The primary prop has precendent if set to true.
     */
    secondary: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      disabled: false,
      labelStyle: {},
      labelPosition: 'after',
      onKeyboardFocus: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
      onTouchStart: () => {},
      primary: false,
      secondary: false,
    };
  },

  getInitialState() {
    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  _handleKeyboardFocus(event, isKeyboardFocused) {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(event, isKeyboardFocused);
  },

  _handleMouseEnter(event) {
    //Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(event);
  },

  _handleMouseLeave(event) {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  },

  _handleTouchStart(event) {
    this.setState({touch: true});
    this.props.onTouchStart(event);
  },

  render() {
    const {
      children,
      disabled,
      hoverColor,
      backgroundColor,
      icon,
      label,
      labelStyle,
      labelPosition,
      primary,
      rippleColor,
      secondary,
      style,
      ...other,
    } = this.props;

    const {
      button: {
        height: buttonHeight,
        minWidth: buttonMinWidth,
        textTransform: buttonTextTransform,
      },
      flatButton: {
        buttonFilterColor,
        color: buttonColor,
        disabledTextColor,
        fontSize,
        fontWeight,
        primaryTextColor,
        secondaryTextColor,
        textColor,
        textTransform = buttonTextTransform || 'uppercase',
      },
    } = this.state.muiTheme;
    const defaultTextColor = disabled ? disabledTextColor :
      primary ? primaryTextColor :
      secondary ? secondaryTextColor :
      textColor;

    const defaultHoverColor = ColorManipulator.fade(buttonFilterColor, 0.2);
    const defaultRippleColor = buttonFilterColor;
    const buttonHoverColor = hoverColor || defaultHoverColor;
    const buttonRippleColor = rippleColor || defaultRippleColor;
    const buttonBackgroundColor = backgroundColor || buttonColor;
    const hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

    const mergedRootStyles = Object.assign({}, {
      color: defaultTextColor,
      transition: Transitions.easeOut(),
      fontSize: fontSize,
      letterSpacing: 0,
      textTransform: textTransform,
      fontWeight: fontWeight,
      borderRadius: 2,
      userSelect: 'none',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: hovered ? buttonHoverColor : buttonBackgroundColor,
      lineHeight: `${buttonHeight}px`,
      minWidth: buttonMinWidth,
      padding: 0,
      margin: 0,
    }, style);

    let iconCloned;
    const labelStyleIcon = {};

    if (icon) {
      iconCloned = React.cloneElement(icon, {
        color: mergedRootStyles.color,
        style: {
          verticalAlign: 'middle',
          marginLeft: labelPosition === 'before' ? 0 : 12,
          marginRight: labelPosition === 'before' ? 12 : 0,
        },
      });

      if (labelPosition === 'before') {
        labelStyleIcon.paddingRight = 8;
      } else {
        labelStyleIcon.paddingLeft = 8;
      }
    }

    const labelElement = label ? (
      <FlatButtonLabel label={label} style={Object.assign({}, labelStyleIcon, labelStyle)} />
    ) : undefined;

    // Place label before or after children.
    const childrenFragment = labelPosition === 'before' ?
      {
        labelElement,
        iconCloned,
        children,
      }
      :
      {
        children,
        iconCloned,
        labelElement,
      };
    const enhancedButtonChildren = Children.create(childrenFragment);

    return (
      <EnhancedButton
        {...other}
        disabled={disabled}
        focusRippleColor={buttonRippleColor}
        focusRippleOpacity={0.3}
        onKeyboardFocus={this._handleKeyboardFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onTouchStart={this._handleTouchStart}
        style={mergedRootStyles}
        touchRippleColor={buttonRippleColor}
        touchRippleOpacity={0.3}
      >
        {enhancedButtonChildren}
      </EnhancedButton>
    );
  },
});

export default FlatButton;
