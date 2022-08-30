import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';

export default function TextareaSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <Textarea size="sm" label="Size" placeholder="Small" />
      <Textarea size="md" label="Size" placeholder="Medium" />
      <Textarea size="lg" label="Size" placeholder="Large" />
    </Box>
  );
}
