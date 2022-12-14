import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import * as React from 'react';

export default function DeleteButtonChip() {
  const handleDelete = () => {
    console.log('onDelete is called');
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        size="sm"
        variant="outlined"
        color="danger"
        endDecorator={<ChipDelete onDelete={handleDelete} />}
      >
        Remove
      </Chip>
      <Chip
        variant="soft"
        color="danger"
        endDecorator={<ChipDelete onDelete={handleDelete} />}
      >
        Delete
      </Chip>
      <Chip
        size="lg"
        variant="solid"
        color="danger"
        endDecorator={<ChipDelete onDelete={handleDelete} />}
      >
        Delete
      </Chip>
    </Box>
  );
}
