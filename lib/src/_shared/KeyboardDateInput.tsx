import * as React from 'react';

import { IconButton } from '@material-ui/core';
import { IconButtonProps } from '@material-ui/core/IconButton';
import InputAdornment, { InputAdornmentProps } from '@material-ui/core/InputAdornment';
import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/extendMui';
import { KeyboardIcon } from './icons/KeyboardIcon';

export interface KeyboardDateInputProps
  extends ExtendMui<BaseTextFieldProps, 'onError' | 'onChange' | 'value'> {
  // Properly extend different variants from mui textfield
  inputVariant?: TextFieldProps['variant'];
  inputValue: string;
  validationError?: React.ReactNode;
  /** Props to pass to keyboard input adornment */
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  /** Props to pass to keyboard adornment button */
  KeyboardButtonProps?: Partial<IconButtonProps>;
}

const KeyboardDateInput: React.FunctionComponent<KeyboardDateInputProps> = ({
  inputValue,
  inputVariant,
  validationError,
  KeyboardButtonProps,
  InputAdornmentProps, // tslint:disable-line
  onClick,
  ...other
}) => {
  const position =
    InputAdornmentProps && InputAdornmentProps.position ? InputAdornmentProps.position : 'end';

  return (
    <TextField
      error={Boolean(validationError)}
      helperText={validationError}
      {...other}
      value={inputValue}
      variant={inputVariant as any}
      InputProps={{
        [`${position}Adornment`]: (
          <InputAdornment position={position} {...InputAdornmentProps}>
            <IconButton {...KeyboardButtonProps} onClick={onClick}>
              <KeyboardIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default KeyboardDateInput;
