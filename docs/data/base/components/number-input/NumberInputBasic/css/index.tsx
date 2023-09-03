import * as React from 'react';
import {
  Unstable_NumberInput as NumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import { useTheme } from '@mui/system';

export default function NumberInputBasic() {
  return (
    <React.Fragment>
      <NumberInput
        slotProps={{
          root: { className: 'CustomNumberInput' },
          input: { className: 'input' },
          decrementButton: { className: 'btn decrement', children: '▾' },
          incrementButton: { className: 'btn increment', children: '▴' },
        }}
        aria-label="Demo number input"
        placeholder="Type a number…"
      />
      <Styles />
    </React.Fragment>
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
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>
      {`
      .CustomNumberInput {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        border-radius: 8px;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${isDarkMode ? grey[900] : grey[50]};
        display: grid;
        grid-template-columns: 1fr 19px;
        grid-template-rows: 1fr 1fr;
        overflow: hidden;
      }

      .CustomNumberInput:hover {
        border-color: ${cyan[400]};
      }

      .CustomNumberInput.${numberInputClasses.focused} {
        border-color: ${cyan[400]};
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
      }

      .CustomNumberInput .input {
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        line-height: 1.5;
        grid-column: 1/2;
        grid-row: 1/3;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: inherit;
        border: 0;
        border-radius: inherit;
        padding: 8px 12px;
        outline: 0;
      }

      .CustomNumberInput .input:focus-visible {
        outline: 0;
      }

      .CustomNumberInput .btn {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        appearance: none;
        padding: 0;
        width: 19px;
        height: 19px;
        font-family: system-ui, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        line-height: 1;
        background: ${isDarkMode ? grey[900] : '#fff'};
        color: ${isDarkMode ? grey[300] : grey[900]};
        border: 0;

        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      }

      .CustomNumberInput .btn:hover {
        background: ${isDarkMode ? grey[800] : grey[50]};
        border-color: ${isDarkMode ? grey[600] : grey[300]};
        cursor: pointer;
      }

      .CustomNumberInput .btn.increment {
        grid-column: 2/3;
        grid-row: 1/2;
      }

      .CustomNumberInput .btn.decrement {
        grid-column: 2/3;
        grid-row: 2/3;
      }
      `}
    </style>
  );
}
