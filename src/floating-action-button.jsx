import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import Transitions from './styles/transitions';
import Colors from './styles/colors';
import ColorManipulator from './utils/color-manipulator';
import EnhancedButton from './enhanced-button';
import FontIcon from './font-icon';
import Paper from './paper';
import Children from './utils/children';
import getMuiTheme from './styles/getMuiTheme';
import warning from 'warning';

const FloatingActionButton = React.createClass({

  propTypes: {
    /**
     * This value will override the default background color for the button.
     * However it will not override the default disabled background color.
     * This has to be set separately using the disabledColor attribute.
     */
    backgroundColor: React.PropTypes.string,

    /**
     * This is what displayed inside the floating action button; for example, a SVG Icon.
     */
    children: React.PropTypes.node,

    /**
     * Disables the button if set to true.
     */
    disabled: React.PropTypes.bool,

    /**
     * This value will override the default background color for the button when it is disabled.
     */
    disabledColor: React.PropTypes.string,

    /**
     * URL to link to when button clicked if `linkButton` is set to true.
     */
    href: React.PropTypes.string,

    /**
     * The icon within the FloatingActionButton is a FontIcon component.
     * This property is the classname of the icon to be displayed inside the button.
     * An alternative to adding an iconClassName would be to manually insert a
     * FontIcon component or custom SvgIcon component or as a child of FloatingActionButton.
     */
    iconClassName: React.PropTypes.string,

    /**
     * This is the equivalent to iconClassName except that it is used for
     * overriding the inline-styles of the FontIcon component.
     */
    iconStyle: React.PropTypes.object,

    /**
     * Enables use of `href` property to provide a URL to link to if set to true.
     */
    linkButton: React.PropTypes.bool,

    /**
     * If true, the button will be a small floating action button.
     */
    mini: React.PropTypes.bool,

    /**
     * Called when mouse down event occurs on the button.
     */
    onMouseDown: React.PropTypes.func,

    /**
     * Called when mouse enter event occurs on the button.
     */
    onMouseEnter: React.PropTypes.func,

    /**
     * Called when mouse leave event occurs on the button.
     */
    onMouseLeave: React.PropTypes.func,

    /**
     * Called when mouse up event occurs on the button.
     */
    onMouseUp: React.PropTypes.func,

    /**
     * Called when touch end event occurs on the button.
     */
    onTouchEnd: React.PropTypes.func,

    /**
     * Called when touch start event occurs on the button.
     */
    onTouchStart: React.PropTypes.func,

    /**
     * If true, the button will use the secondary button colors.
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

  getDefaultProps() {
    return {
      disabled: false,
      disabledColor: Colors.grey300,
      mini: false,
      secondary: false,
    };
  },

  getInitialState() {
    const zDepth = this.props.disabled ? 0 : 2;

    return {
      hovered: false,
      initialZDepth: zDepth,
      touch: false,
      zDepth: zDepth,
      muiTheme: this.context.muiTheme || getMuiTheme(),
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
    } else if (!this.state.hovered) {
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
        circle={true}
      >
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
          touchRippleColor={styles.icon.color}
        >
          <div
            ref="overlay"
            style={this.prepareStyles(
              styles.overlay,
              (this.state.hovered && !this.props.disabled) && styles.overlayWhenHovered
            )}
          >
            {iconElement}
            {children}
          </div>
        </EnhancedButton>
      </Paper>
    );
  },
});

export default FloatingActionButton;
