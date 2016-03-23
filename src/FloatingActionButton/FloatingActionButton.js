import React from 'react';
import transitions from '../styles/transitions';
import ColorManipulator from '../utils/colorManipulator';
import EnhancedButton from '../internal/EnhancedButton';
import FontIcon from '../FontIcon';
import Paper from '../Paper';
import {extendChildren} from '../utils/childUtils';
import getMuiTheme from '../styles/getMuiTheme';
import warning from 'warning';
import propTypes from '../utils/propTypes';

function getStyles(props, state) {
  const {
    floatingActionButton,
  } = state.muiTheme;

  let backgroundColor = props.backgroundColor || floatingActionButton.color;
  let iconColor = floatingActionButton.iconColor;

  if (props.disabled) {
    backgroundColor = props.disabledColor || floatingActionButton.disabledColor;
    iconColor = floatingActionButton.disabledTextColor;
  } else if (props.secondary) {
    backgroundColor = floatingActionButton.secondaryColor;
    iconColor = floatingActionButton.secondaryIconColor;
  }

  return {
    root: {
      transition: transitions.easeOut(),
      display: 'inline-block',
    },
    container: {
      backgroundColor,
      transition: transitions.easeOut(),
      position: 'relative',
      height: floatingActionButton.buttonSize,
      width: floatingActionButton.buttonSize,
      padding: 0,
      overflow: 'hidden',
      borderRadius: '50%',
      textAlign: 'center',
      verticalAlign: 'bottom',
    },
    containerWhenMini: {
      height: floatingActionButton.miniSize,
      width: floatingActionButton.miniSize,
    },
    overlay: {
      transition: transitions.easeOut(),
      top: 0,
    },
    overlayWhenHovered: {
      backgroundColor: ColorManipulator.fade(iconColor, 0.4),
    },
    icon: {
      height: floatingActionButton.buttonSize,
      lineHeight: `${floatingActionButton.buttonSize}px`,
      fill: floatingActionButton.iconColor,
      color: iconColor,
    },
    iconWhenMini: {
      height: floatingActionButton.miniSize,
      lineHeight: `${floatingActionButton.miniSize}px`,
    },
  };
}

const FloatingActionButton = React.createClass({

  propTypes: {
    /**
     * This value will override the default background color for the button.
     * However it will not override the default disabled background color.
     * This has to be set separately using the disabledColor attribute.
     */
    backgroundColor: React.PropTypes.string,

    /**
     * This is what displayed inside the floating action button; for example, a SVG Icon.
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
     * This value will override the default background color for the button when it is disabled.
     */
    disabledColor: React.PropTypes.string,

    /**
     * URL to link to when button clicked if `linkButton` is set to true.
     */
    href: React.PropTypes.string,

    /**
     * The icon within the FloatingActionButton is a FontIcon component.
     * This property is the classname of the icon to be displayed inside the button.
     * An alternative to adding an iconClassName would be to manually insert a
     * FontIcon component or custom SvgIcon component or as a child of FloatingActionButton.
     */
    iconClassName: React.PropTypes.string,

    /**
     * This is the equivalent to iconClassName except that it is used for
     * overriding the inline-styles of the FontIcon component.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Enables use of `href` property to provide a URL to link to if set to true.
     */
    linkButton: React.PropTypes.bool,

    /**
     * If true, the button will be a small floating action button.
     */
    mini: React.PropTypes.bool,

    /**
     * Callback function fired when a mouse button is pressed down on the elmeent.
     *
     * @param {object} event `mousedown` event targeting the element.
     */
    onMouseDown: React.PropTypes.func,

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
     * Callback function fired when a mouse button is released on the element.
     *
     * @param {object} event `mouseup` event targeting the element.
     */
    onMouseUp: React.PropTypes.func,

    /**
     * Callback function fired when a touch point is removed from the element.
     *
     * @param {object} event `touchend` event targeting the element.
     */
    onTouchEnd: React.PropTypes.func,

    /**
     * Callback function fired when the element is touched.
     *
     * @param {object} event `touchstart` event targeting the element.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * If true, the button will use the secondary button colors.
     */
    secondary: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The zDepth of the underlying `Paper` component.
     */
    zDepth: propTypes.zDepth,
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
      mini: false,
      secondary: false,
      zDepth: 2,
    };
  },

  getInitialState() {
    return {
      hovered: false,
      touch: false,
      zDepth: this.props.disabled ? 0 : this.props.zDepth,
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    warning(!this.props.iconClassName || !this.props.children,
      'You have set both an iconClassName and a child icon. ' +
      'It is recommended you use only one method when adding ' +
      'icons to FloatingActionButtons.');
  },

  componentWillReceiveProps(nextProps, nextContext) {
    const newState = {
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    };

    if (nextProps.disabled !== this.props.disabled) {
      const zDepth = nextProps.disabled ? 0 : this.props.zDepth;
      newState.zDepth = zDepth;
    }

    this.setState(newState);
  },

  _handleMouseDown(event) {
    //only listen to left clicks
    if (event.button === 0) {
      this.setState({zDepth: this.props.zDepth + 1});
    }
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  },

  _handleMouseUp(event) {
    this.setState({zDepth: this.props.zDepth});
    if (this.props.onMouseUp) this.props.onMouseUp(event);
  },

  _handleMouseLeave(event) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({zDepth: this.props.zDepth, hovered: false});
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
      zDepth: this.props.zDepth + 1,
    });
    if (this.props.onTouchStart) this.props.onTouchStart(event);
  },

  _handleTouchEnd(event) {
    this.setState({zDepth: this.props.zDepth});
    if (this.props.onTouchEnd) this.props.onTouchEnd(event);
  },

  _handleKeyboardFocus(event, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({zDepth: this.props.zDepth + 1});
      this.refs.overlay.style.backgroundColor =
        ColorManipulator.fade(this.getStyles().icon.color, 0.4);
    } else if (!this.state.hovered) {
      this.setState({zDepth: this.props.zDepth});
      this.refs.overlay.style.backgroundColor = 'transparent';
    }
  },

  render() {
    const {
      className,
      disabled,
      mini,
      secondary,
      iconStyle,
      iconClassName,
      ...other} = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);

    let iconElement;
    if (iconClassName) {
      iconElement = (
        <FontIcon
          className={iconClassName}
          style={Object.assign({},
            styles.icon,
            mini && styles.iconWhenMini,
            iconStyle)}
        />
      );
    }

    const children = extendChildren(this.props.children, {
      style: Object.assign({},
        styles.icon,
        mini && styles.iconWhenMini,
        iconStyle),
    });

    const buttonEventHandlers = disabled ? null : {
      onMouseDown: this._handleMouseDown,
      onMouseUp: this._handleMouseUp,
      onMouseLeave: this._handleMouseLeave,
      onMouseEnter: this._handleMouseEnter,
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd,
      onKeyboardFocus: this._handleKeyboardFocus,
    };

    return (
      <Paper
        className={className}
        style={Object.assign(styles.root, this.props.style)}
        zDepth={this.state.zDepth}
        circle={true}
      >
        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={Object.assign(
            styles.container,
            this.props.mini && styles.containerWhenMini,
            iconStyle
          )}
          focusRippleColor={styles.icon.color}
          touchRippleColor={styles.icon.color}
        >
          <div
            ref="overlay"
            style={prepareStyles(Object.assign(
              styles.overlay,
              (this.state.hovered && !this.props.disabled) && styles.overlayWhenHovered
            ))}
          >
            {iconElement}
            {children}
          </div>
        </EnhancedButton>
      </Paper>
    );
  },
});

export default FloatingActionButton;
