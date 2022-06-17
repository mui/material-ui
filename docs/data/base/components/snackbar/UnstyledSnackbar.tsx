import * as React from 'react';
import { styled, keyframes } from '@mui/system';
import SnackbarUnstyled, { SnackbarCloseReason } from '@mui/base/SnackbarUnstyled';

const snackbarInLeft = keyframes`
  from {
		transform: translateX(-100%);
		
	}
	to {
		transform: translateX(0);
	}
`;

const StyledSnackbar = styled(SnackbarUnstyled)`
  position: fixed;
  z-index: 5500;
  display: flex;
  left: 10px;
  bottom: 10px;
  right: auto;
  justify-content: center;
  align-items: center;
  max-width: 560px;
  min-width: 300px;
  background-color: #3182ce;
  padding: 0.75rem;
  color: white;
  font-family: IBM Plex Sans, sans-serif;
  animation: ${snackbarInLeft} 500ms;
  transition: transform 0.3s ease-out;
`;

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
      <button type="button" onClick={handleClick}>
        Open snackbar
      </button>
      <StyledSnackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        Hello World
      </StyledSnackbar>
    </React.Fragment>
  );
}
