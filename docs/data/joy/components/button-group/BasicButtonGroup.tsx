import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function BasicButtonGroup() {
  return (
    <ButtonGroup
      separated
      variant="soft"
      color="danger"
      aria-label="outlined primary button group"
    >
      <Button>One</Button>
      {/* <Divider
        sx={{
          mx: '-1px',
          zIndex: 2,
          background: (theme) =>
            `linear-gradient(to bottom, transparent, rgb(${theme.vars.palette.primary.lightChannel} / 1), transparent)`,
        }}
      /> */}
      <Button>Two</Button>
      <Button>Three</Button>
      <IconButton>
        <KeyboardArrowDown />
      </IconButton>
    </ButtonGroup>
  );
}
