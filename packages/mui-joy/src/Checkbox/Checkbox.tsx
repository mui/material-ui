import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useId as useId, unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled, useThemeProps } from '../styles';
import checkboxClasses, { getCheckboxUtilityClass } from './checkboxClasses';
import { CheckboxOwnerState, CheckboxTypeMap } from './CheckboxProps';
import CheckIcon from '../internal/svg-icons/Check';
import IndeterminateIcon from '../internal/svg-icons/HorizontalRule';
import { TypographyContext } from '../Typography/Typography';

const useUtilityClasses = (ownerState: CheckboxOwnerState) => {
  const { checked, disabled, disableIcon, focusVisible, color, variant, size } = ownerState;

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
    checkbox: ['checkbox', disabled && 'disabled'], // disabled class is necessary for displaying global variant
    action: [
      'action',
      checked && 'checked',
      disableIcon && disabled && 'disabled', // add disabled class to action element for displaying global variant
      focusVisible && 'focusVisible',
    ],
    input: ['input'],
    label: ['label'],
  };

  return composeClasses(slots, getCheckboxUtilityClass, {});
};

const CheckboxRoot = styled('span', {
  name: 'JoyCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: CheckboxOwnerState }>(({ ownerState, theme }) => ({
  '--Icon-fontSize': 'var(--Checkbox-size)',
  ...(ownerState.size === 'sm' && {
    '--Checkbox-size': '1rem',
    '--Checkbox-gap': '0.375rem',
    fontSize: theme.vars.fontSize.sm,
  }),
  ...(ownerState.size === 'md' && {
    '--Checkbox-size': '1.25rem',
    '--Checkbox-gap': '0.5rem',
    fontSize: theme.vars.fontSize.md,
  }),
  ...(ownerState.size === 'lg' && {
    '--Checkbox-size': '1.5rem',
    '--Checkbox-gap': '0.625rem',
    fontSize: theme.vars.fontSize.lg,
  }),
  position: ownerState.overlay ? 'initial' : 'relative',
  display: 'inline-flex',
  fontFamily: theme.vars.fontFamily.body,
  lineHeight: 'var(--Checkbox-size)', // prevent label from having larger height than the checkbox
  color: theme.vars.palette.text.primary,
  [`&.${checkboxClasses.disabled}`]: {
    color: theme.vars.palette[ownerState.color!]?.plainDisabledColor,
  },
  ...(ownerState.disableIcon && {
    color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
    [`&.${checkboxClasses.disabled}`]: {
      color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}DisabledColor`],
    },
  }),
}));

const CheckboxCheckbox = styled('span', {
  name: 'JoyCheckbox',
  slot: 'Checkbox',
  overridesResolver: (props, styles) => styles.checkbox,
})<{ ownerState: CheckboxOwnerState }>(({ theme, ownerState }) => [
  {
    boxSizing: 'border-box',
    borderRadius: theme.vars.radius.xs,
    width: 'var(--Checkbox-size)',
    height: 'var(--Checkbox-size)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    ...(ownerState.disableIcon && {
      display: 'contents',
    }),
  },
  ...(!ownerState.disableIcon
    ? [
        theme.variants[ownerState.variant!]?.[ownerState.color!],
        { '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!] },
        { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
        {
          [`&.${checkboxClasses.disabled}`]:
            theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
        },
      ]
    : []),
]);

const CheckboxAction = styled('span', {
  name: 'JoyCheckbox',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: CheckboxOwnerState }>(({ theme, ownerState }) => [
  {
    borderRadius: `var(--Checkbox-action-radius, ${
      ownerState.overlay ? 'var(--internal-action-radius, inherit)' : 'inherit'
    })`,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1, // The action element usually cover the area of nearest positioned parent
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    [theme.focus.selector]: theme.focus.default,
  },
  ...(ownerState.disableIcon
    ? [
        theme.variants[ownerState.variant!]?.[ownerState.color!],
        { '&:hover': theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!] },
        { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
        {
          [`&.${checkboxClasses.disabled}`]:
            theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
        },
      ]
    : []),
]);

const CheckboxInput = styled('input', {
  name: 'JoyCheckbox',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: CheckboxOwnerState }>(() => ({
  margin: 0,
  opacity: 0,
  position: 'absolute',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
}));

const CheckboxLabel = styled('label', {
  name: 'JoyCheckbox',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})<{ ownerState: CheckboxOwnerState }>(({ ownerState }) => ({
  flex: 1,
  minWidth: 0,
  ...(ownerState.disableIcon
    ? {
        zIndex: 1, // label should stay on top of the action.
        pointerEvents: 'none', // makes hover ineffect.
      }
    : {
        marginInlineStart: 'var(--Checkbox-gap)',
      }),
}));

const defaultCheckedIcon = <CheckIcon />;
const defaultIndeterminateIcon = <IndeterminateIcon />;

const Checkbox = React.forwardRef(function Checkbox(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyCheckbox',
  });

  const {
    checked: checkedProp,
    uncheckedIcon,
    checkedIcon = defaultCheckedIcon,
    label,
    component,
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    disableIcon = false,
    overlay,
    id: idOverride,
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
    ...other
  } = props;
  const id = useId(idOverride);

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
  const activeVariant = variant || 'solid';
  const inactiveVariant = variant || 'outlined';

  const ownerState = {
    ...props,
    checked,
    disabled,
    disableIcon,
    overlay,
    focusVisible,
    color: isCheckboxActive ? activeColor : inactiveColor,
    variant: isCheckboxActive ? activeVariant : inactiveVariant,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: CheckboxRoot,
    externalSlotProps: componentsProps.root,
    externalForwardedProps: other,
    ownerState,
    additionalProps: {
      ref,
      as: component,
    },
    className: classes.root,
  });

  const checkboxProps = useSlotProps({
    elementType: CheckboxCheckbox,
    externalSlotProps: componentsProps.checkbox,
    ownerState,
    className: classes.checkbox,
  });

  const actionProps = useSlotProps({
    elementType: CheckboxAction,
    externalSlotProps: componentsProps.action,
    ownerState,
    className: classes.action,
  });

  const inputProps = useSlotProps({
    elementType: CheckboxInput,
    getSlotProps: getInputProps,
    externalSlotProps: componentsProps.input,
    ownerState,
    additionalProps: {
      id,
      name,
    },
    className: classes.input,
  });

  const labelProps = useSlotProps({
    elementType: CheckboxLabel,
    externalSlotProps: componentsProps.label,
    ownerState,
    additionalProps: {
      htmlFor: id,
    },
    className: classes.label,
  });

  return (
    <CheckboxRoot {...rootProps}>
      <CheckboxCheckbox {...checkboxProps}>
        <CheckboxAction {...actionProps}>
          <CheckboxInput {...inputProps} />
        </CheckboxAction>
        {indeterminate && !checked && !disableIcon && indeterminateIcon}
        {checked && !disableIcon && checkedIcon}
        {!checked && !disableIcon && !indeterminate && uncheckedIcon}
      </CheckboxCheckbox>
      {label && (
        <TypographyContext.Provider value>
          <CheckboxLabel {...labelProps}>{label}</CheckboxLabel>
        </TypographyContext.Provider>
      )}
    </CheckboxRoot>
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
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    checkbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
   * If `true`, the checked icon is removed and the selected variant is applied on the `action` element instead.
   * @default false
   */
  disableIcon: PropTypes.bool,
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
   * The label element next to the checkbox.
   */
  label: PropTypes.node,
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
   * If `true`, the root element's position is set to initial which allows the action area to fill the nearest positioned parent.
   * This prop is useful for composing Checkbox with ListItem component.
   * @default false
   */
  overlay: PropTypes.bool,
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The icon when `checked` is false.
   */
  uncheckedIcon: PropTypes.node,
  /**
   * The variant to use.
   * @default 'solid'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Checkbox;
