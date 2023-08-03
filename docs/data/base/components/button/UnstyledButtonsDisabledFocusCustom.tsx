import * as React from 'react';
import { Button, buttonClasses, ButtonTypeMap } from '@mui/base/Button';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import { PolymorphicComponent } from '@mui/base/utils';

export default function UnstyledButtonsDisabledFocusCustom() {
  return (
    <Stack spacing={2}>
      <CustomButton slots={{ root: 'span' }} disabled>
        focusableWhenDisabled = false
      </CustomButton>
      <CustomButton slots={{ root: 'span' }} disabled focusableWhenDisabled>
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
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 150ms ease;
  border: none;

  &:hover:not(.${buttonClasses.disabled}) {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
    outline: none;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
` as PolymorphicComponent<ButtonTypeMap>;
