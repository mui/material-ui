import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

export default function DisableElevation() {
  return (
    <ButtonGroup variant="contained" color="primary" disableElevation>
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonGroup>
  );
}
