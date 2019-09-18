import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export default function ControlledTooltips() {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip onClose={handleTooltipClose} onOpen={handleTooltipOpen} open={open} title="Add">
      <Button>Controlled</Button>
    </Tooltip>
  );
}
