import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export default function CircularProgressColors() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <CircularProgress color="primary" />
      <CircularProgress color="neutral" />
      <CircularProgress color="danger" />
      <CircularProgress color="info" />
      <CircularProgress color="success" />
      <CircularProgress color="warning" />
    </Box>
  );
}
