import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';

export default function DetachedButtonGroup() {
  return (
    <ButtonGroup detached aria-label="detached button group" sx={{ gap: 1 }}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <IconButton>
        <Settings />
      </IconButton>
    </ButtonGroup>
  );
}
