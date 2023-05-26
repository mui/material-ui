import * as React from 'react';
import Button, { buttonClasses } from '@mui/base/Button';
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
        line-height: 1.25rem;
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
      .CustomButton:hover {
        background-color: #0E5C6D;
      }
      &.${buttonClasses.active} {
        background-color: #0c5262;
      }
      &.${buttonClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
      }
      `}
    </style>
  );
}
