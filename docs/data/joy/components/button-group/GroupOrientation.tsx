import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two" disabled>
    Two
  </Button>,
  <Button key="three">Three</Button>,
];

export default function GroupOrientation() {
  return (
    <Stack spacing={2} direction="row">
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
      >
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical plain button group"
        variant="plain"
      >
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical soft button group"
        variant="soft"
      >
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical solid button group"
        variant="solid"
      >
        {buttons}
      </ButtonGroup>
    </Stack>
  );
}
