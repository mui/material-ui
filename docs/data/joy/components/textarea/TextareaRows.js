import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';

export default function TextareaRows() {
  return (
    <Box sx={{ p: 2 }}>
      <Textarea
        placeholder="Type in here…"
        defaultValue="Try to put text longer than 4 lines."
        minRows={2}
        maxRows={4}
      />
    </Box>
  );
}
