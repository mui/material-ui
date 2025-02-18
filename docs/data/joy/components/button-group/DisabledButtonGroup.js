import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';

export default function DisabledButtonGroup() {
  return (
    <ButtonGroup disabled aria-label="disabled button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <IconButton disabled={false}>
        <Settings />
      </IconButton>
    </ButtonGroup>
  );
}
