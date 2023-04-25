import * as React from 'react';
import Button, { buttonClasses, ButtonTypeMap } from '@mui/base/Button';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import { OverridableComponent } from '@mui/types';

export default function UnstyledButtonsDisabledFocusCustom() {
  return (
    <Stack spacing={2}>
      <CustomButton component="span" disabled>
        focusableWhenDisabled = false
      </CustomButton>
      <CustomButton component="span" disabled focusableWhenDisabled>
        focusableWhenDisabled = true
      </CustomButton>
    </Stack>
  );
}

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const CustomButton = styled(Button)`
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

  &:hover:not(.${buttonClasses.disabled}) {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
` as OverridableComponent<ButtonTypeMap>;
