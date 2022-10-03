import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';

export default function TextareaColors() {
  return (
    <Box
      sx={{
        py: 2,
        display: 'grid',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Textarea
        label="Primary"
        placeholder="Type in here…"
        variant="outlined"
        color="primary"
      />
      <Textarea
        label="Neutral"
        placeholder="Type in here…"
        variant="outlined"
        color="neutral"
      />
      <Textarea
        label="Danger"
        placeholder="Type in here…"
        variant="outlined"
        color="danger"
      />
      <Textarea
        label="Warning"
        placeholder="Type in here…"
        variant="outlined"
        color="warning"
      />
    </Box>
  );
}
