import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

export default function DifferentChildren() {
  return (
    <Stack spacing={2}>
      {/* It has one button with href which is rendered as anchor tag */}
      <ButtonGroup variant="contained">
        <Button href="##">Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>

      {/* With tooltip */}
      <ButtonGroup>
        <Tooltip title="tooltip">
          <Button>Enabled</Button>
        </Tooltip>
        <Tooltip title="tooltip">
          <span>
            <Button disabled>Disabled</Button>
          </span>
        </Tooltip>
        <Tooltip title="tooltip">
          <span>
            <Button disabled>Disabled</Button>
          </span>
        </Tooltip>
      </ButtonGroup>

      {/* One button */}
      <ButtonGroup>
        <Button>One Button</Button>
      </ButtonGroup>
    </Stack>
  );
}
