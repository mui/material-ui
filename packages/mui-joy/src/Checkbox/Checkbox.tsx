'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useId as useId, unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSwitch } from '@mui/base/useSwitch';
import { styled, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import checkboxClasses, { getCheckboxUtilityClass } from './checkboxClasses';
import { CheckboxOwnerState, CheckboxTypeMap } from './CheckboxProps';
import CheckIcon from '../internal/svg-icons/Check';
import IndeterminateIcon from '../internal/svg-icons/HorizontalRule';
import { TypographyNestedContext } from '../Typography/Typography';
import FormControlContext from '../FormControl/FormControlContext';

const useUtilityClasses = (ownerState: CheckboxOwnerState) => {
  const { checked, disabled, disableIcon, focusVisible, color, variant, size, indeterminate } =
    ownerState;

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
    checkbox: [
      'checkbox',
      checked && 'checked',
      indeterminate && 'indeterminate',
      disabled && 'disabled', // disabled class is necessary for displaying global variant
    ],
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
    '& ~ *': { '--FormHelperText-margin': '0 0 0 1.5rem' },
    fontSize: theme.vars.fontSize.sm,
    gap: 'var(--Checkbox-gap, 0.5rem)',
  }),
  ...(ownerState.size === 'md' && {
    '--Checkbox-size': '1.25rem',
    '& ~ *': { '--FormHelperText-margin': '0.25rem 0 0 1.875rem' },
    fontSize: theme.vars.fontSize.md,
    gap: 'var(--Checkbox-gap, 0.625rem)',
  }),
  ...(ownerState.size === 'lg' && {
    '--Checkbox-size': '1.5rem',
    '& ~ *': { '--FormHelperText-margin': '0.375rem 0 0 2.25rem' },
    fontSize: theme.vars.fontSize.lg,
    gap: 'var(--Checkbox-gap, 0.75rem)',
  }),
  position: ownerState.overlay ? 'initial' : 'relative',
  display: 'inline-flex',
  fontFamily: theme.vars.fontFamily.body,
  lineHeight: 'var(--Checkbox-size)',
  color: theme.vars.palette.text.primary,
  [`&.${checkboxClasses.disabled}`]: {
    color: theme.variants.plainDisabled?.[ownerState.color!]?.color,
  },
  ...(ownerState.disableIcon && {
    color: theme.variants[ownerState.variant!]?.[ownerState.color!]?.color,
    [`&.${checkboxClasses.disabled}`]: {
      color: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
    },
  }),
}));

