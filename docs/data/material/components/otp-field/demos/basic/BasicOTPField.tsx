import OTPField from '@mui/material/OTPField';

export default function BasicOTPField() {
  return (
    // @focus-start @padding 2
    <OTPField
      label="Verification code"
      helperText="Enter the six-digit code from your text message."
    />
    // @focus-end
  );
}
