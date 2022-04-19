import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled, useThemeProps } from '../styles';
import { getCheckboxUtilityClass } from './checkboxClasses';
import { CheckboxProps, CheckboxTypeMap } from './CheckboxProps';
import CheckIcon from '../internal/svg-icons/Check';
import IndeterminateIcon from '../internal/svg-icons/HorizontalRule';

const useUtilityClasses = (ownerState: CheckboxProps & { focusVisible: boolean }) => {
  const { checked, disabled, focusVisible, color, variant, size } = ownerState;

  const slots = {
    root: [
      'root',
      checked && 'checked',
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    input: ['input'],
  };

  return composeClasses(slots, getCheckboxUtilityClass, {});
};

const CheckboxRoot = styled('span', {
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CheckboxProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.size === 'sm' && {
        '--Checkbox-size': '1rem',
      }),
      ...(ownerState.size === 'md' && {
        '--Checkbox-size': '1.25rem',
      }),
      ...(ownerState.size === 'lg' && {
        '--Checkbox-size': '1.5rem',
      }),
      '--Icon-fontSize': 'var(--Checkbox-size)',
      borderRadius: theme.vars.radius.xs,
      boxSizing: 'border-box',
      width: 'var(--Checkbox-size)',
      height: 'var(--Checkbox-size)',
      position: 'relative',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
      flexShrink: 0,
    },
    theme.focus.default,
    theme.variants[ownerState.variant!]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
    theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  ];
});

const CheckboxInput = styled('input', {
  name: 'MuiCheckbox',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: CheckboxProps }>(() => ({
  margin: 0,
  width: 'var(--Checkbox-size)',
  height: 'var(--Checkbox-size)',
  opacity: 0,
  position: 'absolute',
  top: 'calc(-1 * var(--variant-outlinedBorderWidth, 0px))',
  left: 'calc(-1 * var(--variant-outlinedBorderWidth, 0px))',
  cursor: 'pointer',
}));

const defaultCheckedIcon = <CheckIcon />;
const defaultIndeterminateIcon = <IndeterminateIcon />;

const Checkbox = React.forwardRef(function Checkbox(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiCheckbox',
  });

  const {
    checked: checkedProp,
    checkedIcon = defaultCheckedIcon,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    id,
    indeterminate = false,
    indeterminateIcon = defaultIndeterminateIcon,
    name,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    required,
    color,
    variant,
    size = 'md',
    ...otherProps
  } = props;

  const useCheckboxProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
  };

  const { getInputProps, checked, disabled, focusVisible } = useSwitch(useCheckboxProps);

  const isCheckboxActive = checked || indeterminate;
  const activeColor = color || 'primary';
  const inactiveColor = color || 'neutral';
  const activeVariant = variant || 'contained';
  const inactiveVariant = variant || 'outlined';

  const ownerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    color: isCheckboxActive ? activeColor : inactiveColor,
    variant: isCheckboxActive ? activeVariant : inactiveVariant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const Root = components.Root ?? CheckboxRoot;
  const Input = components.Input ?? CheckboxInput;

  return (
    <Root
      ref={ref}
      {...otherProps}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
    >
      <Input
        ownerState={ownerState}
        {...getInputProps(componentsProps.input)}
        id={id}
        name={name}
        className={clsx(classes.input, componentsProps.input?.className)}
      />
      {indeterminate && !checked && indeterminateIcon}
      {checked && checkedIcon}
    </Root>
  );
}) as OverridableComponent<CheckboxTypeMap>;

Checkbox.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   * @default <CheckIcon />
   */
  checkedIcon: PropTypes.node,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Input: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    input: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * @ignore
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
   * The `name` attribute of the input.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onFocusVisible: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The variant to use.
   * @default 'contained'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['contained', 'light', 'outlined']),
    PropTypes.string,
  ]),
} as any;

export default Checkbox;
