import * as React from 'react';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';

export default function TextFieldColors() {
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
      <TextField
        label="Primary"
        placeholder="Type in here…"
        variant="outlined"
        color="primary"
      />
      <TextField
        label="Neutral"
        placeholder="Type in here…"
        variant="outlined"
        color="neutral"
      />
      <TextField
        label="Danger"
        placeholder="Type in here…"
        variant="outlined"
        color="danger"
      />
      <TextField
        label="Warning"
        placeholder="Type in here…"
        variant="outlined"
        color="warning"
      />
    </Box>
  );
}
