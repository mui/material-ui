import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function VariantButtonGroup() {
  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      <Button>One</Button>
      <Tooltip title="Disabled button">
        <div>
          <Button disabled>Two</Button>
        </div>
      </Tooltip>
      <Button>Three</Button>
    </ButtonGroup>
  );
}
