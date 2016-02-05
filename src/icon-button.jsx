import React from 'react';
import StylePropable from './mixins/style-propable';
import ContextPure from './mixins/context-pure';
import Transitions from './styles/transitions';
import PropTypes from './utils/prop-types';
import EnhancedButton from './enhanced-button';
import FontIcon from './font-icon';
import Tooltip from './tooltip';
import Children from './utils/children';
import getMuiTheme from './styles/getMuiTheme';

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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
    ContextPure,
  ],

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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
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
    } else if (!this.state.hovered) {
      this._hideTooltip();
      if (this.props.onBlur) this.props.onBlur(e);
    }

    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused);
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
        horizontalPosition={tooltipPosition[1]}
      />
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
          )}
        >
          {this.props.children}
        </FontIcon>
      );
    }

    let childrenStyle = disabled ? this.mergeStyles(iconStyle, styles.disabled) : iconStyle;

    return (
      <EnhancedButton
        {...other}
        ref="button"
        centerRipple={true}
        disabled={disabled}
        style={this.mergeStyles(styles.root, this.props.style)}
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
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
