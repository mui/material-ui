import * as React from 'react';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Tooltip from '@mui/joy/Tooltip';

export default function ArrowTooltips() {
  return (
    <Sheet sx={{ pr: 7 }}>
      <Tooltip title="Add" arrow open placement="right">
        <Button variant="plain">Arrow</Button>
      </Tooltip>
    </Sheet>
  );
}
