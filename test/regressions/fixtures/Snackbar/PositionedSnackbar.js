import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

export default function PositionedSnackbar() {
  return (
    <Box dir="ltr" sx={{ width: 400, padding: '50px 70px' }}>
      <Box>Snackbar - LTR orientation</Box>
      <Snackbar
        key="left"
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        message="Snackbar should show left (LTR)"
        open
      />
      <Snackbar
        key="right"
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        message="Snackbar should show right (LTR)"
        open
      />
    </Box>
  );
}
