let React = require('react');
let KeyCode = require('./utils/key-code');
let Colors = require('./styles/colors');
let StylePropable = require('./mixins/style-propable');
let WindowListenable = require('./mixins/window-listenable');
let FocusRipple = require('./ripples/focus-ripple');
let TouchRipple = require('./ripples/touch-ripple');


let EnhancedButton = React.createClass({

  mixins: [StylePropable, WindowListenable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    centerRipple: React.PropTypes.bool,
    containerElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    disabled: React.PropTypes.bool,
    disableFocusRipple: React.PropTypes.bool,
    disableKeyboardFocus: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    keyboardFocused: React.PropTypes.bool,
    linkButton: React.PropTypes.bool,
    focusRippleColor: React.PropTypes.string,
    touchRippleColor: React.PropTypes.string,
    focusRippleOpacity: React.PropTypes.number,
    touchRippleOpacity: React.PropTypes.number,
    onBlur: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    tabIndex: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      containerElement: 'button',
      tabIndex: 0
    };
  },

  windowListeners: {
    'keydown': '_handleWindowKeydown',
    'keyup': '_handleWindowKeyup'
  },

  getInitialState: function() {
    return {
      isKeyboardFocused: !this.props.disabled &&
        this.props.keyboardFocused &&
        !this.props.disableKeyboardFocus
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.disabled || nextProps.disableKeyboardFocus && this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      if (nextProps.onKeyboardFocus) nextProps.onKeyboardFocus(null, false);
    }
  },

  // Remove inner padding and border in Firefox 4+.
  componentDidMount: function() {
    if (!EnhancedButton.hasStyleBeenInjected) {
      let style = document.createElement("style");
      style.innerHTML = 'button::-moz-focus-inner,' +
        'input::-moz-focus-inner {' +
        ' border: 0;' +
        ' padding: 0;' +
        ' }';
      document.body.appendChild(style);
      EnhancedButton.hasStyleBeenInjected = true;
    }
  },

  render: function() {
    let {
      centerRipple,
      containerElement,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus,
      disableTouchRipple,
      focusRippleColor,
      focusRippleOpacity,
      linkButton,
      touchRippleColor,
      touchRippleOpacity,
      onBlur,
      onFocus,
      onTouchTap,
      style,
      tabIndex,
      ...other
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      border: 10,
      background: 'none',
      boxSizing: 'border-box',
      display: 'inline-block',
      font: 'inherit',
      fontFamily: this.context.muiTheme.contentFontFamily,
      WebkitTapHighlightColor: Colors.transparent,
      WebkitAppearance: !this.props.linkButton && 'button',
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      outline: 'none'
    }, style);

    let buttonProps = {
      ...other,
      style: mergedStyles,
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onTouchTap: this._handleTouchTap,
      tabIndex: tabIndex
    };

    let buttonChildren = [];

    // Create ripples if we need to
    if (!disabled && !disableTouchRipple) {
      buttonChildren.push(
        <TouchRipple
          key="touchRipple"
          centerRipple={centerRipple}
          color={touchRippleColor}
          opacity={touchRippleOpacity}>
            {this.props.children}
        </TouchRipple>
      );
    } else {
      buttonChildren.push(this.props.children);
    }

    if (!disabled && !disableFocusRipple && !disableKeyboardFocus) {
      buttonChildren.push(
        <FocusRipple
          key="focusRipple"
          color={focusRippleColor}
          opacity={focusRippleOpacity}
          show={this.state.isKeyboardFocused}
        />
      );
    }

    if (disabled && linkButton) {
      return (
        <span
          {...other}
          style={mergedStyles}>
          {this.props.children}
        </span>
      );
    }

    return React.isValidElement(containerElement) ?
      React.cloneElement(containerElement, buttonProps, buttonChildren) :
      React.createElement(linkButton ? 'a' : containerElement, buttonProps, buttonChildren);

  },

  isKeyboardFocused: function() {
    return this.state.isKeyboardFocused;
  },

  _handleWindowKeydown: function(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (e.keyCode === KeyCode.TAB) this._tabPressed = true;
      if (e.keyCode === KeyCode.ENTER && this.state.isKeyboardFocused) {
        this._handleTouchTap(e);
      }
    }
  },

  _handleWindowKeyup: function(e) {
    if (!this.props.disabled && e.keyCode === KeyCode.SPACE && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
  },

  _handleBlur: function(e) {
    this._cancelFocusTimeout();

    if (!this.props.disabled && this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, false);
    }

    if (this.props.onBlur) this.props.onBlur(e);
  },

  _handleFocus: function(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      //setTimeout is needed because the focus event fires first
      //Wait so that we can capture if this was a keyboard focus
      //or touch focus
      this._focusTimeout = setTimeout(function() {
        if (this._tabPressed && !this.state.isKeyboardFocused) {
          this.setState({isKeyboardFocused: true});
          if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, true);
        }
      }.bind(this), 150);

      if (this.props.onFocus) this.props.onFocus(e);
    }
  },

  _handleTouchTap: function(e) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      this._tabPressed = false;

      if (this.state.isKeyboardFocused) {
        this.setState({isKeyboardFocused: false});
        if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, false);
      }

      if (this.props.onTouchTap) this.props.onTouchTap(e);
    }
  },

  _cancelFocusTimeout: function () {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
      this._focusTimeout = null;
    }
  }

});

EnhancedButton.hasStyleBeenInjected = false;

module.exports = EnhancedButton;
