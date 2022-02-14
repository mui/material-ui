import * as React from 'react';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { useInput } from '@mui/base/InputUnstyled';
import { styled } from '../styles';
import { InputTypeMap, InputProps } from './InputProps';
import inputClasses, { getInputUtilityClass } from './inputClasses';

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
    '--Input-radius': '8px',
    '--Input-gutter': '0.75rem', // gutter is the padding-x
    '--Input-adornmentOffsetStep': 1, // negative margin of the start/end icon
    '--Input-height': '40px',
    '--Input-gap': '0.5rem',
    '--Input-adornmentColor': theme.vars.palette.text.secondary,
    ...(ownerState.size === 'sm' && {
      '--Input-height': '32px',
      '--Input-adornmentOffsetStep': 2, // negative margin of the start/end icon
    }),
    ...(ownerState.size === 'lg' && {
      '--Input-height': '48px',
      '--Input-gap': '0.75rem',
      '--Input-adornmentOffsetStep': 0, // negative margin of the start/end icon
    }),
    boxSizing: 'border-box',
    height: `var(--Input-height)`,
    cursor: 'text',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: `0.25rem var(--Input-gutter)`,
    borderRadius: 'var(--Input-radius)',
    '&:before': {
      boxSizing: 'border-box',
      content: '""',
      display: 'block',
      position: 'absolute',
      pointerEvents: 'none',
      margin: -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      borderRadius: 'inherit',
    },
    // border: '1px solid',
    // borderColor: theme.vars.palette[ownerState.color || 'neutral'].outlinedBorder,
    // '&:hover': {
    //   borderColor: theme.vars.palette[ownerState.color || 'neutral'].outlinedHoverBorder,
    // },
    // [`&.${inputClasses.focused}`]: {
    //   // ...theme.focus.default,
    //   borderColor: theme.vars.palette[ownerState.color || 'neutral'].outlinedActiveBorder,
    // },
    // [`&.${inputClasses.disabled}`]: {
    //   cursor: 'not-allowed',
    //   pointerEvents: 'none',
    //   backgroundColor: '#fff',
    // },
  },
  theme.variants[`${ownerState.variant!}`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
  {
    [`&.${inputClasses.focused}`]: {
      backgroundColor: theme.vars.palette[ownerState.color!]?.[50],
      borderColor: theme.vars.palette[ownerState.color!]?.[500],
      '&:before': {
        boxShadow: `0 0 0 1px ${theme.vars.palette[ownerState.color!]?.[500]}`,
      },
    },
    // override hover cursor
    cursor: 'text',
  },
]);

const InputInput = styled('input', {
  name: 'MuiInput',
  slot: 'Input',
  overridesResolver: (props, styles) => styles.input,
})<{ ownerState: InputProps }>(({ theme }) => ({
  border: 'none',
  outline: 0,
  padding: '0px min(calc(var(--Input-gap) / 2), 1rem)',
  margin: '0px max(calc(var(--Input-gap) / -2), -1rem)',
  flexGrow: 1,
  height: '100%',
  color: 'inherit',
  backgroundColor: 'transparent',
  fontSize: theme.vars.fontSize.md,
  borderRadius: 'calc(var(--Input-radius) - 0.25rem)', // make it looks good for auto-fill input
  '&::-webkit-input-placeholder': { opacity: 0.3, color: 'inherit' },
  '&::-moz-placeholder': { opacity: 0.3, color: 'inherit' }, // Firefox 19+
  '&:-ms-input-placeholder': { opacity: 0.3, color: 'inherit' }, // IE11
  '&::-ms-input-placeholder': { opacity: 0.3, color: 'inherit' }, // Edge
}));

const InputStartAdornment = styled('span', {
  name: 'MuiInput',
  slot: 'StartAdornment',
  overridesResolver: (props, styles) => styles.startIcon,
})<{ ownerState: InputProps }>({
  display: 'inherit',
  marginLeft: 'calc(var(--Input-gutter) * var(--Input-adornmentOffsetStep) * -0.25)',
  marginRight: 'var(--Input-gap)',
  color: 'var(--Input-adornmentColor)',
});

const InputEndAdornment = styled('span', {
  name: 'MuiInput',
  slot: 'EndAdornment',
  overridesResolver: (props, styles) => styles.endIcon,
})<{ ownerState: InputProps }>({
  display: 'inherit',
  marginLeft: 'var(--Input-gap)',
  marginRight: 'calc(var(--Input-gutter) * var(--Input-adornmentOffsetStep) * -0.25)',
  color: 'var(--Input-adornmentColor)',
});

const Input = React.forwardRef(function Input(inProps, ref) {
  const props = inProps;

  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    color = 'neutral',
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
    color,
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    type,
    variant,
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
      {startAdornment && (
        <InputStartAdornment ownerState={ownerState}>{startAdornment}</InputStartAdornment>
      )}
      <InputInput
        {...getInputProps(propsToForward)}
        className={clsx(classes.input, inputStateClasses)}
        ownerState={ownerState}
      />
      {endAdornment && (
        <InputEndAdornment ownerState={ownerState}>{endAdornment}</InputEndAdornment>
      )}
    </InputRoot>
  );
}) as OverridableComponent<InputTypeMap>;

export default Input;
