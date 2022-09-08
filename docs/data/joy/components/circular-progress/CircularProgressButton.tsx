import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button startIcon={<CircularProgress size="sm" variant="solid" />}>
        Loading…
      </Button>
      <IconButton>
        <CircularProgress size="sm" />
      </IconButton>
    </Box>
  );
}
