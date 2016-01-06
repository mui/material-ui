import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import ColorManipulator from './utils/color-manipulator';
import Children from './utils/children';
import Typography from './styles/typography';
import EnhancedButton from './enhanced-button';
import Paper from './paper';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';

function validateLabel(props, propName, componentName) {
  if (!props.children && !props.label) {
    return new Error('Required prop label or children was not ' +
      'specified in ' + componentName + '.');
  }
}

const RaisedButton = React.createClass({

  propTypes: {
    backgroundColor: React.PropTypes.string,
    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    disabledBackgroundColor: React.PropTypes.string,
    disabledLabelColor: React.PropTypes.string,
    fullWidth: React.PropTypes.bool,
    label: validateLabel,
    labelColor: React.PropTypes.string,
    labelPosition: React.PropTypes.oneOf([
      'before',
      'after',
    ]),
    labelStyle: React.PropTypes.object,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    primary: React.PropTypes.bool,
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
      labelPosition: 'before', // Should be after but we keep it like for now (prevent breaking changes)
    };
  },

  getInitialState() {
    let zDepth = this.props.disabled ? 0 : 1;
    return {
      hovered: false,
      touched: false,
      initialZDepth: zDepth,
      zDepth: zDepth,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
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

    let amount = (this.props.primary || this.props.secondary) ? 0.4 : 0.08;
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
        /*
          This is need so that ripples do not bleed
          past border radius.
          See: http://stackoverflow.com/questions/17298739/
            css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
         */
        transform: 'translate3d(0, 0, 0)',
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
        padding: '0px ' + this.state.muiTheme.rawTheme.spacing.desktopGutterLess + 'px',
        userSelect: 'none',
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
    }
    else if (!this.state.hovered) {
      this.setState({zDepth: this.state.initialZDepth});
      ReactDOM.findDOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  },

  render() {
    let {
      children,
      disabled,
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

    // Place label before or after children.
    const childrenFragment = labelPosition === 'before' ?
      {labelElement, children}
      :
      {children, labelElement};
    const enhancedButtonChildren = Children.create(childrenFragment);

    return (
      <Paper
        style={this.mergeStyles(styles.root, this.props.style)}
        zDepth={this.state.zDepth}>
        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={this.mergeStyles(styles.container)}
          focusRippleColor={rippleColor}
          touchRippleColor={rippleColor}
          focusRippleOpacity={rippleOpacity}
          touchRippleOpacity={rippleOpacity}>
          <div ref="overlay" style={this.prepareStyles(
              styles.overlay,
              (this.state.hovered && !this.props.disabled) && styles.overlayWhenHovered
            )}>
              {enhancedButtonChildren}
          </div>
        </EnhancedButton>
      </Paper>
    );
  },

});

export default RaisedButton;
