import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import withForwardedRef from '../utils/withForwardedRef';
import { setRef } from '../utils/reactHelpers';
import withStyles from '../styles/withStyles';
import NoSsr from '../NoSsr';
import {
  handleBlurVisible,
  isFocusVisible,
  prepare as prepareFocusVisible,
} from '../utils/focusVisible';
import TouchRipple from './TouchRipple';
import createRippleHandler from './createRippleHandler';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none',
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none', // Reset
    '-webkit-appearance': 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    '&$disabled': {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
    },
  },
  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the root element if keyboard focused. */
  focusVisible: {},
};

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
class ButtonBase extends React.Component {
  state = {};

  buttonRef = React.createRef();

  handleMouseDown = createRippleHandler(this, 'MouseDown', 'start');

  handleMouseUp = createRippleHandler(this, 'MouseUp', 'stop');

  handleMouseLeave = createRippleHandler(this, 'MouseLeave', 'stop', event => {
    if (this.state.focusVisible) {
      event.preventDefault();
    }
  });

  handleTouchStart = createRippleHandler(this, 'TouchStart', 'start');

  handleTouchEnd = createRippleHandler(this, 'TouchEnd', 'stop');

  handleTouchMove = createRippleHandler(this, 'TouchMove', 'stop');

  handleContextMenu = createRippleHandler(this, 'ContextMenu', 'stop');

  handleBlur = createRippleHandler(this, 'Blur', 'stop', event => {
    if (this.state.focusVisible) {
      handleBlurVisible(event);
      this.setState({ focusVisible: false });
    }
  });

  componentDidMount() {
    const button = this.getButtonNode();
    if (button == null) {
      throw new Error(
        [
          `Material-UI: expected an Element but found ${button}.`,
          'Please check your console for additional warnings and try fixing those.',
          'If the error persists please file an issue.',
        ].join(' '),
      );
    }
    prepareFocusVisible(button.ownerDocument);

    if (this.props.action) {
      this.props.action({
        focusVisible: () => {
          this.setState({ focusVisible: true });
          this.getButtonNode().focus();
        },
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.focusRipple &&
      !this.props.disableRipple &&
      !prevState.focusVisible &&
      this.state.focusVisible
    ) {
      this.ripple.pulsate();
    }
  }

  getButtonNode() {
    return ReactDOM.findDOMNode(this.buttonRef.current);
  }

  onRippleRef = node => {
    this.ripple = node;
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.focusVisible === 'undefined') {
      return {
        focusVisible: false,
        lastDisabled: nextProps.disabled,
      };
    }

    // The blur won't fire when the disabled state is set on a focused input.
    // We need to book keep the focused state manually.
    if (!prevState.prevState && nextProps.disabled && prevState.focusVisible) {
      return {
        focusVisible: false,
        lastDisabled: nextProps.disabled,
      };
    }

    return {
      lastDisabled: nextProps.disabled,
    };
  }

  handleKeyDown = event => {
    const { component, focusRipple, onKeyDown, onClick } = this.props;

    // Check if key is already down to avoid repeats being counted as multiple activations
    if (
      focusRipple &&
      !this.keyDown &&
      this.state.focusVisible &&
      this.ripple &&
      event.key === ' '
    ) {
      this.keyDown = true;
      event.persist();
      this.ripple.stop(event, () => {
        this.ripple.start(event);
      });
    }

    if (onKeyDown) {
      onKeyDown(event);
    }

    const button = this.getButtonNode();
    // Keyboard accessibility for non interactive elements
    if (
      event.target === event.currentTarget &&
      component &&
      component !== 'button' &&
      (event.key === ' ' || event.key === 'Enter') &&
      !(button.tagName === 'A' && button.href)
    ) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  };

  handleKeyUp = event => {
    if (this.props.focusRipple && event.key === ' ' && this.ripple && this.state.focusVisible) {
      this.keyDown = false;
      event.persist();
      this.ripple.stop(event, () => {
        this.ripple.pulsate(event);
      });
    }
    if (this.props.onKeyUp) {
      this.props.onKeyUp(event);
    }
  };

  handleFocus = event => {
    if (this.props.disabled) {
      return;
    }

    // Fix for https://github.com/facebook/react/issues/7769
    if (!this.buttonRef.current) {
      this.buttonRef.current = event.currentTarget;
    }

    if (isFocusVisible(event)) {
      this.setState({ focusVisible: true });

      if (this.props.onFocusVisible) {
        this.props.onFocusVisible(event);
      }
    }

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  render() {
    const {
      action,
      buttonRef,
      centerRipple,
      children,
      classes,
      className: classNameProp,
      component,
      disabled,
      disableRipple,
      disableTouchRipple,
      focusRipple,
      focusVisibleClassName,
      innerRef,
      onBlur,
      onFocus,
      onFocusVisible,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      tabIndex,
      TouchRippleProps,
      type,
      ...other
    } = this.props;

    const className = clsx(
      classes.root,
      {
        [classes.disabled]: disabled,
        [classes.focusVisible]: this.state.focusVisible,
        [focusVisibleClassName]: this.state.focusVisible,
      },
      classNameProp,
    );

    let ComponentProp = component;

    if (ComponentProp === 'button' && other.href) {
      ComponentProp = 'a';
    }

    const buttonProps = {};
    if (ComponentProp === 'button') {
      buttonProps.type = type;
      buttonProps.disabled = disabled;
    } else {
      buttonProps.role = 'button';
      buttonProps['aria-disabled'] = disabled;
    }

    return (
      <ComponentProp
        className={className}
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
        ref={ref => {
          setRef(this.buttonRef, ref);
          setRef(buttonRef, ref);
          setRef(innerRef, ref);
        }}
        tabIndex={disabled ? -1 : tabIndex}
        {...buttonProps}
        {...other}
      >
        {children}
        {!disableRipple && !disabled ? (
          <NoSsr>
            {/* TouchRipple is only needed client side, x2 boost on the server. */}
            <TouchRipple innerRef={this.onRippleRef} center={centerRipple} {...TouchRippleProps} />
          </NoSsr>
        ) : null}
      </ComponentProp>
    );
  }
}

ButtonBase.propTypes = {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `focusVisible()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: PropTypes.func,
  /**
   * Use that property to pass a ref callback to the native button component.
   * @deprecated Use `ref` instead
   */
  buttonRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * If `true`, the ripples will be centered.
   * They won't start at the cursor interaction position.
   */
  centerRipple: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * If `true`, the base button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect will be disabled.
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * `disableRipple` must also be `false`.
   */
  focusRipple: PropTypes.bool,
  /**
   * This property can help a person know which element has the keyboard focus.
   * The class name will be applied when the element gain the focus through a keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   * from `withForwardRef`
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
  /**
   * @ignore
   */
  role: PropTypes.string,
  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Properties applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * Used to control the button's purpose.
   * This property passes the value to the `type` attribute of the native button component.
   */
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
};

ButtonBase.defaultProps = {
  centerRipple: false,
  component: 'button',
  disableRipple: false,
  disableTouchRipple: false,
  focusRipple: false,
  tabIndex: 0,
  type: 'button',
};

export default withStyles(styles, { name: 'MuiButtonBase' })(withForwardedRef(ButtonBase));
