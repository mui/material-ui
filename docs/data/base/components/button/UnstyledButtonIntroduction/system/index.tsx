import * as React from 'react';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';

export default function UnstyledButtonsIntroduction() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
      }}
    >
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
    </div>
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
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Button = styled(BaseButton)(
  ({ theme }) => `
  all: unset;
  align-items: center;
  background-clip: padding-box;
  background-color: ${blue[500]};
  border-color: ${blue[500]};
  border-radius: .5rem;
  border-style: solid;
  border-width: .063rem;
  box-shadow: 0 1px 2px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(60, 86, 118, 0.2)'
  }, 0 2px 4px ${
    theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.15)' : 'rgba(60, 86, 118, 0.2)'
  }, inset 0 1.5px 1px ${blue[400]}, inset 0 -2px 1px ${blue[600]};
  box-sizing: border-box;
  color: white;
  display: inline-flex;
  flex-shrink: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: .875rem;
  font-weight: 600;
  height: 2.5rem;
  justify-content: center;
  line-height: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  user-select: none;
  vertical-align: middle;
  transition-duration: 150ms;
  transition-property: background-color, box-shadow;
  transition-timing-function: ease;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonClasses.active} {
    background-color: ${blue[700]};
    box-shadow: none;
  }

  &.${buttonClasses.focusVisible} {
    outline-width: 2px;
    outline-style: solid;
    outline-color: ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
    outline-offset: 2px;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    border: none;
    box-shadow: none;
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    cursor: not-allowed;
  }
  `,
);
