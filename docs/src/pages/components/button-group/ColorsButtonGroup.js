import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

export default function ColorsButtonGroup() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      {['primary', 'secondary', 'error', 'info', 'success', 'warning'].map(
        (color) => (
          <ButtonGroup aria-label="medium button group" color={color} key={color}>
            {buttons}
          </ButtonGroup>
        ),
      )}
    </Box>
  );
}
