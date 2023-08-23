import * as React from 'react';
import { Select, selectClasses, SelectRootSlotProps } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { useTheme } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

export default function UnstyledSelectIntroduction() {
  return (
    <React.Fragment>
      <Select
        className="CustomSelectIntroduction"
        slots={{
          root: Button,
        }}
        slotProps={{
          listbox: { className: 'CustomSelectIntroduction-listbox' },
          popper: { className: 'CustomSelectIntroduction-popper' },
        }}
        defaultValue={10}
      >
        <Option className="CustomSelectIntroduction-option" value={10}>
          Documentation
        </Option>
        <Option className="CustomSelectIntroduction-option" value={20}>
          Components
        </Option>
        <Option className="CustomSelectIntroduction-option" value={30}>
          Features
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
      .CustomSelectIntroduction {
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
        position: relative;
        box-shadow: 0px 2px 24px ${isDarkMode ? cyan[800] : cyan[100]};



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

        
        & > svg {
          font-size: 1rem;
          position: absolute;
          height: 100%;
          top: 0;
          right: 10px;
        }
      }
      .CustomSelectIntroduction-listbox {
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
      .CustomSelectIntroduction-popper {
        z-index: 1;
      }
      .CustomSelectIntroduction-option {
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
