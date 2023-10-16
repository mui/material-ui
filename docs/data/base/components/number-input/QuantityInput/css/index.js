import * as React from 'react';
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';
import { useTheme } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const NumberInput = React.forwardRef(function CustomNumberInput(props, ref) {
  return (
    <BaseNumberInput
      slotProps={{
        root: { className: 'QuantityInput' },
        input: { className: 'input' },
        decrementButton: {
          children: <RemoveIcon />,
          className: 'btn',
        },
        incrementButton: {
          children: <AddIcon />,
          className: 'btn increment',
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function QuantityInput() {
  return (
    <React.Fragment>
      <NumberInput aria-label="Quantity Input" min={1} max={99} />
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
      .QuantityInput {
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        color: ${isDarkMode ? grey[300] : grey[500]};
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
      }

      .QuantityInput .input {
        font-size: 0.875rem;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.375;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${isDarkMode ? grey[900] : grey[50]};
        border-radius: 8px;
        margin: 0 8px;
        padding: 10px 12px;
        outline: 0;
        min-width: 0;
        width: 4rem;
        text-align: center;
      }

      .QuantityInput .input:hover {
        border-color: ${cyan[400]};
      }

      .QuantityInput .input:focus {
        border-color: ${cyan[400]};
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[600] : cyan[200]};
      }

      .QuantityInput .input:focus-visible {
        outline: 0;
      }

      .QuantityInput .btn {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        line-height: 1.5;
        border: 1px solid;
        border-radius: 999px;
        border-color: ${isDarkMode ? grey[800] : grey[200]};
        background: ${isDarkMode ? grey[900] : grey[50]};
        color: ${isDarkMode ? grey[200] : grey[900]};
        width: 32px;
        height: 32px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      }

      .QuantityInput .btn:hover {
        cursor: pointer;
        background: ${cyan[400]};
        color: ${grey[50]};
      }

      .QuantityInput .btn:focus-visible {
        outline: 0;
      }

      .QuantityInput .btn.increment {
        order: 1;
      }
      `}
    </style>
  );
}