const CheckboxCheckbox = styled('span', {
  name: 'JoyCheckbox',
  slot: 'Checkbox',
  overridesResolver: (props, styles) => styles.checkbox,
})<{ ownerState: CheckboxOwnerState }>(({ theme, ownerState }) => {
  const variantStyle = theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
  return [
    {
      '--Icon-color':
        ownerState.color !== 'neutral' || ownerState.variant === 'solid'
          ? 'currentColor'
          : theme.vars.palette.text.icon,
      boxSizing: 'border-box',
      borderRadius: `min(${theme.vars.radius.sm}, 0.25rem)`,
      width: 'var(--Checkbox-size)',
      height: 'var(--Checkbox-size)',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      ...(ownerState.disableIcon && {
        display: 'contents',
      }),
      [`&.${checkboxClasses.checked}, &.${checkboxClasses.indeterminate}`]: {
        '--Icon-color': 'currentColor',
      },
    } as const,
    ...(!ownerState.disableIcon
      ? [
          {
            ...variantStyle,
            backgroundColor: variantStyle?.backgroundColor ?? theme.vars.palette.background.surface,
          },
          {
            '&:hover': {
              '@media (hover: hover)':
                theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
            },
          },
          { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
          {
            [`&.${checkboxClasses.disabled}`]:
              theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
          },
        ]
      : []),
  ];
});

const CheckboxAction = styled('span', {
  name: 'JoyCheckbox',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: CheckboxOwnerState }>(({ theme, ownerState }) => [
  {
    borderRadius: `var(--Checkbox-actionRadius, ${
      ownerState.overlay ? 'var(--unstable_actionRadius, inherit)' : 'inherit'
    })`,
    textAlign: 'left', // prevent text-align inheritance
    position: 'absolute',
    top: 'calc(-1 * var(--variant-borderWidth, 0px))', // clickable on the border and focus outline does not move when checked/unchecked
    left: 'calc(-1 * var(--variant-borderWidth, 0px))',
    bottom: 'calc(-1 * var(--variant-borderWidth, 0px))',
    right: 'calc(-1 * var(--variant-borderWidth, 0px))',
    zIndex: 1, // The action element usually cover the area of nearest positioned parent
    [theme.focus.selector]: theme.focus.default,
  } as const,
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
  ...(ownerState.disableIcon && {
    zIndex: 1, // label should stay on top of the action.
    pointerEvents: 'none', // makes hover ineffect.
  }),
}));

const defaultCheckedIcon = <CheckIcon />;
const defaultIndeterminateIcon = <IndeterminateIcon />;
/**
 *
 * Demos:
 *
 * - [Checkbox](https://mui.com/joy-ui/react-checkbox/)
 *
 * API:
 *
 * - [Checkbox API](https://mui.com/joy-ui/api/checkbox/)
 */
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
    defaultChecked,
    disabled: disabledExternalProp,
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
    readOnly,
    required,
    value,
    color: colorProp,
    variant: variantProp,
    size: sizeProp = 'md',
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const formControl = React.useContext(FormControlContext);
  const disabledProp = inProps.disabled ?? formControl?.disabled ?? disabledExternalProp;
  const size = inProps.size ?? formControl?.size ?? sizeProp;

  if (process.env.NODE_ENV !== 'production') {
    const registerEffect = formControl?.registerEffect;
    // TODO: uncomment once we enable eslint-plugin-react-compiler // eslint-disable-next-line react-compiler/react-compiler -- process.env never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (registerEffect) {
        return registerEffect();
      }

      return undefined;
    }, [registerEffect]);
  }

  const id = useId(idOverride ?? formControl?.htmlFor);

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
  const activeVariant = variantProp || 'solid';
  const inactiveVariant = variantProp || 'outlined';
  const variant = isCheckboxActive ? activeVariant : inactiveVariant;
  const color =
    inProps.color || (formControl?.error ? 'danger' : (formControl?.color ?? colorProp));

  const activeColor = color || 'primary';
  const inactiveColor = color || 'neutral';

  const ownerState = {
    ...props,
    checked,
    disabled,
    disableIcon,
    overlay,
    focusVisible,
    color: isCheckboxActive ? activeColor : inactiveColor,
    variant,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: CheckboxRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotCheckbox, checkboxProps] = useSlot('checkbox', {
    className: classes.checkbox,
    elementType: CheckboxCheckbox,
    externalForwardedProps,
    ownerState,
  });

  const [SlotAction, actionProps] = useSlot('action', {
    className: classes.action,
    elementType: CheckboxAction,
    externalForwardedProps,
    ownerState,
  });

  const [SlotInput, inputProps] = useSlot('input', {
    additionalProps: {
      id,
      name,
      value,
      readOnly,
      role: undefined,
      required: required ?? formControl?.required,
      'aria-describedby': formControl?.['aria-describedby'],
      ...(indeterminate && {
        // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked#values
        'aria-checked': 'mixed' as const,
      }),
    },
    className: classes.input,
    elementType: CheckboxInput,
    externalForwardedProps,
    getSlotProps: getInputProps,
    ownerState,
  });

  const [SlotLabel, labelProps] = useSlot('label', {
    additionalProps: {
      htmlFor: id,
    },
    className: classes.label,
    elementType: CheckboxLabel,
    externalForwardedProps,
    ownerState,
  });

  let icon = uncheckedIcon;

  if (disableIcon) {
    icon = null;
  } else if (indeterminate) {
    icon = indeterminateIcon;
  } else if (checked) {
    icon = checkedIcon;
  }

  return (
    <SlotRoot {...rootProps}>
      <SlotCheckbox {...checkboxProps}>
        <SlotAction {...actionProps}>
          <SlotInput {...inputProps} />
        </SlotAction>
        {icon}
      </SlotCheckbox>
      {label && (
        <TypographyNestedContext.Provider value>
          <SlotLabel {...labelProps}>{label}</SlotLabel>
        </TypographyNestedContext.Provider>
      )}
    </SlotRoot>
  );
}) as OverridableComponent<CheckboxTypeMap>;

Checkbox.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
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
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
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
   * @default <IndeterminateIcon />
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
   * If `true`, the component is read only.
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    checkbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    action: PropTypes.elementType,
    checkbox: PropTypes.elementType,
    input: PropTypes.elementType,
    label: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
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
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'solid'
   */
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default Checkbox;
