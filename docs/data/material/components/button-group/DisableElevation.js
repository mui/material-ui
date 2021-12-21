import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

export default function DisableElevation() {
  return (
    <ButtonGroup disableElevation variant="contained">
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
  );
}
