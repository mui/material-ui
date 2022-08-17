import { useInput } from '@mui/base/InputUnstyled';

export default function useForwardedInput<Output>(
  props: any,
  classes: { disabled: string; error: string; focused: string; formControl: string },
) {
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

  const { getRootProps, getInputProps, focused, formControlContext, error, disabled } = useInput({
    disabled: disabledProp,
    defaultValue,
    error: errorProp,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value,
  });

  const rootStateClasses = {
    [classes.disabled]: disabled,
    [classes.error]: error,
    [classes.focused]: focused,
    [classes.formControl]: Boolean(formControlContext),
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
    id,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type,
  };
  return {
    propsToForward,
    rootStateClasses,
    inputStateClasses,
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error,
    disabled,
    ...other,
  } as {
    propsToForward: Record<string, any>;
    rootStateClasses: Record<string, any>;
    inputStateClasses: Record<string, any>;
  } & ReturnType<typeof useInput> &
    Output;
}
