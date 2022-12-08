import * as React from 'react';
import Box from '@mui/joy/Box';
import TextField from '@mui/joy/TextField';

export default function TextFieldVariants() {
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
      <TextField label="Solid" placeholder="Type in here…" variant="solid" />
      <TextField label="Soft" placeholder="Type in here…" variant="soft" />
      <TextField label="Outlined" placeholder="Type in here…" variant="outlined" />
      <TextField label="Plain" placeholder="Type in here…" variant="plain" />
    </Box>
  );
}
