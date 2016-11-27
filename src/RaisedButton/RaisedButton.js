import React, {Component, cloneElement, PropTypes} from 'react';
import transitions from '../styles/transitions';
import {fade} from '../utils/colorManipulator';
import {createChildFragment} from '../utils/childUtils';
import EnhancedButton from '../internal/EnhancedButton';
import Paper from '../Paper';

function validateLabel(props, propName, componentName) {
  if (process.env.NODE_ENV !== 'production') {
    if (!props.children && (props.label !== 0 && !props.label) && !props.icon) {
      return new Error(`Required prop label or children or icon was not specified in ${componentName}.`);
    }
  }
}

function getStyles(props, context, state) {
  const {
    baseTheme,
    button,
    raisedButton,
  } = context.muiTheme;

  const {
    disabled,
    disabledBackgroundColor,
    disabledLabelColor,
    fullWidth,
    icon,
    label,
    labelPosition,
    primary,
    secondary,
    style,
  } = props;

  const amount = (primary || secondary) ? 0.4 : 0.08;

  let backgroundColor = raisedButton.color;
  let labelColor = raisedButton.textColor;

  if (disabled) {
    backgroundColor = disabledBackgroundColor || raisedButton.disabledColor;
    labelColor = disabledLabelColor || raisedButton.disabledTextColor;
  } else if (primary) {
    backgroundColor = raisedButton.primaryColor;
    labelColor = raisedButton.primaryTextColor;
  } else if (secondary) {
    backgroundColor = raisedButton.secondaryColor;
    labelColor = raisedButton.secondaryTextColor;
  } else {
    if (props.backgroundColor) {
      backgroundColor = props.backgroundColor;
    }
    if (props.labelColor) {
      labelColor = props.labelColor;
    }
  }

  const buttonHeight = style && style.height || button.height;
  const borderRadius = 2;

  return {
    root: {
      display: 'inline-block',
      transition: transitions.easeOut(),
      minWidth: fullWidth ? '100%' : button.minWidth,
    },
    button: {
      position: 'relative',
      height: buttonHeight,
      lineHeight: `${buttonHeight}px`,
      width: '100%',
      padding: 0,
      borderRadius: borderRadius,
      transition: transitions.easeOut(),
      backgroundColor: backgroundColor,
      // That's the default value for a button but not a link
      textAlign: 'center',
    },
    label: {
      position: 'relative',
      opacity: 1,
      fontSize: raisedButton.fontSize,
      letterSpacing: 0,
      textTransform: raisedButton.textTransform || button.textTransform || 'uppercase',
      fontWeight: raisedButton.fontWeight,
      margin: 0,
      userSelect: 'none',
      paddingLeft: icon && labelPosition !== 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      paddingRight: icon && labelPosition === 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      color: labelColor,
    },
    icon: {
      verticalAlign: 'middle',
      marginLeft: label && labelPosition !== 'before' ? 12 : 0,
      marginRight: label && labelPosition === 'before' ? 12 : 0,
    },
    overlay: {
      height: buttonHeight,
      borderRadius: borderRadius,
      backgroundColor: (state.keyboardFocused || state.hovered) && !disabled &&
        fade(labelColor, amount),
      transition: transitions.easeOut(),
      top: 0,
    },
    ripple: {
      color: labelColor,
      opacity: !(primary || secondary) ? 0.1 : 0.16,
    },
  };
}

class RaisedButton extends Component {
  static muiName = 'RaisedButton';

  static propTypes = {
    /**
     * Override the default background color for the button,
     * but not the default disabled background color
     * (use `disabledBackgroundColor` for this).
     */
    backgroundColor: PropTypes.string,
    /**
     * Override the inline-styles of the button element.
     */
    buttonStyle: PropTypes.object,
    /**
     * The content of the button.
     * If a label is provided via the `label` prop, the text within the label
     * will be displayed in addition to the content provided here.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, the button will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Override the default background color for the button
     * when it is disabled.
     */
    disabledBackgroundColor: PropTypes.string,
    /**
     * The color of the button's label when the button is disabled.
     */
    disabledLabelColor: PropTypes.string,
    /**
     * If true, the button will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * The URL to link to when the button is clicked.
     */
    href: PropTypes.string,
    /**
     * An icon to be displayed within the button.
     */
    icon: PropTypes.node,
    /**
     * The label to be displayed within the button.
     * If content is provided via the `children` prop, that content will be
     * displayed in addition to the label provided here.
     */
    label: validateLabel,
    /**
     * The color of the button's label.
     */
    labelColor: PropTypes.string,
    /**
     * The position of the button's label relative to the button's `children`.
     */
    labelPosition: PropTypes.oneOf([
      'before',
      'after',
    ]),
    /**
     * Override the inline-styles of the button's label element.
     */
    labelStyle: PropTypes.object,
    /** @ignore */
    onMouseDown: PropTypes.func,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /** @ignore */
    onMouseUp: PropTypes.func,
    /** @ignore */
    onTouchEnd: PropTypes.func,
    /** @ignore */
    onTouchStart: PropTypes.func,
    /**
     * Override the inline style of the button overlay.
     */
    overlayStyle: PropTypes.object,
    /**
     * If true, the button will use the theme's primary color.
     */
    primary: PropTypes.bool,
    /**
     * Override the inline style of the ripple element.
     */
    rippleStyle: PropTypes.object,
    /**
     * If true, the button will use the theme's secondary color.
     * If both `secondary` and `primary` are true, the button will use
     * the theme's primary color.
     */
    secondary: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    disabled: false,
    labelPosition: 'after',
    fullWidth: false,
    primary: false,
    secondary: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
    keyboardFocused: false,
    touched: false,
    initialZDepth: 0,
    zDepth: 0,
  };

