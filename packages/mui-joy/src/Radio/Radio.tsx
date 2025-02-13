'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useId as useId } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSwitch } from '@mui/base/useSwitch';
import { styled, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import radioClasses, { getRadioUtilityClass } from './radioClasses';
import { RadioOwnerState, RadioTypeMap } from './RadioProps';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';
import { TypographyNestedContext } from '../Typography/Typography';
import FormControlContext from '../FormControl/FormControlContext';

const useUtilityClasses = (ownerState: RadioOwnerState) => {
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
    radio: ['radio', checked && 'checked', disabled && 'disabled'], // disabled class is necessary for displaying global variant
    icon: ['icon'],
    action: [
      'action',
      checked && 'checked',
      disableIcon && disabled && 'disabled', // add disabled class to action element for displaying global variant
      focusVisible && 'focusVisible',
    ],
    input: ['input'],
    label: ['label'],
  };

  return composeClasses(slots, getRadioUtilityClass, {});
};

function areEqualValues(a: unknown, b: unknown) {
  if (typeof b === 'object' && b !== null) {
    return a === b;
  }

  // The value could be a number, the DOM will stringify it anyway.
  return String(a) === String(b);
}

const RadioRoot = styled('span', {
  name: 'JoyRadio',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: RadioOwnerState }>(({ ownerState, theme }) => {
  return [
    {
      '--Icon-fontSize': 'var(--Radio-size)',
      '--Icon-color': 'currentColor',
      ...(ownerState.size === 'sm' && {
        '--Radio-size': '1rem',
        // --FormHelperText-margin is equal to --Radio-size + --Radio-gap but we can't use calc() with CSS variables because the FormHelperText is a sibling element
        '& ~ *': { '--FormHelperText-margin': '0 0 0 1.5rem' },
        fontSize: theme.vars.fontSize.sm,
        gap: 'var(--Radio-gap, 0.5rem)',
      }),
      ...(ownerState.size === 'md' && {
        '--Radio-size': '1.25rem',
        '& ~ *': { '--FormHelperText-margin': '0.25rem 0 0 1.875rem' },
        fontSize: theme.vars.fontSize.md,
        gap: 'var(--Radio-gap, 0.625rem)',
      }),
      ...(ownerState.size === 'lg' && {
        '--Radio-size': '1.5rem',
        '& ~ *': { '--FormHelperText-margin': '0.375rem 0 0 2.25rem' },
        fontSize: theme.vars.fontSize.lg,
        gap: 'var(--Radio-gap, 0.75rem)',
      }),
      position: ownerState.overlay ? 'initial' : 'relative',
      display: 'inline-flex',
      boxSizing: 'border-box',
      minWidth: 0,
      fontFamily: theme.vars.fontFamily.body,
      lineHeight: 'var(--Radio-size)', // prevent label from having larger height than the checkbox
      color: theme.vars.palette.text.primary,
      [`&.${radioClasses.disabled}`]: {
        color: theme.variants.plainDisabled?.[ownerState.color!]?.color,
      },
      ...(ownerState.disableIcon && {
        color: theme.variants[ownerState.variant!]?.[ownerState.color!]?.color,
        [`&.${radioClasses.disabled}`]: {
          color: theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!]?.color,
        },
      }),
      ...(ownerState['data-parent'] === 'RadioGroup' &&
        ownerState['data-first-child'] === undefined && {
          marginInlineStart:
            ownerState.orientation === 'horizontal' ? 'var(--RadioGroup-gap)' : undefined,
          marginBlockStart:
            ownerState.orientation === 'horizontal' ? undefined : 'var(--RadioGroup-gap)',
        }),
    } as const,
  ];
});

const RadioRadio = styled('span', {
  name: 'JoyRadio',
  slot: 'Radio',
  overridesResolver: (props, styles) => styles.radio,
})<{ ownerState: RadioOwnerState }>(({ ownerState, theme }) => {
  const variantStyle = theme.variants[`${ownerState.variant!}`]?.[ownerState.color!];
  return [
    {
      '--Icon-color':
        ownerState.color !== 'neutral' || ownerState.variant === 'solid'
          ? 'currentColor'
          : theme.vars.palette.text.icon,
      margin: 0,
      boxSizing: 'border-box',
      width: 'var(--Radio-size)',
      height: 'var(--Radio-size)',
      borderRadius: 'var(--Radio-size)',
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      ...(ownerState.disableIcon && {
        display: 'contents',
      }),
      [`&.${radioClasses.checked}`]: {
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
            [`&.${radioClasses.disabled}`]:
              theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
          },
        ]
      : []),
  ];
});

const RadioAction = styled('span', {
  name: 'JoyRadio',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: RadioOwnerState }>(({ theme, ownerState }) => [
  {
    position: 'absolute',
    textAlign: 'left', // prevent text-align inheritance
    borderRadius: `var(--Radio-actionRadius, ${
      // Automatic radius adjustment when composing with ListItem or Sheet
      ownerState.overlay ? 'var(--unstable_actionRadius, inherit)' : 'inherit'
    })`,
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
        {
          '&:hover': {
            '@media (hover: hover)':
              theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
          },
        },
        { '&:active': theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!] },
        {
          [`&.${radioClasses.disabled}`]:
            theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
        },
      ]
    : []),
]);

