import Box from '@mui/material/Box';
import OTPField from '@mui/material/OTPField';

export default function FormPropsOTPFields() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <OTPField label="Required" length={4} required />
      <OTPField label="Disabled" length={4} defaultValue="0123" disabled />
      <OTPField label="Read only" length={4} defaultValue="0123" readOnly />
      <OTPField label="Masked" length={4} defaultValue="01" mask />
      {/* @focus-end */}
    </Box>
  );
}
