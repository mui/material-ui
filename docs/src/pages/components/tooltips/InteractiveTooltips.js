import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export default function InteractiveTooltips() {
  return (
    <Tooltip title="Add" interactive>
      <Button>Interactive</Button>
    </Tooltip>
  );
}
