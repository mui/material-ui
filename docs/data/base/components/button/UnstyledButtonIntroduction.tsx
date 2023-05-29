import * as React from 'react';
import Button, { buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonIntroduction() {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton>Button</CustomButton>
      <CustomButton disabled>Disabled</CustomButton>
    </Stack>
  );
}

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  100: '#eaeef2',
  300: '#afb8c1',
  900: '#24292f',
};

const CustomButton = styled(Button)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
  `,
);
