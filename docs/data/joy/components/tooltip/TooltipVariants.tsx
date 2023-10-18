import * as React from 'react';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Button from '@mui/joy/Button';

export default function TooltipVariants() {
  return (
    <Box sx={{ display: 'flex', gap: 4, width: '100%', justifyContent: 'center' }}>
      <Tooltip title="Delete" variant="solid">
        <Button variant="solid">Solid</Button>
      </Tooltip>
      <Tooltip title="Delete" variant="soft">
        <Button variant="soft">Soft</Button>
      </Tooltip>
      <Tooltip title="Delete" variant="outlined">
        <Button variant="outlined">Outlined</Button>
      </Tooltip>
      <Tooltip title="Delete" variant="plain">
        <Button variant="plain">Plain</Button>
      </Tooltip>
    </Box>
  );
}