  componentWillMount() {
    const zDepth = this.props.disabled ? 0 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
    });
  }

  componentWillReceiveProps(nextProps) {
    const zDepth = nextProps.disabled ? 0 : 1;
    const nextState = {
      zDepth: zDepth,
      initialZDepth: zDepth,
    };

    if (nextProps.disabled) {
      nextState.hovered = false;
    }

    this.setState(nextState);
  }

  handleMouseDown = (event) => {
    // only listen to left clicks
    if (event.button === 0) {
      this.setState({
        zDepth: this.state.initialZDepth + 1,
      });
    }
    if (this.props.onMouseDown) {
      this.props.onMouseDown(event);
    }
  };

  handleMouseUp = (event) => {
    this.setState({
      zDepth: this.state.initialZDepth,
    });
    if (this.props.onMouseUp) {
      this.props.onMouseUp(event);
    }
  };

  handleMouseLeave = (event) => {
    if (!this.state.keyboardFocused) {
      this.setState({
        zDepth: this.state.initialZDepth,
        hovered: false,
      });
    }
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  handleMouseEnter = (event) => {
    if (!this.state.keyboardFocused && !this.state.touched) {
      this.setState({
        hovered: true,
      });
    }
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  handleTouchStart = (event) => {
    this.setState({
      touched: true,
      zDepth: this.state.initialZDepth + 1,
    });

    if (this.props.onTouchStart) {
      this.props.onTouchStart(event);
    }
  };

  handleTouchEnd = (event) => {
    this.setState({
      touched: true,
      zDepth: this.state.initialZDepth,
    });

    if (this.props.onTouchEnd) {
      this.props.onTouchEnd(event);
    }
  };

  handleKeyboardFocus = (event, keyboardFocused) => {
    const zDepth = (keyboardFocused && !this.props.disabled) ? this.state.initialZDepth + 1 : this.state.initialZDepth;

    this.setState({
      zDepth: zDepth,
      keyboardFocused: keyboardFocused,
    });
  };

  render() {
    const {
      backgroundColor, // eslint-disable-line no-unused-vars
      buttonStyle,
      children,
      className,
      disabled,
      disabledBackgroundColor, // eslint-disable-line no-unused-vars
      disabledLabelColor, // eslint-disable-line no-unused-vars
      fullWidth, // eslint-disable-line no-unused-vars
      icon,
      label,
      labelColor, // eslint-disable-line no-unused-vars
      labelPosition,
      labelStyle,
      overlayStyle,
      primary, // eslint-disable-line no-unused-vars
      rippleStyle,
      secondary, // eslint-disable-line no-unused-vars
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const mergedRippleStyles = Object.assign({}, styles.ripple, rippleStyle);

    const buttonEventHandlers = disabled ? {} : {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      onMouseEnter: this.handleMouseEnter,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onKeyboardFocus: this.handleKeyboardFocus,
    };

    const labelElement = label && (
      <span style={prepareStyles(Object.assign(styles.label, labelStyle))}>
        {label}
      </span>
    );

    const iconCloned = icon && cloneElement(icon, {
      color: icon.props.color || styles.label.color,
      style: Object.assign(styles.icon, icon.props.style),
    });

    // Place label before or after children.
    const childrenFragment = labelPosition === 'before' ?
    {
      labelElement,
      iconCloned,
      children,
    } : {
      children,
      iconCloned,
      labelElement,
    };

    const enhancedButtonChildren = createChildFragment(childrenFragment);

    return (
      <Paper
        className={className}
        style={Object.assign(styles.root, style)}
        zDepth={this.state.zDepth}
      >
        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={Object.assign(styles.button, buttonStyle)}
          focusRippleColor={mergedRippleStyles.color}
          touchRippleColor={mergedRippleStyles.color}
          focusRippleOpacity={mergedRippleStyles.opacity}
          touchRippleOpacity={mergedRippleStyles.opacity}
        >
          <div
            ref="overlay"
            style={prepareStyles(Object.assign(styles.overlay, overlayStyle))}
          >
            {enhancedButtonChildren}
          </div>
        </EnhancedButton>
      </Paper>
    );
  }
}

export default RaisedButton;
