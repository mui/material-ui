import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import { DesktopDatePicker } from '@material-ui/pickers';

const InputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export default function CustomInput() {
  const [value, setValue] = React.useState(new Date());

  return (
    <DesktopDatePicker
      label="Advanced keyboard"
      value={value}
      onChange={(newValue) => setValue(newValue)}
      renderInput={({ inputRef, inputProps, InputProps }) => (
        <InputContainer>
          <input ref={inputRef} {...inputProps} />
          {InputProps?.endAdornment}
        </InputContainer>
      )}
    />
  );
}
