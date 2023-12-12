import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import DeleteForever from '@mui/icons-material/DeleteForever';

export default function ClickableAndDeletableChip() {
  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Chip
        variant="outlined"
        color="danger"
        onClick={() => alert('You clicked the chip!')}
        endDecorator={
          <ChipDelete
            color="danger"
            variant="plain"
            onClick={() => alert('You clicked the delete button!')}
          >
            <DeleteForever />
          </ChipDelete>
        }
      >
        Clear
      </Chip>
    </Box>
  );
}
