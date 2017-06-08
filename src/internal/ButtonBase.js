// @flow weak
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import keycode from 'keycode';
import customPropTypes from '../utils/customPropTypes';
import { listenForFocusKeys, detectKeyboardFocus, focusKeyPressed } from '../utils/keyboardFocus';
import TouchRipple from './TouchRipple';
import createRippleHandler from './createRippleHandler';

export const styleSheet = createStyleSheet('MuiButtonBase', {
  root: {
    position: 'relative',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    outline: 'none',
    border: 0,
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    textDecoration: 'none',
  },
  disabled: {
    cursor: 'default',
  },
});

/**
 * @ignore - internal component.
 */
class ButtonBase extends Component {
  static defaultProps = {
    centerRipple: false,
    focusRipple: false,
    ripple: true,
    tabIndex: '0',
    type: 'button',
  };

  state = {
    keyboardFocused: false,
  };

  componentDidMount() {
    listenForFocusKeys();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.focusRipple && nextState.keyboardFocused && !this.state.keyboardFocused) {
      this.ripple.pulsate();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.keyboardFocusTimeout);
  }

  ripple = null;
  keyDown = false; // Used to help track keyboard activation keyDown
  button = null;
  keyboardFocusTimeout = null;
  keyboardFocusCheckTime = 40;
  keyboardFocusMaxCheckTimes = 5;

  focus = () => {
    this.button.focus();
  };

  handleKeyDown = event => {
    const { component, focusRipple, onKeyDown, onClick } = this.props;
    const key = keycode(event);

    // Check if key is already down to avoid repeats being counted as multiple activations
    if (focusRipple && !this.keyDown && this.state.keyboardFocused && key === 'space') {
      this.keyDown = true;
      event.persist();
      this.ripple.stop(event, () => {
        this.ripple.start(event);
      });
    }

    if (onKeyDown) {
      onKeyDown(event);
    }

    // Keyboard accessibility for non interactive elements
    if (
      event.target === this.button &&
      onClick &&
      component &&
      component !== 'a' &&
      component !== 'button' &&
      (key === 'space' || key === 'enter')
    ) {
      event.preventDefault();
      onClick(event);
    }
  };

  handleKeyUp = event => {
    if (this.props.focusRipple && keycode(event) === 'space' && this.state.keyboardFocused) {
      this.keyDown = false;
      event.persist();
      this.ripple.stop(event, () => this.ripple.pulsate(event));
    }
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  };

  handleMouseDown = createRippleHandler(this, 'MouseDown', 'start', () => {
    clearTimeout(this.keyboardFocusTimeout);
    focusKeyPressed(false);
    if (this.state.keyboardFocused) {
      this.setState({ keyboardFocused: false });
    }
  });

  handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop');

  handleMouseLeave = createRippleHandler(this, 'MouseLeave', 'stop', event => {
    if (this.state.keyboardFocused) {
      event.preventDefault();
    }
  });

  handleTouchStart = createRippleHandler(this, 'TouchStart', 'start');
  handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop');

  handleBlur = createRippleHandler(this, 'Blur', 'stop', () => {
    this.setState({ keyboardFocused: false });
  });

  handleFocus = event => {
    if (this.props.disabled) {
      return;
    }

    event.persist();

    const keyboardFocusCallback = this.onKeyboardFocusHandler.bind(this, event);
    detectKeyboardFocus(this, findDOMNode(this.button), keyboardFocusCallback);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  onKeyboardFocusHandler = event => {
    this.keyDown = false;
    this.setState({ keyboardFocused: true });

    if (this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(event);
    }
  };

  renderRipple(ripple, center) {
    if (ripple === true && !this.props.disabled) {
      return (
        <TouchRipple
          ref={node => {
            this.ripple = node;
          }}
          center={center}
        />
      );
    }

    return null;
  }

  render() {
    const {
      centerRipple,
      children,
      className: classNameProp,
      component,
      disabled,
      focusRipple,
      keyboardFocusedClassName,
      onBlur,
      onFocus,
      onKeyboardFocus,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchStart,
      ripple,
      tabIndex,
      type,
      ...other
    } = this.props;

    const classes = this.context.styleManager.render(styleSheet);
    const className = classNames(
      classes.root,
      {
        [classes.disabled]: disabled,
        [keyboardFocusedClassName]: keyboardFocusedClassName && this.state.keyboardFocused,
      },
      classNameProp,
    );

    const buttonProps = {};

    let ComponentProp = component;

    if (!ComponentProp) {
      if (other.href) {
        ComponentProp = 'a';
      } else {
        ComponentProp = 'button';
      }
    }

    if (ComponentProp === 'button') {
      buttonProps.type = type || 'button';
    }

    if (ComponentProp !== 'a') {
      buttonProps.role = buttonProps.role || 'button';
      buttonProps.disabled = disabled;
    }

    return (
      <ComponentProp
        ref={node => {
          this.button = node;
        }}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
        onTouchStart={this.handleTouchStart}
        tabIndex={disabled ? '-1' : tabIndex}
        className={className}
        {...buttonProps}
        {...other}
      >
        {children}
        {this.renderRipple(ripple, centerRipple)}
      </ComponentProp>
    );
  }
}

ButtonBase.propTypes = {
  centerRipple: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * If `true`, the base button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * `ripple` must also be true.
   */
  focusRipple: PropTypes.bool,
  keyboardFocusedClassName: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyboardFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  /**
   * If `false`, the base button will not have a ripple when clicked.
   */
  ripple: PropTypes.bool,
  role: PropTypes.string,
  tabIndex: PropTypes.string,
  type: PropTypes.string,
};

ButtonBase.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default ButtonBase;
