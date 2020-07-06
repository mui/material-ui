import React, { useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { DesktopDatePicker } from '@material-ui/pickers';

const InputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

function CustomInput() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <DesktopDatePicker
      label="Advanced keyboard"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
      renderInput={({ inputRef, inputProps, InputProps }) => (
        <InputContainer>
          <input ref={inputRef} {...inputProps} />
          {InputProps?.endAdornment}
        </InputContainer>
      )}
    />
  );
}

export default CustomInput;
