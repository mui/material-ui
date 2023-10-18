import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Box from '@mui/joy/Box';

export default function AccessibilityTooltip() {
  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
      <Tooltip title="Delete">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip describeChild title="Does not add if it already exists.">
        <Button>Add</Button>
      </Tooltip>
    </Box>
  );
}
