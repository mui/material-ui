import Box from '@mui/material/Box';
import OTPField from '@mui/material/OTPField';

export default function OTPFieldSizes() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 3 }}>
      {/* @focus-start */}
      <OTPField label="Small" length={4} defaultValue="0123" size="small" />
      <OTPField label="Medium" length={4} defaultValue="0123" />
      {/* @focus-end */}
    </Box>
  );
}
