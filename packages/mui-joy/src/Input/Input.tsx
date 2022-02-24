import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { appendOwnerState } from '@mui/base/utils';
import { useInput, InputOwnerState } from '@mui/base/InputUnstyled';
import { styled, useThemeProps } from '../styles';
import { InputTypeMap, InputProps } from './InputProps';
import inputClasses, { getInputUtilityClass } from './inputClasses';

const useUtilityClasses = (ownerState: InputProps) => {
  const { classes, disabled, fullWidth, variant, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      fullWidth && 'fullWidth',
      variant && `variant${capitalize(variant)}`,
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    input: ['input'],
    startAdornment: ['startAdornment'],
    endAdornment: ['endAdornment'],
  };

  return composeClasses(slots, getInputUtilityClass, classes);
};

const InputRoot = styled('div', {
  name: 'MuiInput',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: InputProps & InputOwnerState }>(({ theme, ownerState }) => [
  {
    '--Input-radius': theme.vars.radius.sm, // radius is used by
    '--Input-gutter': '0.75rem', // gutter is the padding-x
    '--Input-height': '40px',
    '--Input-gap': '0.5rem',
    '--Input-placeholderOpacity': 0.5,
    '--Input-adornment-offset': 'calc(var(--Input-gutter) / 4)', // negative margin of the start/end adornment
    '--Input-focusedThickness': 'calc(var(--variant-outlinedBorderWidth, 1px) + 1px)',
    ...(ownerState.size === 'sm' && {
      '--Input-gutter': '0.5rem',
      '--Input-height': '32px',
    }),
    ...(ownerState.size === 'lg' && {
      '--Input-gutter': '1rem',
      '--Input-height': '48px',
      '--Input-gap': '0.75rem',
    }),
    boxSizing: 'border-box',
    height: `var(--Input-height)`,
    minWidth: 0, // forces the Input to stay inside a container by default
    ...(ownerState.fullWidth && {
      width: '100%',
    }),
    cursor: 'text',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: `0.25rem var(--Input-gutter)`,
    borderRadius: 'var(--Input-radius)',
    fontSize: theme.vars.fontSize.md,
    ...(ownerState.size === 'sm' && {
      fontSize: theme.vars.fontSize.sm,
    }),
    // TODO: discuss the transition approach in a separate PR. This value is copied from mui-material Button.
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:before': {
      boxSizing: 'border-box',
      content: '""',
      display: 'block',
      position: 'absolute',
      pointerEvents: 'none',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      borderRadius: 'inherit',
      margin: 'calc(var(--variant-outlinedBorderWidth) * -1)', // for outlined variant
    },
  },
  theme.variants[`${ownerState.variant!}`]?.[ownerState.color || 'neutral'],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color || 'neutral'],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color || 'neutral'],
  ownerState.variant !== 'contained' && {
    color: theme.vars.palette[ownerState.color || 'neutral']?.overrideTextPrimary,
    [`&.${inputClasses.focused}`]: {
      backgroundColor: 'initial',
      '&:before': {
        boxShadow: `inset 0 0 0 var(--Input-focusedThickness) ${
          theme.vars.palette[ownerState.color || 'primary']?.[500]
        }`,
      },
    },
  },
  {
    // override pointer cursor from variantHover
    cursor: 'text',
  },
]);

const InputInput = styled('input', {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: InputProps & InputOwnerState }>(({ theme, ownerState }) => ({
  border: 'none', // remove the native input width
  minWidth: 0, // remove the native input width
  outline: 0, // remove the native input outline
  padding: 0, // remove the native input padding
  flex: 1,
  alignSelf: 'stretch',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontSize: 'inherit',
  '&:-webkit-autofill': {
    WebkitBackgroundClip: 'text', // remove autofill background
    WebkitTextFillColor: theme.vars.palette[ownerState.color || 'neutral']?.overrideTextPrimary,
  },
  '&::-webkit-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' },
  '&::-moz-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // Firefox 19+
  '&:-ms-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // IE11
  '&::-ms-input-placeholder': { opacity: 'var(--Input-placeholderOpacity)', color: 'inherit' }, // Edge
}));

