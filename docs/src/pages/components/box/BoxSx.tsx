import * as React from 'react';
import Box from '@material-ui/core/Box';

export default function BoxSx() {
  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        bgcolor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    />
  );
}
