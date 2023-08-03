import * as React from 'react';
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useTheme } from '@mui/system';

export default function UseSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open,
    autoHideDuration: 5000,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <button className="TriggerButton" type="button" onClick={handleOpen}>
        Open snackbar
      </button>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <div className="CustomSnackbar" {...getRootProps()}>
            Hello World
          </div>
        </ClickAwayListener>
      ) : null}
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
    <style>{`
    @keyframes in-right {
      from {
        transform: translateX(100%);
      }
    
      to {
        transform: translateX(0);
      }
    }

    .TriggerButton {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 8px 16px;
      line-height: 1.5;
      background: transparent;
      cursor: pointer;
      border: 1px solid ${isDarkMode ? grey[800] : grey[200]};
      color: ${isDarkMode ? cyan[300] : cyan[400]};

      &:hover {
        background: ${isDarkMode ? grey[900] : grey[100]};
        border-color: ${isDarkMode ? cyan[200] : cyan[400]};
      }

      &:focus-visible {
        border-color: ${cyan[400]};
        outline: 3px solid ${isDarkMode ? cyan[500] : cyan[200]};
      }
    }

    .CustomSnackbar {
      position: fixed;
      z-index: 5500;
      display: flex;
      right: 16px;
      bottom: 16px;
      left: auto;
      justify-content: start;
      max-width: 560px;
      min-width: 300px;
      background-color: ${isDarkMode ? grey[900] : grey[50]};
      border-radius: 8px;
      border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
      box-shadow: ${
        isDarkMode ? `0 4px 8px rgb(0 0 0 / 0.7)` : `0 4px 8px rgb(0 0 0 / 0.1)`
      };
      padding: 0.75rem;
      color: ${isDarkMode ? cyan[100] : cyan[700]};
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      animation: in-right 200ms;
      transition: transform 0.2s ease-out;
      }
    `}</style>
  );
}
