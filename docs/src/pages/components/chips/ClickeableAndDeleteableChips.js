import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ClickeableAndDeleteableChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Clickable Deleteable"
        onClick={handleClick}
        onDelete={handleDelete}
      />
      <Chip
        label="Clickable Deleteable"
        variant="outlined"
        onClick={handleClick}
        onDelete={handleDelete}
      />
    </Stack>
  );
}
