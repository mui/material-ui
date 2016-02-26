import React from 'react';
import Transitions from './styles/transitions';
import PropTypes from './utils/prop-types';
import EnhancedButton from './enhanced-button';
import FontIcon from './font-icon';
import Tooltip from './tooltip';
import Children from './utils/children';
import getMuiTheme from './styles/getMuiTheme';

function getStyles(props, state) {
  const {
    baseTheme,
  } = state.muiTheme;

  return {
    root: {
      position: 'relative',
      boxSizing: 'border-box',
      overflow: 'visible',
      transition: Transitions.easeOut(),
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
     * Can be used to pass a font icon as the icon for the button.
     */
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,

    /**
     * Disables the icon button.
     */
    disabled: React.PropTypes.bool,

    /**
     * If you are using a stylesheet for your
     * icons, enter the class name for the icon to be used here.
     */
    iconClassName: React.PropTypes.string,

    /**
     * Overrides the inline-styles of the icon element.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Callback function for when the component loses focus.
     */
    onBlur: React.PropTypes.func,

    /**
     * Callback function for when the component gains focus.
     */
    onFocus: React.PropTypes.func,

    /**
     * Callback function for when the component
     * receives keyboard focus.
     */
    onKeyboardFocus: React.PropTypes.func,

    /**
     * Callback function for when mouse enters element.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Callback function for when mouse leaves element.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Callback function for when mouse goes out of element it works with disabled element.
     */
    onMouseOut: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,

    /**
     * The tooltip text to show.
     */
    tooltip: React.PropTypes.node,

    /**
     * Allows the tooltip to be viewed with different
     * alignments: "bottom-center", "top-center",
     * "bottom-right", "top-right", "bottom-left" and "top-left".
     */
    tooltipPosition: PropTypes.cornersAndCenter,

    /**
     * Styles prop passed down to the tooltip.
     */
    tooltipStyles: React.PropTypes.object,

    /**
     * Prop for tooltip to make it larger for mobile.
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

  _handleBlur(event) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(event);
  },

  _handleFocus(event) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(event);
  },

  _handleMouseLeave(event) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseLeave) this.props.onMouseLeave(event);
  },

  _handleMouseOut(event) {
    if (this.props.disabled) this._hideTooltip();
    if (this.props.onMouseOut) this.props.onMouseOut(event);
  },

  _handleMouseEnter(event) {
    this._showTooltip();
    if (this.props.onMouseEnter) this.props.onMouseEnter(event);
  },

  _handleKeyboardFocus(event, keyboardFocused) {
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
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onMouseOut={this._handleMouseOut}
        onKeyboardFocus={this._handleKeyboardFocus}
      >
        {tooltipElement}
        {fonticon}
        {Children.extend(this.props.children, {
          style: childrenStyle,
        })}
      </EnhancedButton>
    );
  },

});

export default IconButton;
