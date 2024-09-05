import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';

export default function RadiusButtonGroup() {
  return (
    <ButtonGroup
      aria-label="radius button group"
      sx={{ '--ButtonGroup-radius': '40px' }}
    >
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <IconButton>
        <Settings />
      </IconButton>
    </ButtonGroup>
  );
}
