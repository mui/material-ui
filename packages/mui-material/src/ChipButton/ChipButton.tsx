'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getChipButtonUtilityClass } from './chipButtonClasses';
import useButtonBase from '../ButtonBase/useButtonBase';
import useForkRef from '../utils/useForkRef';
import { omitControlledButtonProps, TouchRippleComponent } from '../Chip/utils';
import useChipInteraction from '../Chip/useChipInteraction';
import type { ChipButtonOwnerState, ChipButtonProps, ChipButtonTypeMap } from './ChipButton.types';
import type { OverridableComponent } from '../OverridableComponent';
import { getChipActionStyles } from '../Chip/chipSharedStyles';

export type { ChipButtonOwnProps, ChipButtonProps, ChipButtonTypeMap } from './ChipButton.types';

type ChipButtonInternalProps = ChipButtonProps & {
  children?: React.ReactNode;
  insideChip?: boolean | undefined;
};

const useUtilityClasses = (ownerState: ChipButtonOwnerState) => {
  const { classes, disabled } = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled'],
  };

  return composeClasses(slots, getChipButtonUtilityClass, classes);
};

const ChipButtonRoot = styled('button', {
  name: 'MuiChipButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.root, ownerState.disabled && styles.disabled];
  },
})<{ ownerState: ChipButtonOwnerState }>(memoTheme(({ theme }) => getChipActionStyles(theme)));

/**
 * An action overlay for the `Chip` component with button semantics.
 *
 * Must be used as the `action` prop of a `Chip`:
 * ```jsx
 * <Chip label="Click me" action={<ChipButton onClick={handleClick} />} />
 * ```
 *
 * Demos:
 *
 * - [Chip](https://next.mui.com/material-ui/react-chip/)
 *
 * API:
 *
 * - [ChipButton API](https://next.mui.com/material-ui/api/chip-button/)
 */
const ChipButton = React.forwardRef(function ChipButton(
  inProps: ChipButtonProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiChipButton',
  }) as ChipButtonInternalProps;
  const {
    children,
    className,
    component,
    disabled: disabledProp,
    disableRipple = false,
    focusableWhenDisabled = true,
    insideChip = false,
    nativeButton: nativeButtonProp,
    onClick,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    // Ripple-related handlers — extracted so they only flow through getRippleHandlers
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onDragLeave,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onContextMenu,
    ...other
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (!insideChip) {
      console.error('MUI: <ChipButton> must be used as the `action` prop of a <Chip> component.');
    }
  }

  const disabled = disabledProp ?? false;

  const defaultNativeButton = typeof component !== 'string' || component === 'button';
  const nativeButton = nativeButtonProp ?? defaultNativeButton;

  const { handleBlur, rippleHandlers, enableTouchRipple, touchRippleRef } = useChipInteraction({
    disabled,
    disableRipple,
    onBlur,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onDragLeave,
    onTouchStart,
    onTouchEnd,
    onTouchMove,
    onContextMenu,
  });

  const { getButtonProps, rootRef } = useButtonBase({
    nativeButton,
    nativeButtonProp,
    internalNativeButton: defaultNativeButton,
    allowInferredHostMismatch: typeof component === 'string' || component === undefined,
    disabled,
    focusableWhenDisabled,
    tabIndex: other.tabIndex ?? 0,
  });
  const { type, ...buttonProps } = getButtonProps({
    ...omitControlledButtonProps(other),
    onClick,
    onKeyDown,
    onKeyUp,
  });
  const handleRef = useForkRef(ref, rootRef);

  const ownerState: ChipButtonOwnerState = {
    ...props,
    disabled,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ChipButtonRoot
      as={component}
      ref={handleRef}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      onFocus={onFocus}
      onBlur={handleBlur}
      type={type as 'button' | 'reset' | 'submit' | undefined}
      {...buttonProps}
      {...rippleHandlers}
    >
      {children}
      {enableTouchRipple ? <TouchRippleComponent ref={touchRippleRef} /> : null}
    </ChipButtonRoot>
  );
});

ChipButton.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * When nested inside a `Chip`, inherits from the parent's `disabled` prop.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the disabled button can receive focus.
   * @default true
   */
  focusableWhenDisabled: PropTypes.bool,
  /**
   * If `true`, the component is expected to resolve to a native `<button>` element.
   * When omitted, native button semantics are inferred when `component` is
   * `'button'` or absent.
   * Set explicitly when using a custom `component` that resolves to a native `<button>`.
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
   * @ignore
   */
  tabIndex: PropTypes.number,
} as any;

(ChipButton as any).muiName = 'ChipButton';
/**
 * An action overlay for the `Chip` component with button semantics.
 *
 * Must be used as the `action` prop of a `Chip`:
 *
 * ```jsx
 * <Chip label="Click me" action={<ChipButton onClick={handleClick} />} />
 * ```
 *
 * Demos:
 *
 * - [Chip](https://next.mui.com/material-ui/react-chip/)
 *
 * API:
 *
 * - [ChipButton API](https://next.mui.com/material-ui/api/chip-button/)
 */
export default ChipButton as OverridableComponent<ChipButtonTypeMap>;
