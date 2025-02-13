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
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
              {
                marginTop: '0px',
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
              {
                marginBottom: '0px',
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
              {
                marginLeft: '0px',
              },
            [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
              {
                marginRight: '0px',
              },
          },
        },
      }}
    >
      <Button>Margin</Button>
    </Tooltip>
  );
}
