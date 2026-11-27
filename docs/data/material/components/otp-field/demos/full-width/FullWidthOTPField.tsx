import Box from '@mui/material/Box';
import OTPField from '@mui/material/OTPField';

export default function FullWidthOTPField() {
  return (
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      {/* @focus */}
      <OTPField label="Full width" fullWidth />
    </Box>
  );
}
