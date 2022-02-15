import * as React from 'react';
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
    '--Input-adornment-offset': 'calc(var(--Input-gutter) / 4)', // negative margin of the start/end adornment
    '--Input-focusedOutlinedThickness': 'calc(var(--variant-outlinedBorderWidth, 1px) + 1px)',
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
  theme.variants[`${ownerState.variant!}`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  {
    color: theme.vars.palette[ownerState.color!]?.overrideTextPrimary,
    [`&.${inputClasses.focused}`]: {
      backgroundColor: 'initial',
      '&:before': {
        boxShadow: `inset 0 0 0 var(--Input-focusedOutlinedThickness) ${
          theme.vars.palette[ownerState.color!]?.[500]
        }`,
      },
    },
    // override pointer cursor from variantHover
    cursor: 'text',
  },
]);

const InputInput = styled('input', {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: InputProps & InputOwnerState }>({
  border: 'none',
  minWidth: 0, // reset the native input width
  outline: 0,
  margin: '0px max(calc(var(--Input-gap) / -2), -1rem)', // for auto-filled input to have space on the edge
  padding: '0px min(calc(var(--Input-gap) / 2), 1rem)', // for auto-filled input to have space on the edge
  borderRadius: 'calc(var(--Input-radius) - 0.25rem)', // for auto-filled input
  flex: 1,
  alignSelf: 'stretch',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontSize: 'inherit',
  '&::-webkit-input-placeholder': { opacity: 0.5, color: 'inherit' },
  '&::-moz-placeholder': { opacity: 0.5, color: 'inherit' }, // Firefox 19+
  '&:-ms-input-placeholder': { opacity: 0.5, color: 'inherit' }, // IE11
  '&::-ms-input-placeholder': { opacity: 0.5, color: 'inherit' }, // Edge
});

const InputStartAdornment = styled('span', {
  name: 'MuiInput',
  slot: 'StartAdornment',
  overridesResolver: (props, styles) => styles.startIcon,
})<{ ownerState: InputProps & InputOwnerState }>(({ theme, ownerState }) => ({
  display: 'inherit',
  marginLeft: 'calc(var(--Input-adornment-offset) * -1)',
  marginRight: 'var(--Input-gap)',
  color: theme.vars.palette.text.tertiary,
  ...(ownerState.focused && {
    color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
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
  color: theme.vars.palette[ownerState.color!]?.[`${ownerState.variant!}Color`],
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
    color = 'neutral',
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

export default Input;
