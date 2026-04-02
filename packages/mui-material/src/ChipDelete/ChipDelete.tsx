'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import CancelIcon from '../internal/svg-icons/Cancel';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import useButtonBase from '../ButtonBase/useButtonBase';
import useForkRef from '../utils/useForkRef';
import ChipContext from '../Chip/ChipContext';
import { isDeleteKeyboardEvent, omitControlledButtonProps } from '../Chip/utils';
import { getChipDeleteUtilityClass } from './chipDeleteClasses';
import { getChipDeleteStyles } from '../Chip/chipSharedStyles';
import type { ChipDeleteProps, ChipDeleteOwnerState, ChipDeleteTypeMap } from './ChipDelete.types';
import type { OverridableComponent } from '../OverridableComponent';

export type {
  ChipDeleteOwnProps,
  ChipDeleteProps,
  ChipDeleteOwnerState,
  ChipDeleteTypeMap,
} from './ChipDelete.types';

const useUtilityClasses = (ownerState: ChipDeleteOwnerState) => {
  const { classes, disabled, size, color, variant } = ownerState;

  const slots = {
    root: [
      'root',
      variant,
      disabled && 'disabled',
      `size${capitalize(size)}`,
      `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getChipDeleteUtilityClass, classes);
};

const ChipDeleteRoot = styled('button', {
  name: 'MuiChipDelete',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { color, size, variant, disabled } = ownerState;

    return [
      styles.root,
      styles[`size${capitalize(size)}`],
      styles[`color${capitalize(color)}`],
      styles[variant],
      disabled && styles.disabled,
    ];
  },
})<{ ownerState: ChipDeleteOwnerState }>(memoTheme(({ theme }) => getChipDeleteStyles(theme)));

/**
 * A chip-aware delete button, designed to be used as an adornment of `Chip`.
 *
 * When rendered inside a `Chip`, it inherits `disabled`, `color`, `size`, and `variant`
 * from the chip context.
 *
 * Demos:
 *
 * - [Chip](https://next.mui.com/material-ui/react-chip/)
 *
 * API:
 *
 * - [ChipDelete API](https://next.mui.com/material-ui/api/chip-delete/)
 */
const ChipDelete = React.forwardRef(function ChipDelete(
  inProps: ChipDeleteProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiChipDelete' });
  const {
    className,
    component,
    disabled: disabledProp,
    focusableWhenDisabled = true,
    icon: iconProp,
    nativeButton: nativeButtonProp,
    label = 'Remove',
    onClick,
    onDelete,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    ...other
  } = props;

  const chipContext = React.useContext(ChipContext);

  if (process.env.NODE_ENV !== 'production') {
    if (chipContext.variant === undefined) {
      console.error(
        'MUI: <ChipDelete> is designed to be used inside a <Chip> component. ' +
          'It inherits color, size, and variant from the Chip context.',
      );
    }
  }

  const disabled = disabledProp ?? chipContext.disabled ?? false;
  const color = chipContext.color ?? 'default';
  const size = chipContext.size ?? 'medium';
  const variant = chipContext.variant ?? 'filled';

  const defaultNativeButton = typeof component !== 'string' || component === 'button';
  const nativeButton = nativeButtonProp ?? defaultNativeButton;

  const { getButtonProps, rootRef } = useButtonBase({
    nativeButton,
    nativeButtonProp,
    internalNativeButton: defaultNativeButton,
    allowInferredHostMismatch: typeof component === 'string' || component === undefined,
    disabled,
    focusableWhenDisabled,
    tabIndex: other.tabIndex ?? 0,
  });
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    onClick?.(event);
    onDelete?.(event);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
    onKeyDown?.(event);
    if (isDeleteKeyboardEvent(event)) {
      event.preventDefault();
      event.stopPropagation();
      onDelete?.(event);
    }
  };

  const { type, ...buttonProps } = getButtonProps({
    ...omitControlledButtonProps(other),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp,
  });
  const handleRef = useForkRef(ref, rootRef);

  const ownerState: ChipDeleteOwnerState = {
    ...props,
    color,
    size,
    variant,
    disabled,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ChipDeleteRoot
      as={component}
      ref={handleRef}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      aria-label={label}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type as 'button' | 'reset' | 'submit' | undefined}
      {...buttonProps}
    >
      {iconProp || <CancelIcon fontSize="inherit" />}
    </ChipDeleteRoot>
  );
});

ChipDelete.propTypes /* remove-proptypes */ = {
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
   * When inside a `Chip`, inherits the chip's `disabled` state.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the disabled delete button can receive focus.
   * @default true
   */
  focusableWhenDisabled: PropTypes.bool,
  /**
   * Override the default delete icon element.
   */
  icon: PropTypes.element,
  /**
   * The accessible label for the delete button.
   * @default 'Remove'
   */
  label: PropTypes.string,
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
   * Callback fired when the delete action is triggered.
   * This fires on click, keyboard activation (Enter/Space), and when
   * Backspace or Delete is pressed while the component has focus.
   */
  onDelete: PropTypes.func,
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

(ChipDelete as any).muiName = 'ChipDelete';
/**
 * A chip-aware delete button, designed to be used as an adornment of `Chip`.
 *
 * When rendered inside a `Chip`, it inherits `disabled`, `color`, `size`, and `variant`
 * from the chip context.
 *
 * Demos:
 *
 * - [Chip](https://next.mui.com/material-ui/react-chip/)
 *
 * API:
 *
 * - [ChipDelete API](https://next.mui.com/material-ui/api/chip-delete/)
 */
export default ChipDelete as OverridableComponent<ChipDeleteTypeMap>;
