import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_useId as useId } from '@mui/utils';
import composeClasses from '@mui/base/composeClasses';
import FormLabel from '../FormLabel';
import FormHelperText from '../FormHelperText';
import Input from '../Input';
import { styled, useThemeProps } from '../styles';
import { TextFieldProps, TextFieldTypeMap } from './TextFieldProps';
import textFieldClasses, { getTextFieldUtilityClass } from './textFieldClasses';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTextFieldUtilityClass, {});
};

const TextFieldRoot = styled('div', {
  name: 'MuiTextField',
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
    '--FormLabel-color': theme.vars.palette[ownerState.color || 'neutral']?.textDisabledColor,
    '--FormHelperText-color': theme.vars.palette[ownerState.color || 'neutral']?.textDisabledColor,
  },
  display: 'flex',
  flexDirection: 'column',
}));

const TextField = React.forwardRef(function TextField(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiTextField',
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
    inputRef,
    color,
    disabled = false,
    error = false,
    required = false,
    size = 'md',
    variant = 'outlined',
    startAdornment,
    endAdornment,
    ...other
  } = props;

  const id = useId(idOverride);
  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const formLabelId = label && id ? `${id}-label` : undefined;

  const ownerState = {
    label,
    helperText,
    startAdornment,
    endAdornment,
    disabled,
    error,
    required,
    size,
    variant,
    ...props,
  };

  const classes = useUtilityClasses();

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
          {...componentsProps.label}
          {...(components.Label && {
            component: components.Label,
          })}
        >
          {label}
        </FormLabel>
      )}
      <Input
        id={id}
        inputRef={inputRef}
        aria-describedby={helperTextId}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        error={error}
        required={required}
        color={color}
        size={size}
        variant={variant}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        components={{
          Root: components.InputRoot,
          Input: components.InputInput,
        }}
        componentsProps={{
          root: componentsProps.root,
          input: componentsProps.inputInput,
        }}
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
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
} as any;

export default TextField;
