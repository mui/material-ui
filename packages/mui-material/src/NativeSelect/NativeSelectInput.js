'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import nativeSelectClasses, { getNativeSelectUtilityClasses } from './nativeSelectClasses';
import { styled } from '../zero-styled';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';

const useUtilityClasses = (ownerState) => {
  const { classes, variant, disabled, multiple, open, error } = ownerState;

  const slots = {
    select: ['select', variant, disabled && 'disabled', multiple && 'multiple', error && 'error'],
    icon: ['icon', `icon${capitalize(variant)}`, open && 'iconOpen', disabled && 'disabled'],
  };

  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};

export const StyledSelectSelect = styled('select')(({ theme }) => ({
  // Reset
  MozAppearance: 'none',
  // Reset
  WebkitAppearance: 'none',
  // When interacting quickly, the text can end up selected.
  // Native select can't be selected either.
  userSelect: 'none',
  // Reset
  borderRadius: 0,
  cursor: 'pointer',
  '&:focus': {
    // Reset Chrome style
    borderRadius: 0,
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
  variants: [
    {
      props: ({ ownerState }) =>
        ownerState.variant !== 'filled' && ownerState.variant !== 'outlined',
      style: {
        // Bump specificity to allow extending custom inputs
        '&&&': {
          paddingRight: 24,
          minWidth: 16, // So it doesn't collapse.
        },
      },
    },
    {
      props: {
        variant: 'filled',
      },
      style: {
        '&&&': {
          paddingRight: 32,
        },
      },
    },
    {
      props: {
        variant: 'outlined',
      },
      style: {
        borderRadius: (theme.vars || theme).shape.borderRadius,
        '&:focus': {
          borderRadius: (theme.vars || theme).shape.borderRadius, // Reset the reset for Chrome style
        },
        '&&&': {
          paddingRight: 32,
        },
      },
    },
  ],
}));

const NativeSelectSelect = styled(StyledSelectSelect, {
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
})({});

export const StyledSelectIcon = styled('svg')(({ theme }) => ({
  // We use a position absolute over a flexbox in order to forward the pointer events
  // to the input and to support wrapping tags..
  position: 'absolute',
  right: 0,
  // Center vertically, height is 1em
  top: 'calc(50% - .5em)',
  // Don't block pointer events on the select under the icon.
  pointerEvents: 'none',
  color: (theme.vars || theme).palette.action.active,
  [`&.${nativeSelectClasses.disabled}`]: {
    color: (theme.vars || theme).palette.action.disabled,
  },
  variants: [
    {
      props: ({ ownerState }) => ownerState.open,
      style: {
        transform: 'rotate(180deg)',
      },
    },
    {
      props: {
        variant: 'filled',
      },
      style: {
        right: 7,
      },
    },
    {
      props: {
        variant: 'outlined',
      },
      style: {
        right: 7,
      },
    },
  ],
}));

const NativeSelectIcon = styled(StyledSelectIcon, {
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
})({});

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
