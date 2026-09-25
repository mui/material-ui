'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import refType from '@mui/utils/refType';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import { useDefaultProps } from '../DefaultPropsProvider';
import useForkRef from '../utils/useForkRef';
import useButtonBase from './useButtonBase';
import { getButtonBaseUtilityClass } from './buttonBaseClasses';
import ButtonSurface, { ButtonBaseRoot } from './ButtonSurface';

export { ButtonBaseRoot };

// The state classes, which the surface does not emit because it does not track
// the state. `MuiButtonBase-root` comes from the surface.
const useUtilityClasses = (ownerState, focusVisibleClassName) => {
  const { disabled, focusVisible, suppressFocusVisible, classes } = ownerState;

  const slots = {
    root: [disabled && 'disabled', focusVisible && !suppressFocusVisible && 'focusVisible'],
  };

  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);

  if (focusVisible && !suppressFocusVisible && focusVisibleClassName) {
    composedClasses.root = clsx(composedClasses.root, focusVisibleClassName);
  }

  return composedClasses;
};

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 *
 * It is `useButtonBase` for the semantics and `ButtonSurface` for the look.
 * Components that have their own logic half, like `Button`, call the hook
 * themselves and render the surface directly, rather than nesting this.
 */
const ButtonBase = React.forwardRef(function ButtonBase(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiButtonBase' });
  const {
    action,
    centerRipple = false,
    children,
    classes,
    className,
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    /* eslint-disable react/prop-types */
    // replaces internal handling in Chip, other components can opt-in individually to use this in the future
    focusableWhenDisabled,
    // escape hatch to suppress the focusVisible state and callback
    // used by anchored <Menu>s to to suppress focus visible styling when opened with a pointer
    suppressFocusVisible = false,
    // private prop to allow native vs non-native button props to be resolved before mount
    internalNativeButton: internalNativeButtonProp,
    // private prop to let a parent (like SwitchBase) control its own focus visible style
    internalDisabledThemeFocusVisible = false,
    /* eslint-enable react/prop-types */
    LinkComponent = 'a',
    nativeButton: nativeButtonProp,
    onBlur,
    onClick: onClickProp,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type,
    ...other
  } = props;

  const isLink = Boolean(other.href || other.to);
  const hasFormAction = Boolean(other.formAction);

  let ComponentProp = component;
  if (ComponentProp === 'button' && isLink) {
    ComponentProp = LinkComponent;
  }

  const internalNativeButton =
    typeof ComponentProp === 'string'
      ? ComponentProp === 'button'
      : (internalNativeButtonProp ?? false);
  const nativeButton = nativeButtonProp ?? internalNativeButton;

  const {
    getButtonProps,
    rootRef: buttonRef,
    focusVisible,
    setFocusVisible,
  } = useButtonBase({
    nativeButton,
    nativeButtonProp,
    internalNativeButton,
    allowInferredHostMismatch: isLink || typeof ComponentProp === 'string',
    disabled,
    type,
    hasFormAction,
    tabIndex,
    suppressFocusVisible,
    onFocusVisible,
  });

  const {
    onClick,
    onKeyDown,
    onKeyUp,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseLeave: handleMouseLeave,
    ...buttonProps
  } = getButtonProps({
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    onFocus,
    onBlur,
    onMouseLeave,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current.focus();
      },
    }),
    [buttonRef, setFocusVisible],
  );

  const linkProps = {};
  if (isLink) {
    linkProps.tabIndex = disabled ? -1 : tabIndex;
    if (disabled) {
      linkProps['aria-disabled'] = disabled;
    }
    linkProps.type = type;
  }

  const handleRef = useForkRef(ref, buttonRef);

  const ownerState = {
    ...props,
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    suppressFocusVisible,
    tabIndex,
    focusVisible,
    internalDisabledThemeFocusVisible,
  };

  const stateClasses = useUtilityClasses(ownerState, focusVisibleClassName);

  return (
    <ButtonSurface
      component={ComponentProp}
      classes={classes}
      className={clsx(stateClasses.root, className)}
      ownerState={ownerState}
      centerRipple={centerRipple}
      disableRipple={disableRipple}
      disableTouchRipple={disableTouchRipple}
      focusRipple={focusRipple}
      TouchRippleProps={TouchRippleProps}
      touchRippleRef={touchRippleRef}
      ref={handleRef}
      onBlur={handleBlur}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onDragLeave={onDragLeave}
      onFocus={handleFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onMouseDown={onMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={onMouseUp}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      onTouchStart={onTouchStart}
      {...(isLink ? linkProps : buttonProps)}
      {...other}
    >
      {children}
    </ButtonSurface>
  );
});

ButtonBase.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  formAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * @ignore
   */
  href: PropTypes /* @typescript-to-proptypes-ignore */.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: PropTypes.elementType,
  /**
   * Whether the custom component is expected to render a native `<button>` element
   * when passing a React component to the `component` or `slots` prop.
   */
  nativeButton: PropTypes.bool,
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
  onContextMenu: PropTypes.func,
  /**
   * @ignore
   */
  onDragLeave: PropTypes.func,
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        pulsate: PropTypes.func.isRequired,
        start: PropTypes.func.isRequired,
        stop: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * The HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
   * attribute applied to `button` and `a` elements.
   * Ignored when rendering non-native buttons.
   * @default 'button'
   */
  type: PropTypes.string,
};

export default ButtonBase;
