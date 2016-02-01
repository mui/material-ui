import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import ColorManipulator from './utils/color-manipulator';
import Children from './utils/children';
import Typography from './styles/typography';
import EnhancedButton from './enhanced-button';
import Paper from './paper';
import getMuiTheme from './styles/getMuiTheme';

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' +
      'specified in ' + componentName + '.');
  }
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

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

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
    let zDepth = this.props.disabled ? 0 : 1;
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
    let zDepth = nextProps.disabled ? 0 : 1;
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      zDepth: zDepth,
      initialZDepth: zDepth,
      muiTheme: newMuiTheme,
    });
  },

  _getBackgroundColor() {
    let disabledColor = this.props.disabledBackgroundColor ? this.props.disabledBackgroundColor :
      this.getTheme().disabledColor;

    return this.props.disabled ? disabledColor :
      this.props.backgroundColor ? this.props.backgroundColor :
      this.props.primary ? this.getTheme().primaryColor :
      this.props.secondary ? this.getTheme().secondaryColor :
      this.getTheme().color;
  },

  _getLabelColor() {
    let disabledColor = this.props.disabledLabelColor ? this.props.disabledLabelColor :
      this.getTheme().disabledTextColor;

    return this.props.disabled ? disabledColor :
      this.props.labelColor ? this.props.labelColor :
      this.props.primary ? this.getTheme().primaryTextColor :
      this.props.secondary ? this.getTheme().secondaryTextColor :
      this.getTheme().textColor;
  },

  getThemeButton() {
    return this.state.muiTheme.button;
  },

  getTheme() {
    return this.state.muiTheme.raisedButton;
  },

  getStyles() {
    const {
      icon,
      labelPosition,
      primary,
      secondary,
    } = this.props;

    let amount = (primary || secondary) ? 0.4 : 0.08;
    let styles = {
      root: {
        display: 'inline-block',
        minWidth: this.props.fullWidth ? '100%' : this.getThemeButton().minWidth,
        height: this.getThemeButton().height,
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
        backgroundColor: this._getBackgroundColor(),
      },
      label: {
        position: 'relative',
        opacity: 1,
        fontSize: '14px',
        letterSpacing: 0,
        textTransform: this.getTheme().textTransform ? this.getTheme().textTransform :
                    (this.getThemeButton().textTransform ? this.getThemeButton().textTransform : 'uppercase'),
        fontWeight: Typography.fontWeightMedium,
        margin: 0,
        userSelect: 'none',
        paddingLeft: this.state.muiTheme.rawTheme.spacing.desktopGutterLess,
        paddingRight: this.state.muiTheme.rawTheme.spacing.desktopGutterLess,
        lineHeight: (this.props.style && this.props.style.height) ?
         this.props.style.height : this.getThemeButton().height + 'px',
        color: this._getLabelColor(),
      },
      overlay: {
        transition: Transitions.easeOut(),
        top: 0,
      },
      overlayWhenHovered: {
        backgroundColor: ColorManipulator.fade(this._getLabelColor(), amount),
      },
    };

    if (icon) {
      if (labelPosition === 'before') {
        styles.label.paddingRight = 8;
      } else {
        styles.label.paddingLeft = 8;
      }
    }

    return styles;
  },


  _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({zDepth: this.state.initialZDepth + 1});
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp(e) {
    this.setState({zDepth: this.state.initialZDepth});
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseLeave(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({zDepth: this.state.initialZDepth, hovered: false});
    if (this.props.onMouseLeave) this.props.onMouseLeave(e);
  },

  _handleMouseEnter(e) {
    if (!this.refs.container.isKeyboardFocused() && !this.state.touch) {
      this.setState({hovered: true});
    }
    if (this.props.onMouseEnter) this.props.onMouseEnter(e);
  },

  _handleTouchStart(e) {
    this.setState({
      touch: true,
      zDepth: this.state.initialZDepth + 1,
    });
    if (this.props.onTouchStart) this.props.onTouchStart(e);
  },

  _handleTouchEnd(e) {
    this.setState({zDepth: this.state.initialZDepth});
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  _handleKeyboardFocus(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({zDepth: this.state.initialZDepth + 1});
      let amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
      ReactDOM.findDOMNode(this.refs.overlay).style.backgroundColor =
        ColorManipulator.fade(this.prepareStyles(this.getStyles().label, this.props.labelStyle).color, amount);
    } else if (!this.state.hovered) {
      this.setState({zDepth: this.state.initialZDepth});
      ReactDOM.findDOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  },

  render() {
    let {
      children,
      disabled,
      icon,
      label,
      labelPosition,
      labelStyle,
      primary,
      secondary,
      ...other,
    } = this.props;

    let styles = this.getStyles();

    let labelElement;
    if (label) {
      labelElement = (
        <span style={this.prepareStyles(styles.label, labelStyle)}>
          {label}
        </span>
      );
    }

    let rippleColor = styles.label.color;
    let rippleOpacity = !(primary || secondary) ? 0.1 : 0.16;

    let buttonEventHandlers = disabled ? null : {
      onMouseDown: this._handleMouseDown,
      onMouseUp: this._handleMouseUp,
      onMouseLeave: this._handleMouseLeave,
      onMouseEnter: this._handleMouseEnter,
      onTouchStart: this._handleTouchStart,
      onTouchEnd: this._handleTouchEnd,
      onKeyboardFocus: this._handleKeyboardFocus,
    };

    let iconCloned;

    if (icon) {
      iconCloned = React.cloneElement(icon, {
        color: styles.label.color,
        style: {
          verticalAlign: 'middle',
          marginLeft: labelPosition === 'before' ? 0 : 12,
          marginRight: labelPosition === 'before' ? 12 : 0,
        },
      });
    }

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
        style={this.mergeStyles(styles.root, this.props.style)}
        zDepth={this.state.zDepth}
      >
        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={this.mergeStyles(styles.container)}
          focusRippleColor={rippleColor}
          touchRippleColor={rippleColor}
          focusRippleOpacity={rippleOpacity}
          touchRippleOpacity={rippleOpacity}
        >
          <div
            ref="overlay"
            style={this.prepareStyles(
              styles.overlay,
              (this.state.hovered && !this.props.disabled) && styles.overlayWhenHovered
            )}
          >
            {enhancedButtonChildren}
          </div>
        </EnhancedButton>
      </Paper>
    );
  },

});

export default RaisedButton;
