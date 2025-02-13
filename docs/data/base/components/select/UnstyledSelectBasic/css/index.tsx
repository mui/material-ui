import * as React from 'react';
import { Select, selectClasses, SelectRootSlotProps } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { useTheme } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

export default function UnstyledSelectBasic() {
  return (
    <React.Fragment>
      <Select
        className="CustomSelect"
        slots={{
          root: Button,
        }}
        slotProps={{
          listbox: { className: 'CustomSelect-listbox' },
          popup: { className: 'CustomSelect-popup' },
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

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

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
        position: relative;
        font-family: 'IBM Plex Sans', sans-serif;
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
        box-shadow: 0px 2px 4px ${
          isDarkMode ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 120ms;

        &:hover {
          background: ${isDarkMode ? grey[800] : grey[50]};
          border-color: ${isDarkMode ? grey[600] : grey[300]};
        }

        &.${selectClasses.focusVisible} {
          outline: 0;
          border-color: ${cyan[400]};
          box-shadow: 0 0 0 3px ${isDarkMode ? cyan[600] : cyan[200]};
        }

        & > svg {
          font-size: 1rem;
          position: absolute;
          height: 100%;
          top: 0;
          right: 10px;
        }
      }
      .CustomSelect-listbox {
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        box-sizing: border-box;
        padding: 6px;
        margin: 12px 0;
        min-width: 320px;
        border-radius: 12px;
        overflow: auto;
        outline: 0;
        background: ${isDarkMode ? grey[900] : '#fff'};
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        color: ${isDarkMode ? grey[300] : grey[900]};
        box-shadow: 0px 4px 6px ${
          isDarkMode ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
        };
      }
      .CustomSelect-popup {
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

        &:focus-visible {
          outline: 3px solid ${isDarkMode ? cyan[400] : cyan[300]};
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
