import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';

export default function TextareaColors() {
  return (
    <Box
      sx={{ py: 2, display: 'grid', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Textarea
        name="Primary"
        placeholder="Type in here…"
        variant="outlined"
        color="primary"
      />
      <Textarea
        name="Neutral"
        placeholder="Type in here…"
        variant="outlined"
        color="neutral"
      />
      <Textarea
        name="Danger"
        placeholder="Type in here…"
        variant="outlined"
        color="danger"
      />
      <Textarea
        name="Warning"
        placeholder="Type in here…"
        variant="outlined"
        color="warning"
      />
    </Box>
  );
}
