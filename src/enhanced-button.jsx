import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Children from './utils/children';
import Events from './utils/events';
import keycode from 'keycode';
import FocusRipple from './ripples/focus-ripple';
import TouchRipple from './ripples/touch-ripple';
import getMuiTheme from './styles/getMuiTheme';

let styleInjected = false;
let listening = false;
let tabPressed = false;

function injectStyle() {
  if (!styleInjected) {
    // Remove inner padding and border in Firefox 4+.
    const style = document.createElement('style');
    style.innerHTML = `
      button::-moz-focus-inner,
      input::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
    `;

    document.body.appendChild(style);
    styleInjected = true;
  }
}

function listenForTabPresses() {
  if (!listening) {
    Events.on(window, 'keydown', (event) => {
      tabPressed = keycode(event) === 'tab';
    });
    listening = true;
  }
}

const EnhancedButton = React.createClass({

  propTypes: {
    centerRipple: PropTypes.bool,
    children: PropTypes.node,
    containerElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    disableFocusRipple: PropTypes.bool,
    disableKeyboardFocus: PropTypes.bool,
    disableTouchRipple: PropTypes.bool,
    disabled: PropTypes.bool,
    focusRippleColor: PropTypes.string,
    focusRippleOpacity: PropTypes.number,
    keyboardFocused: PropTypes.bool,
    linkButton: PropTypes.bool,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onTouchTap: PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    touchRippleColor: PropTypes.string,
    touchRippleOpacity: PropTypes.number,
    type: PropTypes.string,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

  mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      containerElement: 'button',
      onBlur: () => {},
      onClick: () => {},
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
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentDidMount() {
    injectStyle();
    listenForTabPresses();
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });

    if ((nextProps.disabled || nextProps.disableKeyboardFocus) &&
      this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      if (nextProps.onKeyboardFocus) {
        nextProps.onKeyboardFocus(null, false);
      }
    }
  },

  componentWillUnmount() {
    clearTimeout(this._focusTimeout);
  },

  isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },

  removeKeyboardFocus(event) {
    if (this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      this.props.onKeyboardFocus(event, false);
    }
  },

  setKeyboardFocus(event) {
    if (!this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: true});
      this.props.onKeyboardFocus(event, true);
    }
  },

  _cancelFocusTimeout() {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
      this._focusTimeout = null;
    }
  },

  _createButtonChildren() {
    const {
      centerRipple,
      children,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus,
      disableTouchRipple,
      focusRippleColor,
      focusRippleOpacity,
      touchRippleColor,
      touchRippleOpacity,
    } = this.props;
    const {isKeyboardFocused} = this.state;

    //Focus Ripple
    const focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? (
      <FocusRipple
        color={focusRippleColor}
        muiTheme={this.state.muiTheme}
        opacity={focusRippleOpacity}
        show={isKeyboardFocused}
      />
    ) : undefined;

    //Touch Ripple
    const touchRipple = !disabled && !disableTouchRipple ? (
      <TouchRipple
        centerRipple={centerRipple}
        color={touchRippleColor}
        muiTheme={this.state.muiTheme}
        opacity={touchRippleOpacity}
      >
        {children}
      </TouchRipple>
    ) : undefined;

    return Children.create({
      focusRipple,
      touchRipple,
      children: touchRipple ? undefined : children,
    });
  },

  _handleKeyDown(event) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (keycode(event) === 'enter' && this.state.isKeyboardFocused) {
        this._handleTouchTap(event);
      }
    }
    this.props.onKeyDown(event);
  },

  _handleKeyUp(event) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (keycode(event) === 'space' && this.state.isKeyboardFocused) {
        this._handleTouchTap(event);
      }
    }
    this.props.onKeyUp(event);
  },

  _handleBlur(event) {
    this._cancelFocusTimeout();
    this.removeKeyboardFocus(event);
    this.props.onBlur(event);
  },

  _handleFocus(event) {
    if (event) event.persist();
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      //setTimeout is needed because the focus event fires first
      //Wait so that we can capture if this was a keyboard focus
      //or touch focus
      this._focusTimeout = setTimeout(() => {
        if (tabPressed) {
          this.setKeyboardFocus(event);
        }
      }, 150);

      this.props.onFocus(event);
    }
  },

  _handleClick(event) {
    if (!this.props.disabled) {
      tabPressed = false;
      this.props.onClick(event);
    }
  },

  _handleTouchTap(event) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      tabPressed = false;
      this.removeKeyboardFocus(event);
      this.props.onTouchTap(event);
    }
  },

  render() {
    const {
      centerRipple,
      children,
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
      onClick,
      onFocus,
      onKeyUp,
      onKeyDown,
      onTouchTap,
      style,
      tabIndex,
      type,
      ...other,
    } = this.props;

    const {
      prepareStyles,
      enhancedButton,
    } = this.state.muiTheme;

    const mergedStyles = Object.assign({
      border: 10,
      background: 'none',
      boxSizing: 'border-box',
      display: 'inline-block',
      fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      WebkitTapHighlightColor: enhancedButton.tapHighlightColor, // Remove mobile color flashing (deprecated)
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      outline: 'none',
      font: 'inherit',
      /*
        This is needed so that ripples do not bleed
        past border radius.
        See: http://stackoverflow.com/questions/17298739/
          css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
       */
      transform: disableTouchRipple && disableFocusRipple ? null : 'translate3d(0, 0, 0)',
      verticalAlign: other.hasOwnProperty('href') ? 'middle' : null,
    }, style);

    if (disabled && linkButton) {
      return (
        <span
          {...other}
          style={mergedStyles}
        >
          {children}
        </span>
      );
    }

    const buttonProps = {
      ...other,
      style: prepareStyles(mergedStyles),
      disabled: disabled,
      onBlur: this._handleBlur,
      onClick: this._handleClick,
      onFocus: this._handleFocus,
      onTouchTap: this._handleTouchTap,
      onKeyUp: this._handleKeyUp,
      onKeyDown: this._handleKeyDown,
      tabIndex: tabIndex,
      type: type,
    };
    const buttonChildren = this._createButtonChildren();

    // Provides backward compatibity. Added to support wrapping around <a> element.
    const targetLinkElement = buttonProps.hasOwnProperty('href') ? 'a' : 'span';

    return React.isValidElement(containerElement) ?
      React.cloneElement(containerElement, buttonProps, buttonChildren) :
      React.createElement(linkButton ? targetLinkElement : containerElement, buttonProps, buttonChildren);
  },

});

export default EnhancedButton;
