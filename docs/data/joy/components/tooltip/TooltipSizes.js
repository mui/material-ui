import * as React from 'react';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Button from '@mui/joy/Button';

export default function TooltipSizes() {
  return (
    <Box sx={{ display: 'flex', gap: 4, width: '100%', justifyContent: 'center' }}>
      <Tooltip title="Delete" size="sm">
        <Button variant="plain">Small</Button>
      </Tooltip>
      <Tooltip title="Delete" size="md">
        <Button variant="plain">Medium</Button>
      </Tooltip>
      <Tooltip title="Delete" size="lg">
        <Button variant="plain">Large</Button>
      </Tooltip>
    </Box>
  );
}
