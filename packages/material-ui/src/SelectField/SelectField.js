import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { refType } from '@material-ui/utils';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import Input from '../Input';
import FilledInput from '../FilledInput';
import OutlinedInput from '../OutlinedInput';
import InputLabel from '../InputLabel';
import FormControl from '../FormControl';
import FormHelperText from '../FormHelperText';
import Select from '../Select';
import { getSelectFieldUtilityClasses } from './selectFieldClasses';

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getSelectFieldUtilityClasses, classes);
};

const SelectFieldRoot = experimentalStyled(
  FormControl,
  {},
  {
    name: 'MuiSelectField',
    slot: 'Root',
    overridesResolver: (props, styles) => styles.root,
  },
)({});

const SelectField = React.forwardRef(function SelectField(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiSelectField' });

  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color = 'primary',
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps,
    fullWidth = false,
    helperText,
    id,
    InputLabelProps,
    inputProps,
    InputProps,
    inputRef,
    label,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    SelectProps,
    value,
    variant = 'outlined',
    ...other
  } = props;

  const styleProps = {
    ...props,
    autoFocus,
    color,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;
  const InputComponent = variantComponent[variant];
  const InputMore = {};
  if (!SelectProps || !SelectProps.native) {
    InputMore.id = undefined;
  }
  InputMore['aria-describedby'] = undefined;
  return (
    <SelectFieldRoot ref={ref} className={clsx(classes.root, className)} {...other}>
      {label && (
        <InputLabel htmlFor={id} id={inputLabelId} {...InputLabelProps}>
          {label}
        </InputLabel>
      )}

      <Select
        aria-describedby={helperTextId}
        id={id}
        labelId={inputLabelId}
        value={value}
        input={
          <InputComponent
            aria-describedby={helperTextId}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            fullWidth={fullWidth}
            multiline={multiline}
            name={name}
            value={value}
            id={id}
            inputRef={inputRef}
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder={placeholder}
            inputProps={inputProps}
            {...InputMore}
            {...InputProps}
          />
        }
        {...SelectProps}
      >
        {children}
      </Select>

      {helperText && (
        <FormHelperText id={helperTextId} {...FormHelperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </SelectFieldRoot>
  );
});

SelectField.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
};

export default SelectField;
