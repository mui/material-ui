import * as React from 'react';

import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/extendMui';

export interface PureDateInputProps
  extends ExtendMui<BaseTextFieldProps, 'variant' | 'onError' | 'onChange' | 'value'> {
  // Properly extend different variants from mui textfield
  inputVariant?: TextFieldProps['variant'];
  inputValue: string;
  validationError?: React.ReactNode;
}

// Do not recreate new object each render
const PureDateInputProps = { readOnly: true };

export const PureDateInput: React.FC<PureDateInputProps> = ({
  inputValue,
  inputVariant,
  validationError,
  ...other
}) => {
  return (
    <TextField
      variant={inputVariant as any}
      error={Boolean(validationError)}
      helperText={validationError}
      InputProps={PureDateInputProps}
      {...other}
      value={inputValue}
    />
  );
};

PureDateInput.displayName = 'PureDateInput';