const InputStartAdornment = styled('span', {
  name: 'MuiInput',
  slot: 'StartAdornment',
  overridesResolver: (props, styles) => styles.startIcon,
})<{ ownerState: InputProps & InputOwnerState }>(({ theme, ownerState }) => ({
  pointerEvents: 'none', // to make the input focused when click on the element because start element usually is an icon
  display: 'inherit',
  marginLeft: 'calc(var(--Input-adornment-offset) * -1)',
  marginRight: 'var(--Input-gap)',
  color: theme.vars.palette.text.tertiary,
  ...(ownerState.focused && {
    color: theme.vars.palette[ownerState.color || 'neutral']?.[`${ownerState.variant!}Color`],
  }),
}));

const InputEndAdornment = styled('span', {
  name: 'MuiInput',
  slot: 'EndAdornment',
  overridesResolver: (props, styles) => styles.endIcon,
})<{ ownerState: InputProps & InputOwnerState }>(({ theme, ownerState }) => ({
  display: 'inherit',
  marginLeft: 'var(--Input-gap)',
  marginRight: 'calc(var(--Input-adornment-offset) * -1)',
  color: theme.vars.palette[ownerState.color || 'neutral']?.[`${ownerState.variant!}Color`],
}));

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'MuiInput',
  });

  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    color,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    fullWidth = false,
    error,
    id,
    inputRef,
    name,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    type = 'text',
    startAdornment,
    value,
    variant = 'outlined',
    ...other
  } = props;

  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState,
  } = useInput(
    {
      disabled,
      defaultValue,
      error,
      onBlur,
      onClick,
      onChange,
      onFocus,
      required,
      value,
    },
    inputRef,
  );

  const ownerState = {
    ...props,
    fullWidth,
    color: error ? 'danger' : color,
    disabled: disabledState,
    error: errorState,
    focused,
    formControl: formControlContext!,
    type,
    variant,
  };

  const rootStateClasses = {
    [inputClasses.disabled]: disabledState,
    [inputClasses.error]: errorState,
    [inputClasses.focused]: focused,
    [inputClasses.formControl]: Boolean(formControlContext),
    [inputClasses.adornedStart]: Boolean(startAdornment),
    [inputClasses.adornedEnd]: Boolean(endAdornment),
  };

  const inputStateClasses = {
    [inputClasses.disabled]: disabledState,
  };

  const classes = useUtilityClasses(ownerState);

  const propsToForward = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type,
  };

  const Root = component ?? InputRoot;
  const rootProps = appendOwnerState(
    Root,
    {
      ...getRootProps({ ...other, ...componentsProps.root }),
      className: clsx(classes.root, rootStateClasses, className, componentsProps.root?.className),
    },
    ownerState,
  );

  const InputComponent = components.Input ?? InputInput;
  const inputProps = appendOwnerState(
    InputComponent,
    {
      ...getInputProps({ ...componentsProps.input, ...propsToForward }),
      className: clsx(classes.input, inputStateClasses, componentsProps.input?.className),
    },
    ownerState,
  );

  return (
    <Root ref={ref} {...rootProps}>
      {startAdornment && (
        <InputStartAdornment className={classes.startAdornment} ownerState={ownerState}>
          {startAdornment}
        </InputStartAdornment>
      )}

      <InputComponent {...inputProps} />
      {endAdornment && (
        <InputEndAdornment className={classes.endAdornment} ownerState={ownerState}>
          {endAdornment}
        </InputEndAdornment>
      )}
    </Root>
  );
}) as OverridableComponent<InputTypeMap>;

Input.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  'aria-describedby': PropTypes.string,
  /**
   * @ignore
   */
  'aria-label': PropTypes.string,
  /**
   * @ignore
   */
  'aria-labelledby': PropTypes.string,
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
   * Class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
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
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
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
  endAdornment: PropTypes.node,
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
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Pass a ref to the `input` element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
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
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,
  /**
   * Leading adornment for this input.
   */
  startAdornment: PropTypes.node,
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
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
    PropTypes.oneOf(['contained', 'light', 'outlined', 'text']),
    PropTypes.string,
  ]),
} as any;

export default Input;
