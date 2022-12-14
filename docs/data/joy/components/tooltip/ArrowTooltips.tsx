import * as React from 'react';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';

export default function ArrowTooltips() {
  return (
    <Tooltip title="Add" arrow open placement="right">
      <Button variant="plain">Arrow</Button>
    </Tooltip>
  );
}
