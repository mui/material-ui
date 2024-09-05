import * as React from 'react';
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';

export default function TextareaVariants() {
  return (
    <Box
      sx={{ py: 2, display: 'grid', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
    >
      <Textarea name="Solid" placeholder="Type in here…" variant="solid" />
      <Textarea name="Soft" placeholder="Type in here…" variant="soft" />
      <Textarea name="Outlined" placeholder="Type in here…" variant="outlined" />
      <Textarea name="Plain" placeholder="Type in here…" variant="plain" />
    </Box>
  );
}
