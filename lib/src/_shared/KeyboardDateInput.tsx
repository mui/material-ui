import * as React from 'react';
import InputAdornment, { InputAdornmentProps } from '@material-ui/core/InputAdornment';
import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { Rifm } from 'rifm';
import { IconButton } from '@material-ui/core';
import { ExtendMui } from '../typings/extendMui';
import { KeyboardIcon } from './icons/KeyboardIcon';
import { IconButtonProps } from '@material-ui/core/IconButton';
import { makeMaskFromFormat, maskedDateFormatter } from '../_helpers/text-field-helper';

export interface KeyboardDateInputProps
  extends ExtendMui<BaseTextFieldProps, 'variant' | 'onError' | 'onChange' | 'value'> {
  format: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  validationError?: React.ReactNode;
  inputValue: string;
  InputProps?: TextFieldProps['InputProps'];
  /** Icon displaying for open picker button */
  keyboardIcon?: React.ReactNode;
  /** Pass material-ui text field variant down, bypass internal variant prop */
  inputVariant?: TextFieldProps['variant'];
  /**
   * Custom mask. Can be used to override generate from format. (e.g. __/__/____ __:__)
   */
  mask?: string;
  /**
   * Char string that will be replaced with number (for "_" mask will be "__/__/____")
   * @default '_'
   */
  maskChar?: string;
  /**
   * Refuse values regexp
   * @default /[^\dap]+/gi
   */
  refuse?: RegExp;
  /**
   * Props to pass to keyboard input adornment
   * @type {Partial<InputAdornmentProps>}
   */
  InputAdornmentProps?: Partial<InputAdornmentProps>;
  /**
   * Props to pass to keyboard adornment button
   * @type {Partial<IconButtonProps>}
   */
  KeyboardButtonProps?: Partial<IconButtonProps>;
}

const KeyboardDateInput: React.FunctionComponent<KeyboardDateInputProps> = ({
  inputValue,
  inputVariant,
  validationError,
  KeyboardButtonProps,
  InputAdornmentProps,
  onClick,
  onChange,
  InputProps,
  mask,
  maskChar = '_',
  refuse = /[^\dap]+/gi,
  format,
  keyboardIcon,
  disabled,
  ...other
}) => {
  const inputMask = mask || makeMaskFromFormat(format, maskChar);
  // prettier-ignore
  const formatter = React.useCallback(
    maskedDateFormatter(inputMask, maskChar, refuse),
    [mask, maskChar]
  );

  const position =
    InputAdornmentProps && InputAdornmentProps.position ? InputAdornmentProps.position : 'end';

  return (
    <Rifm value={inputValue} onChange={onChange} refuse={refuse} format={formatter}>
      {({ onChange, value }) => (
        <TextField
          disabled={disabled}
          error={Boolean(validationError)}
          helperText={validationError}
          {...other}
          value={value}
          onChange={onChange}
          variant={inputVariant as any}
          InputProps={{
            ...InputProps,
            [`${position}Adornment`]: (
              <InputAdornment position={position} {...InputAdornmentProps}>
                <IconButton disabled={disabled} {...KeyboardButtonProps} onClick={onClick}>
                  {keyboardIcon}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </Rifm>
  );
};

KeyboardDateInput.defaultProps = {
  keyboardIcon: <KeyboardIcon />,
};

export default KeyboardDateInput;
