import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';

export default function ClickeableChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Clickable" onClick={handleClick} />
      <Chip label="Clickable" variant="outlined" onClick={handleClick} />
    </Stack>
  );
}
