import React from 'react';
import Transitions from './styles/transitions';
import ColorManipulator from './utils/color-manipulator';
import Children from './utils/children';
import EnhancedButton from './enhanced-button';
import Paper from './paper';
import getMuiTheme from './styles/getMuiTheme';

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error(`Required prop label or children was not specified in ${componentName}.`);
  }
}

function getStyles(props, state) {
  const {
    baseTheme,
    button,
    raisedButton,
  } = state.muiTheme;

  const {
    disabled,
    disabledBackgroundColor,
    disabledLabelColor,
    fullWidth,
    icon,
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
  }

  return {
    root: {
      display: 'inline-block',
      minWidth: fullWidth ? '100%' : button.minWidth,
      height: button.height,
      transition: Transitions.easeOut(),
    },
    container: {
      position: 'relative',
      height: '100%',
      width: '100%',
      padding: 0,
      overflow: 'hidden',
      borderRadius: 2,
      transition: Transitions.easeOut(),
      backgroundColor: backgroundColor,
    },
    label: {
      position: 'relative',
      verticalAlign: 'middle',
      opacity: 1,
      fontSize: '14px',
      letterSpacing: 0,
      textTransform: raisedButton.textTransform || button.textTransform || 'uppercase',
      fontWeight: raisedButton.fontWeight,
      margin: 0,
      userSelect: 'none',
      paddingLeft: icon && labelPosition !== 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      paddingRight: icon && labelPosition === 'before' ? 8 : baseTheme.spacing.desktopGutterLess,
      lineHeight: style && style.height || `${button.height}px`,
      color: labelColor,
    },
    overlay: {
      backgroundColor: state.hovered && !disabled && ColorManipulator.fade(labelColor, amount),
      transition: Transitions.easeOut(),
      top: 0,
    },
    overlayWhenHovered: {
    },
    ripple: {
      color: labelColor,
      opacity: !(primary || secondary) ? 0.1 : 0.16,
    },
  };
}

const RaisedButton = React.createClass({

  propTypes: {
    /**
     * Override the background color. Always takes precedence unless the button is disabled.
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
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Disables the button if set to true.
     */
    disabled: React.PropTypes.bool,

    /**
     * Override the background color if the button is disabled.
     */
    disabledBackgroundColor: React.PropTypes.string,

    /**
     * Color of the label if disabled is true.
     */
    disabledLabelColor: React.PropTypes.string,

    /**
     * If true, then the button will take up the full
     * width of its container.
     */
    fullWidth: React.PropTypes.bool,

    /**
     * URL to link to when button clicked if `linkButton` is set to true.
     */
    href: React.PropTypes.string,

    /**
     * Use this property to display an icon.
     */
    icon: React.PropTypes.node,

    /**
     * The label for the button.
     */
    label: validateLabel,

    /**
     * The color of the label for the button.
     */
    labelColor: React.PropTypes.string,

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
     * Callback function for when the mouse is pressed down inside this element.
     */
    onMouseDown: React.PropTypes.func,

    /**
     * Callback function for when the mouse enters this element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Callback function for when the mouse leaves this element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Callback function for when the mouse is realeased
     * above this element.
     */
    onMouseUp: React.PropTypes.func,

    /**
     * Callback function for when a touchTap event ends.
     */
    onTouchEnd: React.PropTypes.func,

    /**
     * Callback function for when a touchTap event starts.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * If true, colors button according to
     * primaryTextColor from the Theme.
     */
    primary: React.PropTypes.bool,

    /**
     * Override the inline style of ripple element.
     */
    rippleStyle: React.PropTypes.object,

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

  getDefaultProps: function() {
    return {
      disabled: false,
      labelPosition: 'after',
      fullWidth: false,
      primary: false,
      secondary: false,
    };
  },

  getInitialState() {
    const zDepth = this.props.disabled ? 0 : 1;
    return {
      hovered: false,
      touched: false,
      initialZDepth: zDepth,
      zDepth: zDepth,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const zDepth = nextProps.disabled ? 0 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  _handleMouseDown(event) {
    //only listen to left clicks
    if (event.button === 0) {
      this.setState({zDepth: this.state.initialZDepth + 1});
    }
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  },

  _handleMouseUp(event) {
    this.setState({zDepth: this.state.initialZDepth});
    if (this.props.onMouseUp) this.props.onMouseUp(event);
  },

  _handleMouseLeave(event) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({zDepth: this.state.initialZDepth, hovered: false});
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  },

  _handleMouseEnter(event) {
    if (!this.refs.container.isKeyboardFocused() && !this.state.touch) {
      this.setState({hovered: true});
    }
    if (this.props.onMouseEnter) this.props.onMouseEnter(event);
  },

  _handleTouchStart(event) {
    this.setState({
      touch: true,
      zDepth: this.state.initialZDepth + 1,
    });
    if (this.props.onTouchStart) this.props.onTouchStart(event);
  },

  _handleTouchEnd(event) {
    this.setState({zDepth: this.state.initialZDepth});
    if (this.props.onTouchEnd) this.props.onTouchEnd(event);
  },

  _handleKeyboardFocus: (styles) => (event, keyboardFocused) => {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({zDepth: this.state.initialZDepth + 1});
      const amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
      this.refs.overlay.style.backgroundColor =
        ColorManipulator.fade(Object.assign({}, styles.label, this.props.labelStyle).color, amount);
    } else if (!this.state.hovered) {
      this.setState({zDepth: this.state.initialZDepth});
      this.refs.overlay.style.backgroundColor = 'transparent';
    }
  },

  render() {
    const {
      children,
      className,
      disabled,
      icon,
      label,
      labelPosition,
      labelStyle,
      primary,
      rippleStyle,
      secondary,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const mergedRippleStyles = Object.assign({}, styles.ripple, rippleStyle);

    const buttonEventHandlers = disabled && {
      onMouseDown: this._handleMouseDown,
      onMouseUp: this._handleMouseUp,
      onMouseLeave: this._handleMouseLeave,
      onMouseEnter: this._handleMouseEnter,
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd,
      onKeyboardFocus: this._handleKeyboardFocus,
    };

    const labelElement = label && (
      <span style={prepareStyles(Object.assign(styles.label, labelStyle))}>
        {label}
      </span>
    );

    const iconCloned = icon && React.cloneElement(icon, {
      color: styles.label.color,
      style: {
        verticalAlign: 'middle',
        marginLeft: labelPosition === 'before' ? 0 : 12,
        marginRight: labelPosition === 'before' ? 12 : 0,
      },
    });

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
      <Paper
        className={className}
        style={Object.assign(styles.root, this.props.style)}
        zDepth={this.state.zDepth}
      >
        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={styles.container}
          focusRippleColor={mergedRippleStyles.color}
          touchRippleColor={mergedRippleStyles.color}
          focusRippleOpacity={mergedRippleStyles.opacity}
          touchRippleOpacity={mergedRippleStyles.opacity}
        >
          <div
            ref="overlay"
            style={prepareStyles(styles.overlay)}
          >
            {enhancedButtonChildren}
          </div>
        </EnhancedButton>
      </Paper>
    );
  },

});

export default RaisedButton;
