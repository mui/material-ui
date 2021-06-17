import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Fingerprint from '@material-ui/icons/Fingerprint';

export default function IconButtonSizes() {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
      {(
        ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const
      ).map((color) => (
        <IconButton aria-label="delete" color={color} key={color}>
          <Fingerprint />
        </IconButton>
      ))}
    </Box>
  );
}
