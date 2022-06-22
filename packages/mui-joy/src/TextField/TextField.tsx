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
import { TextFieldProps, TextFieldTypeMap } from './TextFieldProps';
import textFieldClasses, { getTextFieldUtilityClass } from './textFieldClasses';

const useUtilityClasses = (ownerState: TextFieldProps) => {
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
})<{ ownerState: TextFieldProps }>(({ theme, ownerState }) => ({
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
    components = {},
    componentsProps = {},
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

  const Input = components.Input || JoyInput;

  return (
    <TextFieldRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      {label && (
        <FormLabel
          htmlFor={id}
          id={formLabelId}
          required={required}
          {...componentsProps.label}
          {...(components.Label && {
            component: components.Label,
          })}
        >
          {label}
        </FormLabel>
      )}

      <Input
        {...componentsProps.input}
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
          {...componentsProps.helperText}
          {...(components.HelperText && {
            component: components.HelperText,
          })}
        >
          {helperText}
        </FormHelperText>
      )}
    </TextFieldRoot>
  );
}) as OverridableComponent<TextFieldTypeMap>;

TextField.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
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
  components: PropTypes.shape({
    HelperText: PropTypes.elementType,
    Input: PropTypes.elementType,
    Label: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  componentsProps: PropTypes.shape({
    helperText: PropTypes.object,
    input: PropTypes.object,
    label: PropTypes.object,
    root: PropTypes.object,
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
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
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
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
   * Leading adornment for this input.
   */
  startDecorator: PropTypes.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'plain'
   */
  type: PropTypes.string,
  /**
   * The value of the `input` element, required for a controlled component.
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

export default TextField;
