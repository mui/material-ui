import * as React from 'react';
import Button from '@mui/base/Button';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonsSimple() {
  return (
    <React.Fragment>
      <Stack spacing={2} direction="row">
        <Button className="CustomButton">Button</Button>
        <Button className="CustomButton" disabled>
          Disabled
        </Button>
      </Stack>
      <Styles />
    </React.Fragment>
  );
}

function Styles() {
  return (
    <style>
      {`
      .CustomButton {
        font-family: IBM Plex Sans,sans-serif;
        font-size: 0.875rem;
        background-color: #117286;
        color: #fff;
        border-radius: 0.75rem;
        font-weight: bold;
        padding: 0.75rem 1.5rem;
        border: none;
      }
      .CustomButton:hover {
        background-color: #0E5C6D;
      }
      .CustomButton:disabled {
        opacity: 0.5;
      }
      `}
    </style>
  );
}
