import * as React from 'react';
import ButtonUnstyled, {
  buttonUnstyledClasses,
  ButtonUnstyledTypeMap,
} from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import { OverridableComponent } from '@mui/types';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const CustomButton = styled(ButtonUnstyled)`
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
  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
` as OverridableComponent<ButtonUnstyledTypeMap>;

export default function UnstyledButtonsSpan() {
  return (
    <Stack spacing={2} direction="row">
      <CustomButton component="span">Button</CustomButton>
      <CustomButton component="span" disabled>
        Disabled
      </CustomButton>
    </Stack>
  );
}
