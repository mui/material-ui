import React from 'react';
import StylePropable from './mixins/style-propable';
import ContextPure from './mixins/context-pure';
import Transitions from './styles/transitions';
import PropTypes from './utils/prop-types';
import EnhancedButton from './enhanced-button';
import FontIcon from './font-icon';
import Tooltip from './tooltip';
import Children from './utils/children';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

const IconButton = React.createClass({

  mixins: [
    StylePropable,
    ContextPure,
  ],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  statics: {
    getRelevantContextKeys(muiTheme) {
      const spacing = muiTheme.rawTheme.spacing;
      const palette = muiTheme.rawTheme.palette;

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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  propTypes: {
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
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
    } = this.constructor.getRelevantContextKeys(this.state.muiTheme);

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

export default IconButton;
