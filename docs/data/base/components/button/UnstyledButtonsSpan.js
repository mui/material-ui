import * as React from 'react';
import { Button, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonsSpan() {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton slots={{ root: 'span' }}>Button</CustomButton>
      <CustomButton slots={{ root: 'span' }} disabled>
        Disabled
      </CustomButton>
    </Stack>
  );
}

const blue = {
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
};

const CustomButton = styled(Button)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[600]};
  box-shadow: 0px 4px 8px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.15)'
  }, inset 0px 2px 1px ${blue[400]}, inset 0px -2px 1px ${blue[700]} ;

  &:hover {
    background-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
    &:hover {
      background-color: ${blue[500]};
    }
  }
  `,
);
