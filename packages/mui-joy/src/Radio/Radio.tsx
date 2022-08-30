import * as React from 'react';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize, unstable_useId as useId } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { useSlotProps } from '@mui/base/utils';
import { useSwitch } from '@mui/base/SwitchUnstyled';
import { styled, useThemeProps } from '../styles';
import radioClasses, { getRadioUtilityClass } from './radioClasses';
import { RadioOwnerState, RadioTypeMap } from './RadioProps';
import RadioGroupContext from '../RadioGroup/RadioGroupContext';
import { TypographyContext } from '../Typography/Typography';

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
    radio: ['radio', disabled && 'disabled'], // disabled class is necessary for displaying global variant
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
      ...(ownerState.size === 'sm' && {
        '--Radio-size': '1rem',
        '--Radio-gap': '0.375rem',
        fontSize: theme.vars.fontSize.sm,
      }),
      ...(ownerState.size === 'md' && {
        '--Radio-size': '1.25rem',
        '--Radio-gap': '0.5rem',
        fontSize: theme.vars.fontSize.md,
      }),
      ...(ownerState.size === 'lg' && {
        '--Radio-size': '1.5rem',
        '--Radio-gap': '0.625rem',
        fontSize: theme.vars.fontSize.lg,
      }),
      position: ownerState.overlay ? 'initial' : 'relative',
      display: 'inline-flex',
      boxSizing: 'border-box',
      minWidth: 0,
      fontFamily: theme.vars.fontFamily.body,
      lineHeight: 'var(--Radio-size)', // prevent label from having larger height than the checkbox
      color: theme.vars.palette.text.primary,
      [`&.${radioClasses.disabled}`]: {
        color: theme.vars.palette[ownerState.color!]?.plainDisabledColor,
      },
      ...(ownerState.disableIcon && {
        color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
        [`&.${radioClasses.disabled}`]: {
          color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}DisabledColor`],
        },
      }),
      ...(ownerState['data-parent'] === 'RadioGroup' &&
        ownerState['data-first-child'] === undefined && {
          marginInlineStart: ownerState.row ? 'var(--RadioGroup-gap)' : undefined,
          marginBlockStart: ownerState.row ? undefined : 'var(--RadioGroup-gap)',
        }),
    },
  ];
});

const RadioRadio = styled('span', {
  name: 'JoyRadio',
  slot: 'Radio',
  overridesResolver: (props, styles) => styles.radio,
})<{ ownerState: RadioOwnerState }>(({ ownerState, theme }) => [
  {
    margin: 0,
    boxSizing: 'border-box',
    width: 'var(--Radio-size)',
    height: 'var(--Radio-size)',
    borderRadius: 'var(--Radio-size)',
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
          [`&.${radioClasses.disabled}`]:
            theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
        },
      ]
    : []),
]);

const RadioAction = styled('span', {
  name: 'JoyRadio',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})<{ ownerState: RadioOwnerState }>(({ theme, ownerState }) => [
  {
    position: 'absolute',
    borderRadius: `var(--Radio-action-radius, ${
      // Automatic radius adjustment when composing with ListItem or Sheet
      ownerState.overlay ? 'var(--internal-action-radius, inherit)' : 'inherit'
    })`,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  ...(ownerState.disableIcon
    ? {
        zIndex: 1, // label should stay on top of the action.
        pointerEvents: 'none', // makes hover ineffect.
      }
    : {
        marginInlineStart: 'var(--Radio-gap)',
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
  width: '50%',
  height: '50%',
  borderRadius: 'inherit',
  color: 'inherit',
  backgroundColor: 'currentColor',
  // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
  transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  transform: ownerState.checked ? 'scale(1)' : 'scale(0)',
}));

const Radio = React.forwardRef(function Radio(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyRadio',
  });

  const {
    checked: checkedProp,
    checkedIcon,
    component,
    componentsProps = {},
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
    required,
    color,
    variant = 'outlined',
    size: sizeProp = 'md',
    uncheckedIcon,
    value,
    ...other
  } = props;
  const id = useId(idOverride);
  const radioGroup = React.useContext(RadioGroupContext);
  const activeColor = color || 'primary';
  const inactiveColor = color || 'neutral';
  const size = inProps.size || radioGroup.size || sizeProp;
  const name = inProps.name || radioGroup.name || nameProp;
  const disableIcon = inProps.disableIcon || radioGroup.disableIcon || disableIconProp;
  const overlay = inProps.overlay || radioGroup.overlay || overlayProp;

  const radioChecked =
    typeof checkedProp === 'undefined' && !!value
      ? areEqualValues(radioGroup.value, value)
      : checkedProp;
  const useRadioProps = {
    checked: radioChecked,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
  };

  const { getInputProps, checked, disabled, focusVisible } = useSwitch(useRadioProps);

  const ownerState = {
    ...props,
    checked,
    disabled,
    focusVisible,
    color: checked ? activeColor : inactiveColor,
    variant,
    size,
    disableIcon,
    overlay,
    row: radioGroup.row,
  };

  const classes = useUtilityClasses(ownerState);

  const rootProps = useSlotProps({
    elementType: RadioRoot,
    externalForwardedProps: other,
    externalSlotProps: componentsProps.root,
    additionalProps: {
      as: component,
      ref,
    },
    className: classes.root,
    ownerState,
  });

  const radioProps = useSlotProps({
    elementType: RadioRadio,
    externalSlotProps: componentsProps.radio,
    className: classes.radio,
    ownerState,
  });

  const radioIconProps = useSlotProps({
    elementType: RadioIcon,
    externalSlotProps: componentsProps.icon,
    className: classes.icon,
    ownerState,
  });

  const radioActionProps = useSlotProps({
    elementType: RadioAction,
    externalSlotProps: componentsProps.action,
    className: classes.action,
    ownerState,
  });

  const radioInputProps = useSlotProps({
    elementType: RadioInput,
    getSlotProps: () => getInputProps({ onChange: radioGroup.onChange }),
    externalSlotProps: componentsProps.input,
    className: classes.input,
    additionalProps: {
      type: 'radio',
      id,
      name,
      value: String(value),
    },
    ownerState,
  });

  const radioLabelProps = useSlotProps({
    elementType: RadioLabel,
    externalSlotProps: componentsProps.label,
    className: classes.label,
    ownerState,
    additionalProps: {
      htmlFor: id,
    },
  });

  return (
    <RadioRoot {...rootProps}>
      <RadioRadio {...radioProps}>
        {checked && !disableIcon && checkedIcon}
        {!checked && !disableIcon && uncheckedIcon}
        {!checkedIcon && !uncheckedIcon && !disableIcon && <RadioIcon {...radioIconProps} />}
        <RadioAction {...radioActionProps}>
          <RadioInput {...radioInputProps} />
        </RadioAction>
      </RadioRadio>
      {label && (
        <RadioLabel {...radioLabelProps}>
          {/* Automatically adjust the Typography to render `span` */}
          <TypographyContext.Provider value>{label}</TypographyContext.Provider>
        </RadioLabel>
      )}
    </RadioRoot>
  );
}) as OverridableComponent<RadioTypeMap>;

Radio.propTypes /* remove-proptypes */ = {
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
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    radio: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
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
   * @default false;
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
   * The icon to display when the component is not checked.
   */
  uncheckedIcon: PropTypes.node,
  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default Radio;
