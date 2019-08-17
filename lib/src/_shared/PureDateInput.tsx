import * as React from 'react';
import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/extendMui';

export type NotOverridableProps =
  | 'openPicker'
  | 'inputValue'
  | 'onChange'
  | 'format'
  | 'validationError'
  | 'format'
  | 'forwardedRef';

export interface PureDateInputProps
  extends ExtendMui<BaseTextFieldProps, 'variant' | 'onError' | 'onChange' | 'value'> {
  /** Pass material-ui text field variant down, bypass internal variant prop */
  inputVariant?: TextFieldProps['variant'];
  /** Override input component */
  TextFieldComponent?: React.ComponentType<TextFieldProps>;
  InputProps?: TextFieldProps['InputProps'];
  inputProps?: TextFieldProps['inputProps'];
  inputValue: string;
  validationError?: React.ReactNode;
  openPicker: () => void;
}

export const PureDateInput: React.FC<PureDateInputProps> = ({
  inputValue,
  inputVariant,
  validationError,
  InputProps,
  openPicker: onOpen,
  TextFieldComponent = TextField,
  ...other
}) => {
  const PureDateInputProps = React.useMemo(
    () => ({
      ...InputProps,
      readOnly: true,
    }),
    [InputProps]
  );

  return (
    <TextFieldComponent
      error={Boolean(validationError)}
      helperText={validationError}
      {...other}
      // do not overridable
      onClick={onOpen}
      value={inputValue}
      variant={inputVariant as any}
      InputProps={PureDateInputProps}
      onKeyDown={e => {
        // space
        if (e.keyCode === 32) {
          e.stopPropagation();
          onOpen();
        }
      }}
    />
  );
};

PureDateInput.displayName = 'PureDateInput';
