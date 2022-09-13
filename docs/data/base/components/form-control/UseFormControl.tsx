import * as React from 'react';
import FormControlUnstyled from '@mui/base/FormControlUnstyled';
import useFormControlUnstyledContext from '@mui/base/useFormControlUnstyledContext';

function CustomInput() {
  const formControlContext = useFormControlUnstyledContext();

  if (formControlContext === undefined) {
    return null;
  }

  const { value, required, onChange, disabled, onFocus, onBlur } =
    formControlContext;

  return (
    <input
      value={value as string}
      required={required}
      onChange={onChange}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

function ControlStateDisplay() {
  const formControlContext = useFormControlUnstyledContext();
  if (formControlContext === undefined) {
    return null;
  }

  const { filled, focused } = formControlContext;

  return (
    <p>
      {filled ? 'filled' : 'empty'}&nbsp;|&nbsp;
      {focused ? 'focused' : 'not focused'}
    </p>
  );
}

export default function UseFormControl() {
  return (
    <FormControlUnstyled defaultValue="" required>
      <CustomInput />
      <ControlStateDisplay />
    </FormControlUnstyled>
  );
}
