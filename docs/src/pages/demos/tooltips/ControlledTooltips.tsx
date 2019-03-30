import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

function ControlledTooltips() {
  const [open, setOpen] = React.useState(false);

  function handleTooltipClose() {
    setOpen(false);
  }

  function handleTooltipOpen() {
    setOpen(true);
  }

  return (
    <Tooltip onClose={handleTooltipClose} onOpen={handleTooltipOpen} open={open} title="Add">
      <Button>Controlled</Button>
    </Tooltip>
  );
}

export default ControlledTooltips;
