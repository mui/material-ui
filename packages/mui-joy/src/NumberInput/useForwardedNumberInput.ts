'use client';
import * as React from 'react';
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';
import FormControlContext, { FormControlContextValue } from '../FormControl/FormControlContext';

export default function useForwardedInput<Output>(
  props: any,
  classes: { disabled: string; error: string; focused: string; formControl: string },
) {
  const formControl = React.useContext(FormControlContext);
  const {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    defaultValue,
    disabled: disabledProp,
    error: errorProp,
    id,
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
    type,
    value,
    ...other
  } = props;

  const { getRootProps, getInputProps, focused, error, disabled } = useNumberInput({
    disabled: disabledProp ?? formControl?.disabled,
    defaultValue,
    error: errorProp,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required: required ?? formControl?.required,
    value,
  });

  const rootStateClasses = {
    [classes.disabled]: disabled,
    [classes.error]: error,
    [classes.focused]: focused,
    [classes.formControl]: Boolean(formControl),
    [className!]: className,
  };

  const inputStateClasses = {
    [classes.disabled]: disabled,
  };

  const propsToForward = {
    'aria-describedby': ariaDescribedby,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    autoComplete,
    autoFocus,
    disabled,
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type,
  };
  return {
    formControl,
    propsToForward,
    rootStateClasses,
    inputStateClasses,
    getRootProps,
    getInputProps,
    focused,
    error,
    disabled,
    ...other,
  } as {
    propsToForward: Record<string, any>;
    rootStateClasses: Record<string, any>;
    inputStateClasses: Record<string, any>;
  } & ReturnType<typeof useNumberInput> &
    Output & { formControl: FormControlContextValue };
}
