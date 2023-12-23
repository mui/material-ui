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
              marginLeft: 20,
            },
            [`&[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
              marginRight: 20,
            },
          },
        },
      }}
    >
      <Button>Margin</Button>
    </Tooltip>
  );
}