const RadioInput = styled('input', {
  name: 'JoyRadio',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: RadioOwnerState }>(() => ({
  margin: 0,
  opacity: 0,
  position: 'absolute',
  height: '100%',
  width: '100%',
  cursor: 'pointer',
}));

const RadioLabel = styled('label', {
  name: 'JoyRadio',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})<{ ownerState: RadioOwnerState }>(({ ownerState }) => ({
  flex: 1,
  minWidth: 0,
  ...(ownerState.disableIcon && {
    zIndex: 1, // label should stay on top of the action.
    pointerEvents: 'none', // makes hover ineffect.
  }),
}));

/**
 * internal component
 */
const RadioIcon = styled('span', {
  name: 'JoyRadio',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon,
})<{ ownerState: RadioOwnerState }>(({ ownerState }) => ({
  width: 'calc(var(--Radio-size) / 2)',
  height: 'calc(var(--Radio-size) / 2)',
  borderRadius: 'inherit',
  color: 'inherit',
  backgroundColor: 'currentColor',
  transform: ownerState.checked ? 'scale(1)' : 'scale(0)',
}));
/**
 *
 * Demos:
 *
 * - [Radio](https://mui.com/joy-ui/react-radio-button/)
 *
 * API:
 *
 * - [Radio API](https://mui.com/joy-ui/api/radio/)
 */
const Radio = React.forwardRef(function Radio(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyRadio',
  });

  const {
    checked: checkedProp,
    checkedIcon,
    defaultChecked,
    disabled: disabledProp,
    disableIcon: disableIconProp = false,
    overlay: overlayProp = false,
    label,
    id: idOverride,
    name: nameProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required,
    color: colorProp,
    variant = 'outlined',
    size: sizeProp = 'md',
    uncheckedIcon,
    value,
    component,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const formControl = React.useContext(FormControlContext);

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
  const radioGroup = React.useContext(RadioGroupContext);
  const activeColor = formControl?.error
    ? 'danger'
    : (inProps.color ?? formControl?.color ?? colorProp ?? 'primary');
  const inactiveColor = formControl?.error
    ? 'danger'
    : (inProps.color ?? formControl?.color ?? colorProp ?? 'neutral');
  const size = inProps.size || formControl?.size || radioGroup?.size || sizeProp;
  const name = inProps.name || radioGroup?.name || nameProp;
  const disableIcon = inProps.disableIcon || radioGroup?.disableIcon || disableIconProp;
  const overlay = inProps.overlay || radioGroup?.overlay || overlayProp;

  const radioChecked =
    typeof checkedProp === 'undefined' && value != null
      ? areEqualValues(radioGroup?.value, value)
      : checkedProp;
  const useRadioProps = {
    checked: radioChecked,
    defaultChecked,
    disabled: inProps.disabled || formControl?.disabled || disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
  };

  const { getInputProps, checked, disabled, focusVisible } = useSwitch(useRadioProps);

  const color = inProps.color ?? (checked ? activeColor : inactiveColor);

  const ownerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    color,
    variant,
    size,
    disableIcon,
    overlay,
    orientation: radioGroup?.orientation,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: RadioRoot,
    externalForwardedProps,
    ownerState,
  });

  const [SlotRadio, radioProps] = useSlot('radio', {
    className: classes.radio,
    elementType: RadioRadio,
    externalForwardedProps,
    ownerState,
  });

  const [SlotIcon, iconProps] = useSlot('icon', {
    className: classes.icon,
    elementType: RadioIcon,
    externalForwardedProps,
    ownerState,
  });

  const [SlotAction, actionProps] = useSlot('action', {
    className: classes.action,
    elementType: RadioAction,
    externalForwardedProps,
    ownerState,
  });

  const [SlotInput, inputProps] = useSlot('input', {
    additionalProps: {
      type: 'radio',
      role: undefined,
      id,
      name,
      readOnly,
      required: required ?? formControl?.required,
      value: String(value),
      'aria-describedby': formControl?.['aria-describedby'],
    },
    className: classes.input,
    elementType: RadioInput,
    externalForwardedProps,
    getSlotProps: () => getInputProps({ onChange: radioGroup?.onChange }),
    ownerState,
  });

  const [SlotLabel, labelProps] = useSlot('label', {
    additionalProps: {
      htmlFor: id,
    },
    className: classes.label,
    elementType: RadioLabel,
    externalForwardedProps,
    ownerState,
  });

  return (
    <SlotRoot {...rootProps}>
      <SlotRadio {...radioProps}>
        {checked && !disableIcon && checkedIcon}
        {!checked && !disableIcon && uncheckedIcon}
        {!checkedIcon && !uncheckedIcon && !disableIcon && <SlotIcon {...iconProps} />}
        <SlotAction {...actionProps}>
          <SlotInput {...inputProps} />
        </SlotAction>
      </SlotRadio>
      {label && (
        <SlotLabel {...labelProps}>
          {/* Automatically adjust the Typography to render `span` */}
          <TypographyNestedContext.Provider value>{label}</TypographyNestedContext.Provider>
        </SlotLabel>
      )}
    </SlotRoot>
  );
}) as OverridableComponent<RadioTypeMap>;

Radio.propTypes /* remove-proptypes */ = {
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
    PropTypes.oneOf(['danger', 'primary', 'success', 'warning']),
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
   * The label element at the end the radio.
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
   * This prop is useful for composing Radio with ListItem component.
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
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['sm', 'md', 'lg']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    radio: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    action: PropTypes.elementType,
    icon: PropTypes.elementType,
    input: PropTypes.elementType,
    label: PropTypes.elementType,
    radio: PropTypes.elementType,
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
   * The icon to display when the component is not checked.
   */
  uncheckedIcon: PropTypes.node,
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Radio;
