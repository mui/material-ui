// @flow weak

import React from 'react';
import type { ElementType, Node } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import keycode from 'keycode';
import withStyles from '../styles/withStyles';
import { listenForFocusKeys, detectKeyboardFocus, focusKeyPressed } from '../utils/keyboardFocus';
import TouchRipple from './TouchRipple';
import createRippleHandler from './createRippleHandler';

export const styles = (theme: Object) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Remove grey highlight
    WebkitTapHighlightColor: theme.palette.common.transparent,
    backgroundColor: 'transparent', // Reset default value
    outline: 'none',
    border: 0,
    borderRadius: 0,
    cursor: 'pointer',
    userSelect: 'none',
    appearance: 'none',
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
  },
  disabled: {
    pointerEvents: 'none', // Disable link interactions
    cursor: 'default',
  },
});

type ProvidedProps = {
  classes: Object,
};

export type Props = {
  /**
   * If `true`, the ripples will be centered.
   * They won't start at the cursor interaction position.
   */
  centerRipple?: boolean,
  /**
   * The content of the component.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   * The default value is a `button`.
   */
  component?: ElementType,
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
  /**
   * The CSS class applied while the component is keyboard focused.
   */
  keyboardFocusedClassName?: string,
  /**
   * @ignore
   */
  onBlur?: Function,
  /**
   * @ignore
   */
  onClick?: Function,
  /**
   * @ignore
   */
  onFocus?: Function,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onKeyboardFocus?: (event: SyntheticEvent<>) => void,
  /**
   * @ignore
   */
  onKeyDown?: Function,
  /**
   * @ignore
   */
  onKeyUp?: Function,
  /**
   * @ignore
   */
  onMouseDown?: Function,
  /**
   * @ignore
   */
  onMouseLeave?: Function,
  /**
   * @ignore
   */
  onMouseUp?: Function,
  /**
   * @ignore
   */
  onTouchEnd?: Function,
  /**
   * @ignore
   */
  onTouchMove?: Function,
  /**
   * @ignore
   */
  onTouchStart?: Function,
  /**
   * @ignore
   */
  role?: string,
  /**
   * Use that property to pass a ref callback to the root component.
   */
  rootRef?: Function,
  /**
   * @ignore
   */
  tabIndex?: number | string,
  /**
   * @ignore
   */
  type: string,
};

type State = {
  keyboardFocused: boolean,
};

class ButtonBase extends React.Component<ProvidedProps & Props, State> {
  static defaultProps = {
    centerRipple: false,
    focusRipple: false,
    disableRipple: false,
    tabIndex: 0,
    type: 'button',
  };

  state = {
    keyboardFocused: false,
  };

  componentDidMount() {
    this.button = findDOMNode(this);
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
    this.button = null;
    clearTimeout(this.keyboardFocusTimeout);
  }

  onKeyboardFocusHandler = event => {
    this.keyDown = false;
    this.setState({ keyboardFocused: true });

    if (this.props.onKeyboardFocus) {
      this.props.onKeyboardFocus(event);
    }
  };

  ripple = null;
  keyDown = false; // Used to help track keyboard activation keyDown
  button = null;
  keyboardFocusTimeout = null;
  keyboardFocusCheckTime = 30;
  keyboardFocusMaxCheckTimes = 5;

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

  handleTouchMove = createRippleHandler(this, 'TouchEnd', 'stop');

  handleBlur = createRippleHandler(this, 'Blur', 'stop', () => {
    clearTimeout(this.keyboardFocusTimeout);
    focusKeyPressed(false);
    this.setState({ keyboardFocused: false });
  });

  handleFocus = event => {
    if (this.props.disabled) {
      return;
    }

    // Fix for https://github.com/facebook/react/issues/7769
    if (!this.button) {
      this.button = event.currentTarget;
    }

    event.persist();
    const keyboardFocusCallback = this.onKeyboardFocusHandler.bind(this, event);
    detectKeyboardFocus(this, this.button, keyboardFocusCallback);

    if (this.props.onFocus) {
      this.props.onFocus(event);
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
      onTouchMove,
      onTouchStart,
      rootRef,
      tabIndex,
      type,
      ...other
    } = this.props;

    const className = classNames(
      classes.root,
      {
        [classes.disabled]: disabled,
        [keyboardFocusedClassName || '']: this.state.keyboardFocused,
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
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onMouseDown={this.handleMouseDown}
        onMouseLeave={this.handleMouseLeave}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        tabIndex={disabled ? -1 : tabIndex}
        className={className}
        {...buttonProps}
        {...other}
        ref={rootRef}
      >
        {children}
        {this.renderRipple()}
      </ComponentProp>
    );
  }
}

export default withStyles(styles, { name: 'MuiButtonBase' })(ButtonBase);
