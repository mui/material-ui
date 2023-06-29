import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';

export default function FlexButtonGroup() {
  return (
    <ButtonGroup
      buttonFlex={1}
      aria-label="flex button group"
      sx={{
        p: 2,
        width: 500,
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
