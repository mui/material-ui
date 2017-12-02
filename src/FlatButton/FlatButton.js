import React, {Component} from 'react';
import PropTypes from 'prop-types';
import transitions from '../styles/transitions';
import {fade} from '../utils/colorManipulator';
import EnhancedButton from '../internal/EnhancedButton';
import FlatButtonLabel from './FlatButtonLabel';

function validateLabel(props, propName, componentName) {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.children && (props.label !== 0 && !props.label) && !props.icon) {
      return new Error(`Required prop label or children or icon was not specified in ${componentName}.`);
    }
  }
}

class FlatButton extends Component {
  static muiName = 'FlatButton';

  static propTypes = {
    /**
     * Color of button when mouse is not hovering over it.
     */
    backgroundColor: PropTypes.string,
    /**
     * This is what will be displayed inside the button.
     * If a label is specified, the text within the label prop will
     * be displayed. Otherwise, the component will expect children
     * which will then be displayed. (In our example,
     * we are nesting an `<input type="file" />` and a `span`
     * that acts as our label to be displayed.) This only
     * applies to flat and raised buttons.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * The element to use as the container for the FlatButton. Either a string to
     * use a DOM element or a ReactElement. This is useful for wrapping the
     * FlatButton in a custom Link component. If a ReactElement is given, ensure
     * that it passes all of its given props through to the underlying DOM
     * element and renders its children prop for proper integration.
     */
    containerElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    /**
     * If true, the element's ripple effect will be disabled.
     */
    disableTouchRipple: PropTypes.bool,
    /**
     * Disables the button if set to true.
     */
    disabled: PropTypes.bool,
    /**
     * If true, the button will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * Color of button when mouse hovers over.
     */
    hoverColor: PropTypes.string,
    /**
     * The URL to link to when the button is clicked.
     */
    href: PropTypes.string,
    /**
     * Use this property to display an icon.
     */
    icon: PropTypes.node,
    /**
     * Label for the button.
     */
    label: validateLabel,
    /**
     * Place label before or after the passed children.
     */
    labelPosition: PropTypes.oneOf([
      'before',
      'after',
    ]),
    /**
     * Override the inline-styles of the button's label element.
     */
    labelStyle: PropTypes.object,
    /**
     * Callback function fired when the button is clicked.
     *
     * @param {object} event Click event targeting the button.
     */
    onClick: PropTypes.func,
    /**
     * Callback function fired when the element is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the element.
     * @param {boolean} isKeyboardFocused Indicates whether the element is focused.
     */
    onKeyboardFocus: PropTypes.func,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /** @ignore */
    onTouchStart: PropTypes.func,
    /**
     * If true, colors button according to
     * primaryTextColor from the Theme.
     */
    primary: PropTypes.bool,
    /**
     * Color for the ripple after button is clicked.
     */
    rippleColor: PropTypes.string,
    /**
     * If true, colors button according to secondaryTextColor from the theme.
     * The primary prop has precendent if set to true.
     */
    secondary: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    disabled: false,
    fullWidth: false,
    labelStyle: {},
    labelPosition: 'after',
    onKeyboardFocus: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onTouchStart: () => {},
    primary: false,
    secondary: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    isKeyboardFocused: false,
    touch: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled) {
      this.setState({
        hovered: false,
      });
    }
  }

  handleKeyboardFocus = (event, isKeyboardFocused) => {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(event, isKeyboardFocused);
  };

  handleMouseEnter = (event) => {
    // Cancel hover styles for touch devices
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(event);
  };

  handleMouseLeave = (event) => {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  };

  handleTouchStart = (event) => {
    this.setState({touch: true});
    this.props.onTouchStart(event);
  };

  render() {
    const {
      backgroundColor,
      children,
      disabled,
      fullWidth,
      hoverColor,
      icon,
      label,
      labelStyle,
      labelPosition,
      primary,
      rippleColor,
      secondary,
      style,
      ...other
    } = this.props;

    const {
      borderRadius,
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
    } = this.context.muiTheme;
    const defaultTextColor = disabled ? disabledTextColor :
      primary ? primaryTextColor :
      secondary ? secondaryTextColor :
      textColor;

    const defaultHoverColor = fade(buttonFilterColor, 0.2);
    const defaultRippleColor = buttonFilterColor;
    const buttonHoverColor = hoverColor || defaultHoverColor;
    const buttonRippleColor = rippleColor || defaultRippleColor;
    const buttonBackgroundColor = backgroundColor || buttonColor;
    const hovered = (this.state.hovered || this.state.isKeyboardFocused) && !disabled;

    const mergedRootStyles = Object.assign({}, {
      height: buttonHeight,
      lineHeight: `${buttonHeight}px`,
      minWidth: fullWidth ? '100%' : buttonMinWidth,
      color: defaultTextColor,
      transition: transitions.easeOut(),
      borderRadius,
      userSelect: 'none',
      overflow: 'hidden',
      backgroundColor: hovered ? buttonHoverColor : buttonBackgroundColor,
      padding: 0,
      margin: 0,
      textAlign: 'center',
    }, style);

    let iconCloned;
    const labelStyleIcon = {};

    if (icon) {
      const iconStyles = Object.assign({
        verticalAlign: 'middle',
        marginLeft: label && labelPosition !== 'before' ? 12 : 0,
        marginRight: label && labelPosition === 'before' ? 12 : 0,
      }, icon.props.style);
      iconCloned = React.cloneElement(icon, {
        color: icon.props.color || mergedRootStyles.color,
        style: iconStyles,
        key: 'iconCloned',
      });

      if (labelPosition === 'before') {
        labelStyleIcon.paddingRight = 8;
      } else {
        labelStyleIcon.paddingLeft = 8;
      }
    }

    const mergedLabelStyles = Object.assign({
      letterSpacing: 0,
      textTransform: textTransform,
      fontWeight: fontWeight,
      fontSize: fontSize,
    }, labelStyleIcon, labelStyle);

    const labelElement = label ? (
      <FlatButtonLabel key="labelElement" label={label} style={mergedLabelStyles} />
    ) : undefined;

    // Place label before or after children.
    const enhancedButtonChildren = labelPosition === 'before' ?
    [
      labelElement,
      iconCloned,
      children,
    ] :
    [
      children,
      iconCloned,
      labelElement,
    ];

    return (
      <EnhancedButton
        {...other}
        disabled={disabled}
        focusRippleColor={buttonRippleColor}
        focusRippleOpacity={0.3}
        onKeyboardFocus={this.handleKeyboardFocus}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        onTouchStart={this.handleTouchStart}
        style={mergedRootStyles}
        touchRippleColor={buttonRippleColor}
        touchRippleOpacity={0.3}
      >
        {enhancedButtonChildren}
      </EnhancedButton>
    );
  }
}

export default FlatButton;
