import * as React from 'react';

import { IconButton } from '@material-ui/core';
import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/extendMui';
import { KeyboardIcon } from './icons/KeyboardIcon';

export interface PureDateInputProps
  extends ExtendMui<BaseTextFieldProps, 'onError' | 'onChange' | 'value'> {
  // Properly extend different variants from mui textfield
  variant?: TextFieldProps['variant'];
  inputValue: string;
  validationError: string;
}

const KeyboardDateInput: React.FunctionComponent<PureDateInputProps> = ({
  inputValue,
  variant,
  validationError,
  onClick,
  ...other
}) => {
  return (
    <TextField
      {...other}
      value={inputValue}
      error={Boolean(validationError)}
      helperText={validationError}
      InputProps={{
        endAdornment: (
          <IconButton onClick={onClick}>
            <KeyboardIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default KeyboardDateInput;
