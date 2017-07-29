// @flow weak
import React, { Component } from 'react';
import type { Element } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import keycode from 'keycode';
import createStyleSheet from '../styles/createStyleSheet';
import withStyles from '../styles/withStyles';
import { listenForFocusKeys, detectKeyboardFocus, focusKeyPressed } from '../utils/keyboardFocus';
import TouchRipple from './TouchRipple';
import createRippleHandler from './createRippleHandler';

export const styleSheet = createStyleSheet('MuiButtonBase', theme => ({
  root: {
    position: 'relative',
    // Remove Gray Highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    outline: 'none',
    border: 0,
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
  },
  disabled: {
    cursor: 'default',
  },
}));

type DefaultProps = {
  centerRipple: boolean,
  focusRipple: boolean,
  disableRipple: boolean,
  tabIndex: string,
  type: string,
};

type Props = DefaultProps & {
  centerRipple?: boolean,
  /**
   * The content of the component.
   */
  children?: Element<*>,
  /**
   * Useful to extend the style applied to components.
   */
  classes: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component?: string | Function,
  /**
   * If `true`, the base button will be disabled.
   */
  disabled?: boolean,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple?: boolean,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * `disableRipple` must also be `false`.
   */
  focusRipple?: boolean,
  keyboardFocusedClassName?: string,
  onBlur?: Function,
  onClick?: Function,
  onFocus?: Function,
  onKeyboardFocus?: Function,
  onKeyDown?: Function,
  onKeyUp?: Function,
  onMouseDown?: Function,
  onMouseLeave?: Function,
  onMouseUp?: Function,
  onTouchEnd?: Function,
  onTouchStart?: Function,
  role?: string,
  tabIndex?: string,
  type: string,
};

type State = {
  keyboardFocused: boolean,
};

/**
 * @ignore - internal component.
 */
class ButtonBase extends Component<DefaultProps, Props, State> {
  static defaultProps: DefaultProps = {
    centerRipple: false,
    focusRipple: false,
    disableRipple: false,
    tabIndex: '0',
    type: 'button',
  };

  state: State = {
    keyboardFocused: false,
  };

  componentDidMount() {
    listenForFocusKeys();
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      this.props.focusRipple &&
      nextState.keyboardFocused &&
      !this.state.keyboardFocused &&
      !this.props.disableRipple
    ) {
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

  renderRipple() {
    if (!this.props.disableRipple && !this.props.disabled) {
      return (
        <TouchRipple
          innerRef={node => {
            this.ripple = node;
          }}
          center={this.props.centerRipple}
        />
      );
    }

    return null;
  }

  render() {
    const {
      centerRipple,
      children,
      classes,
      className: classNameProp,
      component,
      disabled,
      disableRipple,
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
      tabIndex,
      type,
      ...other
    } = this.props;

    const className = classNames(
      classes.root,
      {
        [classes.disabled]: disabled,
        // $FlowFixMe
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
        {this.renderRipple()}
      </ComponentProp>
    );
  }
}

export default withStyles(styleSheet)(ButtonBase);
