import * as React from 'react';
import { unstable_useNumberInput as useNumberInput } from '@mui/base/unstable_useNumberInput';
import { useTheme } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

const CompactNumberInput = React.forwardRef(function CompactNumberInput(props, ref) {
  const {
    getRootProps,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput(props);

  const inputProps = getInputProps();

  inputProps.ref = useForkRef(inputProps.ref, ref);

  return (
    <div {...getRootProps()} className="CompactNumberInput">
      <button type="button" className="btn decrement" {...getDecrementButtonProps()}>
        <ArrowDropDownRoundedIcon />
      </button>
      <button type="button" className="btn increment" {...getIncrementButtonProps()}>
        <ArrowDropUpRoundedIcon />
      </button>
      <input className="input" {...inputProps} />
    </div>
  );
});

export default function UseNumberInputCompact() {
  const [value, setValue] = React.useState();

  return (
    <div className="layout">
      <CompactNumberInput
        aria-label="Compact number input"
        placeholder="Type a number…"
        readOnly
        value={value}
        onChange={(event, val) => setValue(val)}
        className="my-input"
      />
      <pre>Current value: {value ?? ' '}</pre>

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
      .CompactNumberInput {
        display: grid;
        grid-template-columns: 2rem;
        grid-template-rows: 2rem 2rem;
        grid-template-areas:
          "increment"
          "decrement";
        row-gap: 1px;
        border-radius: 0.5rem;
        border-style: solid;
        border-width: 1px;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: ${isDarkMode ? grey[800] : grey[200]};
        border-color: ${isDarkMode ? grey[800] : grey[200]};
        overflow: auto;
      }

      .CompactNumberInput:hover {
        border-color: ${cyan[500]};
      }

      .CompactNumberInput .input {
        visibility: hidden;
        position: absolute;
      }

      .CompactNumberInput .btn {
        display: flex;
        flex-flow: nowrap;
        justify-content: center;
        align-items: center;
        font-size: 0.875rem;
        box-sizing: border-box;
        border: 0;
        padding: 0;
        color: inherit;
        background: ${isDarkMode ? grey[900] : grey[50]};
      }

      .CompactNumberInput .btn:hover {
        cursor: pointer;
        background: ${cyan[500]};
        color: ${grey[50]};
      }

      .CompactNumberInput .btn:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 3px ${isDarkMode ? cyan[600] : cyan[200]};
      }

      .CompactNumberInput .btn.increment {
        grid-area: increment;
        border-top-left-radius: 0.35rem;
        border-top-right-radius: 0.35rem;
      }

      .CompactNumberInput .btn.decrement {
        grid-area: decrement;
        border-bottom-left-radius: 0.35rem;
        border-bottom-right-radius: 0.35rem;
      }

      .layout {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        column-gap: 1rem;
      }
      `}
    </style>
  );
}
