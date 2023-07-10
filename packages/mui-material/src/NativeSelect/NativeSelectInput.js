import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import capitalize from '../utils/capitalize';
import nativeSelectClasses, { getNativeSelectUtilityClasses } from './nativeSelectClasses';
import styled, { rootShouldForwardProp } from '../styles/styled';

const useUtilityClasses = (ownerState) => {
  const { classes, variant, disabled, multiple, open, error } = ownerState;

  const slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', `icon${capitalize(variant)}`, open && 'iconOpen', disabled && 'disabled'],
  };

  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};

export const nativeSelectSelectStyles = ({ ownerState, theme }) => ({
  MozAppearance: 'none', // Reset
  WebkitAppearance: 'none', // Reset
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: 'none',
  borderRadius: 0, // Reset
  cursor: 'pointer',
  '&:focus': {
    // Show that it's not an text input
    ...(theme.vars
      ? { backgroundColor: `rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.05)` }
      : {
          backgroundColor:
            theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
        }),
    borderRadius: 0, // Reset Chrome style
  },
  // Remove IE11 arrow
  '&::-ms-expand': {
    display: 'none',
  },
  [`&.${nativeSelectClasses.disabled}`]: {
    cursor: 'default',
  },
  '&[multiple]': {
    height: 'auto',
  },
  '&:not([multiple]) option, &:not([multiple]) optgroup': {
    backgroundColor: (theme.vars || theme).palette.background.paper,
  },
  // Bump specificity to allow extending custom inputs
  '&&&': {
    paddingRight: 24,
    minWidth: 16, // So it doesn't collapse.
  },
  ...(ownerState.variant === 'filled' && {
    '&&&': {
      paddingRight: 32,
    },
  }),
  ...(ownerState.variant === 'outlined' && {
    borderRadius: (theme.vars || theme).shape.borderRadius,
    '&:focus': {
      borderRadius: (theme.vars || theme).shape.borderRadius, // Reset the reset for Chrome style
    },
    '&&&': {
      paddingRight: 32,
    },
  }),
});

const NativeSelectSelect = styled('select', {
  name: 'MuiNativeSelect',
  slot: 'Select',
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.select,
      styles[ownerState.variant],
      ownerState.error && styles.error,
      { [`&.${nativeSelectClasses.multiple}`]: styles.multiple },
    ];
  },
})(nativeSelectSelectStyles);

export const nativeSelectIconStyles = ({ ownerState, theme }) => ({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: 'absolute',
  right: 0,
  top: 'calc(50% - .5em)', // Center vertically, height is 1em
  pointerEvents: 'none', // Don't block pointer events on the select under the icon.
  color: (theme.vars || theme).palette.action.active,
  [`&.${nativeSelectClasses.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled,
  },
  ...(ownerState.open && {
    transform: 'rotate(180deg)',
  }),
  ...(ownerState.variant === 'filled' && {
    right: 7,
  }),
  ...(ownerState.variant === 'outlined' && {
    right: 7,
  }),
});

const NativeSelectIcon = styled('svg', {
  name: 'MuiNativeSelect',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.icon,
      ownerState.variant && styles[`icon${capitalize(ownerState.variant)}`],
      ownerState.open && styles.iconOpen,
    ];
  },
})(nativeSelectIconStyles);

/**
 * @ignore - internal component.
 */
const NativeSelectInput = React.forwardRef(function NativeSelectInput(props, ref) {
  const {
    className,
    disabled,
    error,
    IconComponent,
    inputRef,
    variant = 'standard',
    ...other
  } = props;

  const ownerState = {
    ...props,
    disabled,
    variant,
    error,
  };

  const classes = useUtilityClasses(ownerState);
  return (
    <React.Fragment>
      <NativeSelectSelect
        ownerState={ownerState}
        className={clsx(classes.select, className)}
        disabled={disabled}
        ref={inputRef || ref}
        {...other}
      />
      {props.multiple ? null : (
        <NativeSelectIcon as={IconComponent} ownerState={ownerState} className={classes.icon} />
      )}
    </React.Fragment>
  );
});

NativeSelectInput.propTypes = {
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * The CSS class name of the select element.
   */
  className: PropTypes.string,
  /**
   * If `true`, the select is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the `select input` will indicate an error.
   */
  error: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.elementType.isRequired,
  /**
   * Use that prop to pass a ref to the native select element.
   * @deprecated
   */
  inputRef: refType,
  /**
   * @ignore
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `select` or hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The input value.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['standard', 'outlined', 'filled']),
};

export default NativeSelectInput;
