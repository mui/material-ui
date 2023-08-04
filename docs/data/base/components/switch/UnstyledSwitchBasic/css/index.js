import * as React from 'react';
import { Switch, switchClasses } from '@mui/base/Switch';
import { useTheme } from '@mui/system';

export default function UnstyledSwitches() {
  const label = { 'aria-label': 'Demo switch' };

  return (
    <div>
      <Switch
        slotProps={{
          root: { className: 'CustomSwitch' },
          input: { ...label, className: 'CustomSwitch-input' },
          thumb: { className: 'CustomSwitch-thumb' },
          track: { className: 'CustomSwitch-track' },
        }}
        defaultChecked
      />
      <Switch
        slotProps={{
          root: { className: 'CustomSwitch' },
          input: { ...label, className: 'CustomSwitch-input' },
          thumb: { className: 'CustomSwitch-thumb' },
          track: { className: 'CustomSwitch-track' },
        }}
      />
      <Switch
        slotProps={{
          root: { className: 'CustomSwitch' },
          input: { ...label, className: 'CustomSwitch-input' },
          thumb: { className: 'CustomSwitch-thumb' },
          track: { className: 'CustomSwitch-track' },
        }}
        defaultChecked
        disabled
      />
      <Switch
        slotProps={{
          root: { className: 'CustomSwitch' },
          input: { ...label, className: 'CustomSwitch-input' },
          thumb: { className: 'CustomSwitch-thumb' },
          track: { className: 'CustomSwitch-track' },
        }}
        disabled
      />
      <Styles />
    </div>
  );
}

const cyan = {
  50: '#E9F8FC',
  100: '#BDEBF4',
  200: '#99D8E5',
  300: '#66BACC',
  400: '#1F94AD',
  500: '#0D5463',
  600: '#094855',
  700: '#063C47',
  800: '#043039',
  900: '#022127',
};

const grey = {
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <style>
      {`
      .CustomSwitch {
        font-size: 0;
        position: relative;
        display: inline-block;
        width: 40px;
        height: 24px;
        margin: 10px;
        cursor: pointer;
      }

      .CustomSwitch.${switchClasses.disabled} {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .CustomSwitch-track {
        background: ${isDarkMode ? grey[600] : grey[400]};
        border-radius: 16px;
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
      }

      .CustomSwitch-thumb {
        display: block;
        width: 16px;
        height: 16px;
        top: 4px;
        left: 4px;
        border-radius: 16px;
        background-color: #fff;
        position: relative;
        
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      }

      .CustomSwitch.${switchClasses.focusVisible} .CustomSwitch-thumb {
        background-color: ${grey[500]};
        box-shadow: 0 0 1px 8px rgba(13, 84, 99, 0.35);
      }

      .CustomSwitch.${switchClasses.checked} .CustomSwitch-thumb {
        left: 20px;
        top: 4px;
        background-color: #fff;
      }

      .CustomSwitch.${switchClasses.checked} .CustomSwitch-track {
        background: ${cyan[500]};
      }

      .CustomSwitch-input {
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
    
    `}
    </style>
  );
}
