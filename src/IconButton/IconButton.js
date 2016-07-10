import React, {Component, PropTypes} from 'react';
import transitions from '../styles/transitions';
import propTypes from '../utils/propTypes';
import EnhancedButton from '../internal/EnhancedButton';
import FontIcon from '../FontIcon';
import Tooltip from '../internal/Tooltip';
import {extendChildren} from '../utils/childUtils';

function getStyles(props, context) {
  const {baseTheme} = context.muiTheme;

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
      cursor: 'not-allowed',
    },
  };
}

class IconButton extends Component {
  static muiName = 'IconButton';

  static propTypes = {
    /**
     * Can be used to pass a `FontIcon` element as the icon for the button.
     */
    children: PropTypes.node,
    /**
     * The CSS class name of the root element.
     */
    className: PropTypes.string,
    /**
     * If true, the element's ripple effect will be disabled.
     */
    disableTouchRipple: PropTypes.bool,
    /**
     * If true, the element will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The URL to link to when the button is clicked.
     */
    href: PropTypes.string,
    /**
     * The CSS class name of the icon. Used for setting the icon with a stylesheet.
     */
    iconClassName: PropTypes.string,
    /**
     * Override the inline-styles of the icon element.
     */
    iconStyle: PropTypes.object,
    /** @ignore */
    onBlur: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /**
     * Callback function fired when the element is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the element.
     * @param {boolean} keyboardFocused Indicates whether the element is focused.
     */
    onKeyboardFocus: PropTypes.func,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /** @ignore */
    onMouseOut: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The text to supply to the element's tooltip.
     */
    tooltip: PropTypes.node,
    /**
     * The vertical and horizontal positions, respectively, of the element's tooltip.
     * Possible values are: "bottom-center", "top-center", "bottom-right", "top-right",
     * "bottom-left", and "top-left".
     */
    tooltipPosition: propTypes.cornersAndCenter,
    /**
     * Override the inline-styles of the tooltip element.
     */
    tooltipStyles: PropTypes.object,
    /**
     * If true, increase the tooltip element's size.  Useful for increasing tooltip
     * readability on mobile devices.
     */
    touch: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    disableTouchRipple: false,
    iconStyle: {},
    tooltipPosition: 'bottom-center',
    touch: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    tooltipShown: false,
  };

  setKeyboardFocus() {
    this.refs.button.setKeyboardFocus();
  }

  showTooltip() {
    if (this.props.tooltip) {
      this.setState({tooltipShown: true});
    }
  }

  hideTooltip() {
    if (this.props.tooltip) this.setState({tooltipShown: false});
  }

  handleBlur = (event) => {
    this.hideTooltip();
    if (this.props.onBlur) this.props.onBlur(event);
  };

  handleFocus = (event) => {
    this.showTooltip();
    if (this.props.onFocus) this.props.onFocus(event);
  };

  handleMouseLeave = (event) => {
    if (!this.refs.button.isKeyboardFocused()) this.hideTooltip();
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  };

  handleMouseOut = (event) => {
    if (this.props.disabled) this.hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(event);
  };

  handleMouseEnter = (event) => {
    this.showTooltip();
    if (this.props.onMouseEnter) this.props.onMouseEnter(event);
  };

  handleKeyboardFocus = (event, keyboardFocused) => {
    if (keyboardFocused && !this.props.disabled) {
      this.showTooltip();
      if (this.props.onFocus) this.props.onFocus(event);
    } else if (!this.state.hovered) {
      this.hideTooltip();
      if (this.props.onBlur) this.props.onBlur(event);
    }

    if (this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(event, keyboardFocused);
    }
  };

  render() {
    const {
      disabled,
      disableTouchRipple,
      children,
      iconClassName,
      onKeyboardFocus, // eslint-disable-line no-unused-vars
      tooltip,
      tooltipPosition: tooltipPositionProp,
      tooltipStyles,
      touch,
      iconStyle,
      ...other,
    } = this.props;
    let fonticon;

    const styles = getStyles(this.props, this.context);
    const tooltipPosition = tooltipPositionProp.split('-');

    const tooltipElement = tooltip ? (
      <Tooltip
        ref="tooltip"
        label={tooltip}
        show={this.state.tooltipShown}
        touch={touch}
        style={Object.assign(styles.tooltip, tooltipStyles)}
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
            {},
            disabled && styles.disabled,
            iconStyleFontIcon
          )}
          color={this.context.muiTheme.baseTheme.palette.textColor}
        >
          {children}
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
        {extendChildren(children, {
          style: childrenStyle,
        })}
      </EnhancedButton>
    );
  }
}

export default IconButton;
