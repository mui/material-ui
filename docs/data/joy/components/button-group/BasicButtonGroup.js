import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';

export default function BasicButtonGroup() {
  return (
    <ButtonGroup aria-label="outlined primary button group">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
}
