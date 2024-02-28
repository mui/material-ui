import * as React from 'react';
import { Checkbox, checkboxClasses } from '@mui/base/Checkbox';
import { useTheme } from '@mui/system';

export default function UnstyledCheckboxIntroduction() {
  const label = { 'aria-label': 'Demo checkbox' };

  return (
    <div>
      <Checkbox
        slotProps={{
          root: { className: 'CustomCheckboxIntroduction' },
          input: { ...label, className: 'CustomCheckboxIntroduction-input' },
        }}
        defaultChecked
      />
      <Checkbox
        slotProps={{
          root: { className: 'CustomCheckboxIntroduction' },
          input: { ...label, className: 'CustomCheckboxIntroduction-input' },
        }}
      />
      <Checkbox
        slotProps={{
          root: { className: 'CustomCheckboxIntroduction' },
          input: { ...label, className: 'CustomCheckboxIntroduction-input' },
        }}
        defaultChecked
        disabled
      />
      <Checkbox
        slotProps={{
          root: { className: 'CustomCheckboxIntroduction' },
          input: { ...label, className: 'CustomCheckboxIntroduction-input' },
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
      .CustomCheckboxIntroduction {
        box-sizing: border-box;
        font-size: 0;
        position: relative;
        display: inline-block;
        width: 38px;
        height: 24px;
        margin: 10px;
        cursor: pointer;
      }

      .CustomCheckboxIntroduction.${checkboxClasses.disabled} {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .CustomCheckboxIntroduction-input {
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
