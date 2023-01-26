import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_useId as useId, unstable_capitalize as capitalize } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import FormLabel from '../FormLabel';
import FormHelperText from '../FormHelperText';
import JoyInput from '../Input';
import { styled, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import { TextFieldOwnerState, TextFieldTypeMap } from './TextFieldProps';
import textFieldClasses, { getTextFieldUtilityClass } from './textFieldClasses';

const useUtilityClasses = (ownerState: TextFieldOwnerState) => {
  const { error, disabled, variant, size, color, fullWidth } = ownerState;
  const slots = {
    root: [
      'root',
      error && 'error',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      variant && `variant${capitalize(variant)}`,
      size && `size${capitalize(size)}`,
      color && `color${capitalize(color)}`,
    ],
  };

  return composeClasses(slots, getTextFieldUtilityClass, {});
};

const TextFieldRoot = styled('div', {
  name: 'JoyTextField',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: TextFieldOwnerState }>(({ theme, ownerState }) => ({
  '--FormLabel-margin': '0 0 0.25rem 0',
  '--FormHelperText-margin': '0.25rem 0 0 0',
  '--FormLabel-asterisk-color': theme.vars.palette.danger[500],
  '--FormHelperText-color': theme.vars.palette[ownerState.color!]?.[500],
  ...(ownerState.size === 'sm' && {
    '--FormHelperText-fontSize': theme.vars.fontSize.xs,
    '--FormLabel-fontSize': theme.vars.fontSize.xs,
  }),
  [`&.${textFieldClasses.error}`]: {
    '--FormHelperText-color': theme.vars.palette.danger[500],
  },
  [`&.${textFieldClasses.disabled}`]: {
    '--FormLabel-color': theme.vars.palette[ownerState.color || 'neutral']?.plainDisabledColor,
    '--FormHelperText-color': theme.vars.palette[ownerState.color || 'neutral']?.plainDisabledColor,
  },
  display: 'flex',
  flexDirection: 'column',
  ...(ownerState.fullWidth && {
    width: '100%',
  }),
}));

const TextField = React.forwardRef(function TextField(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyTextField',
  });

  const {
    children,
    className,
    component,
    slots = {},
    slotProps = {},
    label,
    helperText,
    id: idOverride,
    autoComplete,
    autoFocus,
    placeholder,
    defaultValue,
    value,
    name,
    onBlur,
    onChange,
    onFocus,
    color,
    disabled = false,
    error = false,
    required = false,
    size = 'md',
    variant = 'outlined',
    fullWidth = false,
    type = 'text',
    startDecorator,
    endDecorator,
    ...other
  } = props;

  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const formLabelId = label && id ? `${id}-label` : undefined;

  const ownerState = {
    label,
    helperText,
    startDecorator,
    endDecorator,
    disabled,
    error,
    required,
    size,
    variant,
    fullWidth,
    type,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: TextFieldRoot,
    // @ts-ignore internal logic
    externalForwardedProps: { ...other, component, slots, slotProps },
    ownerState,
  });

  const Input = slots.input || JoyInput;

  return (
    // @ts-ignore neglect 'context' color
    <SlotRoot {...rootProps}>
      {label && (
        <FormLabel
          htmlFor={id}
          id={formLabelId}
          required={required}
          {...slotProps.label}
          {...(slots.label && {
            component: slots.label,
          })}
        >
          {label}
        </FormLabel>
      )}

      <Input
        {...slotProps.input}
        id={id}
        name={name}
        type={type}
        aria-describedby={helperTextId}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        required={required}
        color={color}
        size={size}
        fullWidth={fullWidth}
        variant={variant}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        startDecorator={startDecorator}
        endDecorator={endDecorator}
      />
      {helperText && (
        <FormHelperText
          id={helperTextId}
          {...slotProps.helperText}
          {...(slots.helperText && {
            component: slots.helperText,
          })}
        >
          {helperText}
        </FormHelperText>
      )}
    </SlotRoot>
  );
}) as OverridableComponent<TextFieldTypeMap>;

TextField.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  autoComplete: PropTypes.string,
  /**
   * @ignore
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'neutral'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'info', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  defaultValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * Trailing adornment for this input.
   */
  endDecorator: PropTypes.node,
  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The helper text content.
   */
  helperText: PropTypes.node,
  /**
   * The id of the `input` element.
   * Use this prop to make `label` and `helperText` accessible for screen readers.
   */
  id: PropTypes.string,
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * @ignore
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
   * @ignore
   */
  slotProps: PropTypes.shape({
    helperText: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * @ignore
   */
  slots: PropTypes.shape({
    helperText: PropTypes.elementType,
    input: PropTypes.elementType,
    label: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * Leading adornment for this input.
   */
  startDecorator: PropTypes.node,
  /**
   * @ignore
   */
  type: PropTypes /* @typescript-to-proptypes-ignore */.oneOf([
    'button',
    'checkbox',
    'color',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  /**
   * @ignore
   */
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.string,
  ]),
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default TextField;
