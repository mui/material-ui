import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';

export default function TransitionsTooltips() {
  return (
    <div>
      <Tooltip title="Add">
        <Button>Grow</Button>
      </Tooltip>
      <Tooltip
        title="Add"
        slots={{
          transition: Fade,
        }}
        slotProps={{
          transition: { timeout: 600 },
        }}
      >
        <Button>Fade</Button>
      </Tooltip>
      <Tooltip
        title="Add"
        slots={{
          transition: Zoom,
        }}
      >
        <Button>Zoom</Button>
      </Tooltip>
    </div>
  );
}
