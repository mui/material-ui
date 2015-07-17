let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Transitions = require('./styles/transitions');
let ColorManipulator = require('./utils/color-manipulator');
let EnhancedButton = require('./enhanced-button');
let FontIcon = require('./font-icon');
let Paper = require('./paper');
let Children = require('./utils/children');


let getZDepth = function(disabled) {
  let zDepth = disabled ? 0 : 2;
  return {
    zDepth: zDepth,
    initialZDepth: zDepth,
  };
};


let FloatingActionButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    disabled: React.PropTypes.bool,
    iconClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    mini: React.PropTypes.bool,
    onMouseDown: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    secondary: React.PropTypes.bool,
  },

  getInitialState() {
    let zDepth = this.props.disabled ? 0 : 2;
    return {
      hovered: false,
      initialZDepth: zDepth,
      touch: false,
      zDepth: zDepth,
    };
  },

  componentWillMount() {
    this.setState(getZDepth(this.props.disabled));
  },

  componentWillReceiveProps(newProps) {
    if (newProps.disabled !== this.props.disabled) {
      this.setState(getZDepth(newProps.disabled));
    }
  },

  componentDidMount() {
    if (process.env.NODE_ENV !== 'production') {
      if (this.props.iconClassName && this.props.children) {
        let warning = 'You have set both an iconClassName and a child icon. ' +
          'It is recommended you use only one method when adding ' +
          'icons to FloatingActionButtons.';
        console.warn(warning);
      }
    }
  },

  _getBackgroundColor() {
    return this.props.disabled ? this.getTheme().disabledColor :
      this.props.secondary ? this.getTheme().secondaryColor :
      this.getTheme().color;
  },


  getTheme() {
    return this.context.muiTheme.component.floatingActionButton;
  },

  _getIconColor() {
    return this.props.disabled ? this.getTheme().disabledTextColor :
      this.props.secondary ? this.getTheme().secondaryIconColor :
      this.getTheme().iconColor;
  },

  getStyles() {
    let themeVariables = this.context.muiTheme.component.floatingActionButton;

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
        //This is need so that ripples do not bleed
        //past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
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

  render() {
    let {
      disabled,
      mini,
      secondary,
      iconStyle,
      iconClassName,
      ...other } = this.props;

    let styles = this.getStyles();

    let iconElement;
    if (iconClassName) {
      iconElement =
        <FontIcon
          className={iconClassName}
          style={this.mergeAndPrefix(
            styles.icon,
            mini && styles.iconWhenMini,
            iconStyle)}/>;
    }

    let children = Children.extend(this.props.children, {
      style: this.mergeAndPrefix(
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
        style={this.mergeAndPrefix(styles.root, this.props.style)}
        zDepth={this.state.zDepth}
        circle={true}>

        <EnhancedButton
          {...other}
          {...buttonEventHandlers}
          ref="container"
          disabled={disabled}
          style={this.mergeAndPrefix(
            styles.container,
            this.props.mini && styles.containerWhenMini
          )}
          focusRippleColor={styles.icon.color}
          touchRippleColor={styles.icon.color}>
            <div
              ref="overlay"
              style={this.mergeAndPrefix(
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

  _handleMouseDown(e) {
    //only listen to left clicks
    if (e.button === 0) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
    }
    if (this.props.onMouseDown) this.props.onMouseDown(e);
  },

  _handleMouseUp(e) {
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onMouseUp) this.props.onMouseUp(e);
  },

  _handleMouseLeave(e) {
    if (!this.refs.container.isKeyboardFocused()) this.setState({ zDepth: this.state.initialZDepth, hovered: false });
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
    this.setState({ zDepth: this.state.initialZDepth });
    if (this.props.onTouchEnd) this.props.onTouchEnd(e);
  },

  _handleKeyboardFocus(e, keyboardFocused) {
    if (keyboardFocused && !this.props.disabled) {
      this.setState({ zDepth: this.state.initialZDepth + 1 });
      React.findDOMNode(this.refs.overlay).style.backgroundColor = ColorManipulator.fade(this.getStyles().icon.color, 0.4);
    }
    else if (!this.state.hovered) {
      this.setState({ zDepth: this.state.initialZDepth });
      React.findDOMNode(this.refs.overlay).style.backgroundColor = 'transparent';
    }
  },

});

module.exports = FloatingActionButton;
