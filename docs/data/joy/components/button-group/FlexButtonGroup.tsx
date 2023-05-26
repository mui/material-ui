import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';

export default function FlexButtonGroup() {
  return (
    <ButtonGroup
      stretch
      aria-label="flex button group"
      sx={{
        p: 2,
        width: 400,
        maxWidth: '100%',
        overflow: 'auto',
        resize: 'horizontal',
      }}
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
