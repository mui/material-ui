import React from 'react';
import StylePropable from './mixins/style-propable';
import ContextPure from './mixins/context-pure';
import Transitions from './styles/transitions';
import PropTypes from './utils/prop-types';
import EnhancedButton from './enhanced-button';
import FontIcon from './font-icon';
import Tooltip from './tooltip';
import Children from './utils/children';
import muiThemeable from './muiThemeable';

let IconButton = React.createClass({

  mixins: [
    StylePropable,
    ContextPure,
  ],

  statics: {
    getRelevantContextKeys(muiTheme) {
      const spacing = muiTheme.baseTheme.spacing;
      const palette = muiTheme.baseTheme.palette;

      return {
        iconSize: spacing.iconSize,
        textColor: palette.textColor,
        disabledColor: palette.disabledColor,
      };
    },

    getChildrenClasses() {
      return [
        EnhancedButton,
        FontIcon,
        Tooltip,
      ];
    },
  },

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    tooltip: React.PropTypes.node,
    tooltipPosition: PropTypes.cornersAndCenter,
    tooltipStyles: React.PropTypes.object,
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
    const {
      iconSize,
      textColor,
      disabledColor,
    } = this.constructor.getRelevantContextKeys(this.props._muiTheme);

    let styles = {
      root: {
        position: 'relative',
        boxSizing: 'border-box',
        transition: Transitions.easeOut(),
        padding: iconSize / 2,
        width: iconSize * 2,
        height: iconSize * 2,
        fontSize: 0,
      },
      tooltip: {
        boxSizing: 'border-box',
      },
      icon: {
        color: textColor,
        fill: textColor,
      },
      overlay: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '100%',
        background: disabledColor,
      },
      disabled: {
        color: disabledColor,
        fill: disabledColor,
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
    if (this.props.tooltip) {
      this.setState({tooltipShown: true});
    }
  },

  _hideTooltip() {
    if (this.props.tooltip) this.setState({tooltipShown: false});
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

IconButton = muiThemeable(IconButton, ['setKeyboardFocus']);

export default IconButton;
