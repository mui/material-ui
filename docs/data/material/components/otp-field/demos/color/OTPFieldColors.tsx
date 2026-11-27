import Box from '@mui/material/Box';
import OTPField from '@mui/material/OTPField';

export default function OTPFieldColors() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <OTPField label="Secondary" length={4} color="secondary" />
      <OTPField label="Success" length={4} color="success" />
      {/* @focus-end */}
    </Box>
  );
}
