import DeleteForever from '@mui/icons-material/DeleteForever';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import * as React from 'react';

export default function ClickableChip() {
  const handleClick = () => {
    alert('You clicked the Joy Chip!');
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        variant="outlined"
        color="danger"
        onClick={handleClick}
        endDecorator={
          <ChipDelete color="danger" variant="plain" onClick={handleClick}>
            <DeleteForever />
          </ChipDelete>
        }
      >
        Clear
      </Chip>
    </Box>
  );
}
