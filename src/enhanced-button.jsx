let React = require('react');
let StylePropable = require('./mixins/style-propable');
let Colors = require('./styles/colors');
let KeyCode = require('./utils/key-code');
let FocusRipple = require('./ripples/focus-ripple');
let TouchRipple = require('./ripples/touch-ripple');


let _tabPressed = false;

let EnhancedButton = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    centerRipple: React.PropTypes.bool,
    containerElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
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
    onKeyboardFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    tabIndex: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      containerElement: 'button',
      onBlur: () => {},
      onFocus: () => {},
      onKeyboardFocus: () => {},
      onKeyDown: () => {},
      onKeyUp: () => {},
      onTouchTap: () => {},
      tabIndex: 0,
      type: 'button',
    };
  },

  getInitialState() {
    return {
      isKeyboardFocused: !this.props.disabled &&
        this.props.keyboardFocused &&
        !this.props.disableKeyboardFocus,
    };
  },

  componentWillReceiveProps(nextProps) {
    if ((nextProps.disabled || nextProps.disableKeyboardFocus) &&
      this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      if (nextProps.onKeyboardFocus) {
        nextProps.onKeyboardFocus(null, false);
      }
    }
  },

  // Remove inner padding and border in Firefox 4+.
  componentDidMount() {
    if (!EnhancedButton.hasStyleBeenInjected) {
      let style = document.createElement("style");
      style.innerHTML = `
        button::-moz-focus-inner,
        input::-moz-focus-inner {
          border: 0;
          padding: 0;
        }
      `;

      document.body.appendChild(style);
      EnhancedButton.hasStyleBeenInjected = true;
    }
  },

  render() {
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
      onKeyUp,
      onKeyDown,
      onTouchTap,
      style,
      tabIndex,
      type,
      ...other,
    } = this.props;

    let mergedStyles = this.mergeAndPrefix({
      border: 10,
      background: 'none',
      boxSizing: 'border-box',
      display: 'inline-block',
      font: 'inherit',
      fontFamily: this.context.muiTheme.contentFontFamily,
      tapHighlightColor: Colors.transparent,
      appearance: this.props.linkButton ? null : 'button',
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      outline: 'none',
    }, style);

    let buttonProps = {
      ...other,
      style: mergedStyles,
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onTouchTap: this._handleTouchTap,
      onKeyUp: this._handleKeyUp,
      onKeyDown: this._handleKeyDown,
      tabIndex: tabIndex,
      type: type,
    };

    let buttonChildren = [];

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
    }
    else {
      buttonChildren.push(this.props.children);
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

  isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  removeKeyboardFocus(e) {
    if (this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      this.props.onKeyboardFocus(e, false);
    }
  },

  setKeyboardFocus(e) {
    if (!this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: true});
      this.props.onKeyboardFocus(e, true);
    }
  },

  _handleKeyDown(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (e.keyCode === KeyCode.TAB) {
        _tabPressed = true;
      }
      if (e.keyCode === KeyCode.ENTER && this.state.isKeyboardFocused) {
        this._handleTouchTap(e);
      }
    }
    this.props.onKeyDown(e);
  },

  _handleKeyUp(e) {
    if (!this.props.disabled &&
      e.keyCode === KeyCode.SPACE &&
      this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
    this.props.onKeyUp(e);
  },

  _handleBlur(e) {
    this._cancelFocusTimeout();
    this.removeKeyboardFocus(e);
    this.props.onBlur(e);
  },

  _handleFocus(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      //setTimeout is needed because the focus event fires first
      //Wait so that we can capture if this was a keyboard focus
      //or touch focus
      this._focusTimeout = setTimeout(() => {
        if (_tabPressed) {
          this.setKeyboardFocus(e);
        }
      }, 150);

      this.props.onFocus(e);
    }
  },

  _handleTouchTap(e) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      _tabPressed = false;
      this.removeKeyboardFocus(e);
      this.props.onTouchTap(e);
    }
  },

  _cancelFocusTimeout() {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
      this._focusTimeout = null;
    }
  },

});

EnhancedButton.hasStyleBeenInjected = false;

module.exports = EnhancedButton;
