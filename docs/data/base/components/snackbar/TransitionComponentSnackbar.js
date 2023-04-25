import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/base/Snackbar';

const blue = {
  50: '#F0F7FF',
  100: '#DAECFF',
  400: '#3399FF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  200: '#E0E3E7',
  800: '#2D3843',
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

const SnackbarContent = styled('div')(
  ({ theme }) => `
  display: flex;
  overflow: hidden;
  background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[400]};
  box-shadow: ${
    theme.palette.mode === 'dark'
      ? `0 5px 13px -3px rgba(0,0,0,0.4)`
      : `0 5px 13px -3px ${grey[200]}`
  };
  padding: 0.875rem;
  color: ${theme.palette.mode === 'dark' ? '#fff' : blue[900]};
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 500;
  text-align: start;
  position: relative;

  & .snackbar-message {
    flex: 1 1 0%;
    max-width: 100%;
  }

  & .snackbar-title {
    line-height: 1.5rem;
    margin-right: 0.5rem;
  }

  & .snackbar-description {
    line-height: 1.5rem;
    font-weight: 400;
    color: ${theme.palette.mode === 'dark' ? blue[100] : grey[800]};
  }

  & .snackbar-close-icon {
    cursor: pointer;
    font-size: 10px;
    position: absolute;
    top: 0.725rem;
    right: 0.725rem;
    width: 1.25rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  `,
);

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};

export default function TransitionComponentSnackbar() {
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
      <button type="button" onClick={handleClick}>
        Open snackbar
      </button>
      <StyledSnackbar
        autoHideDuration={5000}
        open={open}
        onClose={handleClose}
        exited={exited}
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
            <SnackbarContent
              style={{
                transform: positioningStyles[status],
                transition: 'transform 300ms ease',
              }}
              ref={nodeRef}
            >
              <CheckRoundedIcon
                sx={{
                  flexShrink: 0,
                  marginRight: '0.75rem',
                  width: '1.25rem',
                  height: '1.5rem',
                }}
              />
              <div className="snackbar-message">
                <div className="snackbar-title">Notifications sent</div>
                <div className="snackbar-description">
                  All your notifications were sent to the desired address.
                </div>
              </div>
              <CloseIcon onClick={handleClose} className="snackbar-close-icon" />
            </SnackbarContent>
          )}
        </Transition>
      </StyledSnackbar>
    </React.Fragment>
  );
}
