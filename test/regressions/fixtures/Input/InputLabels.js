import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';

function InputLabels() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '20px', // so transform doesn't let things get cut off
      }}
    >
      <InputLabel shrink>First Name Shrunk</InputLabel>
      <InputLabel>First Name</InputLabel>
      <InputLabel focused>Required</InputLabel>
      <InputLabel focused required>
        Focused Required
      </InputLabel>
      <InputLabel required>Required</InputLabel>
      <InputLabel error>Error</InputLabel>
      <InputLabel required error>
        Required Error
      </InputLabel>
    </Box>
  );
}

export default InputLabels;
