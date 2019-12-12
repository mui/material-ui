import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

export default function GroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical outlined primary button group"
    >
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  );
}
