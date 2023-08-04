import * as React from 'react';
import { Select, selectClasses } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { useTheme } from '@mui/system';

export default function UnstyledSelectBasic() {
  return (
    <React.Fragment>
      <Select
        className="CustomSelect"
        slotProps={{
          listbox: { className: 'CustomSelect-listbox' },
          popper: { className: 'CustomSelect-popper' },
        }}
        defaultValue={10}
      >
        <Option className="CustomSelect-option" value={10}>
          Ten
        </Option>
        <Option className="CustomSelect-option" value={20}>
          Twenty
        </Option>
        <Option className="CustomSelect-option" value={30}>
          Thirty
        </Option>
      </Select>
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
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
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
      .CustomSelect {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        min-width: 320px;
        padding: 8px 12px;
        border-radius: 8px;
        text-align: left;
        line-height: 1.5;
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        color: ${isDarkMode ? grey[300] : grey[900]};
        box-shadow: 0px 4px 6px ${
          isDarkMode ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };


        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;

        &:hover {
          background: ${isDarkMode ? grey[800] : grey[50]};
          border-color: ${isDarkMode ? grey[600] : grey[300]};
        }

        &.${selectClasses.focusVisible} {
          border-color: ${cyan[400]};
          outline: 3px solid ${isDarkMode ? cyan[500] : cyan[200]};
        }

        &.${selectClasses.expanded} {
          &::after {
            content: '▴';
          }
        }

        &::after {
          content: '▾';
          float: right;
        }
      }
      .CustomSelect-listbox {
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        min-width: 320px;
        border-radius: 12px;
        overflow: auto;
        outline: 0px;
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        color: ${isDarkMode ? grey[300] : grey[900]};
        box-shadow: 0px 4px 6px ${
          isDarkMode ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
      }
      .CustomSelect-popper {
        z-index: 1;
      }
      .CustomSelect-option {
        list-style: none;
        padding: 8px;
        border-radius: 8px;
        cursor: default;

        &:last-of-type {
          border-bottom: none;
        }

        &.${optionClasses.selected} {
          background-color: ${isDarkMode ? cyan[700] : cyan[100]};
          color: ${isDarkMode ? cyan[50] : cyan[900]};
        }

        &.${optionClasses.highlighted} {
          background-color: ${isDarkMode ? grey[800] : grey[100]};
          color: ${isDarkMode ? grey[300] : grey[900]};
        }

        &.${optionClasses.highlighted}.${optionClasses.selected} {
          background-color: ${isDarkMode ? cyan[700] : cyan[100]};
          color: ${isDarkMode ? cyan[50] : cyan[900]};
        }

        &.${optionClasses.disabled} {
          color: ${isDarkMode ? grey[700] : grey[400]};
        }

        &:hover:not(.${optionClasses.disabled}) {
          background-color: ${isDarkMode ? grey[800] : grey[100]};
          color: ${isDarkMode ? grey[300] : grey[900]};
        }
      }
      `}
    </style>
  );
}
