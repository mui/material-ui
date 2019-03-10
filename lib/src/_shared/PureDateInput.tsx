import * as React from 'react';

import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/extendMui';

export interface PureDateInputProps
  extends ExtendMui<BaseTextFieldProps, 'onError' | 'onChange' | 'value'> {
  // Properly extend different variants from mui textfield
  variant?: TextFieldProps['variant'];
  inputValue: string;
  validationError: string;
}

// Do not recreate new object each render
const PureDateInputProps = { readOnly: true };

export const PureDateInput: React.FunctionComponent<PureDateInputProps> = ({
  inputValue,
  variant,
  validationError,
  ...other
}) => {
  return (
    <TextField
      {...other}
      value={inputValue}
      error={Boolean(validationError)}
      helperText={validationError}
      InputProps={PureDateInputProps}
    />
  );
};
