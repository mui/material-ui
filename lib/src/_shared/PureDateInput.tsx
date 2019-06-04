import * as React from 'react';
import TextField, { BaseTextFieldProps, TextFieldProps } from '@material-ui/core/TextField';
import { ExtendMui } from '../typings/extendMui';

export interface PureDateInputProps
  extends ExtendMui<BaseTextFieldProps, 'variant' | 'onError' | 'onChange' | 'value'> {
  /** Pass material-ui text field variant down, bypass internal variant prop */
  inputVariant?: TextFieldProps['variant'];
  /** Override input component */
  TextFieldComponent?: React.ComponentType<TextFieldProps>;
  InputProps?: TextFieldProps['InputProps'];
  inputValue: string;
  validationError?: React.ReactNode;
}

export const PureDateInput: React.FC<PureDateInputProps> = ({
  inputValue,
  inputVariant,
  validationError,
  InputProps,
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
      value={inputValue}
      variant={inputVariant as any}
      InputProps={PureDateInputProps}
    />
  );
};

PureDateInput.displayName = 'PureDateInput';
