let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let PropTypes = require('./utils/prop-types');
let EnhancedButton = require('./enhanced-button');
let FontIcon = require('./font-icon');
let Tooltip = require('./tooltip');
let Children = require('./utils/children');


let IconButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    tooltip: React.PropTypes.string,
    tooltipStyles: React.PropTypes.object,
    tooltipPosition: PropTypes.cornersAndCenter,
    touch: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      tooltipShown: false,
    };
  },

  getDefaultProps() {
    return {
      iconStyle: {},
      tooltipPosition: 'bottom-center',
    };
  },

  getStyles() {
    let spacing = this.context.muiTheme.spacing;
    let palette = this.context.muiTheme.palette;

    let styles = {
      root: {
        position: 'relative',
        boxSizing: 'border-box',
        transition: Transitions.easeOut(),
        padding: spacing.iconSize / 2,
        width: spacing.iconSize * 2,
        height: spacing.iconSize * 2,
        fontSize: 0,
      },
      tooltip: {
        boxSizing: 'border-box',
      },
      icon: {
        color: palette.textColor,
        fill: palette.textColor,
      },
      overlay: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '100%',
        background: palette.disabledColor,
      },
      disabled: {
        color: palette.disabledColor,
        fill: palette.disabledColor,
      },
    };

    return styles;
  },

  render() {
    let {
      disabled,
      iconClassName,
      tooltip,
      touch,
      iconStyle,
      ...other,
    } = this.props;
    let fonticon;

    let styles = this.getStyles();
    let tooltipPosition = this.props.tooltipPosition.split('-');

    let tooltipElement = tooltip ? (
      <Tooltip
        ref="tooltip"
        label={tooltip}
        show={this.state.tooltipShown}
        touch={touch}
        style={this.mergeStyles(styles.tooltip, this.props.tooltipStyles)}
        verticalPosition={tooltipPosition[0]}
        horizontalPosition={tooltipPosition[1]}/>
    ) : null;

    if (iconClassName) {
      let {
        iconHoverColor,
        ...iconStyleFontIcon,
      } = iconStyle;

      fonticon = (
        <FontIcon
          className={iconClassName}
          hoverColor={disabled ? null : iconHoverColor}
          style={this.mergeStyles(
            styles.icon,
            disabled ? styles.disabled : {},
            iconStyleFontIcon
          )}>
          {this.props.children}</FontIcon>
      );
    }

    let childrenStyle = disabled ? this.mergeStyles(iconStyle, styles.disabled) : iconStyle;

    return (
      <EnhancedButton {...other}
        ref="button"
        centerRipple={true}
        disabled={disabled}
        style={this.mergeStyles(styles.root, this.props.style)}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
        onKeyboardFocus={this._handleKeyboardFocus}>

        {tooltipElement}
        {fonticon}
        {Children.extend(this.props.children, {
          style: childrenStyle,
        })}

      </EnhancedButton>
    );
  },

  setKeyboardFocus() {
    this.refs.button.setKeyboardFocus();
  },

  _showTooltip() {
    if (!this.props.disabled && this.props.tooltip) {
      this.setState({ tooltipShown: true });
    }
  },

  _hideTooltip() {
    if (this.props.tooltip) this.setState({ tooltipShown: false });
  },

  _handleBlur(e) {
    this._hideTooltip();
    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus(e) {
    this._showTooltip();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleMouseLeave(e) {
    if (!this.refs.button.isKeyboardFocused()) this._hideTooltip();
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
  },

  _handleMouseEnter(e) {
    this._showTooltip();
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleKeyboardFocus(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this._showTooltip();
      if (this.props.onFocus) this.props.onFocus(e);
    }
    else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(e);
    }

    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused);
  },

});

module.exports = IconButton;
