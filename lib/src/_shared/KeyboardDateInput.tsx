import * as React from 'react';

import { IconButton } from '@material-ui/core';
import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/extendMui';
import { KeyboardIcon } from './icons/KeyboardIcon';

export interface KeyboardDateInputProps
  extends ExtendMui<BaseTextFieldProps, 'onError' | 'onChange' | 'value'> {
  // Properly extend different variants from mui textfield
  inputVariant?: TextFieldProps['variant'];
  inputValue: string;
  validationError: string;
}

const KeyboardDateInput: React.FunctionComponent<KeyboardDateInputProps> = ({
  inputValue,
  inputVariant,
  validationError,
  onClick,
  ...other
}) => {
  return (
    <TextField
      {...other}
      variant={inputVariant as any}
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
