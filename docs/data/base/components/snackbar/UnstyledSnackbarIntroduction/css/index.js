import * as React from 'react';
import { Transition } from 'react-transition-group';
import { useTheme } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/base/Snackbar';

export default function UnstyledSnackbarIntroduction() {
  const [open, setOpen] = React.useState(false);
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <React.Fragment>
      <button
        className="TriggerButtonIntroduction"
        type="button"
        onClick={handleClick}
      >
        Open snackbar
      </button>
      <Snackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        exited={exited}
        className="CustomSnackbarIntroduction"
      >
        <Transition
          timeout={{ enter: 400, exit: 400 }}
          in={open}
          appear
          unmountOnExit
          onEnter={handleOnEnter}
          onExited={handleOnExited}
          nodeRef={nodeRef}
        >
          {(status) => (
            <div
              className="CustomSnackbarContentIntroduction"
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <CheckRoundedIcon
                sx={{
                  color: 'success.main',
                  flexShrink: 0,
                  width: '1.25rem',
                  height: '1.5rem',
                }}
              />
              <div className="snackbar-message">
                <p className="snackbar-title">Notifications sent</p>
                <p className="snackbar-description">
                  Everything was sent to the desired address.
                </p>
              </div>
              <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
            </div>
          )}
        </Transition>
      </Snackbar>
      <Styles />
    </React.Fragment>
  );
}

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

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
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

    .TriggerButtonIntroduction {
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      color: white;
      transition: all 150ms ease;
      cursor: pointer;
      background: ${isDarkMode ? grey[900] : '#fff'};
      border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
      color: ${isDarkMode ? grey[200] : grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

      &:hover {
        background: ${isDarkMode ? grey[800] : grey[50]};
        border-color: ${isDarkMode ? grey[600] : grey[300]};
      }

      &:active {
        background: ${isDarkMode ? grey[700] : grey[100]};
      }

      &:focus-visible {
        box-shadow: 0 0 0 4px ${isDarkMode ? cyan[300] : cyan[200]};
        outline: none;
      }
    }

    .CustomSnackbarIntroduction {
      position: fixed;
      z-index: 5500;
      display: flex;
      bottom: 16px;
      right: 16px;
      max-width: 560px;
      min-width: 300px;
      }

    .CustomSnackbarContentIntroduction {
      display: flex;
      gap: 8px;
      overflow: hidden;
      background-color: ${isDarkMode ? grey[900] : '#FFF'};
      border-radius: 8px;
      border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
      box-shadow: ${
        isDarkMode ? `0 2px 16px rgba(0,0,0, 0.5)` : `0 2px 16px ${grey[200]}`
      };
      padding: 0.75rem;
      color: ${isDarkMode ? grey[50] : grey[900]};
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;

      & .snackbar-message {
        flex: 1 1 0%;
        max-width: 100%;
      }

      & .snackbar-title {
        margin: 0;
        line-height: 1.5rem;
        margin-right: 0.5rem;
      }

      & .snackbar-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${isDarkMode ? grey[400] : grey[800]};
      }

      & .snackbar-close-icon {
        cursor: pointer;
        flex-shrink: 0;
        padding: 2px;
        border-radius: 4px;

        &:hover {
          background: ${isDarkMode ? grey[800] : grey[50]};
        }
      }
    }
    `}</style>
  );
}
