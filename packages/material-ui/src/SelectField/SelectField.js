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
    native = false,
    multiple = false,
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
    multiple,
    required,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  const helperTextId = helperText && id ? `${id}-helper-text` : undefined;
  const inputLabelId = label && id ? `${id}-label` : undefined;
  const InputComponent = variantComponent[variant];
  const InputMore = {};
  if (variant === 'outlined') {
    if (InputLabelProps && typeof InputLabelProps.shrink !== 'undefined') {
      InputMore.notched = InputLabelProps.shrink;
    }
    if (label) {
      const displayRequired = InputLabelProps?.required ?? required;
      InputMore.label = (
        <React.Fragment>
          {label}
          {displayRequired && '\u00a0*'}
        </React.Fragment>
      );
    }
  }
  if (!native) {
    InputMore.id = undefined;
  }
  InputMore['aria-describedby'] = undefined;
  return (
    <SelectFieldRoot
      className={clsx(classes.root, className)}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      ref={ref}
      required={required}
      color={color}
      variant={variant}
      styleProps={styleProps}
      {...other}
    >
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
        native={native}
        multiple={multiple}
        input={
          <InputComponent
            aria-describedby={helperTextId}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            defaultValue={defaultValue}
            fullWidth={fullWidth}
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

SelectField.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['primary', 'secondary']),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * Props applied to the [`FormHelperText`](/api/form-helper-text/) element.
   */
  FormHelperTextProps: PropTypes.object,
  /**
   * If `true`, the input will take up the full width of its container.
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
   * Props applied to the [`InputLabel`](/api/input-label/) element.
   */
  InputLabelProps: PropTypes.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/api/filled-input/),
   * [`OutlinedInput`](/api/outlined-input/) or [`Input`](/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: PropTypes.object,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * If `true`, `value` must be an array and the menu will support multiple selections.
   * @default false
   */
  multiple: PropTypes.bool,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * If `true`, the component uses a native `select` element.
   * @default false
   */
  native: PropTypes.bool,
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
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * Props applied to the [`Select`](/api/select/) element.
   */
  SelectProps: PropTypes.object,
  /**
   * The size of the component.
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * @ignore
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default SelectField;
