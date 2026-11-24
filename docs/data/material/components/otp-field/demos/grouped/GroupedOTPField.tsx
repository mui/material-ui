import OTPField, { OTPFieldInput, OTPFieldSeparator } from '@mui/material/OTPField';

export default function GroupedOTPField() {
  return (
    // @focus-start @padding 2
    <OTPField
      label="Recovery code"
      helperText="Enter the six characters on your recovery card."
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
    // @focus-end
  );
}
