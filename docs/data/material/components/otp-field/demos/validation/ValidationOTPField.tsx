import * as React from 'react';
import OTPField from '@mui/material/OTPField';

export default function ValidationOTPField() {
  // @focus-start @padding 1
  const [error, setError] = React.useState(false);

  return (
    <OTPField
      label="Device code"
      length={4}
      fullWidth
      sx={{ maxWidth: 256 }}
      error={error}
      helperText={
        error ? 'Use digits 0–9.' : 'Enter the four digits on your device.'
      }
      onValueInvalid={() => setError(true)}
      onValueChange={() => setError(false)}
    />
  );
  // @focus-end
}
