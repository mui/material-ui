import * as React from 'react';
import { Switch, switchClasses } from '@mui/base/Switch';
import { useTheme } from '@mui/system';

export default function UnstyledSwitchIntroduction() {
  const label = { 'aria-label': 'Demo switch' };

  return (
    <div>
      <Switch
        slotProps={{
          root: { className: 'CustomSwitchIntroduction' },
          input: { ...label, className: 'CustomSwitchIntroduction-input' },
          thumb: { className: 'CustomSwitchIntroduction-thumb' },
          track: { className: 'CustomSwitchIntroduction-track' },
        }}
        defaultChecked
      />
      <Switch
        slotProps={{
          root: { className: 'CustomSwitchIntroduction' },
          input: { ...label, className: 'CustomSwitchIntroduction-input' },
          thumb: { className: 'CustomSwitchIntroduction-thumb' },
          track: { className: 'CustomSwitchIntroduction-track' },
        }}
      />
      <Switch
        slotProps={{
          root: { className: 'CustomSwitchIntroduction' },
          input: { ...label, className: 'CustomSwitchIntroduction-input' },
          thumb: { className: 'CustomSwitchIntroduction-thumb' },
          track: { className: 'CustomSwitchIntroduction-track' },
        }}
        defaultChecked
        disabled
      />
      <Switch
        slotProps={{
          root: { className: 'CustomSwitchIntroduction' },
          input: { ...label, className: 'CustomSwitchIntroduction-input' },
          thumb: { className: 'CustomSwitchIntroduction-thumb' },
          track: { className: 'CustomSwitchIntroduction-track' },
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
      .CustomSwitchIntroduction {
        font-size: 0;
        position: relative;
        display: inline-block;
        width: 40px;
        height: 24px;
        margin: 10px;
        cursor: pointer;
      }

      .CustomSwitchIntroduction.${switchClasses.disabled} {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .CustomSwitchIntroduction-track {
        background: ${isDarkMode ? grey[600] : grey[400]};
        border-radius: 16px;
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
      }

      .CustomSwitchIntroduction-thumb {
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

      .CustomSwitchIntroduction.${
        switchClasses.focusVisible
      } .CustomSwitchIntroduction-thumb {
        background-color: ${grey[500]};
        box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
      }

      .CustomSwitchIntroduction.${
        switchClasses.checked
      } .CustomSwitchIntroduction-thumb {
        left: 20px;
        top: 4px;
        background-color: #fff;
      }

      .CustomSwitchIntroduction.${
        switchClasses.checked
      } .CustomSwitchIntroduction-track {
        background: ${cyan[500]};
      }

      .CustomSwitchIntroduction-input {
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
