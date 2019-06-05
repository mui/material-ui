import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { elementTypeAcceptingRef } from '@material-ui/utils';
import { useForkRef } from '../utils/reactHelpers';
import withStyles from '../styles/withStyles';
import NoSsr from '../NoSsr';
import { useIsFocusVisible } from '../utils/focusVisible';
import TouchRipple from './TouchRipple';

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

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
/**
 * https://github.com/facebook/react/issues/14099#issuecomment-440013892
 *
 * @param {function} fn
 */
function useEventCallback(fn) {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useCallback(event => (0, ref.current)(event), []);
}

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
const ButtonBase = React.forwardRef(function ButtonBase(props, ref) {
  const {
    action,
    buttonRef: buttonRefProp,
    centerRipple = false,
    children,
    classes,
    className: classNameProp,
    component = 'button',
    disabled,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    onBlur,
    onClick,
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
    tabIndex = 0,
    TouchRippleProps,
    type = 'button',
    ...other
  } = props;

  const buttonRef = React.useRef(null);
  function getButtonNode() {
    // #StrictMode ready
    return ReactDOM.findDOMNode(buttonRef.current);
  }

  const rippleRef = React.useRef(null);

  const [focusVisible, setFocusVisible] = React.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  const { isFocusVisible, onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current.focus();
      },
    }),
    [],
  );

  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible]);

  function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
    return useEventCallback(event => {
      if (eventCallback) {
        eventCallback(event);
      }

      const ignore = event.defaultPrevented || skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }

      return true;
    });
  }

  const handleMouseDown = useRippleHandler('start', onMouseDown);
  const handleMouseUp = useRippleHandler('stop', onMouseUp);
  const handleMouseLeave = useRippleHandler('stop', event => {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  const handleTouchStart = useRippleHandler('start', onTouchStart);
  const handleTouchEnd = useRippleHandler('stop', onTouchEnd);
  const handleTouchMove = useRippleHandler('stop', onTouchMove);
  const handleBlur = useRippleHandler(
    'stop',
    event => {
      if (focusVisible) {
        onBlurVisible(event);
        setFocusVisible(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    },
    false,
  );
  const handleFocus = useEventCallback(event => {
    if (disabled) {
      return;
    }

    // Fix for https://github.com/facebook/react/issues/7769
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }

    if (isFocusVisible(event)) {
      setFocusVisible(true);

      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }

    if (onFocus) {
      onFocus(event);
    }
  });

  const keydownRef = React.useRef(false);
  const handleKeyDown = useEventCallback(event => {
    // Check if key is already down to avoid repeats being counted as multiple activations
    if (
      focusRipple &&
      !keydownRef.current &&
      focusVisible &&
      rippleRef.current &&
      event.key === ' '
    ) {
      keydownRef.current = true;
      event.persist();
      rippleRef.current.stop(event, () => {
        rippleRef.current.start(event);
      });
    }

    if (onKeyDown) {
      onKeyDown(event);
    }

    const button = getButtonNode();
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
  });
  const handleKeyUp = useEventCallback(event => {
    if (focusRipple && event.key === ' ' && rippleRef.current && focusVisible) {
      keydownRef.current = false;
      event.persist();
      rippleRef.current.stop(event, () => {
        rippleRef.current.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
  });

  const className = clsx(
    classes.root,
    {
      [classes.disabled]: disabled,
      [classes.focusVisible]: focusVisible,
      [focusVisibleClassName]: focusVisible,
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

  const handleUserRef = useForkRef(buttonRefProp, ref);
  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(handleUserRef, handleOwnRef);

  return (
    <ComponentProp
      className={className}
      onBlur={handleBlur}
      onClick={onClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={handleRef}
      tabIndex={disabled ? -1 : tabIndex}
      {...buttonProps}
      {...other}
    >
      {children}
      {!disableRipple && !disabled ? (
        <NoSsr>
          {/* TouchRipple is only needed client side, x2 boost on the server. */}
          <TouchRipple ref={rippleRef} center={centerRipple} {...TouchRippleProps} />
        </NoSsr>
      ) : null}
    </ComponentProp>
  );
});

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
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `focusVisibleClassName`.
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

export default withStyles(styles, { name: 'MuiButtonBase' })(ButtonBase);
