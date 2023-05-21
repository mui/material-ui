import * as React from 'react';
import { styled, keyframes, css } from '@mui/system';
import Snackbar from '@mui/base/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';

export default function UnstyledSnackbar() {
  const [open, setOpen] = React.useState(false);

  const handleClose = (_: any, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <TriggerButton type="button" onClick={handleClick}>
        Open snackbar
      </TriggerButton>
      <StyledSnackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        Hello World
      </StyledSnackbar>
    </React.Fragment>
  );
}

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
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

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const TriggerButton = styled('button')(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 6px 12px;
  line-height: 1.5;
  background: transparent;
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[100] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
  }

  &:focus-visible {
    border-color: ${blue[400]};
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }
  `,
);

const StyledSnackbar = styled(Snackbar)(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    bottom: 16px;
    left: auto;
    justify-content: start;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0 2px 8px rgba(0,0,0,0.5)`
      : `0 2px 8px ${grey[200]}`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    animation: ${snackbarInRight} 200ms;
    transition: transform 0.2s ease-out;
  `,
);
