import * as React from 'react';
import { Button as BaseButton } from '@mui/base/Button';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';

export default function UnstyledButtonsSpan() {
  return (
    <Stack spacing={2} direction="row">
      <Button slots={{ root: 'span' }}>Button</Button>
      <Button slots={{ root: 'span' }} disabled>
        Disabled
      </Button>
    </Stack>
  );
}

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  200: '#d0d7de',
  700: '#424a53',
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: 1px solid ${blue[500]};
  box-shadow: 0 2px 1px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:active {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline: none;
  }

  &.Mui-disabled {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    cursor: not-allowed;
    box-shadow: none;
  }

  &.Mui-disabled:hover {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  }
`,
);
