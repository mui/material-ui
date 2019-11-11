import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

export default function ArrowTooltips() {
  return (
    <div>
      <Tooltip title="Arrow" arrow>
        <Button>default</Button>
      </Tooltip>
      <Tooltip title="Arrow" arrow placement="left">
        <Button>left</Button>
      </Tooltip>
      <Tooltip title="Arrow" arrow placement="right">
        <Button>right</Button>
      </Tooltip>
    </div>
  );
}
