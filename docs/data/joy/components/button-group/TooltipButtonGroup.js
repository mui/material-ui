import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';

export default function TooltipButtonGroup() {
  return (
    <ButtonGroup variant="soft" aria-label="tooltip button group">
      <Tooltip arrow title="Go to profile">
        <Button startDecorator={<Person />}>Hover me</Button>
      </Tooltip>
      <Tooltip arrow title="Open settings">
        <span>
          <IconButton disabled>
            <Settings />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip arrow title="Go to profile">
        <Button endDecorator={<Person />}>Hover me</Button>
      </Tooltip>
    </ButtonGroup>
  );
}
