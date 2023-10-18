import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';

export default function TextareaValidation() {
  return (
    <Box sx={{ p: 2 }}>
      <Textarea
        placeholder="Type in here…"
        error
        defaultValue="Oh no! Something is definitely wrong."
      />
    </Box>
  );
}
