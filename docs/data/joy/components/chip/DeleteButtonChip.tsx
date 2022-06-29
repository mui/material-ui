import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import * as React from 'react';

export default function DeleteButtonChip() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip variant="outlined" endDecorator={<ChipDelete />}>
        Remove
      </Chip>
      <Chip variant="soft" endDecorator={<ChipDelete variant="plain" />}>
        Delete
      </Chip>
    </Box>
  );
}
