import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export default function TooltipMargin() {
  return (
    <Tooltip
      title="Add"
      slotProps={{
        popper: {
          sx: {
            [`&[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
              marginTop: 20,
            },
            [`&[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
              marginBottom: '10px',
            },
            [`&[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
              marginRight: '10px',
            },
            [`&[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
              marginLeft: '10px',
            },
          },
        },
      }}
    >
      <Button>Margin</Button>
    </Tooltip>
  );
}
