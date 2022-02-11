import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useInput } from '@mui/base/InputUnstyled';
import { styled } from '../styles';
import { InputTypeMap, InputProps } from './InputProps';
import inputClasses, { getInputUtilityClass } from './inputClasses';

const DEFAULT_HEIGHT = 48;

const useUtilityClasses = (ownerState: InputProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    input: ['input'],
  };

  return composeClasses(slots, getInputUtilityClass, classes);
};

const InputRoot = styled('div', {
  name: 'MuiInput',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: InputProps }>(({ theme, ownerState }) => [
  {
    // CSS variables
    '--joy-Input-borderWidth': '2px',
    '--joy-Input-edgePadding': 'calc(1rem - var(--joy-Input-borderWidth))',
    ...(ownerState.size === 'small' && {
      '--joy-Input-height': '40px',
    }),
    ...(ownerState.size === 'large' && {
      '--joy-Input-height': '56px',
    }),
  },
  {
    // SvgIcon
    '--joy-SvgIcon-size': theme.fontSize.lg,
    ...(ownerState.startAdornment && {
      '--joy-SvgIcon-margin': '0 calc(var(--joy-Input-edgePadding) / 2) 0 0',
    }),
    ...(ownerState.endAdornment && {
      '--joy-SvgIcon-margin': '0 0 0 calc(var(--joy-Input-edgePadding) / 2)',
    }),
  },
  {
    boxSizing: 'border-box',
    minHeight: `var(--joy-Input-height, ${DEFAULT_HEIGHT}px)`,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: `0.5rem var(--joy-Input-edgePadding)`,
    color: theme.vars.palette.neutral[800],
    backgroundColor: theme.vars.palette.neutral[50],
    border: 'var(--joy-Input-borderWidth) solid',
    borderColor: theme.vars.palette.neutral[200],
    borderRadius: `calc(var(--joy-Input-height, ${DEFAULT_HEIGHT}px) / 2)`,
    '&:hover': {
      backgroundColor: theme.vars.palette.primary[100],
    },
    [`&.${inputClasses.focused}`]: {
      outline: '2px solid',
      outlineColor: theme.vars.palette.primary[200],
    },
    [`&.${inputClasses.disabled}`]: {
      cursor: 'default',
      pointerEvents: 'none',
      backgroundColor: '#fff',
      borderColor: theme.vars.palette.neutral[100],
      color: theme.vars.palette.neutral[300],
    },
  },
]);

const InputInput = styled('input', {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: InputProps }>(({ theme }) => ({
  border: 'none',
  outline: 0,
  padding: 0,
  flexGrow: 1,
  height: '100%',
  color: 'inherit',
  backgroundColor: 'transparent',
  ...theme.typography.body1,
  '&::placeholder': {
    color: theme.vars.palette.neutral[400],
  },
  [`&.${inputClasses.disabled}`]: {
    color: theme.vars.palette.neutral[300],
    '&::placeholder': {
      color: theme.vars.palette.neutral[300],
    },
  },
}));

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = inProps;

  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    component,
    defaultValue,
    disabled,
    endAdornment,
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
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    type,
  };

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

  return (
    <InputRoot
      ref={ref}
      {...getRootProps({ ...other })}
      className={clsx(classes.root, rootStateClasses, className)}
      ownerState={ownerState}
    >
      {startAdornment}
      <InputInput
        {...getInputProps(propsToForward)}
        className={clsx(classes.input, inputStateClasses)}
        ownerState={ownerState}
      />
      {endAdornment}
    </InputRoot>
  );
}) as OverridableComponent<InputTypeMap>;

export default Input;
