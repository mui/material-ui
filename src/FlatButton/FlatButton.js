import React from 'react';
import transitions from '../styles/transitions';
import {createChildFragment} from '../utils/childUtils';
import ColorManipulator from '../utils/colorManipulator';
import EnhancedButton from '../internal/EnhancedButton';
import FlatButtonLabel from './FlatButtonLabel';
import getMuiTheme from '../styles/getMuiTheme';

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label && !props.icon) {
    return new Error(`Required prop label or children or icon was not specified in ${componentName}.`);
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
     * Callback function fired when the element is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the element.
     * @param {boolean} isKeyboardFocused Indicates whether the element is focused.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Callback function fired when the mouse enters the element.
     *
     * @param {object} event `mouseenter` event targeting the element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Callback function fired when the mouse leaves the element.
     *
     * @param {object} event `mouseleave` event targeting the element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Callback function fired when the element is touched.
     *
     * @param {object} event `touchstart` event targeting the element.
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
      linkButton,
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
      transition: transitions.easeOut(),
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
      // That's the default value for a button but not a link
      textAlign: 'center',
    }, style);

    let iconCloned;
    const labelStyleIcon = {};

    if (icon) {
      iconCloned = React.cloneElement(icon, {
        color: mergedRootStyles.color,
        style: {
          lineHeight: `${buttonHeight}px`,
          verticalAlign: 'middle',
          marginLeft: label && labelPosition !== 'before' ? 12 : 0,
          marginRight: label && labelPosition === 'before' ? 12 : 0,
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
      } :
      {
        children,
        iconCloned,
        labelElement,
      };
    const enhancedButtonChildren = createChildFragment(childrenFragment);

    return (
      <EnhancedButton
        {...other}
        disabled={disabled}
        focusRippleColor={buttonRippleColor}
        focusRippleOpacity={0.3}
        linkButton={linkButton}
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
