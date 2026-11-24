import * as React from 'react';
import Box from '@mui/material/Box';
import OTPField from '@mui/material/OTPField';

export default function OTPFieldState() {
  const [code, setCode] = React.useState('01');

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <OTPField
        label="Controlled"
        length={4}
        value={code}
        onValueChange={setCode}
        helperText={`${code.length} of 4 digits entered`}
      />
      <OTPField label="Uncontrolled" length={4} defaultValue="01" />
      {/* @focus-end */}
    </Box>
  );
}
