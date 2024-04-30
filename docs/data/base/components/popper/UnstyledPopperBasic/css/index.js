import * as React from 'react';
import { Popper } from '@mui/base/Popper';
import { useTheme } from '@mui/system';

export default function SimplePopper() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <React.Fragment>
      <button
        type="button"
        aria-describedby={id}
        className="Button"
        onClick={handleClick}
      >
        Toggle Popper
      </button>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div className="CustomPopper">The content of the Popper.</div>
      </Popper>
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

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();
  return (
    <style>{`
      .Button {
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 600;
        font-size: 0.875rem;
        line-height: 1.5;
        background-color: ${cyan[500]};
        padding: 8px 16px;
        border-radius: 8px;
        color: white;
        transition: all 150ms ease;
        cursor: pointer;
        border: 1px solid ${cyan[500]};
        box-shadow: 0 2px 1px ${
          isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
        }, inset 0 1.5px 1px ${cyan[400]}, inset 0 -2px 1px ${cyan[600]};

        &:hover {
          background-color: ${cyan[600]};
        }

        &:active {
          background-color: ${cyan[700]};
          box-shadow: none;
        }

        &:focus-visible {
          box-shadow: 0 0 0 4px ${isDarkMode ? cyan[300] : cyan[200]};
          outline: none;
          }
        }

      .CustomPopper{
        background-color: ${isDarkMode ? grey[900] : '#FFF'};
        border-radius: 8px;
        border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
        box-shadow: ${
          isDarkMode ? `0 4px 8px rgb(0 0 0 / 0.7)` : `0 4px 8px rgb(0 0 0 / 0.1)`
        };
        padding: 0.75rem;
        color: ${isDarkMode ? grey[100] : grey[700]};
        font-size: 0.875rem;
        font-family: 'IBM Plex Sans', sans-serif;
        font-weight: 500;
        opacity: 1;
        margin: 0.25rem 0px;
      }
  `}</style>
  );
}
