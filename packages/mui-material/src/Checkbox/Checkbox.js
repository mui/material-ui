'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import composeClasses from '@mui/utils/composeClasses';
import { alpha } from '@mui/system/colorManipulator';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import capitalize from '../utils/capitalize';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import checkboxClasses, { getCheckboxUtilityClass } from './checkboxClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';

import { useDefaultProps } from '../DefaultPropsProvider';

const useUtilityClasses = (ownerState) => {
  const { classes, indeterminate, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      indeterminate && 'indeterminate',
      `color${capitalize(color)}`,
      `size${capitalize(size)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);

  return {
    ...classes, // forward the disabled and checked classes to the SwitchBase
    ...composedClasses,
  };
};

const CheckboxRoot = styled(SwitchBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.indeterminate && styles.indeterminate,
      styles[`size${capitalize(ownerState.size)}`],
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    color: (theme.vars || theme).palette.text.secondary,
    variants: [
      {
        props: { color: 'default', disableRipple: false },
        style: {
          '&:hover': {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.action.activeChannel} / ${theme.vars.palette.action.hoverOpacity})`
              : alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
          },
        },
      },
      ...Object.entries(theme.palette)
        .filter(([, palette]) => palette && palette.main)
        .map(([color]) => ({
          props: { color, disableRipple: false },
          style: {
            '&:hover': {
              backgroundColor: theme.vars
                ? `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.hoverOpacity})`
                : alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
            },
          },
        })),
      ...Object.entries(theme.palette)
        .filter(([, palette]) => palette && palette.main)
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
              color: (theme.vars || theme).palette[color].main,
            },
            [`&.${checkboxClasses.disabled}`]: {
              color: (theme.vars || theme).palette.action.disabled,
            },
          },
        })),
      {
        // Should be last to override other colors
        props: { disableRipple: false },
        style: {
          // Reset on touch devices, it doesn't add specificity
          '&:hover': {
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    ],
  })),
);

const defaultCheckedIcon = <CheckBoxIcon />;
const defaultIcon = <CheckBoxOutlineBlankIcon />;
const defaultIndeterminateIcon = <IndeterminateCheckBoxIcon />;

const Checkbox = React.forwardRef(function Checkbox(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCheckbox' });
  const {
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    inputProps,
    size = 'medium',
    disableRipple = false,
    className,
    ...other
  } = props;

  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;

  const ownerState = {
    ...props,
    disableRipple,
    color,
    indeterminate,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <CheckboxRoot
      type="checkbox"
      inputProps={{
        'data-indeterminate': indeterminate,
        ...inputProps,
      }}
      icon={React.cloneElement(icon, {
        fontSize: icon.props.fontSize ?? size,
      })}
      checkedIcon={React.cloneElement(indeterminateIcon, {
        fontSize: indeterminateIcon.props.fontSize ?? size,
      })}
      ownerState={ownerState}
      ref={ref}
      className={clsx(classes.root, className)}
      {...other}
      classes={classes}
    />
  );
});

Checkbox.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckBoxIcon />
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
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
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display when the component is unchecked.
   * @default <CheckBoxOutlineBlankIcon />
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component appears indeterminate.
   * This does not set the native input element to indeterminate due
   * to inconsistent behavior across browsers.
   * However, we set a `data-indeterminate` attribute on the `input`.
   * @default false
   */
  indeterminate: PropTypes.bool,
  /**
   * The icon to display when the component is indeterminate.
   * @default <IndeterminateCheckBoxIcon />
   */
  indeterminateIcon: PropTypes.node,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense checkbox styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Checkbox;
