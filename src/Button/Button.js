import React, {Component, PropTypes} from 'react';
import EnhancedButton from '../internal/EnhancedButton';
import getStyles from './buttonStyles';
import styleButtonChildren from './styleButtonChildren';

class Button extends Component {
  static muiName = 'Button';

  static propTypes = {
    /**
     * Override the default background color for the button, but not the default disabled background color
     * (use `disabledBackgroundColor` for this).
     */
    backgroundColor: PropTypes.string,
    /**
     * The content of the button. May be a string, an icon or both, with an optional element such as `<input />`
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
     * Override the disabled background color for the button.
     */
    disabledBackgroundColor: PropTypes.string,
    /**
     * If true, the button will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * The URL to link to when the button is clicked. If set, the button will be wrapped with an anchor tag.
     */
    href: PropTypes.string,
    /**
     * The color of the button's label or icon.
     */
    labelColor: PropTypes.string,
    /**
     * Override the inline-styles of the button's label element.
     */
    labelStyle: PropTypes.object,
    /**
     * If true, the floating action button will be small.
     */
    mini: PropTypes.bool,
    /**
     * Callback function fired when the element is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the element.
     * @param {boolean} isKeyboardFocused Indicates whether the element is focused.
     */
    onKeyboardFocus: PropTypes.func,
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
     * If true, the button will use the theme's primary color.
     */
    primary: PropTypes.bool,
    /**
     * Override the inline styles of the ripple.
     */
    rippleStyle: PropTypes.object,
    /**
     * If true, the button will use the theme's secondary color.
     * If both `secondary` and `primary` are true, the button will use
     * the theme's primary color.
     */
    secondary: PropTypes.bool,
    /**
     * Override the inline-styles of the button element.
     */
    style: PropTypes.object,
    /**
     * Button type to render.
     */
    type: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    fullWidth: false,
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
    primary: false,
    secondary: false,
    type: 'raised',
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
    const zDepth = (this.props.type === 'fab') ? 2 : 1;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
    });
  }

  handleKeyboardFocus(event, keyboardFocused) {
    const zDepth = (keyboardFocused && !this.props.disabled) ? this.state.initialZDepth + 1 : this.state.initialZDepth;

    this.setState({
      zDepth: zDepth,
      keyboardFocused: true,
    });

    this.props.onKeyboardFocus(event, keyboardFocused);
  }

  handleMouseDown = (event) => {
    // only listen to left clicks
    if (event.button === 0) {
      this.setState({
        zDepth: this.state.initialZDepth + 1,
      });
    }

    this.props.onMouseDown(event);
  }

  handleMouseEnter = (event) => {
    if (!this.state.keyboardFocused && !this.state.touched) {
      this.setState({
        hovered: true,
      });
    }

    this.props.onMouseEnter(event);
  }

  handleMouseLeave = (event) => {
    if (!this.state.keyboardFocused) {
      this.setState({
        zDepth: this.state.initialZDepth,
        hovered: false,
      });
    }

    this.props.onMouseLeave(event);
  }

  handleMouseUp = (event) => {
    this.setState({
      zDepth: this.state.initialZDepth,
    });

    this.props.onMouseUp(event);
  }

  handleTouchEnd = (event) => {
    this.setState({
      zDepth: this.state.initialZDepth,
    });

    this.props.onTouchEnd(event);
  }

  handleTouchStart = (event) => {
    this.setState({
      touch: true,
      zDepth: this.state.initialZDepth + 1,
    });

    this.props.onTouchStart(event);
  }

  render() {
    const {
      backgroundColor, // eslint-disable-line no-unused-vars
      children,
      disabledBackgroundColor, // eslint-disable-line no-unused-vars
      fullWidth, // eslint-disable-line no-unused-vars
      labelColor, // eslint-disable-line no-unused-vars
      labelStyle, // eslint-disable-line no-unused-vars
      mini, // eslint-disable-line no-unused-vars
      primary, // eslint-disable-line no-unused-vars
      rippleStyle,
      secondary, // eslint-disable-line no-unused-vars
      style,
      type, // eslint-disable-line no-unused-vars
      ...other,
    } = this.props;

    const buttonEventHandlers = this.props.disabled ? {} : {
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseLeave: this.handleMouseLeave,
      onMouseEnter: this.handleMouseEnter,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onKeyboardFocus: this.handleKeyboardFocus,
    };

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    const mergedRootStyles = Object.assign({}, styles.root, style);
    const mergedRippleStyles = prepareStyles(Object.assign({}, styles.ripple, rippleStyle));
    const enhancedButtonChildren = styleButtonChildren(this.context, children, styles);

    return (
      <EnhancedButton
        {...other}
        {...buttonEventHandlers}
        style={mergedRootStyles}
        focusRippleColor={mergedRippleStyles.color}
        touchRippleColor={mergedRippleStyles.color}
        focusRippleOpacity={mergedRippleStyles.opacity}
        touchRippleOpacity={mergedRippleStyles.opacity}
      >
        {enhancedButtonChildren}
      </EnhancedButton>
    );
  }
}

export default Button;
