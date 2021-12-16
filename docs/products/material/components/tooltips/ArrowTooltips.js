import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ArrowTooltips() {
  return (
    <Tooltip title="Add" arrow>
      <Button>Arrow</Button>
    </Tooltip>
  );
}
