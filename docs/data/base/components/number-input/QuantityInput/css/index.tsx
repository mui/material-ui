import * as React from 'react';
import {
  Unstable_NumberInput as NumberInput,
  NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { useTheme } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <NumberInput
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
      <CustomNumberInput aria-label="Quantity Input" min={1} max={99} />
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
        border-radius: 4px;
        margin: 0 4px;
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
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
      }

      .QuantityInput .input:focus-visible {
        outline: 0;
      }

      .QuantityInput .btn {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        line-height: 1.5;
        border: 0;
        border-radius: 999px;
        color: ${isDarkMode ? cyan[300] : cyan[600]};
        background: transparent;

        width: 40px;
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;
      }

      .QuantityInput .btn:hover {
        background: ${isDarkMode ? cyan[800] : cyan[100]};
        cursor: pointer;
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
