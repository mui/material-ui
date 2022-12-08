import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import * as React from 'react';

export default function DeleteButtonChip() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        size="sm"
        variant="outlined"
        color="danger"
        endDecorator={<ChipDelete />}
      >
        Remove
      </Chip>
      <Chip variant="soft" color="danger" endDecorator={<ChipDelete />}>
        Delete
      </Chip>
      <Chip size="lg" variant="solid" color="danger" endDecorator={<ChipDelete />}>
        Delete
      </Chip>
    </Box>
  );
}
