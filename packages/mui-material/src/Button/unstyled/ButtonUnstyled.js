'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import isHostComponent from '@mui/utils/isHostComponent';
import refType from '@mui/utils/refType';
// Imported directly rather than through `../../utils`: that barrel re-exports
// `memoTheme` and `SvgIcon`, so importing one thing from it pulls in styling.
import useId from '../../utils/useId';
import useForkRef from '../../utils/useForkRef';
import useSlot from '../../utils/useSlot';
import useButtonBase from '../../ButtonBase/useButtonBase';
import { getButtonUtilityClass } from '../buttonClasses';
import buttonSlots from './buttonSlots';

const slotDefs = buttonSlots.slots;

const useUtilityClasses = (ownerState, appearanceClasses) => {
  const { disabled, focusVisible, loading, suppressFocusVisible, classes } = ownerState;

  const slots = {
    root: [
      'root',
      // Global state classes. This layer tracks the state, so it emits them,
      // whatever is in the root slot.
      disabled && 'disabled',
      focusVisible && !suppressFocusVisible && 'focusVisible',
      loading && 'loading',
    ],
    startIcon: ['icon', 'startIcon'],
    endIcon: ['icon', 'endIcon'],
    loadingIndicator: ['loadingIndicator'],
    loadingWrapper: ['loadingWrapper'],
    loadingIconPlaceholder: ['loadingIconPlaceholder'],
  };

  // Class keys contributed by the styling layer, appended per slot.
  if (appearanceClasses) {
    Object.entries(appearanceClasses).forEach(([slotName, keys]) => {
      if (slots[slotName]) {
        slots[slotName].push(...keys);
      }
    });
  }

  const composedClasses = composeClasses(slots, getButtonUtilityClass, classes);

  return {
    ...classes, // forward the focused, disabled, etc. classes to the root slot
    ...composedClasses,
  };
};

