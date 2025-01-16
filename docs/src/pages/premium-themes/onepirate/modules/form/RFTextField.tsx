import * as React from 'react';
import type { FieldRenderProps } from 'react-final-form';
import type { OnePirateTextFieldProps } from '../components/TextField';
import TextField from '../components/TextField';

function RFTextField(
  props: OnePirateTextFieldProps & FieldRenderProps<string, HTMLElement>,
) {
  const {
    autoComplete,
    input,
    InputProps,
    meta: { touched, error, submitError },
    ...other
  } = props;

  return (
    <TextField
      error={Boolean(!!touched && (error || submitError))}
      {...input}
      {...other}
      InputProps={{
        inputProps: {
          autoComplete,
        },
        ...InputProps,
      }}
      helperText={touched ? error || submitError : ''}
      variant="standard"
    />
  );
}

export default RFTextField;
