import * as React from 'react';
import useAutocomplete from '@mui/base/useAutocomplete';
import { useTheme } from '@mui/system';
import clsx from 'clsx';

const options = ['Firefox', 'Google Chrome', 'Microsoft Edge', 'Safari', 'Opera'];

export default function ControlledStates() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
  } = useAutocomplete({
    id: 'controlled-state-demo',
    options,
    value,
    onChange: (event, newValue) => setValue(newValue),
    inputValue,
    onInputChange: (event, newInputValue) => setInputValue(newInputValue),
  });

  return (
    <div className="layout">
      <pre className="value">
        value: <code>{value ?? ' '}</code>
      </pre>
      <pre className="value">
        inputValue: <code>{inputValue ?? ' '}</code>
      </pre>
      <div className="ControlledStates">
        <div {...getRootProps()} className={clsx('root', focused && 'focused')}>
          <input {...getInputProps()} className="input" />
        </div>
        {groupedOptions.length > 0 && (
          <ul {...getListboxProps()} className="listbox">
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })} className="option">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
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
      .layout {
        display: flex;
        flex-flow: column nowrap;
      }

      .value {
        margin: 0.5rem 0;
      }

      .value code {
        background-color: ${isDarkMode ? '#25252d' : '#ebebef'};
        color: ${isDarkMode ? '#fff' : '#000'};
        padding: 0.125rem 0.25rem;
        border-radius: 3px;
      }

      .ControlledStates {
        margin: 24px 0;
      }

      .ControlledStates .root {
        font-family: IBM Plex Sans, sans-serif;
        font-weight: 400;
        border-radius: 8px;
        color: ${isDarkMode ? grey[300] : grey[500]};
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${isDarkMode ? grey[900] : grey[50]};
        display: flex;
        gap: 5px;
        padding-right: 5px;
        overflow: hidden;
        width: 320px;

        &.focused {
          border-color: ${cyan[400]};
          box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
        }

        &:hover {
          border-color: ${cyan[400]};
        }

        &:focus-visible {
          outline: 0;
        }
      }

      .ControlledStates .input {
        font-size: 0.875rem;
        font-family: inherit;
        font-weight: 400;
        line-height: 1.5;
        color: ${isDarkMode ? grey[300] : grey[900]};
        background: inherit;
        border: none;
        border-radius: inherit;
        padding: 8px 12px;
        outline: 0;
        flex: 1 0 auto;
      }

      .ControlledStates .listbox {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        max-width: 320px;
        width: 100%;
        border-radius: 12px;
        overflow: auto;
        outline: 0px;
        max-height: 300px;
        z-index: 1;
        position: absolute;
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        color: ${isDarkMode ? grey[300] : grey[900]};
        box-shadow: 0px 4px 30px ${isDarkMode ? grey[900] : grey[200]};
      }

      .ControlledStates .option {
        list-style: none;
        padding: 8px;
        border-radius: 8px;
        cursor: default;

        &:last-of-type {
          border-bottom: none;
        }

        &:hover {
          cursor: pointer;
        }

        &[aria-selected=true] {
          background-color: ${isDarkMode ? cyan[900] : cyan[100]};
          color: ${isDarkMode ? cyan[100] : cyan[900]};
        }

        &.Mui-focused,
        &.Mui-focusVisible {
          background-color: ${isDarkMode ? grey[800] : grey[100]};
          color: ${isDarkMode ? grey[300] : grey[900]};
        }

        &.Mui-focusVisible {
          box-shadow: 0 0 0 3px ${isDarkMode ? cyan[500] : cyan[200]};
        }

        &[aria-selected=true].Mui-focused,
        &[aria-selected=true].Mui-focusVisible {
          background-color: ${isDarkMode ? cyan[900] : cyan[100]};
          color: ${isDarkMode ? cyan[100] : cyan[900]};
        }
      }
      `}
    </style>
  );
}
