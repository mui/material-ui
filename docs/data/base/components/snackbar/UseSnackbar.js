import * as React from 'react';
import { useSnackbar } from '@mui/base/useSnackbar';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { css, keyframes, styled } from '@mui/system';

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
      <TriggerButton type="button" onClick={handleOpen}>
        Open snackbar
      </TriggerButton>
      {open ? (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar {...getRootProps()}>Hello World</CustomSnackbar>
        </ClickAwayListener>
      ) : null}
    </React.Fragment>
  );
}

const blue = {
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
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
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${blue[500]};
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};

  &:hover {
    background-color: ${blue[600]};
  }

  &:focus-visible {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }
  `,
);

const CustomSnackbar = styled('div')(
  ({ theme }) => css`
    position: fixed;
    z-index: 5500;
    display: flex;
    right: 16px;
    bottom: 16px;
    left: auto;
    justify-content: space-between;
    max-width: 560px;
    min-width: 300px;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: ${theme.palette.mode === 'dark'
      ? `0 2px 8px rgb(0 0 0 / 0.5)`
      : `0 2px 8px ${grey[200]}`};
    padding: 0.75rem;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    animation: ${snackbarInRight} 200ms;
    transition: transform 0.2s ease-out;
  `,
);
