import * as React from 'react';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';

export default function TextFieldFormProps() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <TextField label="Label" placeholder="Type in here..." required />
      <TextField label="Label" placeholder="Type in here..." disabled />
      <TextField
        label="Label"
        placeholder="Type in here…"
        helperText="This is a helper text"
      />
    </Box>
  );
}
