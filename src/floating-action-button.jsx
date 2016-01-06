import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import ColorManipulator from './utils/color-manipulator';
import EnhancedButton from './enhanced-button';
import FontIcon from './font-icon';
import Paper from './paper';
import Children from './utils/children';
import DefaultRawTheme from './styles/raw-themes/light-raw-theme';
import ThemeManager from './styles/theme-manager';
import warning from 'warning';

const FloatingActionButton = React.createClass({

  propTypes: {
    backgroundColor: React.PropTypes.string,
    children: React.PropTypes.node,
    disabled: React.PropTypes.bool,
    disabledColor: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    mini: React.PropTypes.bool,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
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

  getInitialState() {
    const zDepth = this.props.disabled ? 0 : 2;

    return {
      hovered: false,
      initialZDepth: zDepth,
      touch: false,
      zDepth: zDepth,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
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

  componentWillReceiveProps(newProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});

    if (newProps.disabled !== this.props.disabled) {
      const zDepth = newProps.disabled ? 0 : 2;

      this.setState({
        zDepth: zDepth,
        initialZDepth: zDepth,
      });
    }
  },

  _getBackgroundColor() {
    return this.props.disabled ? ( this.props.disabledColor || this.getTheme().disabledColor) :
      this.props.backgroundColor ? this.props.backgroundColor :
      this.props.secondary ? this.getTheme().secondaryColor :
      this.getTheme().color;
  },


  getTheme() {
    return this.state.muiTheme.floatingActionButton;
  },

  _getIconColor() {
    return this.props.disabled ? this.getTheme().disabledTextColor :
      (this.props.secondary ? this.getTheme().secondaryIconColor :
      this.getTheme().iconColor);
  },

  getStyles() {
    let themeVariables = this.state.muiTheme.floatingActionButton;

    let styles = {
      root: {
        transition: Transitions.easeOut(),
        display: 'inline-block',
      },
      container: {
        transition: Transitions.easeOut(),
        position: 'relative',
        height: themeVariables.buttonSize,
        width: themeVariables.buttonSize,
        padding: 0,
        overflow: 'hidden',
        backgroundColor: this._getBackgroundColor(),
        borderRadius: '50%',
        textAlign: 'center',
        verticalAlign: 'bottom',
        /*
         This is need so that ripples do not bleed
          past border radius.
          See: http://stackoverflow.com/questions/17298739/
            css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
         */
        transform: 'translate3d(0, 0, 0)',
      },
      containerWhenMini: {
        height: themeVariables.miniSize,
        width: themeVariables.miniSize,
      },
      overlay: {
        transition: Transitions.easeOut(),
        top: 0,
      },
      overlayWhenHovered: {
        backgroundColor: ColorManipulator.fade(this._getIconColor(), 0.4),
      },
      icon: {
        height: themeVariables.buttonSize,
        lineHeight: themeVariables.buttonSize + 'px',
        fill: themeVariables.iconColor,
        color: this._getIconColor(),
      },
      iconWhenMini: {
        height: themeVariables.miniSize,
        lineHeight: themeVariables.miniSize + 'px',
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
      ReactDOM.findDOMNode(this.refs.overlay).style.backgroundColor =
        ColorManipulator.fade(this.getStyles().icon.color, 0.4);
    }
    else if (!this.state.hovered) {
      this.setState({zDepth: this.state.initialZDepth});
      ReactDOM.findDOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  },

  render() {
    let {
      disabled,
      mini,
      secondary,
      iconStyle,
      iconClassName,
      ...other} = this.props;

    let styles = this.getStyles();

    let iconElement;
    if (iconClassName) {
      iconElement = (
        <FontIcon
          className={iconClassName}
          style={this.mergeStyles(
            styles.icon,
            mini && styles.iconWhenMini,
            iconStyle)}
        />
      );
    }

    let children = Children.extend(this.props.children, {
      style: this.mergeStyles(
        styles.icon,
        mini && styles.iconWhenMini,
        iconStyle),
    });

    let buttonEventHandlers = disabled ? null : {
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
        style={this.mergeStyles(styles.root, this.props.style)}
        zDepth={this.state.zDepth}
        circle={true}>

        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={this.mergeStyles(
            styles.container,
            this.props.mini && styles.containerWhenMini,
            iconStyle
          )}
          focusRippleColor={styles.icon.color}
          touchRippleColor={styles.icon.color}>
          <div
            ref="overlay"
            style={this.prepareStyles(
              styles.overlay,
              (this.state.hovered && !this.props.disabled) && styles.overlayWhenHovered
            )}>
              {iconElement}
              {children}
          </div>
        </EnhancedButton>
      </Paper>
    );
  },

});

export default FloatingActionButton;