const ButtonUnstyled = React.forwardRef(function Button(props, ref) {
  const {
    action,
    appearance,
    children,
    // Read from `ownerState` by `useUtilityClasses`; destructured only to keep
    // it out of the spread.
    classes: classesProp,
    component = 'button',
    className,
    slots = {},
    slotProps = {},
    disabled = false,
    endIcon: endIconProp,
    /* eslint-disable react/prop-types */
    // replaces internal handling in Chip, other components can opt-in individually to use this in the future
    focusableWhenDisabled,
    // private prop to allow native vs non-native button props to be resolved before mount
    internalNativeButton: internalNativeButtonProp,
    // escape hatch to suppress the focusVisible state and callback
    suppressFocusVisible = false,
    /* eslint-enable react/prop-types */
    focusVisibleClassName,
    id: idProp,
    LinkComponent = 'a',
    loading = null,
    loadingIndicator: loadingIndicatorProp,
    nativeButton: nativeButtonProp,
    onBlur,
    onClick: onClickProp,
    onFocus,
    onFocusVisible,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    onMouseLeave,
    startIcon: startIconProp,
    tabIndex = 0,
    type,
    ...other
  } = props;

  // Loading is a form of disabled: the button must not activate, and it reads
  // as disabled to assistive technology.
  const isDisabled = disabled || loading;

  const isLink = Boolean(other.href || other.to);
  const hasFormAction = Boolean(other.formAction);

  let ComponentProp = component;
  if (ComponentProp === 'button' && isLink) {
    ComponentProp = LinkComponent;
  }

  const internalNativeButton =
    typeof ComponentProp === 'string'
      ? ComponentProp === 'button'
      : (internalNativeButtonProp ?? true);
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
    disabled: isDisabled,
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
    linkProps.tabIndex = isDisabled ? -1 : tabIndex;
    if (isDisabled) {
      linkProps['aria-disabled'] = isDisabled;
    }
    linkProps.type = type;
  }

  const handleRef = useForkRef(ref, buttonRef);

  const loadingId = useId(idProp);

  const ownerState = {
    ...props,
    component,
    disabled: isDisabled,
    focusVisible,
    loading,
    suppressFocusVisible,
    tabIndex,
    type,
    ...appearance?.ownerState,
  };

  const classes = useUtilityClasses(ownerState, appearance?.classes);

  const externalForwardedProps = { slots, slotProps };

  // A host element root is the element, so it takes neither `component` nor
  // `as`; both would land on the DOM. A component root renders an element of
  // its own, so `component` has to reach it rather than replace it.
  const rootIsHost = isHostComponent(slots.root ?? slotDefs.root.elementType);

  const [RootSlot, rootProps] = useSlot('root', {
    ref: handleRef,
    elementType: rootIsHost ? ComponentProp : slotDefs.root.elementType,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      ...(rootIsHost ? {} : { component: ComponentProp }),
    },
    shouldForwardComponentProp: !rootIsHost,
    ownerState,
    className: [
      classes.root,
      focusVisible && !suppressFocusVisible && focusVisibleClassName,
      className,
    ],
    additionalProps: {
      id: loading ? loadingId : idProp,
      onClick,
      onKeyDown,
      onKeyUp,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onMouseLeave: handleMouseLeave,
      ...(isLink ? linkProps : buttonProps),
    },
  });

  const [StartIconSlot, startIconProps] = useSlot('startIcon', {
    elementType: slotDefs.startIcon.elementType,
    externalForwardedProps,
    ownerState,
    className: [classes.startIcon, !startIconProp && classes.loadingIconPlaceholder],
  });

  const [EndIconSlot, endIconProps] = useSlot('endIcon', {
    elementType: slotDefs.endIcon.elementType,
    externalForwardedProps,
    ownerState,
    className: [classes.endIcon, !endIconProp && classes.loadingIconPlaceholder],
  });

  const [LoadingIndicatorSlot, loadingIndicatorProps] = useSlot('loadingIndicator', {
    elementType: slotDefs.loadingIndicator.elementType,
    externalForwardedProps,
    ownerState,
    className: classes.loadingIndicator,
    additionalProps: { 'aria-labelledby': loadingId },
  });

  // An icon slot with no icon in it is a spacer, there to keep the label from
  // shifting when the indicator appears. Which side needs one is an appearance
  // question, so both are rendered and marked, and the styling layer collapses
  // the one it does not want.
  const startIcon = (startIconProp || loading) && (
    <StartIconSlot {...startIconProps}>{startIconProp || <span />}</StartIconSlot>
  );

  const endIcon = (endIconProp || loading) && (
    <EndIconSlot {...endIconProps}>{endIconProp || <span />}</EndIconSlot>
  );

  const loader =
    typeof loading === 'boolean' ? (
      // use plain HTML span to minimize the runtime overhead
      <span className={classes.loadingWrapper} style={{ display: 'contents' }}>
        {loading && (
          <LoadingIndicatorSlot {...loadingIndicatorProps}>
            {loadingIndicatorProp}
          </LoadingIndicatorSlot>
        )}
      </span>
    ) : null;

  return (
    <RootSlot {...rootProps}>
      {startIcon}
      {loader}
      {children}
      {endIcon}
    </RootSlot>
  );
});

ButtonUnstyled.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * Contributed by the styling layer. See `createAppearance`.
   */
  appearance: PropTypes.shape({
    classes: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    ownerState: PropTypes.object,
  }),
  /**
   * Components used for each slot inside, supplied by the styling layer.
   * @default {}
   */
  slots: PropTypes.object,
  /**
   * Props forwarded to each slot inside.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * Element placed after the children.
   */
  endIcon: PropTypes.node,
  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * If `true`, the loading indicator is visible and the button is disabled.
   * If `true | false`, the loading wrapper is always rendered before the children to prevent [Google Translation Crash](https://github.com/mui/material-ui/issues/27853).
   * @default null
   */
  loading: PropTypes.bool,
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default, it renders a `CircularProgress` that is labeled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @ignore
   */
  type: PropTypes.string,
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'outlined', 'text']),
    PropTypes.string,
  ]),
  /**
   * A ref for imperative actions. It supports `focusVisible()`.
   */
  action: refType,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: PropTypes.elementType,
  /**
   * Whether the custom component is expected to render a native `<button>`.
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
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component is focused with a keyboard.
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
  onMouseLeave: PropTypes.func,
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
};

export default ButtonUnstyled;
