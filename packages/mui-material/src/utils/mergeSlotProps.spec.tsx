import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { mergeSlotProps } from '@mui/material/utils';

export function CustomTextField(props: TextFieldProps) {
  const { slotProps = {}, ...otherProps } = props;
  const TextFieldElement = (
    <TextField
      slotProps={{
        inputLabel: { shrink: true, ...slotProps.inputLabel },
        ...slotProps,
      }}
      {...otherProps}
    />
  );
  return TextFieldElement;
}
