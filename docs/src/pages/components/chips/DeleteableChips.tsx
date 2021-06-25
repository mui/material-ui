import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

export default function DeleteableChips() {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Deleteable" onDelete={handleDelete} />
      <Chip label="Deleteable" variant="outlined" onDelete={handleDelete} />
    </Stack>
  );
}
