import React, {Component, PropTypes} from 'react';
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

class EnhancedButton extends Component {
  static propTypes = {
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
    href: PropTypes.string,
    keyboardFocused: PropTypes.bool,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyboardFocus: PropTypes.func,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseUp: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onTouchStart: PropTypes.func,
    onTouchTap: PropTypes.func,
    style: PropTypes.object,
    tabIndex: PropTypes.number,
    touchRippleColor: PropTypes.string,
    touchRippleOpacity: PropTypes.number,
    type: PropTypes.string,
  };

  static defaultProps = {
    containerElement: 'button',
    onBlur: () => {},
    onClick: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
    onTouchTap: () => {},
    tabIndex: 0,
    type: 'button',
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
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
    if (this.state.isKeyboardFocused) {
      this.refs.enhancedButton.focus();
      this.props.onKeyboardFocus(null, true);
    }
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
      if (keycode(event) === 'esc' && this.state.isKeyboardFocused) {
        this.removeKeyboardFocus(event);
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
          tabPressed = false;
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
      href,
      keyboardFocused, // eslint-disable-line no-unused-vars
      touchRippleColor, // eslint-disable-line no-unused-vars
      touchRippleOpacity, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      onKeyUp, // eslint-disable-line no-unused-vars
      onKeyDown, // eslint-disable-line no-unused-vars
      onKeyboardFocus, // eslint-disable-line no-unused-vars
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
      boxSizing: 'border-box',
      display: 'inline-block',
      fontFamily: this.context.muiTheme.baseTheme.fontFamily,
      WebkitTapHighlightColor: enhancedButton.tapHighlightColor, // Remove mobile color flashing (deprecated)
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      margin: 0,
      padding: 0,
      outline: 'none',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      /**
       * This is needed so that ripples do not bleed
       * past border radius.
       * See: http://stackoverflow.com/questions/17298739/
       * css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
       */
      transform: disableTouchRipple && disableFocusRipple ? null : 'translate(0, 0)',
      verticalAlign: href ? 'middle' : null,
    }, style);


    // Passing both background:none & backgroundColor can break due to object iteration order
    if (!mergedStyles.backgroundColor && !mergedStyles.background) {
      mergedStyles.background = 'none';
    }

    if (disabled && href) {
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
      ref: 'enhancedButton',
      disabled: disabled,
      href: href,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onKeyUp: this.handleKeyUp,
      onKeyDown: this.handleKeyDown,
      onTouchTap: this.handleTouchTap,
      tabIndex: tabIndex,
      type: type,
    };
    const buttonChildren = this.createButtonChildren();

    if (React.isValidElement(containerElement)) {
      return React.cloneElement(containerElement, buttonProps, buttonChildren);
    }

    return React.createElement(href ? 'a' : containerElement, buttonProps, buttonChildren);
  }
}

export default EnhancedButton;
