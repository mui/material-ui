import React from 'react';
import transitions from '../styles/transitions';
import propTypes from '../utils/propTypes';
import EnhancedButton from '../internal/EnhancedButton';
import FontIcon from '../FontIcon';
import Tooltip from '../internal/Tooltip';
import {extendChildren} from '../utils/childUtils';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    baseTheme,
  } = state.muiTheme;

  return {
    root: {
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'visible',
      transition: transitions.easeOut(),
      padding: baseTheme.spacing.iconSize / 2,
      width: baseTheme.spacing.iconSize * 2,
      height: baseTheme.spacing.iconSize * 2,
      fontSize: 0,
    },
    tooltip: {
      boxSizing: 'border-box',
    },
    icon: {
      color: baseTheme.palette.textColor,
      fill: baseTheme.palette.textColor,
    },
    overlay: {
      position: 'relative',
      top: 0,
      width: '100%',
      height: '100%',
      background: baseTheme.palette.disabledColor,
    },
    disabled: {
      color: baseTheme.palette.disabledColor,
      fill: baseTheme.palette.disabledColor,
    },
  };
}

const IconButton = React.createClass({

  propTypes: {
    /**
     * Can be used to pass a `FontIcon` element as the icon for the button.
     */
    children: React.PropTypes.node,

    /**
     * The CSS class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * If true, the element's ripple effect will be disabled.
     */
    disableTouchRipple: React.PropTypes.bool,

    /**
     * If true, the element will be disabled.
     */
    disabled: React.PropTypes.bool,

    /**
     * The CSS class name of the icon. Used for setting the icon with a stylesheet.
     */
    iconClassName: React.PropTypes.string,

    /**
     * Override the inline-styles of the icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Callback function fired when the element loses focus.
     * @param {object} event `blur` event targeting the element.
     */
    onBlur: React.PropTypes.func,

    /**
     * Callback function fired when the element gains focus.
     * @param {object} event `focus` event targeting the element.
     */
    onFocus: React.PropTypes.func,

    /**
     * Callback function fired when the element is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the element.
     * @param {boolean} keyboardFocused Indicates whether the element is focused.
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
     * Callback function fired when the mouse leaves the element. Unlike `onMouseLeave`,
     * this callback will fire on disabled icon buttons.
     *
     * @param {object} event `mouseout` event targeting the element.
     */
    onMouseOut: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The text to supply to the element's tooltip.
     */
    tooltip: React.PropTypes.node,

    /**
     * The vertical and horizontal positions, respectively, of the element's tooltip.
     * Possible values are: "bottom-center", "top-center", "bottom-right", "top-right",
     * "bottom-left", and "top-left".
     */
    tooltipPosition: propTypes.cornersAndCenter,

    /**
     * Override the inline-styles of the tooltip element.
     */
    tooltipStyles: React.PropTypes.object,

    /**
     * If true, increase the tooltip element's size.  Useful for increasing tooltip
     * readability on mobile devices.
     */
    touch: React.PropTypes.bool,
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
      disableTouchRipple: false,
      iconStyle: {},
      tooltipPosition: 'bottom-center',
      touch: false,
    };
  },

  getInitialState() {
    return {
      tooltipShown: false,
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

  setKeyboardFocus() {
    this.refs.button.setKeyboardFocus();
  },

  _showTooltip() {
    if (this.props.tooltip) {
      this.setState({tooltipShown: true});
    }
  },

  _hideTooltip() {
    if (this.props.tooltip) this.setState({tooltipShown: false});
  },

  handleBlur(event) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleFocus(event) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(event);
  },

  handleMouseLeave(event) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  },

  handleMouseOut(event) {
    if (this.props.disabled) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(event);
  },

  _handleMouseEnter(event) {
    this._showTooltip();
    if (this.props.onMouseEnter) this.props.onMouseEnter(event);
  },

  handleKeyboardFocus(event, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this._showTooltip();
      if (this.props.onFocus) this.props.onFocus(event);
    } else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(event);
    }

    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(event, keyboardFocused);
  },

  render() {
    const {
      disabled,
      disableTouchRipple,
      iconClassName,
      tooltip,
      touch,
      iconStyle,
      ...other,
    } = this.props;
    let fonticon;

    const styles = getStyles(this.props, this.state);
    const tooltipPosition = this.props.tooltipPosition.split('-');

    const tooltipElement = tooltip ? (
      <Tooltip
        ref="tooltip"
        label={tooltip}
        show={this.state.tooltipShown}
        touch={touch}
        style={Object.assign(styles.tooltip, this.props.tooltipStyles)}
        verticalPosition={tooltipPosition[0]}
        horizontalPosition={tooltipPosition[1]}
      />
    ) : null;

    if (iconClassName) {
      const {
        iconHoverColor,
        ...iconStyleFontIcon,
      } = iconStyle;

      fonticon = (
        <FontIcon
          className={iconClassName}
          hoverColor={disabled ? null : iconHoverColor}
          style={Object.assign(
            styles.icon,
            disabled && styles.disabled,
            iconStyleFontIcon
          )}
        >
          {this.props.children}
        </FontIcon>
      );
    }

    const childrenStyle = disabled ? Object.assign({}, iconStyle, styles.disabled) : iconStyle;

    return (
      <EnhancedButton
        {...other}
        ref="button"
        centerRipple={true}
        disabled={disabled}
        style={Object.assign(styles.root, this.props.style)}
        disableTouchRipple={disableTouchRipple}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        onMouseOut={this.handleMouseOut}
        onKeyboardFocus={this.handleKeyboardFocus}
      >
        {tooltipElement}
        {fonticon}
        {extendChildren(this.props.children, {
          style: childrenStyle,
        })}
      </EnhancedButton>
    );
  },

});

export default IconButton;
