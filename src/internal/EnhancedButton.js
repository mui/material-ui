import React from 'react';
import {createChildFragment} from '../utils/childUtils';
import Events from '../utils/events';
import keycode from 'keycode';
import FocusRipple from './FocusRipple';
import TouchRipple from './TouchRipple';

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

class EnhancedButton extends React.Component {
  static propTypes = {
    centerRipple: React.PropTypes.bool,
    children: React.PropTypes.node,
    containerElement: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    disableFocusRipple: React.PropTypes.bool,
    disableKeyboardFocus: React.PropTypes.bool,
    disableTouchRipple: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    focusRippleColor: React.PropTypes.string,
    focusRippleOpacity: React.PropTypes.number,
    keyboardFocused: React.PropTypes.bool,
    linkButton: React.PropTypes.bool,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    style: React.PropTypes.object,
    tabIndex: React.PropTypes.number,
    touchRippleColor: React.PropTypes.string,
    touchRippleOpacity: React.PropTypes.number,
    type: React.PropTypes.string,
  };

  static defaultProps = {
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

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  state = {isKeyboardFocused: false};

  componentWillMount() {
    const {disabled, disableKeyboardFocus, keyboardFocused} = this.props;
    if (!disabled && keyboardFocused && !disableKeyboardFocus) {
      this.setState({isKeyboardFocused: true});
    }
  }

  componentDidMount() {
    injectStyle();
    listenForTabPresses();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.disabled || nextProps.disableKeyboardFocus) &&
      this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      if (nextProps.onKeyboardFocus) {
        nextProps.onKeyboardFocus(null, false);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.focusTimeout);
  }

  isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  }

  removeKeyboardFocus(event) {
    if (this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: false});
      this.props.onKeyboardFocus(event, false);
    }
  }

  setKeyboardFocus(event) {
    if (!this.state.isKeyboardFocused) {
      this.setState({isKeyboardFocused: true});
      this.props.onKeyboardFocus(event, true);
    }
  }

  cancelFocusTimeout() {
    if (this.focusTimeout) {
      clearTimeout(this.focusTimeout);
      this.focusTimeout = null;
    }
  }

  createButtonChildren() {
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

    // Focus Ripple
    const focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? (
      <FocusRipple
        color={focusRippleColor}
        opacity={focusRippleOpacity}
        show={isKeyboardFocused}
      />
    ) : undefined;

    // Touch Ripple
    const touchRipple = !disabled && !disableTouchRipple ? (
      <TouchRipple
        centerRipple={centerRipple}
        color={touchRippleColor}
        opacity={touchRippleOpacity}
      >
        {children}
      </TouchRipple>
    ) : undefined;

    return createChildFragment({
      focusRipple,
      touchRipple,
      children: touchRipple ? undefined : children,
    });
  }

  handleKeyDown = (event) => {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (keycode(event) === 'enter' && this.state.isKeyboardFocused) {
        this.handleTouchTap(event);
      }
    }
    this.props.onKeyDown(event);
  };

  handleKeyUp = (event) => {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (keycode(event) === 'space' && this.state.isKeyboardFocused) {
        this.handleTouchTap(event);
      }
    }
    this.props.onKeyUp(event);
  };

  handleBlur = (event) => {
    this.cancelFocusTimeout();
    this.removeKeyboardFocus(event);
    this.props.onBlur(event);
  };

  handleFocus = (event) => {
    if (event) event.persist();
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      // setTimeout is needed because the focus event fires first
      // Wait so that we can capture if this was a keyboard focus
      // or touch focus
      this.focusTimeout = setTimeout(() => {
        if (tabPressed) {
          this.setKeyboardFocus(event);
        }
      }, 150);

      this.props.onFocus(event);
    }
  };

  handleClick = (event) => {
    if (!this.props.disabled) {
      tabPressed = false;
      this.props.onClick(event);
    }
  };

  handleTouchTap = (event) => {
    this.cancelFocusTimeout();
    if (!this.props.disabled) {
      tabPressed = false;
      this.removeKeyboardFocus(event);
      this.props.onTouchTap(event);
    }
  };

  render() {
    const {
      centerRipple, // eslint-disable-line no-unused-vars
      children,
      containerElement,
      disabled,
      disableFocusRipple,
      disableKeyboardFocus, // eslint-disable-line no-unused-vars
      disableTouchRipple, // eslint-disable-line no-unused-vars
      focusRippleColor, // eslint-disable-line no-unused-vars
      focusRippleOpacity, // eslint-disable-line no-unused-vars
      linkButton,
      touchRippleColor, // eslint-disable-line no-unused-vars
      touchRippleOpacity, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onKeyUp, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      style,
      tabIndex,
      type,
      ...other,
    } = this.props;

    const {
      prepareStyles,
      enhancedButton,
    } = this.context.muiTheme;

    const mergedStyles = Object.assign({
      border: 10,
      background: 'none',
      boxSizing: 'border-box',
      display: 'inline-block',
      fontFamily: this.context.muiTheme.baseTheme.fontFamily,
      WebkitTapHighlightColor: enhancedButton.tapHighlightColor, // Remove mobile color flashing (deprecated)
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      outline: 'none',
      font: 'inherit',
      /**
       * This is needed so that ripples do not bleed
       * past border radius.
       * See: http://stackoverflow.com/questions/17298739/
       * css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
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
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onTouchTap: this.handleTouchTap,
      onKeyUp: this.handleKeyUp,
      onKeyDown: this.handleKeyDown,
      tabIndex: tabIndex,
      type: type,
    };
    const buttonChildren = this.createButtonChildren();

    // Provides backward compatibity. Added to support wrapping around <a> element.
    const targetLinkElement = buttonProps.hasOwnProperty('href') ? 'a' : 'span';

    return React.isValidElement(containerElement) ?
      React.cloneElement(containerElement, buttonProps, buttonChildren) :
      React.createElement(linkButton ? targetLinkElement : containerElement, buttonProps, buttonChildren);
  }
}

export default EnhancedButton;
