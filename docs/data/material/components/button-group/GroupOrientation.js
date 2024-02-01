import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

const ariaLabel = 'Vertical button group';

export default function GroupOrientation() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup orientation="vertical" aria-label={ariaLabel}>
        {buttons}
      </ButtonGroup>
      <ButtonGroup orientation="vertical" aria-label={ariaLabel} variant="contained">
        {buttons}
      </ButtonGroup>
      <ButtonGroup orientation="vertical" aria-label={ariaLabel} variant="text">
        {buttons}
      </ButtonGroup>
    </Box>
  );
}
