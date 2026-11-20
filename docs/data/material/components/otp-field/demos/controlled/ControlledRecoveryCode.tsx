import * as React from 'react';
import OTPField, { OTPFieldInput, OTPFieldSeparator } from '@mui/material/OTPField';

export default function ControlledRecoveryCode() {
  // @focus-start @padding 1
  const [code, setCode] = React.useState('');

  return (
    <OTPField
      label="Recovery code"
      helperText={`${code.length} of 6 characters entered`}
      value={code}
      onValueChange={setCode}
      validationType="alphanumeric"
      normalizeValue={(value) => value.toUpperCase()}
    >
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldSeparator />
      <OTPFieldInput />
      <OTPFieldInput />
      <OTPFieldInput />
    </OTPField>
  );
  // @focus-end
}
