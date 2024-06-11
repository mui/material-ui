import * as React from 'react';
import PropTypes from 'prop-types';
import { Select, selectClasses } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { useTheme } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { CssTransition } from '@mui/base';

export default function UnstyledSelectIntroduction() {
  return (
    <React.Fragment>
      <Select
        className="CustomSelectIntroduction"
        slots={{
          root: Button,
          listbox: AnimatedListbox,
        }}
        slotProps={{
          listbox: { className: 'CustomSelectIntroduction-listbox' },
          popup: { className: 'CustomSelectIntroduction-popup' },
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

const Button = React.forwardRef(function Button(props, ref) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

Button.propTypes = {
  children: PropTypes.node,
  ownerState: PropTypes.object.isRequired,
};

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <ul {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
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
      .CustomSelectIntroduction {
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
        position: relative;
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
      .CustomSelectIntroduction-listbox {
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

        .closed & {
          opacity: 0;
          transform: scale(0.95, 0.8);
          transition: opacity 200ms ease-in, transform 200ms ease-in;
        }
        
        .open & {
          opacity: 1;
          transform: scale(1, 1);
          transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
        }
      
        .placement-top & {
          transform-origin: bottom;
        }
      
        .placement-bottom & {
          transform-origin: top;
        }
      }
      .CustomSelectIntroduction-popup {
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
