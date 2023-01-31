import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';

export default function TextareaVariants() {
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
      <Textarea label="Solid" placeholder="Type in here…" variant="solid" />
      <Textarea label="Soft" placeholder="Type in here…" variant="soft" />
      <Textarea label="Outlined" placeholder="Type in here…" variant="outlined" />
      <Textarea label="Plain" placeholder="Type in here…" variant="plain" />
    </Box>
  );
}
