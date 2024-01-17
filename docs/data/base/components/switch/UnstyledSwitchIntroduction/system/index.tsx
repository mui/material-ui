import * as React from 'react';
import { styled } from '@mui/system';
import { Switch, switchClasses } from '@mui/base/Switch';

export default function UnstyledSwitchIntroduction() {
  const label = { slotProps: { input: { 'aria-label': 'Demo switch' } } };

  return (
    <div>
      <Switch
        slots={{
          root: Root,
        }}
        {...label}
        defaultChecked
      />
      <Switch
        slots={{
          root: Root,
        }}
        {...label}
      />
      <Switch
        slots={{
          root: Root,
        }}
        {...label}
        defaultChecked
        disabled
      />
      <Switch
        slots={{
          root: Root,
        }}
        {...label}
        disabled
      />
    </div>
  );
}
const blue = {
  200: '#99CCF3',
  500: '#007FFF',
  700: '#0059B2',
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

const Root = styled('span')(
  ({ theme }) => `
  box-sizing: border-box;
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 38px;
  height: 24px;
  margin: 10px;
  cursor: pointer;

  &.${switchClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchClasses.track} {
    box-sizing: border-box;
    background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 24px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    box-shadow: inset 0px 1px 1px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.05)'
    };
  }

  &:hover .${switchClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &.${switchClasses.focusVisible} .${switchClasses.track} {
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
  }

  & .${switchClasses.thumb} {
    box-sizing: border-box;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    display: block;
    width: 16px;
    height: 16px;
    top: 4px;
    left: 4px;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
    box-shadow: 0px 1px 2px ${
      theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.1)'
    };
  }

  &.${switchClasses.checked} {
    .${switchClasses.thumb} {
      left: 18px;
      background-color: #fff;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .${switchClasses.track} {
      border: none;
      background: ${blue[500]};
    }
  }

  &:hover .${switchClasses.checked} .${switchClasses.track} {
    background: ${blue[700]};
  }

  & .${switchClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
);
